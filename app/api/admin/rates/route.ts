import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  const formData: any =
  await request.formData();

  const rate = Number(
    formData.get("rate")
  );

  const { error } =
    await supabase
      .from("daily_rates")
      .insert({
  rate,
  effective_date:
    new Date()
      .toISOString()
      .split("T")[0]
});

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 400 }
    );
  }

  return NextResponse.redirect(
    new URL(
      "/admin/rates",
      request.url
    )
  );
}