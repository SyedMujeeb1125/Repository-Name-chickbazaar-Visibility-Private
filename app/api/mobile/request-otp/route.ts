import { NextResponse } from "next/server";
import { createOtpCode, storeOtp } from "@/lib/otp";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const mobile = String(body?.mobile || "").trim();

    if (!/^[0-9]{10}$/.test(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter a valid 10 digit mobile number.",
        },
        { status: 400 }
      );
    }

    const rateLimit = await checkRateLimit({
      key: mobile,
      action: "mobile-otp-request",
      maxRequests: 3,
      windowMinutes: 10,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many OTP requests. Please try again after a few minutes.",
          retryAfter: rateLimit.retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.retryAfter.toString(),
          },
        }
      );
    }

    const code = createOtpCode();

    await storeOtp(mobile, code);

    console.info(`[MOBILE_AUTH] OTP generated for ${mobile}`);

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully.",
      remainingRequests: rateLimit.remaining,

      ...(process.env.NODE_ENV !== "production"
        ? {
            devOtp: code,
          }
        : {}),
    });
  } catch (error) {
    console.error("[MOBILE_AUTH][REQUEST_OTP]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}