import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("================================");
    console.log("MOBILE ORDER CREATE");
    console.log(body);
    console.log("================================");

    const {
      retailerId,
      paymentId,
      selectedShop,
      quantity,
      todayRate,
      estimatedAmount,
      deliveryDate,
      deliverySlot,
      orderType,
      notes,
    } = body;

    if (!retailerId) {
      return NextResponse.json(
        {
          success: false,
          message: "Retailer ID is required.",
        },
        { status: 400 }
      );
    }

    // Fetch retailer details
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
        { status: 404 }
      );
    }

    const orderId =
      `order_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 8)}`;

    const orderNumber =
      `CB-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

    const advanceAmount = 500;

    const { error } = await supabase
      .from("orders")
      .insert({
        id: orderId,

        created_at: new Date().toISOString(),

        status: "new",

        shop_name:
          retailer.shop_name,

        owner_name:
          retailer.owner_name,

        mobile:
          retailer.mobile,

        email:
          retailer.email,

        address:
          retailer.address,

        birds: "0",

        average_weight: "",

        delivery_date:
          deliveryDate,

        notes:
          notes ?? "",

        order_number:
          orderNumber,

        payment_status:
          "pending",

        payment_amount: 0,

        assigned_farm: null,

        tracking_notes: null,

        latitude:
          selectedShop?.latitude ?? null,

        longitude:
          selectedShop?.longitude ?? null,

        payment_type:
          "advance",

        requested_weight:
          quantity,

        rate_per_kg:
          todayRate,

        actual_weight: null,

        final_amount: null,

        delivery_shop_name:
          selectedShop?.shop_name ??
          retailer.shop_name,

        estimated_amount:
          estimatedAmount,

        advance_percentage: 0,

        advance_required: 0,

        razorpay_order_id: null,

        razorpay_payment_id:
          paymentId,

        outstanding_amount: 0,

        assigned_driver: null,

        assigned_vehicle: null,

        zone: null,

        delivery_notes: null,

        delivered_at: null,

        pod_photo_url: null,

        pod_uploaded_at: null,

        advance_amount:
          advanceAmount,

        advance_payment_mode:
          "online",

        advance_payment_status:
          "paid",

        advance_payment_id:
          paymentId,

        final_bill_amount: 0,

        cash_received: 0,

        upi_received:
          advanceAmount,

        total_paid:
          advanceAmount,

        balance_due:
          estimatedAmount -
          advanceAmount,

        payment_collected_by:
          null,

        payment_collected_at:
          null,

        payment_mode:
          "UPI",

        upi_transaction_id:
          paymentId,
      });

    if (error) {
      console.error(error);

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

    return NextResponse.json({
      success: true,
      orderId,
      orderNumber,
      paymentId,
      message:
        "Order created successfully.",
    });

  } catch (error: any) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ??
          "Internal Server Error.",
      },
      {
        status: 500,
      }
    );

  }
}