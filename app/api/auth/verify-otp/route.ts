import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSignedToken, retailerCookieName, retailerCookieOptions } from "@/lib/auth";
import { verifyOtp } from "@/lib/otp";

export async function POST(request: Request) {
  const formData: any = await request.formData();
  const mobile = String(formData.get("mobile") || "").trim();
  const otp = String(formData.get("otp") || "").trim();

  if (!mobile || !otp) {
    return NextResponse.json({ message: "Mobile number and OTP are required." }, { status: 400 });
  }

  const ok = await verifyOtp(mobile, otp);
  if (!ok) {
    return NextResponse.json({ message: "Invalid or expired OTP." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(retailerCookieName, createSignedToken(mobile), retailerCookieOptions());
  return NextResponse.json({ message: "Logged in successfully." });
}
