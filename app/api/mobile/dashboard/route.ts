import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getMobileAuthenticatedRetailer } from "@/lib/retailer";

import {
  getBusinessPhase,
  getBusinessDeliveryDate,
} from "@/lib/business/businessEngine";

import { BusinessPhase } from "@/lib/types/business";

import {
  getTodayRate,
  getTomorrowRate,
  getPreviousPublishedRate,
} from "@/lib/rate-service";

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
  const mobile = getMobileAuthenticatedRetailer(request);

  if (!mobile) {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication required.",
      },
      {
        status: 401,
      }
    );
  }

  try {
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
    // Canonical Business Summary
    // -----------------------------
    // Business-level payment totals come from
    // the retailer ledger, not legacy credit fields
    // or inconsistent historical order fields.
    const totalPaid = Math.max(
      totalCredit,
      0
    );

    // Purchased quantity represents chicken that
    // was actually delivered/completed. Requested
    // weight is not counted as purchased until delivery.
    const purchasedKg = (orders ?? []).reduce(
      (sum: number, order: any) => {
        const status = String(
          order.status ?? ''
        ).toLowerCase();

        if (
          status !== 'delivered' &&
          status !== 'completed'
        ) {
          return sum;
        }

        return (
          sum +
          Math.max(
            Number(order.actual_weight ?? 0),
            0
          )
        );
      },
      0
    );

    const businessSummary = {
      outstandingBalance: outstanding,
      totalOrders: orders?.length ?? 0,
      purchasedKg,
      totalPaid,
    };

    // -----------------------------
    // Live Rate + Business Phase
    // -----------------------------

    const now = new Date();

    const businessPhase =
      getBusinessPhase(now);

    const todayRateRecord =
      await getTodayRate(now);

    
    const yesterdayRateRecord =
      await getPreviousPublishedRate(now);
const tomorrowRateRecord =
      await getTomorrowRate(now);

    const todayRate =
      Number(todayRateRecord?.rate ?? 0);

    
    const yesterdayRate =
      Number(yesterdayRateRecord?.rate ?? 0);
const tomorrowRate =
      Number(tomorrowRateRecord?.rate ?? 0);

    const tomorrowRatePublished =
      businessPhase === BusinessPhase.BOOKING &&
      tomorrowRate > 0;

    const tomorrowBookingOpen =
      businessPhase === BusinessPhase.BOOKING;

    const standardDeliveryOpen =
      businessPhase === BusinessPhase.STANDARD_DELIVERY;

    const expressOrderingOpen =
      businessPhase === BusinessPhase.EXPRESS_DELIVERY;

    const orderingOpen =
      tomorrowBookingOpen ||
      standardDeliveryOpen ||
      expressOrderingOpen;

    const businessDeliveryDate =
      getBusinessDeliveryDate(now);

    const businessDeliveryDateString =
      businessDeliveryDate
        .toISOString()
        .split("T")[0];

    const visibleRate =
      businessPhase === BusinessPhase.BOOKING
        ? tomorrowRate
        : todayRate;

    const pendingOrders = (orders || []).filter(
      (order: any) =>
        !["delivered", "cancelled"].includes(
          order.status
        )
    );

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

      return NextResponse.json({
      success: true,

      business: {
  phase: businessPhase,

  businessDeliveryDate:
    businessDeliveryDateString,

  tomorrowRatePublished,

  tomorrowBookingOpen,

  standardDeliveryOpen,

  expressOrderingOpen,

  orderingOpen,

  additionalOrderAllowed,

  invoiceAvailable,

  orderLabel:
    tomorrowBookingOpen
      ? "Tomorrow's Order"
      : expressOrderingOpen
        ? "Today's Express Order"
        : standardDeliveryOpen
          ? "Today's Order"
          : "Ordering Closed",

  availableSlots:
    tomorrowBookingOpen ||
    standardDeliveryOpen
      ? STANDARD_DELIVERY_SLOTS
      : [],
},

      dashboardState,

      shopName:
        retailer.shop_name ??
        retailer.shopName ??
        "",

      todayRate: todayRate,

      tomorrowRate:
        tomorrowRatePublished
          ? tomorrowRate
          : null,

      visibleRate: visibleRate,

      
      rates: {
        today: todayRate,
        yesterday: yesterdayRate > 0 ? yesterdayRate : null,
        tomorrow: tomorrowRatePublished ? tomorrowRate : null,
      },

      totalOrders: orders?.length ?? 0,

      pendingOrders: pendingOrders.length,

      outstanding,

      businessSummary,

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

