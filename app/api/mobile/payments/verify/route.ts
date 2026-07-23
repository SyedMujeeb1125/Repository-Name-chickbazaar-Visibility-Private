import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("================================");
    console.log("MOBILE PAYMENT VERIFY");
    console.log(body);
    console.log("================================");

    const { paymentId } = body;

    if (!paymentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment ID is required.",
        },
        { status: 400 }
      );
    }

    // Mock verification for now.
    // Later this will be replaced with Razorpay signature verification.

    return NextResponse.json({
      success: true,
      verified: true,
      paymentId,
      message: "Payment verified successfully.",
    });

  } catch (error: any) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ??
          "Payment verification failed.",
      },
      { status: 500 }
    );

  }
}