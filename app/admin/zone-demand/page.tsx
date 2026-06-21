import { readDb } from "@/lib/storage";

const ZONES = [
  "north",
  "south",
  "east",
  "west",
  "central"
];

export default async function ZoneDemandPage() {
  const db = await readDb();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Zone Demand Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ZONES.map((zone) => {
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

          let birdOrders = 0;
          let weightOrders = 0;
          let totalKg = 0;

          zoneOrders.forEach(
            (order: any) => {
              const birds =
                Number(
                  order.birds || 0
                );

              const avgWeight =
                Number(
                  order.averageWeight || 0
                );

              const requestedWeight =
                Number(
                  order.requestedWeight ||
                    0
                );

              if (
                requestedWeight > 0
              ) {
                weightOrders +=
                  requestedWeight;

                totalKg +=
                  requestedWeight;
              } else if (
                birds > 0 &&
                avgWeight > 0
              ) {
                birdOrders +=
                  birds;

                totalKg +=
                  birds * avgWeight;
              }
            }
          );

          return (
            <div
              key={zone}
              className="rounded-xl border bg-white p-6"
            >
              <h2 className="mb-4 text-xl font-bold capitalize">
                {zone} Bangalore
              </h2>

              <p>
                Orders:
                {" "}
                <strong>
                  {
                    zoneOrders.length
                  }
                </strong>
              </p>

              <p>
                Bird Orders:
                {" "}
                <strong>
                  {birdOrders}
                </strong>
              </p>

              <p>
                Weight Orders:
                {" "}
                <strong>
                  {weightOrders}
                  {" "}Kg
                </strong>
              </p>

              <p>
                Total Demand:
                {" "}
                <strong>
                  {Math.round(
                    totalKg
                  )}
                  {" "}Kg
                </strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}