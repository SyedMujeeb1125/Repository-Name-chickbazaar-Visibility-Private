import { supabase } from "@/lib/supabase";

export type ZoneDemand = {
  zone: string;
  totalOrders: number;
  totalBirds: number;
  totalWeight: number;
};

export async function calculateZoneDemand(
  deliveryDate: string
): Promise<ZoneDemand[]> {

  const { data, error } = await supabase
    .from("orders")
    .select(`
      zone,
      birds,
      requested_weight
    `)
    .eq("delivery_date", deliveryDate)
    .eq("status", "new");

  if (error) {
    throw new Error(error.message);
  }

  const zones = new Map<string, ZoneDemand>();

  for (const order of data ?? []) {

    const zone =
      order.zone || "Unknown";

    if (!zones.has(zone)) {

      zones.set(zone, {
        zone,
        totalOrders: 0,
        totalBirds: 0,
        totalWeight: 0,
      });

    }

    const current =
      zones.get(zone)!;

    current.totalOrders++;

    current.totalBirds += Number(
      order.birds || 0
    );

    current.totalWeight += Number(
      order.requested_weight || 0
    );
  }

  return [...zones.values()].sort(
    (a, b) =>
      b.totalWeight - a.totalWeight
  );
}