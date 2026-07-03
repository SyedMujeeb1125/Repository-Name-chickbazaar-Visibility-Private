import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const mobile =
      request.nextUrl.searchParams.get("mobile");

    if (!mobile) {
      return NextResponse.json(
        { error: "Mobile number is required" },
        { status: 400 }
      );
    }

    const { data: retailer, error } =
      await supabase
        .from("retailers")
        .select(
          "credit_limit, available_credit, credit_category"
        )
        .eq("mobile", mobile)
        .single();

    if (error || !retailer) {
      return NextResponse.json(
        { error: "Retailer not found" },
        { status: 404 }
      );
    }

    const creditLimit =
      Number(retailer.credit_limit || 0);

    const availableCredit =
      Number(retailer.available_credit || 0);

    const outstanding =
      creditLimit - availableCredit;

    return NextResponse.json({
      creditLimit,
      availableCredit,
      outstanding,
      creditCategory:
        retailer.credit_category || "NEW",

      transactions: [],
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );

  }
}