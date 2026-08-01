import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(null);
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .maybeSingle();

    if (error) {
      console.error("[ORDER_DETAILS]", error);
      return NextResponse.json(null);
    }

    return NextResponse.json(order ?? null);
  } catch (error) {
    console.error("[ORDER_DETAILS]", error);
    return NextResponse.json(null);
  }
}