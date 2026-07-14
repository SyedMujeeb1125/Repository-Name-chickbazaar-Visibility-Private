import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


export async function POST(
  request: Request
) {
  console.log("===== DRIVER DELIVER API STARTED =====");

  const formData: any =
  await request.formData();

  const orderId = String(
    formData.get("orderId") || ""
  );

  const actualWeight = Number(
    formData.get("actualWeight") || 0
  );

  const deliveryNotes = String(
    formData.get("deliveryNotes") || ""
  );

  const cashReceived = Number(
  formData.get("cashReceived") || 0
);

const upiReceived = Number(
  formData.get("upiReceived") || 0
);

const paymentMode = String(
  formData.get("paymentMode") || ""
);

const upiTransactionId = String(
  formData.get("upiTransactionId") || ""
);
  const podPhoto =
    formData.get("podPhoto") as File | null;

    console.log("POD PHOTO:", podPhoto);
console.log(
  "POD SIZE:",
  podPhoto?.size
);
console.log(
  "POD NAME:",
  podPhoto?.name
);

  let podPhotoUrl = "";

  if (
    podPhoto &&
    podPhoto.size > 0
  ) {
    const fileExt =
      podPhoto.name
        .split(".")
        .pop();

    const fileName =
      `${orderId}-${Date.now()}.${fileExt}`;

    const arrayBuffer =
      await podPhoto.arrayBuffer();

    const { error } =
      await supabase.storage
        .from("pod")
        .upload(
          fileName,
          Buffer.from(
            arrayBuffer
          ),
          {
            contentType:
              podPhoto.type,
            upsert: true
          }
        );

    if (!error) {
      const { data } =
        supabase.storage
          .from("pod")
          .getPublicUrl(
            fileName
          );

      podPhotoUrl =
        data.publicUrl;
    }
  }

  const { data: order } = await supabase
  .from("orders")
  .select("*")
  .eq("id", orderId)
  .single();

if (!order) {
  return NextResponse.json(
    {
      success: false,
      message: "Order not found",
    },
    {
      status: 404,
    }
  );
}

const rate =
  Number(order.rate_per_kg ?? 0);

const advance =
  Number(order.advance_amount ?? 500);

const finalBill =
  actualWeight * rate;

const totalPaid =
  advance +
  cashReceived +
  upiReceived;

const balanceDue =
  Math.max(
    finalBill - totalPaid,
    0
  );

const paymentStatus =
  balanceDue > 0
    ? "payment_pending"
    : "paid";

const orderStatus =
  balanceDue > 0
    ? "delivered"
    : "completed";

  const { error } = await supabase
  .from("orders")
  .update({

  status: orderStatus,

  actual_weight: actualWeight,

  final_bill_amount: finalBill,

  cash_received: cashReceived,

  upi_received: upiReceived,

  total_paid: totalPaid,

  balance_due: balanceDue,

  payment_status: paymentStatus,

  payment_mode: paymentMode,

  upi_transaction_id: upiTransactionId,

  payment_collected_by: "Driver",

  payment_collected_at:
    new Date().toISOString(),

  delivery_notes: deliveryNotes,

  delivered_at:
    new Date().toISOString(),

  pod_photo_url: podPhotoUrl,

  pod_uploaded_at:
    new Date().toISOString(),

})
  .eq("id", orderId);

if (error) {
  console.error(error);

  return NextResponse.json(
    {
      success: false,
      message: error.message,
    },
    {
      status: 500,
    }
  );
}

  return NextResponse.redirect(
  new URL("/driver", request.url),
  303
);
}