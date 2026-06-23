import { NextResponse } from "next/server";
import { readDb } from "@/lib/storage";

export async function GET(
  request: Request
) {
  const { searchParams } =
    new URL(request.url);

  const mobile =
    searchParams.get("mobile");

  if (!mobile) {
    return NextResponse.json([]);
  }

  const db = await readDb();

  const orders = db.orders
    .filter(
      (o: any) =>
        o.mobile === mobile
    )
    .sort(
      (a: any, b: any) =>
        new Date(
          b.createdAt
        ).getTime() -
        new Date(
          a.createdAt
        ).getTime()
    );

  return NextResponse.json(
    orders
  );
}