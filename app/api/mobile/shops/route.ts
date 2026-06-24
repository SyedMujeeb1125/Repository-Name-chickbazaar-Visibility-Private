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

  const shops =
  db.retailerLocations.filter(
    (s: any) =>
      s.retailerMobile === mobile
  );

  return NextResponse.json(
    shops
  );
}