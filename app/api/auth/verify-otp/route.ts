import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createSignedToken,
  retailerCookieName,
  retailerCookieOptions,
} from "@/lib/auth";
import { verifyOtp } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const mobile = String(formData.get("mobile") || "").trim();
    const otp = String(formData.get("otp") || "").trim();

    // Validate mobile number
    if (!/^[0-9]{10}$/.test(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter a valid 10 digit mobile number.",
        },
        { status: 400 }
      );
    }

    // Validate OTP
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter a valid 6 digit OTP.",
        },
        { status: 400 }
      );
    }

    // Verify OTP
    const verified = await verifyOtp(mobile, otp);

    if (!verified) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired OTP.",
        },
        {
          status: 401,
        }
      );
    }

    // Create secure session
    const cookieStore = await cookies();

    cookieStore.set(
      retailerCookieName,
      createSignedToken(mobile),
      retailerCookieOptions()
    );

    console.info(`[AUTH] Login successful for ${mobile}`);

    return NextResponse.json({
      success: true,
      message: "Logged in successfully.",
      mobile,
    });
  } catch (error) {
    console.error("[AUTH][VERIFY_OTP]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}