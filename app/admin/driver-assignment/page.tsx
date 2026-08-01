import { supabase } from "@/lib/supabase";

export default async function DriverAssignmentPage() {
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
      order_number,
      shop_name,
      birds,
      status
    `)
    .in("status", [
      "new",
      "confirmed",
    ])
    .order("created_at", {
      ascending: true,
    });

  if (ordersError) {
    console.error(
      "[DRIVER_ASSIGNMENT][ORDERS]",
      ordersError
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
      assigned_driver
    `)
    .order("vehicle_number");

  if (vehiclesError) {
    console.error(
      "[DRIVER_ASSIGNMENT][VEHICLES]",
      vehiclesError
    );
  }

  const availableVehicles =
    vehicles ?? [];

  return (
    <div className="p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Driver Assignment
      </h1>

      {(orders ?? []).length === 0 ? (
        <p>
          No orders waiting for assignment.
        </p>
      ) : (
        orders!.map(
          (order: any) => (
            <div
              key={order.id}
              className="mb-5 rounded-xl border bg-white p-5"
            >
              <p>
                <strong>Order:</strong>{" "}
                {order.order_number}
              </p>

              <p>
                <strong>Shop:</strong>{" "}
                {order.shop_name}
              </p>

              <p>
                <strong>Birds:</strong>{" "}
                {order.birds}
              </p>

              <form
                action="/api/admin/driver-assignment"
                method="POST"
                className="mt-4 flex flex-wrap items-center gap-3"
              >
                <input
                  type="hidden"
                  name="orderId"
                  value={order.id}
                />

                <select
                  name="vehicleId"
                  required
                  disabled={
                    availableVehicles.length ===
                    0
                  }
                  className="rounded border p-2"
                >
                  <option value="">
                    Select Vehicle
                  </option>

                  {availableVehicles.map(
                    (vehicle: any) => (
                      <option
                        key={vehicle.id}
                        value={vehicle.id}
                      >
                        {vehicle.vehicle_number}
                        {" - "}
                        {vehicle.assigned_driver ??
                          "No Driver"}
                      </option>
                    )
                  )}
                </select>

                <button
                  type="submit"
                  disabled={
                    availableVehicles.length ===
                    0
                  }
                  className="rounded bg-green-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Assign
                </button>

              </form>

              {availableVehicles.length ===
                0 && (
                <p className="mt-3 text-sm text-red-600">
                  No vehicles available for
                  assignment.
                </p>
              )}

            </div>
          )
        )
      )}

    </div>
  );
}