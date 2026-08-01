import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { retailerCookieName } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();

    cookieStore.set({
      name: retailerCookieName,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    console.info("[AUTH][LOGOUT] Retailer logged out.");

    return NextResponse.redirect(
      new URL("/", request.url)
    );
  } catch (error) {
    console.error("[AUTH][LOGOUT]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Logout failed.",
      },
      {
        status: 500,
      }
    );
  }
}