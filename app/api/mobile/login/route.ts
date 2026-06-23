import { NextResponse } from "next/server";
import { readDb } from "@/lib/storage";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const mobile = String(
    body.mobile || ""
  );

  const db = await readDb();

  const retailer =
    db.retailers.find(
      (r: any) =>
        r.mobile === mobile
    );

  if (!retailer) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Retailer not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    success: true,
    retailer,
  });
}