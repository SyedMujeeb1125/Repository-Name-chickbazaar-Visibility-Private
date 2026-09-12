import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createSignedToken } from "@/lib/auth";
import { getMobileAuthenticatedRetailer } from "@/lib/retailer";
import { supabase } from "@/lib/supabase";

const ADVANCE_AMOUNT = 500;
const PAYMENT_REFERENCE_TTL_SECONDS = 15 * 60;

export async function POST(request: NextRequest) {
  try {
    const mobile = getMobileAuthenticatedRetailer(request);

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        { status: 401 }
      );
    }

    const {
      data: retailer,
      error: retailerError,
    } = await supabase
      .from("retailers")
      .select("id")
      .eq("mobile", mobile)
      .maybeSingle();

    if (retailerError) {
      console.error("[PAYMENT][RETAILER]", retailerError);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to verify retailer.",
        },
        { status: 500 }
      );
    }

    if (!retailer) {
      return NextResponse.json(
        {
          success: false,
          message: "Retailer not found.",
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const amount = Number(body.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment amount.",
        },
        { status: 400 }
      );
    }

    if (amount !== ADVANCE_AMOUNT) {
      return NextResponse.json(
        {
          success: false,
          message: `Advance amount must be ?${ADVANCE_AMOUNT}.`,
        },
        { status: 400 }
      );
    }

    const nonce = crypto.randomUUID();

    const paymentReference = createSignedToken(
      `payment:${retailer.id}:${amount}:${nonce}`,
      PAYMENT_REFERENCE_TTL_SECONDS
    );

    console.info(
      `[PAYMENT] Payment request created for retailer ${retailer.id}`
    );

    return NextResponse.json({
      success: true,
      paymentReference,
      paymentId: paymentReference,
      retailerId: retailer.id,
      amount,
      gateway: "mock",
      status: "created",
      message: "Payment request created successfully.",
    });
  } catch (error) {
    console.error("[PAYMENT][CREATE]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create payment request.",
      },
      { status: 500 }
    );
  }
}
