import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  const formData = await request.formData();

  const farmId = String(
    formData.get("farmId") || ""
  );

  const farmName = String(
    formData.get("farmName") || ""
  );

  const weightCategory = String(
    formData.get("weightCategory") || ""
  );

  const allocatedBirds = Number(
    formData.get("allocatedBirds") || 0
  );

  // ---------------------------------
  // Load Inventory
  // ---------------------------------

  const { data: inventory, error: inventoryError } =
    await supabase
      .from("farm_inventory")
      .select("*")
      .eq("farm_id", farmId)
      .eq(
        "weight_category",
        weightCategory
      )
      .single();

  if (
    inventoryError ||
    !inventory
  ) {
    return NextResponse.json({
      success: false,
      error: "Inventory not found",
    });
  }

  const availableBirds =
    Number(
      inventory.available_bird_count ??
        inventory.bird_count
    );

  if (
    allocatedBirds >
    availableBirds
  ) {
    return NextResponse.json({
      success: false,
      error:
        "Not enough birds available",
    });
  }

  // ---------------------------------
  // Existing Allocation?
  // ---------------------------------

  const {
    data: existingAllocation,
  } = await supabase
    .from("farm_allocations")
    .select("*")
    .eq("farm_id", farmId)
    .eq(
      "weight_category",
      weightCategory
    )
    .maybeSingle();

  if (existingAllocation) {
    const newAllocated =
      Number(
        existingAllocation.allocated_birds
      ) + allocatedBirds;

    const { error } =
      await supabase
        .from("farm_allocations")
        .update({
          allocated_birds:
            newAllocated,
        })
        .eq(
          "id",
          existingAllocation.id
        );

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }
  } else {
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

          status: "allocated",
        });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }
  }

  // ---------------------------------
  // Update Inventory
  // ---------------------------------

  const newReserved =
    Number(
      inventory.reserved_bird_count || 0
    ) + allocatedBirds;

  const newAvailable =
    Number(
      inventory.available_bird_count ??
        inventory.bird_count
    ) - allocatedBirds;

  const {
    error: inventoryUpdateError,
  } = await supabase
    .from("farm_inventory")
    .update({
      reserved_bird_count:
        newReserved,

      available_bird_count:
        newAvailable,
    })
    .eq("id", inventory.id);

  if (
    inventoryUpdateError
  ) {
    return NextResponse.json({
      success: false,
      error:
        inventoryUpdateError.message,
    });
  }

  return NextResponse.json({
    success: true,
    message:
      "Inventory allocated successfully",
  });
}