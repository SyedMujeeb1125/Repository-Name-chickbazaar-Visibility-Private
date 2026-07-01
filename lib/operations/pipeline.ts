import { buildTomorrowPlan } from "@/lib/planning/planning-engine";
import { buildProcurementPlan } from "@/lib/procurement/procurement-engine";
import { buildAllocationPlan } from "@/lib/allocation/engine";

export async function buildOperationsPipeline() {

  const tomorrow = new Date();

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  const deliveryDate =
    tomorrow
      .toISOString()
      .split("T")[0];

  const planning =
    await buildTomorrowPlan();

  const procurement =
    await buildProcurementPlan(
      deliveryDate
    );

  const allocation =
    await buildAllocationPlan(
      deliveryDate
    );

  return {
    generatedAt:
      new Date().toISOString(),

    deliveryDate,

    planning,

    procurement,

    allocation,

    status: "ready",
  };
}