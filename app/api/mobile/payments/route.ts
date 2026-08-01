import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request
) {
  try {

    const { searchParams } =
      new URL(request.url);

    const mobile =
      searchParams.get("mobile");

    if (!mobile) {
      return NextResponse.json([]);
    }

    // ---------------------------------
    // Find Retailer
    // ---------------------------------

    const {
      data: retailer,
      error: retailerError,
    } = await supabase
      .from("retailers")
      .select("id")
      .eq("mobile", mobile)
      .maybeSingle();

    if (retailerError) {

      console.error(
        "[PAYMENTS][RETAILER]",
        retailerError
      );

      return NextResponse.json(
        [],
        {
          status: 500,
        }
      );

    }

    if (!retailer) {
      return NextResponse.json([]);
    }

    // ---------------------------------
    // Fetch Payments
    // ---------------------------------

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
        "[PAYMENTS][GET]",
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

  } catch (error) {

    console.error(
      "[PAYMENTS][GET]",
      error
    );

    return NextResponse.json(
      [],
      {
        status: 500,
      }
    );
  }
}