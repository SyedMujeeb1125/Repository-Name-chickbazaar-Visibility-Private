import { supabase } from "@/lib/supabase";

export default async function DeliveryPage() {
  // ---------------------------------
  // Drivers
  // ---------------------------------

  const {
    data: deliveryUsers,
    error: usersError,
  } = await supabase
    .from("users")
    .select(`
      id,
      name,
      role
    `)
    .eq("role", "delivery")
    .order("name");

  if (usersError) {
    console.error(
      "[DELIVERY][USERS]",
      usersError
    );
  }

  // ---------------------------------
  // Vehicles
  // ---------------------------------

  const {
    data: vehicles,
    error: vehiclesError,
  } = await supabase
    .from("vehicles")
    .select(`
      id,
      vehicle_number,
      zone,
      assigned_driver
    `);

  if (vehiclesError) {
    console.error(
      "[DELIVERY][VEHICLES]",
      vehiclesError
    );
  }

  // ---------------------------------
  // Orders
  // ---------------------------------

  const {
    data: deliveryOrders,
    error: ordersError,
  } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      shop_name,
      status,
      assigned_driver
    `)
    .in("status", [
      "dispatched",
      "delivered",
    ])
    .order("created_at", {
      ascending: false,
    });

  if (ordersError) {
    console.error(
      "[DELIVERY][ORDERS]",
      ordersError
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Delivery Operations
      </h1>

      <div className="space-y-6">

        {(deliveryUsers ?? []).length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-center text-slate-500">
            No delivery staff found.
          </div>
        ) : (
          (deliveryUsers ?? []).map(
            (driver: any) => {

              const assignedVehicle =
                (vehicles ?? []).find(
                  (vehicle: any) =>
                    vehicle.assigned_driver ===
                    driver.name
                );

              const driverOrders =
                (deliveryOrders ?? [])
                  .filter(
                    (order: any) =>
                      order.assigned_driver ===
                      driver.name
                  )
                  .slice(0, 10);

              return (
                <div
                  key={driver.id}
                  className="rounded-xl border bg-white p-6"
                >
                  <h2 className="text-xl font-bold">
                    {driver.name}
                  </h2>

                  <p>
                    Vehicle:{" "}
                    {assignedVehicle?.vehicle_number ??
                      "Not Assigned"}
                  </p>

                  <p>
                    Zone:{" "}
                    {assignedVehicle?.zone ??
                      "-"}
                  </p>

                  <div className="mt-4">
                    <h3 className="font-semibold">
                      Orders
                    </h3>

                    {driverOrders.length === 0 ? (
                      <p className="mt-2 text-slate-500">
                        No assigned orders.
                      </p>
                    ) : (
                      driverOrders.map(
                        (order: any) => (
                          <div
                            key={order.id}
                            className="border-b py-2"
                          >
                            <p>
                              {order.order_number}
                            </p>

                            <p>
                              {order.shop_name}
                            </p>

                            <p className="capitalize">
                              {order.status}
                            </p>
                          </div>
                        )
                      )
                    )}

                  </div>
                </div>
              );
            }
          )
        )}

      </div>
    </div>
  );
}