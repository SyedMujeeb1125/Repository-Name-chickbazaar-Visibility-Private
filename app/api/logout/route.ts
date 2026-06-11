import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { retailerCookieName } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.delete(retailerCookieName);

  return NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  );
}