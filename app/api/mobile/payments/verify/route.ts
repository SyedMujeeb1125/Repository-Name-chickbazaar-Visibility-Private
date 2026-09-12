import { NextRequest, NextResponse } from "next/server";
import { verifySignedToken } from "@/lib/auth";
import { getMobileAuthenticatedRetailer } from "@/lib/retailer";
import { supabase } from "@/lib/supabase";

const ADVANCE_AMOUNT = 500;

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
    const paymentId = body.paymentId;

    if (!paymentId || typeof paymentId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Payment ID is required.",
        },
        { status: 400 }
      );
    }

    const subject = verifySignedToken(paymentId);

    if (!subject) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          message: "Invalid or expired payment.",
        },
        { status: 400 }
      );
    }

    const parts = subject.split(":");

    if (
      parts.length !== 4 ||
      parts[0] !== "payment"
    ) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          message: "Invalid payment reference.",
        },
        { status: 400 }
      );
    }

    const [, paymentRetailerId, amountText] = parts;
    const amount = Number(amountText);

    if (
      paymentRetailerId !== retailer.id ||
      !Number.isFinite(amount) ||
      amount !== ADVANCE_AMOUNT
    ) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          message: "Payment does not belong to this retailer.",
        },
        { status: 403 }
      );
    }

    console.info(
      `[PAYMENT] Mock payment verified for retailer ${retailer.id}`
    );

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId,
      amount,
      gateway: "mock",
      message: "Payment verified successfully.",
    });
  } catch (error) {
    console.error("[PAYMENT][VERIFY]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Payment verification failed.",
      },
      { status: 500 }
    );
  }
}
