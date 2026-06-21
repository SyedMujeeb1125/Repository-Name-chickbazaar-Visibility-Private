import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  const formData =
    await request.formData();

  const retailerId = String(
    formData.get("retailerId")
  );

  const zone = String(
    formData.get("zone")
  );

  const { error } =
    await supabase
      .from("retailers")
      .update({
        zone
      })
      .eq("id", retailerId);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true
  });
}