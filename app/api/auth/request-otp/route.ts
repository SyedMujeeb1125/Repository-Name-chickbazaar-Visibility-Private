import { NextResponse } from "next/server";
import { createOtpCode, storeOtp } from "@/lib/otp";

export async function POST(request: Request) {
  const formData = await request.formData();
  const mobile = String(formData.get("mobile") || "").trim();

  if (!/^[0-9]{10}$/.test(mobile)) {
    return NextResponse.json({ message: "Enter a valid 10 digit mobile number." }, { status: 400 });
  }

  const code = createOtpCode();
  await storeOtp(mobile, code);

  // Wire a real SMS provider here. In development, returning the OTP makes testing simple.
  return NextResponse.json({
    message: "OTP generated.",
    devOtp: process.env.NODE_ENV === "production" ? undefined : code
  });
}
