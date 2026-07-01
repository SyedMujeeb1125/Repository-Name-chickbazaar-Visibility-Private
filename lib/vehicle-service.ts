import { supabase } from "@/lib/supabase";

export async function getVehicleByZone(zone: string) {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("zone", zone)
    .eq("status", "available")
    .limit(1)
    .single();

  if (error) {
    console.error("Vehicle fetch error:", error);
    return null;
  }

  return data;
}