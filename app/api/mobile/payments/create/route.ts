import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const ADVANCE_AMOUNT = 500;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      retailerId,
      amount,
      orderData,
    } = body;

    if (!retailerId || typeof retailerId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Retailer ID is required.",
        },
        { status: 400 }
      );
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment amount.",
        },
        { status: 400 }
      );
    }

    // During mock mode we only accept the configured advance amount.
    if (amount !== ADVANCE_AMOUNT) {
      return NextResponse.json(
        {
          success: false,
          message: `Advance amount must be ₹${ADVANCE_AMOUNT}.`,
        },
        { status: 400 }
      );
    }

    const paymentReference = `PAYREQ_${crypto.randomUUID()}`;

    console.info(
      `[PAYMENT] Payment request created: ${paymentReference}`
    );

    return NextResponse.json({
      success: true,
      paymentReference,
      retailerId,
      amount,
      orderData,
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
      {
        status: 500,
      }
    );
  }
}