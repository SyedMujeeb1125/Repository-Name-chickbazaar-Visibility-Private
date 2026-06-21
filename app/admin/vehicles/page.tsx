import { readDb } from "@/lib/storage";

export default async function VehiclesPage() {
  const db = await readDb();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Vehicles
      </h1>

      <div className="space-y-4">
        {db.vehicles.map(
          (vehicle: any) => (
            <div
              key={vehicle.id}
              className="rounded-lg border bg-white p-5"
            >
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
                  Zone:
                </strong>{" "}
                {vehicle.zone}
              </p>

              <p>
                <strong>
                  Capacity:
                </strong>{" "}
                {
                  vehicle.capacityKg
                } Kg
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {
                  vehicle.status
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}