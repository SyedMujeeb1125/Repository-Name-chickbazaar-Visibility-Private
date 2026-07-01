import { loadTomorrowOrders } from "./scheduler-service";
import { loadActiveRepeatOrders } from "./repeat-generator";

import { buildDemandForecast } from "@/lib/demand/forecast";

export async function buildTomorrowPlan() {
  const tomorrow = new Date();

  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  const deliveryDate =
    tomorrow
      .toISOString()
      .split("T")[0];

  const manualOrders =
    await loadTomorrowOrders();

  const repeatOrders =
    await loadActiveRepeatOrders();

  const demand =
    await buildDemandForecast(
      deliveryDate
    );

  return {
    manualOrders,

    repeatOrders,

    totalOrders:
      manualOrders.length +
      repeatOrders.length,

    demand,
  };
}