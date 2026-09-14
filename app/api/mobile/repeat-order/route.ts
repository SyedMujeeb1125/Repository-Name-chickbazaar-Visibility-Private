import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { PAYMENT_CONFIG } from "@/lib/payment-config";
import { getMobileAuthenticatedRetailer } from "@/lib/retailer";

export async function POST(request: NextRequest) {
  try {
    const mobile = getMobileAuthenticatedRetailer(request);

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const { weight } = body;

    // -------------------------
    // Validation
    // -------------------------

    if (!weight || Number(weight) <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order weight.",
        },
        {
          status: 400,
        }
      );
    }

    // -------------------------
    // Retailer
    // -------------------------

    const {
      data: retailer,
      error: retailerError,
    } = await supabase
      .from("retailers")
      .select("*")
      .eq("mobile", mobile)
      .maybeSingle();

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

    // -------------------------
    // Today's Rate
    // -------------------------

    const {
      data: rate,
      error: rateError,
    } = await supabase
      .from("daily_rates")
      .select("rate")
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    if (rateError) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to fetch today's rate.",
        },
        {
          status: 500,
        }
      );
    }

    const todayRate = Number(rate?.rate ?? 0);

    if (todayRate <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Today's rate is not available.",
        },
        {
          status: 400,
        }
      );
    }

    const requestedWeight = Number(weight);
    const estimatedAmount = requestedWeight * todayRate;

    const advanceAmount = PAYMENT_CONFIG.ADVANCE_AMOUNT;

    const orderNumber =
      `CB-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

    // -------------------------
    // Create Order
    // -------------------------

    const {
      data,
      error,
    } = await supabase
      .from("orders")
      .insert({
        id: crypto.randomUUID(),

        order_number: orderNumber,

        created_at: new Date().toISOString(),

        status: "new",

        shop_name: retailer.shop_name,

        owner_name: retailer.owner_name,

        mobile: retailer.mobile,

        email: retailer.email,

        address: retailer.address,

        birds: "0",

        average_weight: "",

        delivery_date:
          new Date().toISOString().split("T")[0],

        notes: "",

        payment_status: "pending",

        payment_amount: 0,

        payment_type: "advance",

        requested_weight: requestedWeight,

        rate_per_kg: todayRate,

        estimated_amount: estimatedAmount,

        advance_amount: advanceAmount,

        advance_required: advanceAmount,

        advance_percentage:
          PAYMENT_CONFIG.ADVANCE_PERCENTAGE,

        balance_due: Math.max(
          estimatedAmount - advanceAmount,
          0
        ),
      })
      .select()
      .single();

    if (error) {
      console.error("[QUICK_ORDER]", error);

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
      `[QUICK_ORDER] ${orderNumber} created`
    );

    return NextResponse.json({
      success: true,
      order: data,
    });
  } catch (error) {
    console.error("[QUICK_ORDER]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
