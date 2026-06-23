import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  const formData: any =
  await request.formData();

  const farmId = String(
    formData.get("farmId")
  );

  const farmName = String(
    formData.get("farmName")
  );

  const weightCategory = String(
    formData.get("weightCategory")
  );

  const allocatedBirds =
    Number(
      formData.get(
        "allocatedBirds"
      )
    );

  // CHECK INVENTORY EXISTS

  const { data: inventory } =
    await supabase
      .from("farm_inventory")
      .select("*")
      .eq("farm_id", farmId)
      .eq(
        "weight_category",
        weightCategory
      )
      .limit(1)
      .single();

  if (!inventory) {
    return NextResponse.json({
      success: false,
      error: "Inventory not found"
    });
  }

  // CHECK AVAILABLE STOCK

  if (
    Number(inventory.bird_count) <
    allocatedBirds
  ) {
    return NextResponse.json({
      success: false,
      error:
        "Not enough birds available"
    });
  }

  // PREVENT DUPLICATE ALLOCATION

  const existing =
    await supabase
      .from("farm_allocations")
      .select("*")
      .eq("farm_id", farmId)
      .eq(
        "weight_category",
        weightCategory
      );

  if (
    existing.data &&
    existing.data.length > 0
  ) {
    return NextResponse.json({
      success: false,
      error:
        "Inventory already allocated"
    });
  }

  // CREATE ALLOCATION

  const { error } =
    await supabase
      .from("farm_allocations")
      .insert({
        allocation_date:
          new Date()
            .toISOString()
            .split("T")[0],

        farm_id: farmId,

        farm_name: farmName,

        weight_category:
          weightCategory,

        allocated_birds:
          allocatedBirds,

        status:
          "allocated"
      });

  if (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }

  return NextResponse.json({
    success: true
  });
}