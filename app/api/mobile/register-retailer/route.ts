import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { createId } from "@/lib/storage";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const retailerId = createId("retailer");

  try {
    // Create retailer

    const { error: retailerError } =
      await supabase
        .from("retailers")
        .insert({
          id: retailerId,

          created_at:
            new Date().toISOString(),

          status: "new",

          credit_category: "new",

          shop_name:
            body.shopName,

          owner_name:
            body.ownerName,

          mobile:
            body.mobile,

          email:
            body.email || "",

          address:
            body.address,

          gst: "",

          latitude:
            body.latitude,

          longitude:
            body.longitude,
        });

    if (retailerError) {
      throw retailerError;
    }

    // Check if primary shop exists

    const {
      data: existingShop,
      error: shopError,
    } = await supabase
      .from("retailer_locations")
      .select("id")
      .eq(
        "retailer_mobile",
        body.mobile
      )
      .limit(1)
      .maybeSingle();

    if (shopError) {
      throw shopError;
    }

    // Create primary shop

    if (!existingShop) {
      const {
        error: locationError,
      } = await supabase
        .from(
          "retailer_locations"
        )
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

      if (locationError) {
        throw locationError;
      }
    }

    return NextResponse.json({
      success: true,
      retailerId,
    });
  } catch (error: any) {
    console.error(
      "Retailer registration error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ??
          "Registration failed.",
      },
      {
        status: 500,
      }
    );
  }
}