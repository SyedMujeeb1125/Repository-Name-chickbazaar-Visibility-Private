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
    const { data: order } = await supabase
  .from("orders")
  .select("payment_amount")
  .eq("id", orderId)
  .single();

const advancePaid =
  Number(
    order?.payment_amount || 0
  );

const outstandingAmount =
  finalAmount - advancePaid;

  const { data: orderInfo } =
  await supabase
    .from("orders")
    .select("mobile, order_number")
    .eq("id", orderId)
    .single();

const { data: retailer } =
  await supabase
    .from("retailers")
    .select(
      "id, available_credit"
    )
    .eq(
      "mobile",
      orderInfo?.mobile
    )
    .limit(1)
    .single();

  const { error } = await supabase
    .from("orders")
    .update({
  actual_weight:
    actualWeight,

  rate_per_kg:
    ratePerKg,

  final_amount:
    finalAmount,

  outstanding_amount:
    outstandingAmount
})
    .eq("id", orderId);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
  if (retailer) {
  await supabase
    .from("retailer_ledger")
    .insert({
      retailer_id:
        retailer.id,

      order_id:
        orderId,

      debit:
        finalAmount,

      credit: 0,

      remarks:
        `Settlement - ${orderInfo?.order_number}`,

      created_at:
        new Date().toISOString()
    });
}
const { data: existingInvoice } =
  await supabase
    .from("invoices")
    .select("id")
    .eq("order_id", orderId)
    .limit(1)
    .single();

if (!existingInvoice) {

  const invoiceNumber =
    `CB-INV-${Date.now()}`;

  await supabase
    .from("invoices")
    .insert({
      invoice_number:
        invoiceNumber,

      order_id:
        orderId,

      retailer_id:
        retailer?.id || null,

      retailer_name:
        retailer
          ? orderInfo?.mobile
          : "",

      order_number:
        orderInfo?.order_number,

      amount:
        finalAmount,

      actual_weight:
        actualWeight,

      rate_per_kg:
        ratePerKg,

      status:
        "unpaid",

      remarks:
        `Invoice generated for ${orderInfo?.order_number}`
    });
}
if (retailer) {
  const { data: retailerInfo } =
    await supabase
      .from("retailers")
      .select(
        "available_credit"
      )
      .eq(
        "id",
        retailer.id
      )
      .single();

  const currentCredit =
    Number(
      retailerInfo?.available_credit || 0
    );

  await supabase
    .from("retailers")
    .update({
      available_credit:
  Math.max(
    0,
    currentCredit -
      outstandingAmount
  )
    })
    .eq(
      "id",
      retailer.id
    );
}

  return NextResponse.json({
    success: true,
    finalAmount
  });
}