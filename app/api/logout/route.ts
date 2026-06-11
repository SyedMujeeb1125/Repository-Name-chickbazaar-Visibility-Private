import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { retailerCookieName } from "@/lib/auth";

export async function GET(request: Request) {
  const cookieStore = await cookies();

  cookieStore.delete(retailerCookieName);

  return NextResponse.redirect(
    new URL("/", request.url)
  );
}