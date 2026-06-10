import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSignedToken, retailerCookieName, retailerCookieOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("google_oauth_state")?.value;

  if (!code || !state || state !== expectedState) {
    return NextResponse.redirect(new URL("/login?error=google", request.url));
  }
  
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.redirect(new URL("/login?error=google-config", request.url));
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    })
  });

  if (!tokenResponse.ok) {
    return NextResponse.redirect(new URL("/login?error=google-token", request.url));
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string };
  const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });

  if (!userResponse.ok) {
    return NextResponse.redirect(new URL("/login?error=google-profile", request.url));
  }

  const user = (await userResponse.json()) as { email?: string };
  if (!user.email) {
    return NextResponse.redirect(new URL("/login?error=google-email", request.url));
  }
  const { data: retailer } = await supabase
  .from("retailers")
  .select("mobile")
  .eq("email", user.email)
  .single();

if (!retailer?.mobile) {
  return NextResponse.redirect(
    new URL("/register?error=google-not-registered", request.url)
  );
}
  cookieStore.set(
  retailerCookieName,
  createSignedToken(retailer.mobile),
  retailerCookieOptions()
);
  cookieStore.delete("google_oauth_state");
  return NextResponse.redirect(
  new URL("/dashboard", request.url)
);
}
