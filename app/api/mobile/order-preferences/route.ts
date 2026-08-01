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

    // ---------------------------------------
    // Retailer
    // ---------------------------------------

    const {
      data: retailer,
      error: retailerError,
    } = await supabase
      .from("retailers")
      .select("*")
      .eq("mobile", mobile)
      .maybeSingle();

    if (retailerError) {

      console.error(
        "[REPEAT_ORDER][RETAILER]",
        retailerError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to fetch retailer.",
        },
        {
          status: 500,
        }
      );
    }

    if (!retailer) {
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

    // ---------------------------------------
    // Order Preferences
    // ---------------------------------------

    const {
      data: preferences,
      error: preferenceError,
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

    if (preferenceError) {
      console.error(
        "[REPEAT_ORDER][PREFERENCES]",
        preferenceError
      );
    }

    // ---------------------------------------
    // Latest Delivered Order
    // ---------------------------------------

    const {
      data: lastDeliveredOrder,
      error: deliveredError,
    } = await supabase
      .from("orders")
      .select("*")
      .eq("mobile", mobile)
      .eq("status", "delivered")
      .order(
        "delivered_at",
        {
          ascending: false,
        }
      )
      .limit(1)
      .maybeSingle();

    if (deliveredError) {
      console.error(
        "[REPEAT_ORDER][DELIVERED]",
        deliveredError
      );
    }

    // ---------------------------------------
    // Active Order
    // ---------------------------------------

    const {
      data: activeOrder,
      error: activeOrderError,
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

    if (activeOrderError) {
      console.error(
        "[REPEAT_ORDER][ACTIVE]",
        activeOrderError
      );
    }

    const repeatAvailable =
      Boolean(lastDeliveredOrder) &&
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
              Number(
                lastDeliveredOrder.actual_weight ??
                lastDeliveredOrder.requested_weight ??
                0
              ),

            birds:
              Number(
                preferences?.expected_birds ??
                0
              ),

            rate:
              Number(
                lastDeliveredOrder.rate_per_kg ??
                0
              ),

            estimatedAmount:
              Number(
                lastDeliveredOrder.final_amount ??
                lastDeliveredOrder.estimated_amount ??
                0
              ),
          }
        : {
            available: false,
          },
    });

  } catch (error) {

    console.error(
      "[REPEAT_ORDER]",
      error
    );

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