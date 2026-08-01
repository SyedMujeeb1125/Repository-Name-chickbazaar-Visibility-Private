import crypto from "crypto";
import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  try {

    const body =
      await request.json();

    const {
      mobile,
      shopName,
      ownerName,
      address,
      latitude,
      longitude,
    } = body;

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

    if (!shopName) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Shop name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Address is required.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data,
      error,
    } = await supabase
      .from("retailer_locations")
      .insert({
        id:
          crypto.randomUUID(),

        retailer_mobile:
          mobile,

        shop_name:
          shopName,

        contact_person:
          ownerName ?? null,

        mobile,

        address,

        latitude:
          latitude ?? null,

        longitude:
          longitude ?? null,

        created_at:
          new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {

      console.error(
        "[SHOP][CREATE]",
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
      shop: data,
    });

  } catch (error) {

    console.error(
      "[SHOP][CREATE]",
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