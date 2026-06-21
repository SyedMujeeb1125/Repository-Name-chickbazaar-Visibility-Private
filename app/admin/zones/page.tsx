import { readDb } from "@/lib/storage";

const ZONES = [
  "north",
  "south",
  "east",
  "west",
  "central",
];

export default async function ZonesPage() {
  const db = await readDb();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Zone Operations Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ZONES.map((zone) => {
          const retailers =
            db.retailers.filter(
              (r: any) => r.zone === zone
            );

          const farms =
            db.farmPartners.filter(
              (f: any) => f.zone === zone
            );

          const drivers =
            db.users.filter(
              (u: any) =>
                u.role === "delivery" &&
                u.zone === zone
            );

          const orders =
            db.orders.filter(
              (o: any) => {
                const retailer =
                  db.retailers.find(
                    (r: any) =>
                      r.mobile === o.mobile
                  );

                return (
                  retailer?.zone === zone &&
                  o.status !== "cancelled"
                );
              }
            );

          const totalBirds =
            orders.reduce(
              (sum: number, o: any) =>
                sum +
                Number(o.birds || 0),
              0
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
                Retailers:{" "}
                <strong>
                  {retailers.length}
                </strong>
              </p>

              <p>
                Farms:{" "}
                <strong>
                  {farms.length}
                </strong>
              </p>

              <p>
                Drivers:{" "}
                <strong>
                  {drivers.length}
                </strong>
              </p>

              <p>
                Orders:{" "}
                <strong>
                  {orders.length}
                </strong>
              </p>

              <p>
                Birds Ordered:{" "}
                <strong>
                  {totalBirds}
                </strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}