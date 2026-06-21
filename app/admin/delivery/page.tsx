import { readDb } from "@/lib/storage";

export default async function DeliveryPage() {
  const db = await readDb();

  const deliveryUsers =
    db.users.filter(
      (u: any) =>
        u.role === "delivery"
    );

  const deliveryOrders =
    db.orders.filter(
      (o: any) =>
        o.status ===
          "dispatched" ||
        o.status ===
          "delivered"
    );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Delivery Operations
      </h1>

      <div className="space-y-6">
        {deliveryUsers.map(
          (driver: any) => {
            const assignedVehicle =
              db.vehicles.find(
                (v: any) =>
                  v.assignedDriver ===
                  driver.name
              );

            return (
              <div
                key={driver.id}
                className="rounded-xl border bg-white p-6"
              >
                <h2 className="text-xl font-bold">
                  {driver.name}
                </h2>

                <p>
                  Vehicle:
                  {" "}
                  {assignedVehicle
                    ?.vehicleNumber ||
                    "Not Assigned"}
                </p>

                <p>
                  Zone:
                  {" "}
                  {assignedVehicle
                    ?.zone ||
                    "-"}
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold">
                    Orders
                  </h3>

                  {deliveryOrders
                    .slice(0, 10)
                    .map(
                      (
                        order: any
                      ) => (
                        <div
                          key={
                            order.id
                          }
                          className="border-b py-2"
                        >
                          <p>
                            {
                              order.orderNumber
                            }
                          </p>

                          <p>
                            {
                              order.shopName
                            }
                          </p>

                          <p>
                            {
                              order.status
                            }
                          </p>
                        </div>
                      )
                    )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}