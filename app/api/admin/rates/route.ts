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

  try {
    const formData = await request.formData();

    const rate = Number(formData.get("rate") || 0);
    const effectiveDate = String(
      formData.get("effective_date") || ""
    ).trim();

    if (!rate || rate <= 0) {
      return NextResponse.json(
        { message: "Invalid rate" },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(effectiveDate)) {
      return NextResponse.json(
        { message: "Invalid effective date" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("daily_rates")
      .insert({
        rate,
        effective_date: effectiveDate,
      });

    if (error) {
      console.error("[ADMIN][RATE]", error);

      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.redirect(
      new URL("/admin/rates", request.url)
    );
  } catch (error) {
    console.error("[ADMIN][RATE]", error);

    return NextResponse.json(
      { message: "Unable to save rate." },
      { status: 500 }
    );
  }
}
