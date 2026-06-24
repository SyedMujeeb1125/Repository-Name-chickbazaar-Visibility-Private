import { NextResponse } from "next/server";
import {
  getRetailerPayments,
  readDb,
} from "@/lib/storage";

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

  const retailer =
    db.retailers.find(
      (r: any) =>
        r.mobile === mobile
    );

  if (!retailer) {
    return NextResponse.json([]);
  }

  const payments =
    await getRetailerPayments(
      retailer.id
    );

  return NextResponse.json(
    payments
  );
}