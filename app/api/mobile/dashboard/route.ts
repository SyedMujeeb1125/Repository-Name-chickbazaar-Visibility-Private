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

    recentOrders:
      (orders || []).slice(
        0,
        5
      ),
  });
}