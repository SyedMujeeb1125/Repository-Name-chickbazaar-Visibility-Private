import { supabase } from "@/lib/supabase";

export default async function DriverAssignmentPage() {
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .in("status", ["new", "confirmed"]);

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*");

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Driver Assignment
      </h1>

      {!orders?.length && (
        <p>No orders waiting for assignment.</p>
      )}

      {orders?.map((order: any) => (
        <div
          key={order.id}
          className="mb-5 rounded-xl border bg-white p-5"
        >
          <p><strong>Order:</strong> {order.order_number}</p>
          <p><strong>Shop:</strong> {order.shop_name}</p>
          <p><strong>Birds:</strong> {order.birds}</p>

          <form
            action="/api/admin/driver-assignment"
            method="POST"
            className="mt-4"
          >
            <input
              type="hidden"
              name="orderId"
              value={order.id}
            />

            <select
              name="vehicleId"
              className="rounded border p-2"
              required
            >
              <option value="">
                Select Vehicle
              </option>

              {vehicles?.map((v: any) => (
                <option
                  key={v.id}
                  value={v.id}
                >
                  {v.vehicle_number}
                  {" - "}
                  {v.assigned_driver}
                </option>
              ))}
            </select>

            <button
              className="ml-3 rounded bg-green-600 px-4 py-2 text-white"
            >
              Assign
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}