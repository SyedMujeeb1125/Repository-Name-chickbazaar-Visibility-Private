import { supabase } from "@/lib/supabase";

export async function getTodayRate() {
  const { data, error } = await supabase
    .from("daily_rates")
    .select("*")
    .order("effective_date", { ascending: false })
    .limit(1)
    .single();

  if (error) return null;

  return data;
}