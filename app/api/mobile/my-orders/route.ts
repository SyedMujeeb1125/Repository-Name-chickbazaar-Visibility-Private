import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const mobile = searchParams.get("mobile");

    if (!mobile) {
      return NextResponse.json([]);
    }

    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("mobile", mobile)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("[MY_ORDERS]", error);
      return NextResponse.json([]);
    }

    return NextResponse.json(orders ?? []);
  } catch (error) {
    console.error("[MY_ORDERS]", error);
    return NextResponse.json([]);
  }
}