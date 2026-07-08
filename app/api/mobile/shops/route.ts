import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request
) {
  const { searchParams } =
    new URL(request.url);

  const mobile =
    searchParams.get("mobile");

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
      "Shops fetch error:",
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
}