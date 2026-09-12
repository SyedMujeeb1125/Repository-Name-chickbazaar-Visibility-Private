import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getMobileAuthenticatedRetailer } from "@/lib/retailer";
import { verifySignedToken } from "@/lib/auth";
import { PAYMENT_CONFIG } from "@/lib/payment-config";
import {
  getBusinessPhase,
  getBusinessDeliveryDate,
} from "@/lib/business/businessEngine";
import { BusinessPhase } from "@/lib/types/business";
import {
  getTodayRate,
  getTomorrowRate,
} from "@/lib/rate-service";

type DeliverySlot = {
  id: string;
  label: string;
  start: string;
  end: string;
};

const DELIVERY_WAVES: Record<string, DeliverySlot> = {
  wave1: {
    id: "wave1",
    label: "06:00 AM - 08:00 AM",
    start: "06:00",
    end: "08:00",
  },
  wave2: {
    id: "wave2",
    label: "08:00 AM - 10:00 AM",
    start: "08:00",
    end: "10:00",
  },
  wave3: {
    id: "wave3",
    label: "10:00 AM - 12:00 PM",
    start: "10:00",
    end: "12:00",
  },
  wave4: {
    id: "wave4",
    label: "12:00 PM - 02:00 PM",
    start: "12:00",
    end: "14:00",
  },
};

function parsePaymentReference(paymentId: string) {
  const subject = verifySignedToken(paymentId);

  if (!subject) {
    return null;
  }

  const parts = subject.split(":");

  if (
    parts.length !== 4 ||
    parts[0] !== "payment"
  ) {
    return null;
  }

  const amount = Number(parts[2]);

  if (!Number.isFinite(amount)) {
    return null;
  }

  return {
    retailerId: parts[1],
    amount,
    nonce: parts[3],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const mobile = getMobileAuthenticatedRetailer(request);

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        { status: 401 }
      );
    }

    const {
      data: authenticatedRetailer,
      error: authenticatedRetailerError,
    } = await supabase
      .from("retailers")
      .select("*")
      .eq("mobile", mobile)
      .maybeSingle();

    if (authenticatedRetailerError) {
      console.error(
        "[ORDER CREATE][RETAILER]",
        authenticatedRetailerError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to verify retailer.",
        },
        { status: 500 }
      );
    }

    if (!authenticatedRetailer) {
      return NextResponse.json(
        {
          success: false,
          message: "Retailer not found.",
        },
        { status: 404 }
      );
    }

    const retailerId = authenticatedRetailer.id;

    // -----------------------------------------------------
    // Canonical mobile order payload
    // -----------------------------------------------------

    const canonicalPayload =
      body?.payload ?? body?.orderData?.payload ?? null;

    const draft =
      body?.draft ?? body?.orderData?.draft ?? null;

    const requestedWeight = Number(
      canonicalPayload?.requestedWeight ??
      draft?.requestedWeight ??
      body?.requestedWeight ??
      body?.quantity
    );

    const deliveryLocationId =
      canonicalPayload?.deliveryLocationId ??
      draft?.deliveryLocation?.id ??
      body?.deliveryLocationId;

    const deliveryWaveId =
      canonicalPayload?.deliveryWaveId ??
      draft?.deliveryWave?.id ??
      body?.deliveryWaveId;

    const orderMethod =
      canonicalPayload?.orderMethod ??
      draft?.orderMethod ??
      body?.orderMethod ??
      "WEIGHT";

    const notes =
      canonicalPayload?.notes ??
      draft?.notes ??
      body?.notes ??
      "";

    const estimatedBirds = Number(
      canonicalPayload?.estimatedBirds ??
      draft?.estimatedBirds ??
      (requestedWeight > 0
        ? Math.ceil(requestedWeight / 2.2)
        : 0)
    );

    const paymentId = body?.paymentId;

    if (
      !Number.isFinite(requestedWeight) ||
      requestedWeight <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Requested weight should be greater than zero.",
        },
        { status: 400 }
      );
    }

    if (
      !deliveryLocationId ||
      typeof deliveryLocationId !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Delivery location is required.",
        },
        { status: 400 }
      );
    }

    if (
      !deliveryWaveId ||
      typeof deliveryWaveId !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Delivery wave is required.",
        },
        { status: 400 }
      );
    }

    if (
      !paymentId ||
      typeof paymentId !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment ID is required.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------------
    // Verify payment cryptographically
    // -----------------------------------------------------

    const payment = parsePaymentReference(paymentId);

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired payment reference.",
        },
        { status: 400 }
      );
    }

    if (payment.retailerId !== retailerId) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment does not belong to this retailer.",
        },
        { status: 403 }
      );
    }

    if (
      payment.amount !== PAYMENT_CONFIG.ADVANCE_AMOUNT
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid advance payment amount.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------------
    // Business rules
    // -----------------------------------------------------

    const now = new Date();
    const businessPhase = getBusinessPhase(now);

    if (
      businessPhase === BusinessPhase.BOOKING_CLOSED
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Ordering is closed between 5:00 PM and 7:00 PM. Ordering will reopen at 7:00 PM.",
        },
        { status: 400 }
      );
    }

    const isTomorrowBooking =
      businessPhase === BusinessPhase.BOOKING;

    // -----------------------------------------------------
    // Resolve delivery location securely
    // -----------------------------------------------------

    const {
      data: selectedLocation,
      error: locationError,
    } = await supabase
      .from("retailer_locations")
      .select("*")
      .eq("id", deliveryLocationId)
      .eq("retailer_mobile", mobile)
      .maybeSingle();

    if (locationError) {
      console.error(
        "[ORDER CREATE][LOCATION]",
        locationError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to verify delivery location.",
        },
        { status: 500 }
      );
    }

    if (!selectedLocation) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Delivery location not found or does not belong to this retailer.",
        },
        { status: 403 }
      );
    }

    // -----------------------------------------------------
    // Resolve delivery wave
    // -----------------------------------------------------

    const slot = DELIVERY_WAVES[deliveryWaveId];

    if (!slot) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid delivery wave selected.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------------
    // Server-authoritative delivery date
    // -----------------------------------------------------

    const businessDeliveryDate =
      getBusinessDeliveryDate(now)
        .toISOString()
        .split("T")[0];

    // -----------------------------------------------------
    // Server-authoritative rate
    // -----------------------------------------------------

    const todayRateRecord =
      await getTodayRate(now);

    const tomorrowRateRecord =
      await getTomorrowRate(now);

    const todayRate = Number(
      todayRateRecord?.rate ?? 0
    );

    const tomorrowRate = Number(
      tomorrowRateRecord?.rate ?? 0
    );

    const liveRate = isTomorrowBooking
      ? tomorrowRate
      : todayRate;

    if (liveRate <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: isTomorrowBooking
            ? "Tomorrow's rate is not available yet."
            : "Today's live rate is not available.",
        },
        { status: 409 }
      );
    }

    // -----------------------------------------------------
    // Prevent payment replay
    // -----------------------------------------------------

    const {
      data: existingPayment,
      error: paymentLookupError,
    } = await supabase
      .from("orders")
      .select("id")
      .eq("advance_payment_id", paymentId)
      .maybeSingle();

    if (paymentLookupError) {
      console.error(
        "[ORDER CREATE][PAYMENT LOOKUP]",
        paymentLookupError
      );
    }

    if (existingPayment) {
      return NextResponse.json(
        {
          success: false,
          message: "This payment has already been used.",
        },
        { status: 409 }
      );
    }

    // -----------------------------------------------------
    // Prevent duplicate active orders
    // -----------------------------------------------------

    const {
      data: existingOrder,
    } = await supabase
      .from("orders")
      .select("id")
      .eq("mobile", authenticatedRetailer.mobile)
      .eq("delivery_date", businessDeliveryDate)
      .in("status", [
        "new",
        "confirmed",
        "allocated",
        "preparing",
        "vehicle_assigned",
        "out_for_delivery",
      ])
      .maybeSingle();

    if (existingOrder) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You already have an active order for this delivery date.",
        },
        { status: 409 }
      );
    }

    // -----------------------------------------------------
    // Calculate authoritative pricing
    // -----------------------------------------------------

    const orderId = crypto.randomUUID();

    const {
      data: orderNumber,
      error: sequenceError,
    } = await supabase.rpc(
      "generate_order_number"
    );

    if (
      sequenceError ||
      !orderNumber
    ) {
      throw new Error(
        "Unable to generate order number."
      );
    }

    const advanceAmount =
      PAYMENT_CONFIG.ADVANCE_AMOUNT;

    const estimatedAmount =
      requestedWeight * liveRate;

    const balanceDue = Math.max(
      estimatedAmount - advanceAmount,
      0
    );

    // -----------------------------------------------------
    // Insert order
    // -----------------------------------------------------

    const { error } = await supabase
      .from("orders")
      .insert({
        id: orderId,
        retailer_id: retailerId,
        created_at: new Date().toISOString(),

        status: "new",

        shop_name:
          selectedLocation.shop_name ??
          authenticatedRetailer.shop_name,

        owner_name:
          selectedLocation.contact_person ??
          authenticatedRetailer.owner_name,

        mobile: authenticatedRetailer.mobile,
        email: authenticatedRetailer.email,

        address:
          selectedLocation.address ??
          authenticatedRetailer.address,

        order_number: orderNumber,

        order_type: orderMethod,

        delivery_type:
          isTomorrowBooking
            ? "TOMORROW"
            : "STANDARD",

        delivery_date:
          businessDeliveryDate,

        delivery_slot_label:
          slot.label,

        delivery_slot_start:
          slot.start,

        delivery_slot_end:
          slot.end,

        notes,

        birds:
          Number.isFinite(estimatedBirds)
            ? estimatedBirds
            : 0,

        average_weight: null,

        requested_weight:
          requestedWeight,

        rate_per_kg:
          liveRate,

        estimated_amount:
          estimatedAmount,

        actual_weight: null,

        final_amount: null,

        delivery_shop_name:
          selectedLocation.shop_name,

        latitude:
          selectedLocation.latitude ??
          null,

        longitude:
          selectedLocation.longitude ??
          null,

        assigned_farm: null,
        assigned_driver: null,
        assigned_vehicle: null,

        zone: null,

        tracking_notes: null,
        delivery_notes: null,
        delivered_at: null,
        pod_photo_url: null,
        pod_uploaded_at: null,

        payment_status:
          balanceDue > 0
            ? "partially_paid"
            : "paid",

        payment_type: "advance",

        payment_mode: "UPI",

        payment_amount:
          advanceAmount,

        advance_percentage:
          PAYMENT_CONFIG.ADVANCE_PERCENTAGE,

        advance_required:
          advanceAmount,

        advance_amount:
          advanceAmount,

        advance_payment_mode:
          "online",

        advance_payment_status:
          "paid",

        advance_payment_id:
          paymentId,

        razorpay_order_id:
          null,

        razorpay_payment_id:
          paymentId,

        upi_transaction_id:
          paymentId,

        outstanding_amount:
          balanceDue,

        final_bill_amount:
          estimatedAmount,

        cash_received: 0,

        upi_received:
          advanceAmount,

        total_paid:
          advanceAmount,

        balance_due:
          balanceDue,

        payment_collected_by:
          null,

        payment_collected_at:
          null,
      });

    if (error) {
      console.error(
        "[ORDER CREATE]",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    console.info(
      `[ORDER] ${orderNumber} created successfully`
    );

    return NextResponse.json({
      success: true,
      message: "Order created successfully.",
      orderId,
      orderNumber,
      liveRate,
      estimatedAmount,
      advanceAmount,
      balanceDue,
      paymentId,
      deliveryDate:
        businessDeliveryDate,
      deliveryLocationId,
      deliverySlot: {
        id: slot.id,
        label: slot.label,
        start: slot.start,
        end: slot.end,
      },
    });
  } catch (error: any) {
    console.error(
      "[ORDER][CREATE]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ??
          "Unable to create order.",
      },
      { status: 500 }
    );
  }
}
