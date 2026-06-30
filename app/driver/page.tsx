import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DriverPage() {
  const driverName = "Ramesh";

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("assigned_driver", driverName)
    .in("status", [
      "new",
      "confirmed",
      "allocated",
      "procured",
      "dispatched",
    ]);

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("assigned_driver", driverName)
    .single();

  const myOrders = orders ?? [];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Driver Dashboard
      </h1>

      <div className="mb-6 rounded-xl border bg-white p-5">
        <h2 className="text-xl font-bold">
          {driverName}
        </h2>

        <p>
          <strong>Vehicle:</strong>{" "}
          {vehicle?.vehicle_number || "-"}
        </p>

        <p>
          <strong>Zone:</strong>{" "}
          {vehicle?.zone || "-"}
        </p>
      </div>

      {myOrders.length === 0 ? (
        <div className="rounded-xl border bg-white p-5">
          <p>No orders assigned.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order: any) => (
            <div
              key={order.id}
              className="rounded-xl border bg-white p-5"
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
                <strong>Farm:</strong>{" "}
                {order.assigned_farm}
              </p>

              <p>
                <strong>Vehicle:</strong>{" "}
                {order.assigned_vehicle}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {order.status}
              </p>

              <p>
                <strong>Delivery Date:</strong>{" "}
                {order.delivery_date}
              </p>

              <Link
                href={`/driver/order/${order.id}`}
                className="mt-3 inline-block rounded bg-green-600 px-4 py-2 text-white"
              >
                Open Delivery
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}