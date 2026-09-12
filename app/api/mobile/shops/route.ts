import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getMobileAuthenticatedRetailer } from "@/lib/retailer";

export async function GET(
  request: Request
) {
  try {
    const mobile = getMobileAuthenticatedRetailer(request);

    if (!mobile) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }

    if (!mobile) {
      return NextResponse.json([]);
    }

    const {
      data: shops,
      error,
    } = await supabase
      .from("retailer_locations")
      .select("*")
      .eq(
        "retailer_mobile",
        mobile
      )
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.error(
        "[SHOPS][GET]",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to fetch shops.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      shops ?? []
    );

  } catch (error) {

    console.error(
      "[SHOPS][GET]",
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
