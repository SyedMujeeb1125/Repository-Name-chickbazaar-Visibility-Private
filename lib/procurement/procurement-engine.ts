import { supabase } from "@/lib/supabase";
import { buildDemandForecast } from "@/lib/demand/forecast";
import {
  chooseBestFarm,
  FarmCandidate,
} from "@/lib/allocation/scoring";

export async function buildProcurementPlan(
  deliveryDate: string
) {
  const demand =
    await buildDemandForecast(
      deliveryDate
    );

  const { data: farms, error } =
    await supabase
      .from("farm_inventory")
      .select("*")
      .order("bird_count", {
        ascending: false,
      });

  if (error) {
    throw new Error(error.message);
  }

  const inventory =
    farms ?? [];

  const totalInventory =
    inventory.reduce(
      (sum: number, farm: any) =>
        sum +
        Number(
          farm.bird_count || 0
        ),
      0
    );

  const shortage = Math.max(
    0,
    demand.totals.birds -
      totalInventory
  );

  const recommendations =
    demand.zones.map((zone) => {

      const candidates: FarmCandidate[] =
        inventory.map((farm: any) => ({
          id: farm.id,
          farmId:
            farm.farm_id,
          zone: "All",
          availableBirds:
            Number(
              farm.bird_count ||
                0
            ),
          procurementPrice:
            Number(
              farm.procurement_price ||
                0
            ),
        }));

      const best =
        chooseBestFarm(
          candidates,
          {
            retailerZone:
              zone.zone,
            birdsRequired:
              zone.totalBirds,
          }
        );

      return {
        zone:
          zone.zone,
        birdsRequired:
          zone.totalBirds,
        recommendedFarm:
          best?.farm
            ?.farmId ??
          "None",
        score:
          best?.score ?? 0,
      };
    });

  return {
    demand,

    totalInventory,

    shortage,

    farms: inventory,

    recommendations,
  };
}