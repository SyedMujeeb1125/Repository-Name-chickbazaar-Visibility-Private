import { cookies } from "next/headers";
import { retailerCookieName, verifySignedToken } from "@/lib/auth";

export async function getLoggedInRetailerMobile() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(retailerCookieName)?.value;

  console.log("RETAILER COOKIE:", token);

  const decoded = verifySignedToken(token);

  console.log("DECODED MOBILE:", decoded);

  return decoded;
}