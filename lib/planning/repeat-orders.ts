import { supabase } from "@/lib/supabase";

export type RepeatOrderInput = {
  retailerId: string;
  orderBy: "weight" | "birds";
  requestedWeight?: number;
  birds?: number;
  averageWeight?: number;
  frequency: "daily" | "weekly" | "monthly";
  weekDays?: string[];
  monthDays?: number[];
  deliveryAddress: string;
  latitude?: number;
  longitude?: number;
  paymentType: "advance" | "actual_weight" | "credit";
  startDate: string;
  endDate?: string;
  skipSundays?: boolean;
  skipHolidays?: boolean;
  remarks?: string;
};

export async function createRepeatOrder(
  input: RepeatOrderInput
) {
  const { data, error } = await supabase
    .from("repeat_orders")
    .insert({
      retailer_id: input.retailerId,
      order_by: input.orderBy,
      requested_weight: input.requestedWeight,
      birds: input.birds,
      average_weight: input.averageWeight,
      frequency: input.frequency,
      week_days: input.weekDays,
      month_days: input.monthDays,
      delivery_address: input.deliveryAddress,
      latitude: input.latitude,
      longitude: input.longitude,
      payment_type: input.paymentType,
      start_date: input.startDate,
      end_date: input.endDate,
      skip_sundays: input.skipSundays ?? false,
      skip_holidays: input.skipHolidays ?? false,
      remarks: input.remarks,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getRepeatOrders(
  retailerId: string
) {
  const { data, error } = await supabase
    .from("repeat_orders")
    .select("*")
    .eq("retailer_id", retailerId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function pauseRepeatOrder(
  id: string
) {
  const { error } = await supabase
    .from("repeat_orders")
    .update({
      status: "paused",
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function resumeRepeatOrder(
  id: string
) {
  const { error } = await supabase
    .from("repeat_orders")
    .update({
      status: "active",
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteRepeatOrder(
  id: string
) {
  const { error } = await supabase
    .from("repeat_orders")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}