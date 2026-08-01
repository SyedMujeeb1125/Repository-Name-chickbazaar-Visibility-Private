import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { PAYMENT_CONFIG } from "@/lib/payment-config";
import { STANDARD_DELIVERY_SLOTS } from "@/lib/deliverySlots";

import {
  getBusinessDeliveryDate,
  isStandardBookingOpen,
} from "@/lib/businessPhase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
  retailerId,
  paymentId,
  selectedShop,
  quantity,
  deliverySlot,
  orderType,
  notes,
} = body;

    // =====================================================
    // Business Rules
    // =====================================================

    const now = new Date();

    if (!isStandardBookingOpen(now)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Standard booking is currently closed. Booking opens every day at 7:00 PM.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // Validation
    // =====================================================

    if (!retailerId || typeof retailerId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Retailer ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!paymentId || typeof paymentId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Payment ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!quantity || Number(quantity) <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Quantity should be greater than zero.",
        },
        {
          status: 400,
        }
      );
    }

        if (
      deliverySlot === undefined ||
      deliverySlot === null
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Delivery slot is required.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // Validate Delivery Slot
    // =====================================================

    const slot = STANDARD_DELIVERY_SLOTS.find(
  (
    s: (typeof STANDARD_DELIVERY_SLOTS)[number]
  ) =>
    s.id === Number(deliverySlot) ||
    s.label === String(deliverySlot)
);

    if (!slot) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid delivery slot selected.",
        },
        {
          status: 400,
        }
      );
    }

    // =====================================================
    // Business Delivery Date
    // =====================================================

    const businessDeliveryDate =
      getBusinessDeliveryDate(now)
        .toISOString()
        .split("T")[0];

    // =====================================================
    // Duplicate Payment Check
    // =====================================================

    const { data: existingPayment } =
      await supabase
        .from("orders")
        .select("id")
        .eq(
          "advance_payment_id",
          paymentId
        )
        .maybeSingle();

    if (existingPayment) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This payment has already been used.",
        },
        {
          status: 409,
        }
      );
    }

    // =====================================================
    // Fetch Retailer
    // =====================================================

    const {
      data: retailer,
      error: retailerError,
    } = await supabase
      .from("retailers")
      .select("*")
      .eq("id", retailerId)
      .single();

    if (retailerError || !retailer) {
      return NextResponse.json(
        {
          success: false,
          message: "Retailer not found.",
        },
        {
          status: 404,
        }
      );
    }

    // =====================================================
// Fetch Live Rate
// =====================================================

const { data: dailyRate, error: rateError } =
  await supabase
    .from("daily_rates")
    .select("rate")
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .single();

if (rateError || !dailyRate) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Today's live rate is not available.",
    },
    {
      status: 500,
    }
  );
}

const liveRate = Number(dailyRate.rate);

if (liveRate <= 0) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Invalid live rate configured.",
    },
    {
      status: 500,
    }
  );
}

    // =====================================================
    // Prevent Duplicate Orders
    // =====================================================

    const {
      data: existingOrder,
    } = await supabase
      .from("orders")
      .select("id")
      .eq("mobile", retailer.mobile)
      .eq(
        "delivery_date",
        businessDeliveryDate
      )
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
        {
          status: 409,
        }
      );
    }

    // =====================================================
    // Generate IDs
    // =====================================================

    const orderId = crypto.randomUUID();

const { data: orderNumber, error: sequenceError } =
  await supabase.rpc("generate_order_number");

if (sequenceError || !orderNumber) {
  throw new Error(
    "Unable to generate order number."
  );
}

    const advanceAmount =
      PAYMENT_CONFIG.ADVANCE_AMOUNT;

    const estimatedAmount =
  Number(quantity) * liveRate;

const balanceDue = Math.max(
  estimatedAmount - advanceAmount,
  0
);

    // =====================================================
// Insert Order
// =====================================================

const { error } = await supabase
  .from("orders")
  .insert({
    id: orderId,

    created_at: new Date().toISOString(),

    status: "new",

    // -------------------------------------------------
    // Retailer
    // -------------------------------------------------

    shop_name: retailer.shop_name,

    owner_name: retailer.owner_name,

    mobile: retailer.mobile,

    email: retailer.email,

    address: retailer.address,

    // -------------------------------------------------
    // Order
    // -------------------------------------------------

    order_number: orderNumber,

    order_type: orderType ?? "STANDARD",

    delivery_type: "STANDARD",

    delivery_date: businessDeliveryDate,

    delivery_slot_label: slot.label,

    delivery_slot_start: slot.start,

    delivery_slot_end: slot.end,

    notes: notes ?? "",

    // -------------------------------------------------
    // Chicken
    // -------------------------------------------------

    birds: "0",

    average_weight: "",

    requested_weight: Number(quantity),

    rate_per_kg: liveRate,

    estimated_amount: Number(estimatedAmount),

    actual_weight: null,

    final_amount: null,

    // -------------------------------------------------
    // Delivery
    // -------------------------------------------------

    delivery_shop_name:
      selectedShop?.shop_name ??
      retailer.shop_name,

    latitude:
      selectedShop?.latitude ?? null,

    longitude:
      selectedShop?.longitude ?? null,

    assigned_farm: null,

    assigned_driver: null,

    assigned_vehicle: null,

    zone: null,

    tracking_notes: null,

    delivery_notes: null,

    delivered_at: null,

    pod_photo_url: null,

    pod_uploaded_at: null,

    // -------------------------------------------------
    // Payment
    // -------------------------------------------------

    payment_status: "pending",

    payment_type: "advance",

    payment_mode: "UPI",

    payment_amount: 0,

    advance_percentage:
      PAYMENT_CONFIG.ADVANCE_PERCENTAGE,

    advance_required:
      PAYMENT_CONFIG.ADVANCE_AMOUNT,

    advance_amount: advanceAmount,

    advance_payment_mode: "online",

    advance_payment_status: "paid",

    advance_payment_id: paymentId,

    razorpay_order_id: null,

    razorpay_payment_id: paymentId,

    upi_transaction_id: paymentId,

    outstanding_amount: 0,

    final_bill_amount: 0,

    cash_received: 0,

    upi_received: advanceAmount,

    total_paid: advanceAmount,

    balance_due: balanceDue,

    payment_collected_by: null,

    payment_collected_at: null,
  });

if (error) {
  console.error("[ORDER CREATE]", error);

  return NextResponse.json(
    {
      success: false,
      message: error.message,
    },
    {
      status: 500,
    }
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

  deliveryDate: businessDeliveryDate,

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
  {
    status: 500,
  }
);

}
}