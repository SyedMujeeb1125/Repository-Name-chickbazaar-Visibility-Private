import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isAdminAuthenticated } from "@/lib/auth";

export async function POST(
  request: Request
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  const formData: any =
  await request.formData();

  const farmId = String(
    formData.get("farmId")
  );

  const inventoryDate = String(
    formData.get(
      "inventoryDate"
    )
  );

  const weightCategory = String(
    formData.get(
      "weightCategory"
    )
  );

  const birdCount = Number(
    formData.get("birdCount")
  );

  const procurementPrice =
    Number(
      formData.get(
        "procurementPrice"
      )
    );

  // Check if inventory already exists

  const { data: existing } =
    await supabase
      .from("farm_inventory")
      .select("*")
      .eq("farm_id", farmId)
      .eq(
        "inventory_date",
        inventoryDate
      )
      .eq(
        "weight_category",
        weightCategory
      )
      .limit(1)
      .single();

  if (existing) {
    // Update existing stock

    const {
      data,
      error
    } = await supabase
      .from("farm_inventory")
      .update({
        bird_count:
          Number(
            existing.bird_count || 0
          ) + birdCount,

        procurement_price:
          procurementPrice
      })
      .eq("id", existing.id)
      .select();

    if (error) {
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
      message:
        "Inventory updated",
      data
    });
  }

  // Create new inventory

  const {
    data,
    error
  } = await supabase
    .from("farm_inventory")
    .insert({
      farm_id: farmId,

      inventory_date:
        inventoryDate,

      weight_category:
        weightCategory,

      bird_count:
        birdCount,

      procurement_price:
        procurementPrice
    })
    .select();

  if (error) {
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
    message:
      "Inventory created",
    data
  });
}
