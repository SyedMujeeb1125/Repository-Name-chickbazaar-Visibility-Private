import { readDb } from "@/lib/storage";

export default async function FleetPage() {
  const db = await readDb();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Fleet Operations
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        {db.vehicles.map(
          (vehicle: any) => {
            const zoneOrders =
              db.orders.filter(
                (order: any) => {
                  const retailer =
                    db.retailers.find(
                      (r: any) =>
                        r.mobile ===
                        order.mobile
                    );

                  return (
                    retailer?.zone ===
                    vehicle.zone
                  );
                }
              );

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

            return (
              <div
                key={vehicle.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <h2 className="mb-3 text-xl font-bold">
                  {String(
                    vehicle.zone
                  ).toUpperCase()}{" "}
                  Zone
                </h2>

                <p>
                  <strong>
                    Vehicle:
                  </strong>{" "}
                  {
                    vehicle.vehicleNumber
                  }
                </p>

                <p>
                  <strong>
                    Capacity:
                  </strong>{" "}
                  {
                    vehicle.capacityKg
                  }{" "}
                  Kg
                </p>

                <p>
                  <strong>
                    Driver:
                  </strong>{" "}
                  {vehicle.assignedDriver ||
                    "Not Assigned"}
                </p>

                <p>
                  <strong>
                    Orders:
                  </strong>{" "}
                  {
                    zoneOrders.length
                  }
                </p>

                <p>
                  <strong>
                    Demand:
                  </strong>{" "}
                  {Math.round(
                    demandKg
                  )}{" "}
                  Kg
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {vehicle.status}
                </p>

                <div
                  className={`mt-3 rounded p-2 ${
                    demandKg <=
                    vehicle.capacityKg
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {demandKg <=
                  vehicle.capacityKg
                    ? "Vehicle Capacity Sufficient"
                    : "Additional Vehicle Required"}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}