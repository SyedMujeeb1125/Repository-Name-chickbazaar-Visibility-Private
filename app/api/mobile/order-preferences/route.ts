import { NextRequest, NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest
) {

  try {

    const mobile =
      request.nextUrl.searchParams.get(
        "mobile"
      );

    if (!mobile) {

      return NextResponse.json(
        {
          success: false,
          message: "Mobile number is required.",
        },
        {
          status: 400,
        }
      );

    }

    // -------------------------------------------------
    // Find Retailer
    // -------------------------------------------------

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
          message: "Retailer not found.",
        },
        {
          status: 404,
        }
      );

    }

    // -------------------------------------------------
    // Order Preferences
    // -------------------------------------------------

    const {
      data: preferences,
    } = await supabase

      .from(
        "retailer_order_preferences"
      )

      .select("*")

      .eq(
        "retailer_id",
        retailer.id
      )

      .maybeSingle();
          // -------------------------------------------------
    // Latest Delivered Order
    // -------------------------------------------------

    const {
      data: lastDeliveredOrder,
    } = await supabase

      .from("orders")

      .select("*")

      .eq("mobile", mobile)

      .in("status", [
        "delivered",
        "completed",
      ])

      .order(
        "delivered_at",
        {
          ascending: false,
        }
      )

      .limit(1)

      .maybeSingle();

    // -------------------------------------------------
    // Active Order
    // -------------------------------------------------

    const {
      data: activeOrder,
    } = await supabase

      .from("orders")

      .select("*")

      .eq("mobile", mobile)

      .in("status", [
        "new",
        "confirmed",
        "allocated",
        "preparing",
        "vehicle_assigned",
        "out_for_delivery",
      ])

      .order(
        "created_at",
        {
          ascending: false,
        }
      )

      .limit(1)

      .maybeSingle();

    const repeatAvailable =
      !!lastDeliveredOrder &&
      !activeOrder;

    return NextResponse.json({

      success: true,

      retailer: {

        id: retailer.id,

        shopName:
          retailer.shop_name,

        ownerName:
          retailer.owner_name,

      },

      preferences:
        preferences,

      repeatOrder: repeatAvailable
        ? {

            available: true,

            orderId:
              lastDeliveredOrder.id,

            orderNumber:
              lastDeliveredOrder.order_number,

            deliveryDate:
              lastDeliveredOrder.delivery_date,

            deliveredAt:
              lastDeliveredOrder.delivered_at,

            weight:
              lastDeliveredOrder.actual_weight ??
              lastDeliveredOrder.requested_weight,

            birds:
              preferences
                ?.expected_birds ?? 0,

            rate:
              lastDeliveredOrder.rate_per_kg,

            estimatedAmount:
              lastDeliveredOrder.final_amount ??
              lastDeliveredOrder.estimated_amount,

          }
        : {

            available: false,

          },

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