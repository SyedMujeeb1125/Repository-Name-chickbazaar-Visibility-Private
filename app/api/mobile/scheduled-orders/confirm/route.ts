import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(
  request: NextRequest
) {
  try {

    const body =
      await request.json();

    const {
      mobile,
      scheduleId,
      quantityKg,
    } = body;

    if (
      !mobile ||
      !scheduleId ||
      !quantityKg
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields.",
        },
        {
          status: 400,
        }
      );

    }

    const {
      data: retailer,
      error: retailerError,
    } = await supabase

      .from("retailers")

      .select("*")

      .eq("mobile", mobile)

      .single();

      

    if (
      retailerError ||
      !retailer
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Retailer not found.",
        },
        {
          status: 404,
        }
      );

    }

    const {
      data: rate,
    } = await supabase

      .from("daily_rates")

      .select("rate")

      .order(
        "created_at",
        {
          ascending: false,
        }
      )

      .limit(1)

      .single();

    const todayRate =
      Number(rate?.rate ?? 0);

    const estimatedAmount =
      todayRate *
      Number(quantityKg);

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const orderNumber =
      `CB-${new Date().getFullYear()}-${Date.now()
        .toString()
        .slice(-6)}`;

    const orderId =
      `order_${Date.now()}`;

    const {
      data: order,
      error: orderError,
    } = await supabase

      .from("orders")

      .insert({

        id:
          orderId,

        order_number:
          orderNumber,

        created_at:
          new Date().toISOString(),

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

        requested_weight:
          quantityKg,

        rate_per_kg:
          todayRate,

        estimated_amount:
          estimatedAmount,

        payment_status:
          "pending",

        payment_type:
          "advance",

        delivery_date:
          today,

      })

      .select()

      .single();

    if (orderError) {

      return NextResponse.json(
        {
          success: false,
          message:
            orderError.message,
        },
        {
          status: 500,
        }
      );

    }

    await supabase

      .from(
        "scheduled_order_confirmations"
      )

      .insert({

        id:
          `SOC-${Date.now()}`,

        schedule_id:
          scheduleId,

        retailer_id:
          retailer.id,

        delivery_date:
          today,

        quantity_kg:
          quantityKg,

        status:
          "confirmed",

        confirmed_at:
          new Date().toISOString(),

        created_at:
          new Date().toISOString(),

        updated_at:
          new Date().toISOString(),

      });

    await supabase

      .from("scheduled_orders")

      .update({

        last_confirmed_at:
          new Date().toISOString(),

        updated_at:
          new Date().toISOString(),

      })

      .eq(
        "id",
        scheduleId
      );

    return NextResponse.json({

      success: true,

      order,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error.",
      },
      {
        status: 500,
      }
    );

  }

}