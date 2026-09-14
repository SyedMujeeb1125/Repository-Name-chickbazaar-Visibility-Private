import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getMobileAuthenticatedRetailer } from "@/lib/retailer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const mobile = getMobileAuthenticatedRetailer(request);

    if (!mobile) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }

    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .eq("mobile", mobile)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("[MY_ORDERS]", {
        mobile,
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Unable to load orders.",
          error: error.message,
        },
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    return NextResponse.json(orders ?? [], {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[MY_ORDERS]", error);
    return NextResponse.json([]);
  }
}

