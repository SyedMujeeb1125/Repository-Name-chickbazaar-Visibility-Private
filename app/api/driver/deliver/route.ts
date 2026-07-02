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

  const { error } = await supabase
  .from("orders")
  .update({
    status: "delivered",

    actual_weight: actualWeight,

    delivery_notes: deliveryNotes,

    delivered_at: new Date().toISOString(),

    pod_photo_url: podPhotoUrl,

    pod_uploaded_at: new Date().toISOString(),
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