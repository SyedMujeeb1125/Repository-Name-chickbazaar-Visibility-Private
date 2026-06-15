import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  const formData =
    await request.formData();

  const { data, error } =
  await supabase
    .from("farm_inventory")
    .insert({
      farm_id: String(
        formData.get("farmId")
      ),

      inventory_date: String(
        formData.get(
          "inventoryDate"
        )
      ),

      weight_category: String(
        formData.get(
          "weightCategory"
        )
      ),

      bird_count: Number(
        formData.get("birdCount")
      ),

      procurement_price: Number(
        formData.get(
          "procurementPrice"
        )
      )
    })
    .select();

  if (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    data
  });
}