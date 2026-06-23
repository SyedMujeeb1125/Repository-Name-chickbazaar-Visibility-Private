import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const formData: any =
  await request.formData();

  const rate = Number(
    formData.get("rate") || 0
  );

  if (!rate || rate <= 0) {
    return NextResponse.json(
      { message: "Invalid rate" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("daily_rates")
    .insert({
      rate,
      effective_date: new Date()
        .toISOString()
        .split("T")[0]
    });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true
  });
}