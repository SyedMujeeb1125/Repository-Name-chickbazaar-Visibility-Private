import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } =
    new URL(request.url);

  const mobile =
    searchParams.get("mobile");

  if (!mobile) {
    return NextResponse.json(
      { message: "Mobile is required." },
      { status: 400 }
    );
  }

  // Retailer

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
        message:
          "Retailer not found.",
      },
      { status: 404 }
    );
  }

  // Orders

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
        message:
          ordersError.message,
      },
      { status: 500 }
    );
  }

  const pendingOrders =
    (orders || []).filter(
      (o: any) =>
        ![
          "delivered",
          "completed",
          "cancelled",
        ].includes(o.status)
    );

  // Outstanding

  const {
    data: ledger,
  } = await supabase
    .from("retailer_ledger")
    .select("debit,credit")
    .eq(
      "retailer_id",
      retailer.id
    );

  const totalDebit =
    (ledger || []).reduce(
      (sum: number, row: any) =>
        sum +
        Number(row.debit || 0),
      0
    );

  const totalCredit =
    (ledger || []).reduce(
      (sum: number, row: any) =>
        sum +
        Number(row.credit || 0),
      0
    );

  // Today's Rate

  const {
    data: rate,
  } = await supabase
    .from("daily_rates")
    .select("rate")
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .single();

    const currentDelivery =
  (orders || []).find((order: any) =>
    [
      "new",
      "confirmed",
      "allocated",
      "preparing",
      "vehicle_assigned",
      "out_for_delivery",
    ].includes(order.status)
  );

  // -------------------------------------
// Last Delivered Order
// -------------------------------------

const lastDeliveredOrder =
  (orders || []).find((order: any) =>
    [
      "delivered",
      "completed",
    ].includes(order.status)
  );

// -------------------------------------
// Repeat Order Availability
// -------------------------------------

const today = new Date();

today.setHours(0, 0, 0, 0);

const deliveredYesterday =
  lastDeliveredOrder?.delivered_at
    ? new Date(
        lastDeliveredOrder.delivered_at
      ) < today
    : false;

const repeatOrderAvailable =
  !!lastDeliveredOrder &&
  deliveredYesterday &&
  !currentDelivery;

  // -------------------------------------
// Retailer Account
// -------------------------------------

const latestOrder = orders?.[0];

const currentBill = Number(
  latestOrder?.final_bill_amount ??
  latestOrder?.final_amount ??
  0
);

const advancePaid = Number(
  latestOrder?.advance_amount ?? 0
);

const cashReceived = Number(
  latestOrder?.cash_received ?? 0
);

const upiReceived = Number(
  latestOrder?.upi_received ?? 0
);

const totalPaid = Number(
  latestOrder?.total_paid ??
  cashReceived +
  upiReceived +
  advancePaid
);

const balanceDue = Math.max(
  currentBill - totalPaid,
  0
);

let accountStatus = "Ready to Order";

if (latestOrder) {

  if (
    latestOrder.advance_payment_status === "paid" &&
    currentBill === 0
  ) {

    accountStatus = "Advance Received";

  } else if (
    currentBill > 0 &&
    balanceDue > 0
  ) {

    accountStatus = "Payment Pending";

  } else if (
    currentBill > 0 &&
    balanceDue <= 0
  ) {

    accountStatus = "Paid";

  }

}

  return NextResponse.json({
    shopName:
      retailer.shop_name ??
      retailer.shopName ??
      "",

    todayRate:
      Number(rate?.rate || 0),

    totalOrders:
      orders?.length || 0,

    pendingOrders:
      pendingOrders.length,

    availableCredit:
      Number(
        retailer.available_credit ||
          0
      ),

    creditLimit:
      Number(
        retailer.credit_limit ||
          0
      ),

    outstanding:
      totalDebit -
      totalCredit,

      currentDelivery: currentDelivery
  ? {
      orderNumber:
        currentDelivery.order_number,

      status:
  currentDelivery.status === "new"
    ? "Order Confirmed"
    : currentDelivery.status === "confirmed"
    ? "Order Confirmed"
    : currentDelivery.status === "allocated"
    ? "Farm Allocated"
    : currentDelivery.status === "preparing"
    ? "Preparing Order"
    : currentDelivery.status === "vehicle_assigned"
    ? "Vehicle Assigned"
    : currentDelivery.status === "out_for_delivery"
    ? "Out for Delivery"
    : currentDelivery.status,

      captain:
        currentDelivery.assigned_driver,

      vehicle:
        currentDelivery.assigned_vehicle,

      eta: "Calculating...",

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
        lastDeliveredOrder.rate_per_kg ??
        0
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

    account: {

  currentBill,

  advancePaid,

  cashReceived,

  upiReceived,

  amountPaid:
    totalPaid,

  balanceDue,

  paymentMethod:
    "Advance + Final Payment",

  status:
    accountStatus,

},

    recentOrders:
      (orders || []).slice(
        0,
        5
      ),
  });
}