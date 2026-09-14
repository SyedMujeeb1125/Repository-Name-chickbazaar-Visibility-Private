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

    const {
      scheduleId,
      quantityKg,
    } = body;

    // -------------------------
    // Validation
    // -------------------------

    if (!scheduleId) {
      return NextResponse.json(
        {
          success: false,
          message: "Schedule ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!quantityKg || Number(quantityKg) <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid quantity.",
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
    // Verify schedule ownership
    // -------------------------

    const {
      data: schedule,
      error: scheduleError,
    } = await supabase
      .from("scheduled_orders")
      .select("*")
      .eq("id", scheduleId)
      .eq("retailer_id", retailer.id)
      .maybeSingle();

    if (scheduleError) {
      console.error(
        "[SCHEDULE_CONFIRM][LOOKUP]",
        scheduleError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to verify schedule.",
        },
        {
          status: 500,
        }
      );
    }

    if (!schedule) {
      return NextResponse.json(
        {
          success: false,
          message: "Schedule not found.",
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
          message: "Today's rate is unavailable.",
        },
        {
          status: 400,
        }
      );
    }

    const requestedWeight = Number(quantityKg);
    const estimatedAmount = requestedWeight * todayRate;

    const today = new Date()
      .toISOString()
      .split("T")[0];

    const now = new Date().toISOString();

    const orderNumber =
      `CB-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

    // -------------------------
    // Create Order
    // -------------------------

    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("orders")
      .insert({
        id: crypto.randomUUID(),

        order_number: orderNumber,

        created_at: now,

        status: "new",

        shop_name: retailer.shop_name,

        owner_name: retailer.owner_name,

        mobile: retailer.mobile,

        email: retailer.email,

        address: retailer.address,

        requested_weight: requestedWeight,

        rate_per_kg: todayRate,

        estimated_amount: estimatedAmount,

        payment_status: "pending",

        payment_type: "advance",

        advance_amount:
          PAYMENT_CONFIG.ADVANCE_AMOUNT,

        advance_required:
          PAYMENT_CONFIG.ADVANCE_AMOUNT,

        advance_percentage:
          PAYMENT_CONFIG.ADVANCE_PERCENTAGE,

        balance_due: Math.max(
          estimatedAmount -
            PAYMENT_CONFIG.ADVANCE_AMOUNT,
          0
        ),

        delivery_date: today,
      })
      .select()
      .single();

    if (orderError) {
      console.error(
        "[SCHEDULE_CONFIRM]",
        orderError
      );

      return NextResponse.json(
        {
          success: false,
          message: orderError.message,
        },
        {
          status: 500,
        }
      );
    }

    // -------------------------
    // Save Confirmation
    // -------------------------

    const {
      error: confirmationError,
    } = await supabase
      .from("scheduled_order_confirmations")
      .insert({
        id: crypto.randomUUID(),

        schedule_id: scheduleId,

        retailer_id: retailer.id,

        delivery_date: today,

        quantity_kg: requestedWeight,

        status: "confirmed",

        confirmed_at: now,

        created_at: now,

        updated_at: now,
      });

    if (confirmationError) {
      console.error(
        "[SCHEDULE_CONFIRM]",
        confirmationError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to save schedule confirmation.",
        },
        {
          status: 500,
        }
      );
    }

    // -------------------------
    // Update Schedule
    // -------------------------

    const {
      error: scheduleUpdateError,
    } = await supabase
      .from("scheduled_orders")
      .update({
        last_confirmed_at: now,
        updated_at: now,
      })
      .eq("id", scheduleId)
      .eq("retailer_id", retailer.id);

    if (scheduleUpdateError) {
      console.error(
        "[SCHEDULE_UPDATE]",
        scheduleUpdateError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to update schedule.",
        },
        {
          status: 500,
        }
      );
    }

    console.info(
      `[SCHEDULE_CONFIRM] ${orderNumber} created`
    );

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "[SCHEDULE_CONFIRM]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      {
        status: 500,
      }
    );
  }
}
