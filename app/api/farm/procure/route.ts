import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();

  const orderId = String(formData.get("orderId") || "");

  if (!orderId) {
    return NextResponse.json(
      {
        success: false,
        message: "Order ID is required",
      },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("orders")
    .update({
      status: "procured",
      procured_at: new Date().toISOString(),
    })
    .eq("id", orderId);

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.redirect(
    new URL("/farm/procurement", request.url),
    303
  );
}