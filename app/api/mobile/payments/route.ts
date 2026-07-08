import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request
) {
  const { searchParams } =
    new URL(request.url);

  const mobile =
    searchParams.get("mobile");

  if (!mobile) {
    return NextResponse.json([]);
  }

  // Find retailer

  const {
    data: retailer,
    error: retailerError,
  } = await supabase
    .from("retailers")
    .select("id")
    .eq("mobile", mobile)
    .single();

  if (retailerError || !retailer) {
    return NextResponse.json([]);
  }

  // Fetch payments

  const {
    data: payments,
    error: paymentsError,
  } = await supabase
    .from("retailer_ledger")
    .select("*")
    .eq(
      "retailer_id",
      retailer.id
    )
    .order("created_at", {
      ascending: false,
    });

  if (paymentsError) {
    console.error(
      "Payments fetch error:",
      paymentsError
    );

    return NextResponse.json(
      [],
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    payments ?? []
  );
}