import crypto from "crypto";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      shopName,
      ownerName,
      mobile,
      email,
      address,
      latitude,
      longitude,
    } = body;

    // -------------------------
    // Validation
    // -------------------------

    if (!shopName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Shop name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!ownerName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Owner name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!mobile?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Mobile number is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!address?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Address is required.",
        },
        {
          status: 400,
        }
      );
    }

    // -------------------------
    // Duplicate Mobile Check
    // -------------------------

    const { data: existingRetailer } = await supabase
      .from("retailers")
      .select("id")
      .eq("mobile", mobile)
      .maybeSingle();

    if (existingRetailer) {
      return NextResponse.json(
        {
          success: false,
          error: "Retailer already registered.",
        },
        {
          status: 409,
        }
      );
    }

    const retailerId = crypto.randomUUID();

    // -------------------------
    // Create Retailer
    // -------------------------

    const { error: retailerError } =
      await supabase
        .from("retailers")
        .insert({
          id: retailerId,

          created_at: new Date().toISOString(),

          status: "new",

          credit_category: "new",

          shop_name: shopName,

          owner_name: ownerName,

          mobile,

          email: email ?? "",

          address,

          gst: "",

          latitude: latitude ?? null,

          longitude: longitude ?? null,
        });

    if (retailerError) {
      throw retailerError;
    }

    // -------------------------
    // Create Primary Shop
    // -------------------------

    const {
      data: existingShop,
      error: shopLookupError,
    } = await supabase
      .from("retailer_locations")
      .select("id")
      .eq("retailer_mobile", mobile)
      .maybeSingle();

    if (shopLookupError) {
      throw shopLookupError;
    }

    if (!existingShop) {
      const { error: locationError } =
        await supabase
          .from("retailer_locations")
          .insert({
            id: crypto.randomUUID(),

            retailer_mobile: mobile,

            shop_name: shopName,

            contact_person: ownerName,

            mobile,

            address,

            latitude: latitude ?? null,

            longitude: longitude ?? null,

            created_at: new Date().toISOString(),
          });

      if (locationError) {
        throw locationError;
      }
    }

    console.info(
      `[RETAILER] Registered ${mobile}`
    );

    return NextResponse.json({
      success: true,
      retailerId,
    });

  } catch (error: any) {

    console.error(
      "[RETAILER_REGISTER]",
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