import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const mobile = searchParams.get("mobile");

    if (!mobile) {
      return NextResponse.json(null);
    }

    const { data: retailer, error } = await supabase
      .from("retailers")
      .select("*")
      .eq("mobile", mobile)
      .maybeSingle();

    if (error) {
      console.error("[PROFILE]", error);
      return NextResponse.json(null);
    }

    return NextResponse.json(retailer ?? null);
  } catch (error) {
    console.error("[PROFILE]", error);
    return NextResponse.json(null);
  }
}