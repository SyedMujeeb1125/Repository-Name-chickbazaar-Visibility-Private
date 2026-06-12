import { cookies } from "next/headers";
import { retailerCookieName, verifySignedToken } from "@/lib/auth";

export async function getLoggedInRetailerMobile() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(retailerCookieName)?.value;

  if (!token) {
    return null;
  }

  return verifySignedToken(token);
}