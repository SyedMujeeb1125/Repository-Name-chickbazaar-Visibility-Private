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