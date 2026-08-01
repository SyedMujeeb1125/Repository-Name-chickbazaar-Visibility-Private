import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const formData = await request.formData();

    const retailerId = String(
      formData.get("retailerId") ?? ""
    ).trim();

    const orderId =
      String(
        formData.get("orderId") ?? ""
      ).trim() || null;

    const debit = Number(
      formData.get("debit") ?? 0
    );

    const credit = Number(
      formData.get("credit") ?? 0
    );

    const remarks = String(
      formData.get("remarks") ?? ""
    ).trim();

    if (!retailerId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Retailer is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (debit < 0 || credit < 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Debit and credit cannot be negative.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("retailer_ledger")
      .insert({
        retailer_id: retailerId,
        order_id: orderId,
        debit,
        credit,
        remarks,
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error(
        "[RETAILER_LEDGER][INSERT]",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Ledger entry created successfully.",
      data,
    });
  } catch (error) {
    console.error(
      "[RETAILER_LEDGER]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}