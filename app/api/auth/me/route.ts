import { NextResponse } from "next/server";
import { getLoggedInRetailerMobile } from "@/lib/retailer";

export async function GET() {
  const mobile = await getLoggedInRetailerMobile();

  return NextResponse.json({
    loggedIn: !!mobile,
    mobile
  });
}