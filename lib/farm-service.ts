import { supabase } from "@/lib/supabase";

export async function getFarmPartners() {
  const { data, error } = await supabase
    .from("farm_partners")
    .select("*");

  if (error) {
    console.error("Farm fetch error:", error);
    return [];
  }

  return data || [];
}