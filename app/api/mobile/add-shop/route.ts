import crypto from "crypto";
import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { getMobileAuthenticatedRetailer } from "@/lib/retailer";

export async function POST(
  request: Request
) {
  try {
    const mobile =
      getMobileAuthenticatedRetailer(request);

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await request.json();

    const {
      shopName,
      ownerName,
      address,
      latitude,
      longitude,
    } = body;

    if (!shopName) {
      return NextResponse.json(
        {
          success: false,
          message: "Shop name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!ownerName) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact person is required.",
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
          message: "Address is required.",
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
        id: crypto.randomUUID(),
        retailer_mobile: mobile,
        shop_name: shopName,
        contact_person: ownerName,
        mobile,
        address,
        latitude: latitude ?? null,
        longitude: longitude ?? null,
        created_at: new Date().toISOString(),
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
          message: "Unable to add shop.",
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
        message: "Internal Server Error.",
      },
      {
        status: 500,
      }
    );
  }
}
