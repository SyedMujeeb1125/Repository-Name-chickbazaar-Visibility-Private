import { NextResponse } from "next/server";
import {
  getRetailerOutstanding,
} from "@/lib/storage";

export async function GET(
  req: Request
) {
  const { searchParams } =
    new URL(req.url);

  const retailer =
    searchParams.get("retailer");

  if (!retailer) {
    return NextResponse.json({
      outstanding: 0,
    });
  }

  const result =
    await getRetailerOutstanding(
      retailer
    );

  return NextResponse.json(result);
}