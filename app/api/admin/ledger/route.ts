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

  const orderId = String(
    formData.get("orderId") || ""
  );

  const debit = Number(
    formData.get("debit") || 0
  );

  const credit = Number(
    formData.get("credit") || 0
  );

  const remarks = String(
    formData.get("remarks") || ""
  );

  const { error } =
    await supabase
      .from("retailer_ledger")
      .insert({
        retailer_id: retailerId,
        order_id: orderId,
        debit,
        credit,
        remarks
      });

  if (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }

  return NextResponse.json({
    success: true
  });
}