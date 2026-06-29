import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const form = await request.formData();

  const orderId = String(form.get("orderId"));
  const vehicleId = String(form.get("vehicleId"));

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicleId)
    .single();

  if (!vehicle) {
    return NextResponse.json({
      success: false,
      message: "Vehicle not found",
    });
  }

  const { error } = await supabase
    .from("orders")
    .update({
      assigned_driver: vehicle.assigned_driver,
      assigned_vehicle: vehicle.vehicle_number,
      status: "allocated",
    })
    .eq("id", orderId);

  if (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }

  return NextResponse.redirect(
  new URL("/admin/driver-assignment", request.url),
  303
);
}