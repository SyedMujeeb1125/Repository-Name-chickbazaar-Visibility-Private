import { NextResponse } from "next/server";
import {
  createSignedToken,
} from "@/lib/auth";
import { verifyOtp } from "@/lib/otp";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const mobile = String(body?.mobile || "").trim();
    const otp = String(body?.otp || "").trim();

    if (!/^[0-9]{10}$/.test(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter a valid 10 digit mobile number.",
        },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter a valid 6 digit OTP.",
        },
        { status: 400 }
      );
    }

    const verified = await verifyOtp(mobile, otp);

    if (!verified) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired OTP.",
        },
        { status: 401 }
      );
    }

    const { data: retailer, error } = await supabase
      .from("retailers")
      .select("*")
      .eq("mobile", mobile)
      .maybeSingle();

    if (error) {
      console.error(
        "[MOBILE_AUTH][RETAILER_LOOKUP]",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to load retailer account.",
        },
        { status: 500 }
      );
    }

    if (!retailer) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No retailer account found for this mobile number. Please register first.",
        },
        { status: 404 }
      );
    }

    const accessToken = createSignedToken(mobile);

    return NextResponse.json({
      success: true,
      message: "Login successful.",
      accessToken,
      retailer,
    });
  } catch (error) {
    console.error("[MOBILE_AUTH][VERIFY_OTP]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}