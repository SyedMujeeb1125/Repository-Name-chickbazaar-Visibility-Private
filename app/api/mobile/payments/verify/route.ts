import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { paymentId } = body;

    if (!paymentId || typeof paymentId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Payment ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Mock verification.
    // Replace this block with Razorpay signature verification later.

    const verified = paymentId.startsWith("PAY");

    if (!verified) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          message: "Invalid payment.",
        },
        {
          status: 400,
        }
      );
    }

    console.info(
      `[PAYMENT] Payment verified: ${paymentId}`
    );

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId,
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
      {
        status: 500,
      }
    );
  }
}