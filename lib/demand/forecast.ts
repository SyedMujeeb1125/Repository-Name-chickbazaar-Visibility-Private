import { buildDemandSummary } from "./summary";

export async function buildDemandForecast(
  deliveryDate: string
) {
  const summary =
    await buildDemandSummary(
      deliveryDate
    );

  return {
    ...summary,

    estimatedVehicles:
      Math.ceil(
        summary.totals.weight / 3000
      ),

    estimatedDrivers:
      Math.ceil(
        summary.totals.weight / 3000
      ),
  };
}