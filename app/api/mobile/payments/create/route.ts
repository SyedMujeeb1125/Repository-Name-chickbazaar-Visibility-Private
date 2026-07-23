import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("================================");
    console.log("MOBILE PAYMENT CREATE");
    console.log(body);
    console.log("================================");

    const {
      retailerId,
      amount,
      orderData,
    } = body;

    if (!retailerId) {
      return NextResponse.json(
        {
          success: false,
          message: "Retailer ID is required.",
        },
        { status: 400 }
      );
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment amount.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      paymentReference:
        "PAYREQ_" + Date.now(),
      retailerId,
      amount,
      orderData,
      message: "Payment request created.",
    });

  } catch (error: any) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ??
          "Unable to create payment.",
      },
      { status: 500 }
    );

  }
}