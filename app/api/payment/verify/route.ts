import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { message: "Missing payment details" },
        { status: 400 }
      );
    }

    const secret =
      process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return NextResponse.json(
        { message: "Razorpay secret missing" },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    const verified =
      expectedSignature === razorpay_signature;

    return NextResponse.json({
      verified
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Verification failed" },
      { status: 500 }
    );
  }
}