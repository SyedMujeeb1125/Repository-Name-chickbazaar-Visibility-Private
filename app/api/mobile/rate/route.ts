import { NextResponse } from "next/server";
import { getTodayRate } from "@/lib/storage";

export async function GET() {
  try {
    const rate = await getTodayRate();

    return NextResponse.json({
      rate: Number(rate?.rate || 0),
      date: rate?.created_at || null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        rate: 0,
      },
      {
        status: 500,
      }
    );
  }
}