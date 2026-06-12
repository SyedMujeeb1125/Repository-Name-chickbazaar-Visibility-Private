import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  retailerCookieName,
  verifySignedToken
} from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(retailerCookieName)?.value;

  return NextResponse.json({
    token,
    decoded: verifySignedToken(token)
  });
}