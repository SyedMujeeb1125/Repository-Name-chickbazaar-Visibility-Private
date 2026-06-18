import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const formData =
    await request.formData();

  const orderId = String(
    formData.get("orderId") || ""
  );

  const actualWeight = Number(
    formData.get("actualWeight") || 0
  );

  const ratePerKg = Number(
    formData.get("ratePerKg") || 0
  );

  const finalAmount =
    actualWeight * ratePerKg;

  const { error } = await supabase
    .from("orders")
    .update({
      actual_weight:
        actualWeight,

      rate_per_kg:
        ratePerKg,

      final_amount:
        finalAmount
    })
    .eq("id", orderId);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    finalAmount
  });
}