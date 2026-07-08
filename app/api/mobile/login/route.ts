import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { createId } from "@/lib/storage";
import { createSignedToken } from "@/lib/auth";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const mobile = String(
    body.mobile || ""
  );

  // Find retailer

  const {
    data: retailer,
    error: retailerError,
  } = await supabase
    .from("retailers")
    .select("*")
    .eq("mobile", mobile)
    .single();

  if (retailerError || !retailer) {

    return NextResponse.json(
      {
        success: false,
        message:
          "Retailer not found",
      },
      {
        status: 404,
      }
    );

  }

  // Check primary shop

  const {
    data: existingShop,
    error: shopError,
  } = await supabase
    .from("retailer_locations")
    .select("id")
    .eq(
      "retailer_mobile",
      retailer.mobile
    )
    .limit(1)
    .maybeSingle();

  if (shopError) {

    console.error(
      "Shop lookup error:",
      shopError
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to verify retailer shop.",
      },
      {
        status: 500,
      }
    );

  }

  // Auto-create primary shop if missing

  if (!existingShop) {

    const {
      error: locationError,
    } = await supabase
      .from(
        "retailer_locations"
      )
      .insert({

        id:
          createId("shop"),

        retailer_mobile:
          retailer.mobile,

        shop_name:
          retailer.shop_name,

        contact_person:
          retailer.owner_name,

        mobile:
          retailer.mobile,

        address:
          retailer.address,

        latitude:
          retailer.latitude,

        longitude:
          retailer.longitude,

        created_at:
          new Date().toISOString(),

      });

    if (locationError) {

      console.error(
        "Primary shop creation error:",
        locationError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to create primary shop.",
        },
        {
          status: 500,
        }
      );

    }

  }

  // Create access token

  const accessToken =
    createSignedToken(
      retailer.mobile
    );

  return NextResponse.json({

    success: true,

    accessToken,

    retailer,

  });

}