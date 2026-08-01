import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const mobile =
      request.nextUrl.searchParams.get("mobile");

    if (!mobile) {
      return NextResponse.json(
        {
          error: "Mobile number is required",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data: retailer,
      error,
    } = await supabase
      .from("retailers")
      .select(
        "credit_limit, available_credit, credit_category"
      )
      .eq("mobile", mobile)
      .maybeSingle();

    if (error) {
      console.error("[OUTSTANDING]", error);

      return NextResponse.json(
        {
          error: "Unable to fetch retailer.",
        },
        {
          status: 500,
        }
      );
    }

    if (!retailer) {
      return NextResponse.json(
        {
          error: "Retailer not found",
        },
        {
          status: 404,
        }
      );
    }

    const creditLimit = Number(
      retailer.credit_limit ?? 0
    );

    const availableCredit = Number(
      retailer.available_credit ?? 0
    );

    const outstanding = Math.max(
      creditLimit - availableCredit,
      0
    );

    return NextResponse.json({
      creditLimit,
      availableCredit,
      outstanding,
      creditCategory:
        retailer.credit_category ?? "NEW",

      // Placeholder until ledger transactions are integrated
      transactions: [],
    });
  } catch (error) {
    console.error("[OUTSTANDING]", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}