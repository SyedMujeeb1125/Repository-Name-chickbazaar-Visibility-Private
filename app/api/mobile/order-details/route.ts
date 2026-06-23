import { NextResponse } from "next/server";
import { readDb } from "@/lib/storage";

export async function GET(
  request: Request
) {
  const { searchParams } =
    new URL(request.url);

  const orderId =
    searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(null);
  }

  const db = await readDb();

  const order =
    db.orders.find(
      (o: any) =>
        o.id === orderId
    );

  return NextResponse.json(
    order || null
  );
}