import { NextResponse } from "next/server";
import { createOtpCode, storeOtp } from "@/lib/otp";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const mobile = String(formData.get("mobile") || "").trim();

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

    // Rate limit OTP requests
    const rateLimit = await checkRateLimit({
      key: mobile,
      action: "otp-request",
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

    // Generate OTP
    const code = createOtpCode();

    // Store OTP
    await storeOtp(mobile, code);

    console.info(`[AUTH] OTP generated for ${mobile}`);

    return NextResponse.json({
      success: true,
      message: "OTP generated successfully.",
      remainingRequests: rateLimit.remaining,

      // Only expose OTP in development
      ...(process.env.NODE_ENV !== "production"
        ? {
            devOtp: code,
          }
        : {}),
    });
  } catch (error) {
    console.error("[AUTH][REQUEST_OTP]", error);

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