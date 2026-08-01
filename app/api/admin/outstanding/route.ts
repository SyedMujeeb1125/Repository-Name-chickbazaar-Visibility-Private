import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const retailerId = searchParams.get("retailer");

    if (!retailerId) {
      return NextResponse.json({
        outstanding: 0,
      });
    }

    const {
      data: ledger,
      error,
    } = await supabaseAdmin
      .from("retailer_ledger")
      .select("debit, credit")
      .eq("retailer_id", retailerId);

    if (error) {
      console.error(
        "[RETAILER_OUTSTANDING]",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }

    const outstanding =
      (ledger ?? []).reduce(
        (total, entry) =>
          total +
          Number(entry.debit ?? 0) -
          Number(entry.credit ?? 0),
        0
      );

    return NextResponse.json({
      outstanding,
    });
  } catch (error) {
    console.error(
      "[RETAILER_OUTSTANDING]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}