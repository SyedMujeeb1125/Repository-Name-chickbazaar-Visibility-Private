import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function getDisplayStatus(status: string) {
  switch (status) {
    case "new":
    case "confirmed":
      return "Order Confirmed";

    case "allocated":
      return "Farm Allocated";

    case "preparing":
      return "Preparing Order";

    case "vehicle_assigned":
      return "Vehicle Assigned";

    case "out_for_delivery":
      return "Out for Delivery";

    case "delivered":
      return "Delivered";

    case "cancelled":
      return "Cancelled";

    default:
      return status;
  }
}

function getDashboardState(
  currentDelivery: any,
  outstanding: number,
  repeatOrderAvailable: boolean
) {
  if (!currentDelivery) {
    if (outstanding > 0) {
      return "PAYMENT_PENDING";
    }

    if (repeatOrderAvailable) {
      return "REVIEW_TOMORROW";
    }

    return "NO_ORDER";
  }

  switch (currentDelivery.status) {
    case "new":
    case "confirmed":
      return "ORDER_CONFIRMED";

    case "allocated":
      return "FARM_ALLOCATED";

    case "preparing":
      return "PREPARING";

    case "vehicle_assigned":
      return "VEHICLE_ASSIGNED";

    case "out_for_delivery":
      return "OUT_FOR_DELIVERY";

    default:
      return "NO_ORDER";
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mobile = searchParams.get("mobile");

  if (!mobile) {
    return NextResponse.json(
      {
        success: false,
        message: "Mobile is required.",
      },
      {
        status: 400,
      }
    );
  }

  // --------------------------------------------------
  // Retailer
  // --------------------------------------------------

  const {
    data: retailer,
    error: retailerError,
  } = await supabase
    .from("retailers")
    .select("*")
    .eq("mobile", mobile)
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

  // --------------------------------------------------
  // Orders
  // --------------------------------------------------

  const {
    data: orders,
    error: ordersError,
  } = await supabase
    .from("orders")
    .select("*")
    .eq("mobile", mobile)
    .order("created_at", {
      ascending: false,
    });

  if (ordersError) {
    return NextResponse.json(
      {
        success: false,
        message: ordersError.message,
      },
      {
        status: 500,
      }
    );
  }

  const pendingOrders = (orders || []).filter(
    (order: any) =>
      !["delivered", "cancelled"].includes(order.status)
  );

  // --------------------------------------------------
  // Ledger
  // --------------------------------------------------

  const { data: ledger } = await supabase
    .from("retailer_ledger")
    .select("debit,credit")
    .eq("retailer_id", retailer.id);

  const totalDebit = (ledger || []).reduce(
    (sum: number, row: any) => sum + Number(row.debit || 0),
    0
  );

  const totalCredit = (ledger || []).reduce(
    (sum: number, row: any) => sum + Number(row.credit || 0),
    0
  );

  const outstanding = totalDebit - totalCredit;

  // --------------------------------------------------
  // Live Rate
  // --------------------------------------------------

  const { data: rate } = await supabase
    .from("daily_rates")
    .select("rate")
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .single();

  // --------------------------------------------------
  // Current Delivery
  // --------------------------------------------------

  const currentDelivery = (orders || []).find((order: any) =>
    [
      "new",
      "confirmed",
      "allocated",
      "preparing",
      "vehicle_assigned",
      "out_for_delivery",
    ].includes(order.status)
  );

  // --------------------------------------------------
  // Last Delivered Order
  // --------------------------------------------------

  const lastDeliveredOrder = (orders || []).find((order: any) =>
    order.status === "delivered"
  );

  // --------------------------------------------------
  // Repeat Order
  // --------------------------------------------------

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deliveredYesterday = lastDeliveredOrder?.delivered_at
    ? new Date(lastDeliveredOrder.delivered_at) < today
    : false;

  const repeatOrderAvailable =
    !!lastDeliveredOrder &&
    deliveredYesterday &&
    !currentDelivery;

  const dashboardState = getDashboardState(
    currentDelivery,
    outstanding,
    repeatOrderAvailable
  );

  return NextResponse.json({
    success: true,

    dashboardState,

    shopName:
      retailer.shop_name ??
      retailer.shopName ??
      "",

    todayRate: Number(rate?.rate || 0),

    totalOrders: orders?.length || 0,

    pendingOrders: pendingOrders.length,

    outstanding,

    currentDelivery: currentDelivery
      ? {
          orderNumber: currentDelivery.order_number,

          status: currentDelivery.status,

          displayStatus: getDisplayStatus(
            currentDelivery.status
          ),

          captain:
            currentDelivery.assigned_driver,

          vehicle:
            currentDelivery.assigned_vehicle,

          eta:
            currentDelivery.estimated_delivery_time ??
            currentDelivery.eta ??
            null,

          requestedWeight:
            currentDelivery.requested_weight,

          estimatedAmount:
            currentDelivery.estimated_amount,
        }
      : null,

    repeatOrder: repeatOrderAvailable
      ? {
          available: true,

          orderNumber:
            lastDeliveredOrder.order_number,

          weight: Number(
            lastDeliveredOrder.actual_weight ??
              lastDeliveredOrder.requested_weight ??
              0
          ),

          rate: Number(
            lastDeliveredOrder.rate_per_kg ?? 0
          ),

          amount: Number(
            lastDeliveredOrder.final_amount ??
              lastDeliveredOrder.estimated_amount ??
              0
          ),

          deliveredAt:
            lastDeliveredOrder.delivered_at,
        }
      : {
          available: false,
        },

    recentOrders: (orders || []).slice(0, 5),
  });
}