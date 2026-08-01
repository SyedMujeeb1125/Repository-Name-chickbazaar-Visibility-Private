import crypto from "crypto";
import { cookies } from "next/headers";

export const adminCookieName = "chickbazaar_admin";
export const retailerCookieName = "chickbazaar_retailer";

const ADMIN_SESSION_DAYS = 1;
const RETAILER_SESSION_DAYS = 30;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET environment variable is not configured."
    );
  }

  return secret;
}

function sign(value: string): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(value)
    .digest("hex");
}

type SessionPayload = {
  sub: string;
  exp: number;
};

export function createSignedToken(
  subject: string,
  expiresInSeconds = RETAILER_SESSION_DAYS * 24 * 60 * 60
): string {
  const payload: SessionPayload = {
    sub: subject,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };

  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");

  const signature = sign(encoded);

  return `${encoded}.${signature}`;
}

export function verifySignedToken(
  token?: string
): string | null {
  if (!token) {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [encoded, signature] = parts;

  const expected = sign(encoded);

  const signatureBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (
    !crypto.timingSafeEqual(
      signatureBuffer,
      expectedBuffer
    )
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as SessionPayload;

    if (!payload.sub || !payload.exp) {
      return null;
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload.sub;
  } catch {
    return null;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();

  const token = cookieStore.get(adminCookieName)?.value;

  return verifySignedToken(token) === "admin";
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: ADMIN_SESSION_DAYS * 24 * 60 * 60,
  };
}

export function retailerCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: RETAILER_SESSION_DAYS * 24 * 60 * 60,
  };
}