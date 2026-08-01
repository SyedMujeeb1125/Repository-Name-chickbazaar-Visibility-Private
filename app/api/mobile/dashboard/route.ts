import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

import {
  BusinessPhase,
  getBusinessPhase,
  getBusinessDeliveryDate,
  isStandardBookingOpen,
  isExpressOrderingOpen,
} from "@/lib/businessPhase";

import { STANDARD_DELIVERY_SLOTS } from "@/lib/deliverySlots";

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

    case "delivered":
      return "DELIVERED";

    case "cancelled":
      return "CANCELLED";

    default:
      return "NO_ORDER";
  }
}

export async function GET(request: Request) {
  try {
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

    // -----------------------------
    // Fetch retailer
    // -----------------------------

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

    // -----------------------------
    // Fetch orders
    // -----------------------------

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

    // -----------------------------
    // Ledger
    // -----------------------------

    const { data: ledger } = await supabase
      .from("retailer_ledger")
      .select("debit,credit")
      .eq("retailer_id", retailer.id);

    const totalDebit = (ledger || []).reduce(
      (sum: number, row: any) =>
        sum + Number(row.debit || 0),
      0
    );

    const totalCredit = (ledger || []).reduce(
      (sum: number, row: any) =>
        sum + Number(row.credit || 0),
      0
    );

    const outstanding = Math.max(
      totalDebit - totalCredit,
      0
    );

    // -----------------------------
    // Live Rate
    // -----------------------------

    const { data: rate } = await supabase
      .from("daily_rates")
      .select("rate")
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .single();

    const pendingOrders = (orders || []).filter(
      (order: any) =>
        !["delivered", "cancelled"].includes(
          order.status
        )
    );

    const now = new Date();

const businessPhase = getBusinessPhase(now);

const businessDeliveryDate =
  getBusinessDeliveryDate(now);

const businessDeliveryDateString =
  businessDeliveryDate
    .toISOString()
    .split("T")[0];

const standardBookingOpen =
  isStandardBookingOpen(now);

const expressOrderingOpen =
  isExpressOrderingOpen(now);

    const activeStatuses = [
  "new",
  "confirmed",
  "allocated",
  "preparing",
  "vehicle_assigned",
  "out_for_delivery",
];

const currentDelivery =
  (orders || []).find(
    (order: any) =>
      activeStatuses.includes(order.status) &&
      order.delivery_date === businessDeliveryDateString
  ) ?? null;

    const deliveredOrder =
  (orders || []).find(
    (order: any) =>
      order.status === "delivered" &&
      order.delivery_date ===
        businessDeliveryDateString
  ) ?? null;

    

  const dashboardState = getDashboardState(
  currentDelivery,
  outstanding,
  false
);

const additionalOrderAllowed =
  expressOrderingOpen &&
  !!deliveredOrder &&
  outstanding === 0;

const invoiceAvailable =
  !!deliveredOrder &&
  outstanding === 0;

const tomorrowRatePublished =
  standardBookingOpen;

      return NextResponse.json({
      success: true,

      business: {
  phase: businessPhase,

  businessDeliveryDate:
    businessDeliveryDateString,

  tomorrowRatePublished,

  standardBookingOpen,

  expressOrderingOpen,

  additionalOrderAllowed,

  invoiceAvailable,

  orderLabel:
    standardBookingOpen
      ? "Tomorrow's Order"
      : "Today's Order",

  availableSlots:
    standardBookingOpen
      ? STANDARD_DELIVERY_SLOTS
      : [],
},

      dashboardState,

      shopName:
        retailer.shop_name ??
        retailer.shopName ??
        "",

      todayRate: Number(rate?.rate ?? 0),

      totalOrders: orders?.length ?? 0,

      pendingOrders: pendingOrders.length,

      outstanding,

      currentDelivery: currentDelivery
        ? {
            orderNumber:
              currentDelivery.order_number,

            status:
              currentDelivery.status,

            displayStatus:
              getDisplayStatus(
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

            requestedWeight: Number(
              currentDelivery.requested_weight ?? 0
            ),

            estimatedAmount: Number(
              currentDelivery.estimated_amount ?? 0
            ),

            deliveryDate:
  currentDelivery.delivery_date,

paymentStatus:
  currentDelivery.payment_status,

balanceDue: Number(
  currentDelivery.balance_due ?? 0
),

deliverySlot:
  currentDelivery.delivery_slot ??
  null,
          }
        : null,

        deliveredOrder: deliveredOrder
  ? {
      orderNumber:
        deliveredOrder.order_number,

      actualWeight: Number(
        deliveredOrder.actual_weight ?? 0
      ),

      finalAmount: Number(
        deliveredOrder.final_amount ??
          deliveredOrder.estimated_amount ??
          0
      ),

      paymentStatus:
        deliveredOrder.payment_status,

      balanceDue: Number(
        deliveredOrder.balance_due ?? 0
      ),

      deliveredAt:
        deliveredOrder.delivered_at,
    }
  : null,

      repeatOrder: {
  available: false,
},

      recentOrders: (orders ?? [])
        .slice(0, 5)
        .map((order: any) => ({
          id: order.id,
          orderNumber: order.order_number,
          status: order.status,
          displayStatus: getDisplayStatus(
            order.status
          ),
          requestedWeight:
            Number(order.requested_weight ?? 0),
          estimatedAmount:
            Number(order.estimated_amount ?? 0),
          finalAmount:
            Number(order.final_amount ?? 0),
          deliveryDate:
            order.delivery_date,
            paymentStatus:
  order.payment_status,

balanceDue:
  Number(order.balance_due ?? 0),
          createdAt:
            order.created_at,
        })),
    });
  } catch (error: any) {
    console.error(
      "[DASHBOARD]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ??
          "Unable to load dashboard.",
      },
      {
        status: 500,
      }
    );
  }
}