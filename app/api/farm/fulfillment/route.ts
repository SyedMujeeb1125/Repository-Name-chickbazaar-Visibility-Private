import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  const formData: any =
  await request.formData();

  const allocationId = String(
    formData.get("allocationId")
  );

  const farmId = String(
    formData.get("farmId")
  );

  const acceptedBirds =
    Number(
      formData.get(
        "acceptedBirds"
      )
    );

  const status = String(
    formData.get("status")
  );

  const remarks = String(
    formData.get("remarks") || ""
  );

  const { error } =
    await supabase
      .from(
        "farm_fulfillments"
      )
      .insert({
        allocation_id:
          allocationId,

        farm_id: farmId,

        accepted_birds:
          acceptedBirds,

        status,

        remarks
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