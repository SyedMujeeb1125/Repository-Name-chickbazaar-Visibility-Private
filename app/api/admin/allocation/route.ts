import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  const formData =
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
        allocatedBirds
    });

  return NextResponse.json({
    success: true
  });
}