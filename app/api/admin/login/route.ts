import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  adminCookieName,
  adminCookieOptions,
  createSignedToken,
} from "@/lib/auth";

export async function POST(request: Request) {
  const formData: any =
  await request.formData();

  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") || "");

  const adminEmail = (
    process.env.ADMIN_EMAIL || "info@chickbazaar.com"
  ).toLowerCase();

  const adminPassword =
    process.env.ADMIN_PASSWORD || "Honey@#_112513";

  console.log("====================================");
  console.log("ADMIN EMAIL:", adminEmail);
  console.log("ADMIN PASSWORD:", adminPassword);
  console.log("ENTERED EMAIL:", email);
  console.log("ENTERED PASSWORD:", password);
  console.log("====================================");

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json(
      {
        message: "Invalid admin credentials.",
        adminEmail,
        adminPassword,
        email,
        password,
      },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set(
    adminCookieName,
    createSignedToken("admin"),
    adminCookieOptions()
  );

  return NextResponse.json({
    message: "Admin logged in.",
  });
}