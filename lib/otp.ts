import crypto from "crypto";
import { readDb, writeDb } from "@/lib/storage";

function otpSecret() {
  return process.env.OTP_SECRET || process.env.ADMIN_SESSION_SECRET || "change-otp-secret";
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
  const db = await readDb();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);
  db.otps = db.otps.filter((otp) => otp.mobile !== mobile);
  db.otps.push({
    mobile,
    codeHash: hashOtp(mobile, code),
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString()
  });
  await writeDb(db);
}

export async function verifyOtp(mobile: string, code: string) {
  const db = await readDb();
  const otp = db.otps.find((item) => item.mobile === mobile);
  if (!otp || new Date(otp.expiresAt).getTime() < Date.now()) {
    return false;
  }
  const expected = hashOtp(mobile, code);
  const ok = crypto.timingSafeEqual(Buffer.from(otp.codeHash), Buffer.from(expected));
  if (ok) {
    db.otps = db.otps.filter((item) => item.mobile !== mobile);
    await writeDb(db);
  }
  return ok;
}
