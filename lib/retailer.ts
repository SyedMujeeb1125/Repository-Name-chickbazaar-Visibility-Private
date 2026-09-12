import { cookies } from "next/headers";
import {
  retailerCookieName,
  verifySignedToken,
} from "@/lib/auth";

/**
 * Returns the logged-in retailer's mobile number.
 * Returns null if no valid authenticated session exists.
 */
export async function getLoggedInRetailerMobile(): Promise<string | null> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(retailerCookieName)?.value;

    if (!token) {
      return null;
    }

    const mobile = verifySignedToken(token);

    if (!mobile) {
      return null;
    }

    return mobile;
  } catch (error) {
    console.error("[AUTH][GET_RETAILER]", error);
    return null;
  }
}
/**
 * Returns the Bearer token from a mobile Authorization header.
 * Returns null if the header is missing or malformed.
 */
export function getBearerToken(request: Request): string | null {
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return null;
  }

  const match = authorization.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    return null;
  }

  return match[1].trim() || null;
}

/**
 * Returns the authenticated retailer's mobile number
 * from the mobile Bearer Authorization header.
 */
export function getMobileAuthenticatedRetailer(
  request: Request
): string | null {
  const token = getBearerToken(request);

  if (!token) {
    return null;
  }

  return verifySignedToken(token);
}
