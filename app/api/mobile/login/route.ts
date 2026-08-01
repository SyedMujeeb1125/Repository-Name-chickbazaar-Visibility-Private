import crypto from "crypto";
import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { createSignedToken } from "@/lib/auth";

export async function POST(
  request: Request
) {
  try {

    const body =
      await request.json();

    const mobile = String(
      body.mobile ?? ""
    ).trim();

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Mobile number is required.",
        },
        {
          status: 400,
        }
      );
    }

    // ---------------------------------
    // Find Retailer
    // ---------------------------------

    const {
      data: retailer,
      error: retailerError,
    } = await supabase
      .from("retailers")
      .select("*")
      .eq("mobile", mobile)
      .maybeSingle();

    if (retailerError) {

      console.error(
        "[LOGIN][RETAILER]",
        retailerError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to verify retailer.",
        },
        {
          status: 500,
        }
      );

    }

    if (!retailer) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Retailer not found.",
        },
        {
          status: 404,
        }
      );
    }

    // ---------------------------------
    // Verify Primary Shop
    // ---------------------------------

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
        "[LOGIN][SHOP]",
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

    // ---------------------------------
    // Auto Create Primary Shop
    // ---------------------------------

    if (!existingShop) {

      const {
        error: locationError,
      } = await supabase
        .from("retailer_locations")
        .insert({

          id:
            crypto.randomUUID(),

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
            retailer.latitude ?? null,

          longitude:
            retailer.longitude ?? null,

          created_at:
            new Date().toISOString(),

        });

      if (locationError) {

        console.error(
          "[LOGIN][CREATE_SHOP]",
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

    // ---------------------------------
    // Create Access Token
    // ---------------------------------

    const accessToken =
      createSignedToken(
        retailer.mobile
      );

    console.info(
      `[LOGIN] ${retailer.mobile} authenticated`
    );

    return NextResponse.json({

      success: true,

      accessToken,

      retailer,

    });

  } catch (error) {

    console.error(
      "[LOGIN]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error.",
      },
      {
        status: 500,
      }
    );
  }
}