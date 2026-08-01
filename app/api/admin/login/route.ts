import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  adminCookieName,
  adminCookieOptions,
  createSignedToken,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const email = String(
      formData.get("email") ?? ""
    )
      .trim()
      .toLowerCase();

    const password = String(
      formData.get("password") ?? ""
    );

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    const adminEmail = (
      process.env.ADMIN_EMAIL ??
      "info@chickbazaar.com"
    ).toLowerCase();

    const adminPassword =
      process.env.ADMIN_PASSWORD ??
      "Honey@#_112513";

    if (
      email !== adminEmail ||
      password !== adminPassword
    ) {
      console.error(
        "[ADMIN_LOGIN] Invalid login attempt",
        {
          email,
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid admin credentials.",
        },
        {
          status: 401,
        }
      );
    }

    const cookieStore =
      await cookies();

    cookieStore.set(
      adminCookieName,
      createSignedToken(
        "admin"
      ),
      adminCookieOptions()
    );

    return NextResponse.json({
      success: true,
      message:
        "Admin logged in successfully.",
    });
  } catch (error) {
    console.error(
      "[ADMIN_LOGIN]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}