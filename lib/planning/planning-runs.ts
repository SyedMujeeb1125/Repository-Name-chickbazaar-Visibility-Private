import { supabase } from "@/lib/supabase";

export async function savePlanningRun(
  pipeline: any
) {
  const { error } =
    await supabase
      .from("planning_runs")
      .insert({
        delivery_date:
          pipeline.deliveryDate,

        manual_orders:
          pipeline.planning.manualOrders.length,

        repeat_orders:
          pipeline.planning.repeatOrders.length,

        total_orders:
          pipeline.planning.totalOrders,

        birds_required:
          pipeline.planning.demand.totals.birds,

        weight_required:
          pipeline.planning.demand.totals.weight,

        estimated_vehicles:
          pipeline.planning.demand.estimatedVehicles,

        estimated_drivers:
          pipeline.planning.demand.estimatedDrivers,

        created_by: "admin",
      });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getPlanningRuns() {
  const { data, error } =
    await supabase
      .from("planning_runs")
      .select("*")
      .order("generated_at", {
        ascending: false,
      });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function approvePlanningRun(
  id: string
) {
  const { error } =
    await supabase
      .from("planning_runs")
      .update({
        status: "approved",
        approved_at: new Date().toISOString(),
        approved_by: "admin",
      })
      .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
export async function executePlanningRun(
  id: string
) {
  const { error } =
    await supabase
      .from("planning_runs")
      .update({
        status: "executed",
        executed_at: new Date().toISOString(),
        executed_by: "admin",
      })
      .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}