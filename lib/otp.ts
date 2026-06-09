import crypto from "crypto";
import { supabase } from "@/lib/supabase";

function otpSecret() {
  return (
    process.env.OTP_SECRET ||
    process.env.ADMIN_SESSION_SECRET ||
    "change-otp-secret"
  );
}

export function hashOtp(mobile: string, code: string) {
  return crypto
    .createHmac("sha256", otpSecret())
    .update(`${mobile}:${code}`)
    .digest("hex");
}

export function createOtpCode() {
  return String(crypto.randomInt(100000, 999999));
}

export async function storeOtp(mobile: string, code: string) {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);

  await supabase
    .from("otps")
    .delete()
    .eq("mobile", mobile);

  const { error } = await supabase
    .from("otps")
    .insert({
      mobile,
      code_hash: hashOtp(mobile, code),
      created_at: now.toISOString(),
      expires_at: expiresAt.toISOString()
    });

  if (error) {
    throw error;
  }
}

export async function verifyOtp(mobile: string, code: string) {
  const { data, error } = await supabase
    .from("otps")
    .select("*")
    .eq("mobile", mobile)
    .single();

  if (error || !data) {
    return false;
  }

  if (new Date(data.expires_at).getTime() < Date.now()) {
    return false;
  }

  const expected = hashOtp(mobile, code);

  const ok = crypto.timingSafeEqual(
    Buffer.from(data.code_hash),
    Buffer.from(expected)
  );

  if (ok) {
    await supabase
      .from("otps")
      .delete()
      .eq("mobile", mobile);
  }

  return ok;
}