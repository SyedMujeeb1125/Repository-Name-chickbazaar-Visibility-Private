import crypto from "crypto";
import { cookies } from "next/headers";

const adminCookieName = "chickbazaar_admin";
const retailerCookieName = "chickbazaar_retailer";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "change-this-secret-before-launch";
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSignedToken(payload: string) {
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifySignedToken(token?: string) {
  if (!token) {
    return null;
  }
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) {
    return null;
  }
  const expected = sign(encoded);
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }
  return Buffer.from(encoded, "base64url").toString("utf8");
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const value = cookieStore.get(adminCookieName)?.value;
  return verifySignedToken(value) === "admin";
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24
  };
}

export function retailerCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  };
}

export { adminCookieName, retailerCookieName };
