import { supabase } from "@/lib/supabase";

export async function loadActiveRepeatOrders() {

  const { data, error } =
    await supabase
      .from("repeat_orders")
      .select("*")
      .eq("status", "active");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}