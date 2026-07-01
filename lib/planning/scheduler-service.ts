import { supabase } from "@/lib/supabase";

export async function loadTomorrowOrders() {

  const tomorrow = new Date();

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  const deliveryDate =
    tomorrow
      .toISOString()
      .split("T")[0];

  const { data, error } =
    await supabase
      .from("orders")
      .select("*")
      .eq("delivery_date", deliveryDate)
      .eq("status", "new");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}