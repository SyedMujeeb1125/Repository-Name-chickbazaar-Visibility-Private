import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { createId } from "@/lib/storage";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const { error } = await supabase
    .from("retailer_locations")
    .insert({
      id: createId("shop"),

      retailer_mobile:
        body.mobile,

      shop_name:
        body.shopName,

      contact_person:
        body.ownerName,

      mobile:
        body.mobile,

      address:
        body.address,

      latitude:
        body.latitude,

      longitude:
        body.longitude,

      created_at:
        new Date().toISOString(),
    });

  if (error) {
    console.error(
      "Add shop error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to add shop.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    success: true,
  });
}