import { NextResponse } from "next/server";
import { getLoggedInRetailerMobile } from "@/lib/retailer";

export async function GET() {
  try {
    const mobile = await getLoggedInRetailerMobile();

    return NextResponse.json(
      {
        success: true,
        loggedIn: !!mobile,
        mobile,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("[AUTH][ME]", error);

    return NextResponse.json(
      {
        success: false,
        loggedIn: false,
        mobile: null,
        message: "Unable to verify session.",
      },
      {
        status: 500,
      }
    );
  }
}