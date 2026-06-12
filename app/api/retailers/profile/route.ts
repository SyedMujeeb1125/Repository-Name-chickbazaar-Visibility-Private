import { NextResponse } from "next/server";
import { getLoggedInRetailerMobile } from "@/lib/retailer";
import { readDb } from "@/lib/storage";

export async function GET() {
  const mobile = await getLoggedInRetailerMobile();

  if (!mobile) {
    return NextResponse.json(
      { message: "Not logged in" },
      { status: 401 }
    );
  }

  const db = await readDb();

  const retailer = db.retailers.find(
    (r: any) => r.mobile === mobile
  );

  return NextResponse.json(retailer || null);
}