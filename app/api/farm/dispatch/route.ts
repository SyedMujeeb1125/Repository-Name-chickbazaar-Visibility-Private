import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();

  const orderId = String(formData.get("orderId"));

  const { error } = await supabase
    .from("orders")
    .update({
      status: "dispatched",
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
    new URL("/farm/dispatch", request.url),
    303
  );
}