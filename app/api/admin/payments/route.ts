import { NextResponse } from "next/server";
import { recordRetailerPayment } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payment = await recordRetailerPayment({
      retailer_id: body.retailer_id,
      amount: Number(body.amount),
      remarks: body.remarks,
    });

    return NextResponse.json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}