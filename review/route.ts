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
    return NextResponse.json(null);
  }

  const db = await readDb();

  const retailer =
    db.retailers.find(
      (r: any) =>
        r.mobile === mobile
    );

  return NextResponse.json(
    retailer || null
  );
}