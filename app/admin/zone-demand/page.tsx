export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

const ZONES = [
  "north",
  "south",
  "east",
  "west",
  "central",
];

export default async function ZoneDemandPage() {
  const [
    { data: orders, error: ordersError },
    { data: retailers, error: retailersError },
  ] = await Promise.all([
    supabase.from("orders").select("*"),
    supabase.from("retailers").select("*"),
  ]);

  if (ordersError) {
    console.error("[ZONE DEMAND][ORDERS]", ordersError);
  }

  if (retailersError) {
    console.error("[ZONE DEMAND][RETAILERS]", retailersError);
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Zone Demand Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ZONES.map((zone) => {
          const zoneOrders = (orders ?? []).filter(
            (order: any) => {
              const retailer = (retailers ?? []).find(
                (r: any) =>
                  r.mobile === order.mobile
              );

              return (
                retailer?.zone === zone &&
                order.status !== "cancelled"
              );
            }
          );

          let birdOrders = 0;
          let weightOrders = 0;
          let totalKg = 0;

          zoneOrders.forEach((order: any) => {
            const birds = Number(
              order.birds ?? 0
            );

            const avgWeight = Number(
              order.average_weight ?? 0
            );

            const requestedWeight = Number(
              order.requested_weight ?? 0
            );

            if (requestedWeight > 0) {
              weightOrders += requestedWeight;
              totalKg += requestedWeight;
            } else if (
              birds > 0 &&
              avgWeight > 0
            ) {
              birdOrders += birds;
              totalKg += birds * avgWeight;
            }
          });

          return (
            <div
              key={zone}
              className="rounded-xl border bg-white p-6"
            >
              <h2 className="mb-4 text-xl font-bold capitalize">
                {zone} Bangalore
              </h2>

              <p>
                Orders:{" "}
                <strong>
                  {zoneOrders.length}
                </strong>
              </p>

              <p>
                Bird Orders:{" "}
                <strong>
                  {birdOrders}
                </strong>
              </p>

              <p>
                Weight Orders:{" "}
                <strong>
                  {weightOrders} Kg
                </strong>
              </p>

              <p>
                Total Demand:{" "}
                <strong>
                  {Math.round(totalKg)} Kg
                </strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}