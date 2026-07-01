import { buildProcurementPlan } from "@/lib/procurement/procurement-engine";

export type AllocationResult = {
  zone: string;
  farmId: string;
  birdsAllocated: number;
  score: number;
};

export async function buildAllocationPlan(
  deliveryDate: string
) {
  const procurement =
    await buildProcurementPlan(
      deliveryDate
    );

  const allocations: AllocationResult[] =
    procurement.recommendations.map(
      (item: any) => ({
        zone: item.zone,
        farmId:
          item.recommendedFarm,
        birdsAllocated:
          item.birdsRequired,
        score: item.score,
      })
    );

  return {
    allocations,
    totalAllocations:
      allocations.length,
  };
}