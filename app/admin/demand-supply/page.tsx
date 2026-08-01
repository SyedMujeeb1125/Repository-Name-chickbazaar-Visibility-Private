import { supabase } from "@/lib/supabase";

const ZONES = [
  "north",
  "south",
  "east",
  "west",
  "central",
];

export default async function DemandSupplyPage() {
  // ---------------------------------
  // Retailers
  // ---------------------------------

  const {
    data: retailers,
    error: retailersError,
  } = await supabase
    .from("retailers")
    .select(`
      id,
      mobile,
      zone
    `);

  if (retailersError) {
    console.error(
      "[DEMAND_SUPPLY][RETAILERS]",
      retailersError
    );
  }

  // ---------------------------------
  // Orders
  // ---------------------------------

  const {
    data: orders,
    error: ordersError,
  } = await supabase
    .from("orders")
    .select(`
      id,
      mobile,
      status,
      requested_weight,
      birds,
      average_weight
    `)
    .neq("status", "cancelled");

  if (ordersError) {
    console.error(
      "[DEMAND_SUPPLY][ORDERS]",
      ordersError
    );
  }

  // ---------------------------------
  // Farms
  // ---------------------------------

  const {
    data: farms,
    error: farmsError,
  } = await supabase
    .from("farm_partners")
    .select(`
      id,
      zone,
      status
    `)
    .eq("status", "approved");

  if (farmsError) {
    console.error(
      "[DEMAND_SUPPLY][FARMS]",
      farmsError
    );
  }

  // ---------------------------------
  // Inventory
  // ---------------------------------

  const {
    data: inventory,
    error: inventoryError,
  } = await supabase
    .from("farm_inventory")
    .select(`
      farm_id,
      bird_count,
      weight_category
    `);

  if (inventoryError) {
    console.error(
      "[DEMAND_SUPPLY][INVENTORY]",
      inventoryError
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Demand vs Supply
      </h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ZONES.map((zone) => {
          // -----------------------------
          // Demand
          // -----------------------------

          const zoneOrders =
            (orders ?? []).filter(
              (order: any) => {
                const retailer =
                  (retailers ?? []).find(
                    (r: any) =>
                      r.mobile ===
                      order.mobile
                  );

                return (
                  retailer?.zone ===
                  zone
                );
              }
            );

          let demandKg = 0;

          zoneOrders.forEach(
            (order: any) => {
              const requestedWeight =
                Number(
                  order.requested_weight ??
                    0
                );

              const birds =
                Number(
                  order.birds ?? 0
                );

              const averageWeight =
                Number(
                  order.average_weight ??
                    0
                );

              if (
                requestedWeight >
                0
              ) {
                demandKg +=
                  requestedWeight;
              } else if (
                birds > 0 &&
                averageWeight > 0
              ) {
                demandKg +=
                  birds *
                  averageWeight;
              }
            }
          );

          // -----------------------------
          // Supply
          // -----------------------------

          const approvedFarmIds =
            (farms ?? [])
              .filter(
                (farm: any) =>
                  farm.zone ===
                  zone
              )
              .map(
                (farm: any) =>
                  farm.id
              );

          const zoneInventory =
            (inventory ?? []).filter(
              (item: any) =>
                approvedFarmIds.includes(
                  item.farm_id
                )
            );

          let supplyKg = 0;

          zoneInventory.forEach(
            (item: any) => {
              const birds =
                Number(
                  item.bird_count ??
                    0
                );

              const weight =
                Number(
                  item.weight_category ??
                    0
                );

              supplyKg +=
                birds * weight;
            }
          );

          const balance =
            supplyKg - demandKg;

          return (
            <div
              key={zone}
              className="rounded-xl border bg-white p-6"
            >
              <h2 className="mb-4 text-xl font-bold capitalize">
                {zone} Bangalore
              </h2>

              <p>
                Demand:{" "}
                <strong>
                  {Math.round(
                    demandKg
                  )}{" "}
                  Kg
                </strong>
              </p>

              <p>
                Supply:{" "}
                <strong>
                  {Math.round(
                    supplyKg
                  )}{" "}
                  Kg
                </strong>
              </p>

              <p
                className={
                  balance >= 0
                    ? "font-bold text-green-600"
                    : "font-bold text-red-600"
                }
              >
                {balance >= 0
                  ? "Surplus"
                  : "Shortfall"}
                :{" "}
                {Math.abs(
                  Math.round(
                    balance
                  )
                )}{" "}
                Kg
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}