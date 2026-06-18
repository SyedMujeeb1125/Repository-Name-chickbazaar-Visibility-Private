import { NextResponse } from "next/server";
import {
  getOrderStatusHistory
} from "@/lib/storage";

export async function GET(
  request: Request
) {
  const { searchParams } =
    new URL(request.url);

  const orderId =
    searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json([]);
  }

  const history =
    await getOrderStatusHistory(
      orderId
    );

  return NextResponse.json(history);
}