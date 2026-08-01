import crypto from "crypto";
import { supabase } from "@/lib/supabase";

const OTP_EXPIRY_MINUTES = 10;
const MAX_FAILED_ATTEMPTS = 5;

function otpSecret() {
  const secret =
    process.env.OTP_SECRET || process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "OTP_SECRET (or ADMIN_SESSION_SECRET) environment variable is missing."
    );
  }

  return secret;
}

export function hashOtp(mobile: string, code: string) {
  return crypto
    .createHmac("sha256", otpSecret())
    .update(`${mobile}:${code}`)
    .digest("hex");
}

export function createOtpCode() {
  return crypto.randomInt(100000, 1000000).toString();
}

export async function storeOtp(mobile: string, code: string) {
  const now = new Date();
  const expiresAt = new Date(
    now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000
  );

  // Cleanup expired OTPs
  await supabase
    .from("otps")
    .delete()
    .lt("expires_at", now.toISOString());

  // Remove any existing OTP for this mobile
  await supabase
    .from("otps")
    .delete()
    .eq("mobile", mobile);

  const { error } = await supabase
    .from("otps")
    .insert({
      mobile,
      code_hash: hashOtp(mobile, code),
      failed_attempts: 0,
      created_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
    });

  if (error) {
    throw error;
  }
}

export async function verifyOtp(
  mobile: string,
  code: string
): Promise<boolean> {
  const now = new Date().toISOString();

  // Cleanup expired OTPs
  await supabase
    .from("otps")
    .delete()
    .lt("expires_at", now);

  const { data, error } = await supabase
    .from("otps")
    .select("*")
    .eq("mobile", mobile)
    .single();

  if (error || !data) {
    return false;
  }

  // Expired
  if (new Date(data.expires_at).getTime() < Date.now()) {
    await supabase
      .from("otps")
      .delete()
      .eq("mobile", mobile);

    return false;
  }

  // Too many failed attempts
  if ((data.failed_attempts ?? 0) >= MAX_FAILED_ATTEMPTS) {
    await supabase
      .from("otps")
      .delete()
      .eq("mobile", mobile);

    return false;
  }

  const expectedHash = hashOtp(mobile, code);

  const actualBuffer = Buffer.from(data.code_hash, "utf8");
  const expectedBuffer = Buffer.from(expectedHash, "utf8");

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  const isValid = crypto.timingSafeEqual(
    actualBuffer,
    expectedBuffer
  );

  if (!isValid) {
    await supabase
      .from("otps")
      .update({
        failed_attempts: (data.failed_attempts ?? 0) + 1,
      })
      .eq("mobile", mobile);

    return false;
  }

  // Success - OTP is single use
  await supabase
    .from("otps")
    .delete()
    .eq("mobile", mobile);

  return true;
}