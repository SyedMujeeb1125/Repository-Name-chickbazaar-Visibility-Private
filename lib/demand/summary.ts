import { calculateZoneDemand } from "./zone-demand";

export async function buildDemandSummary(
  deliveryDate: string
) {
  const zones =
    await calculateZoneDemand(
      deliveryDate
    );

  const totals = zones.reduce(
    (summary, zone) => {
      summary.orders += zone.totalOrders;
      summary.birds += zone.totalBirds;
      summary.weight += zone.totalWeight;
      return summary;
    },
    {
      orders: 0,
      birds: 0,
      weight: 0,
    }
  );

  return {
    totals,
    zones,
  };
}