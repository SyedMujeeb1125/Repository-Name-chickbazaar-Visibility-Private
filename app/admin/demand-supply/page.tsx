import { readDb } from "@/lib/storage";

const ZONES = [
  "north",
  "south",
  "east",
  "west",
  "central"
];

export default async function DemandSupplyPage() {
  const db = await readDb();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Demand vs Supply
      </h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ZONES.map((zone) => {
          // DEMAND

          const zoneOrders =
            db.orders.filter((order: any) => {
              const retailer =
                db.retailers.find(
                  (r: any) =>
                    r.mobile ===
                    order.mobile
                );

              return (
                retailer?.zone === zone &&
                order.status !==
                  "cancelled"
              );
            });

          let demandKg = 0;

          zoneOrders.forEach(
            (order: any) => {
              const requestedWeight =
                Number(
                  order.requestedWeight ||
                    0
                );

              const birds =
                Number(
                  order.birds || 0
                );

              const avgWeight =
                Number(
                  order.averageWeight ||
                    0
                );

              if (
                requestedWeight > 0
              ) {
                demandKg +=
                  requestedWeight;
              } else if (
                birds > 0 &&
                avgWeight > 0
              ) {
                demandKg +=
                  birds *
                  avgWeight;
              }
            }
          );

          // SUPPLY

          const approvedFarmIds =
            db.farmPartners
              .filter(
                (farm: any) =>
                  farm.status ===
                    "approved" &&
                  farm.zone === zone
              )
              .map(
                (farm: any) =>
                  farm.id
              );

          const zoneInventory =
            db.farmInventory.filter(
              (item: any) =>
                approvedFarmIds.includes(
                  item.farmId
                )
            );

          let supplyKg = 0;

          zoneInventory.forEach(
            (item: any) => {
              const birds =
                Number(
                  item.birdCount || 0
                );

              const weight =
                Number(
                  item.weightCategory ||
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
                Demand:
                {" "}
                <strong>
                  {Math.round(
                    demandKg
                  )}
                  {" "}Kg
                </strong>
              </p>

              <p>
                Supply:
                {" "}
                <strong>
                  {Math.round(
                    supplyKg
                  )}
                  {" "}Kg
                </strong>
              </p>

              <p
                className={
                  balance >= 0
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {balance >= 0
                  ? "Surplus"
                  : "Shortfall"}
                :
                {" "}
                {Math.abs(
                  Math.round(
                    balance
                  )
                )}
                {" "}Kg
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}