import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProcurementPage() {
  const farmName = "sffdsfdfvfds"; // Your test farm

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("assigned_farm", farmName)
    .eq("status", "allocated")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Farm Procurement
      </h1>

      {!orders?.length && (
        <div className="rounded border bg-white p-5">
          No allocated orders.
        </div>
      )}

      {orders?.map((order: any) => (
        <div
          key={order.id}
          className="mb-5 rounded-xl border bg-white p-5"
        >
          <p>
            <strong>Order:</strong> {order.order_number}
          </p>

          <p>
            <strong>Shop:</strong> {order.shop_name}
          </p>

          <p>
            <strong>Birds:</strong> {order.birds}
          </p>

          <p>
            <strong>Driver:</strong> {order.assigned_driver}
          </p>

          <p>
            <strong>Vehicle:</strong> {order.assigned_vehicle}
          </p>

          <p>
            <strong>Delivery Date:</strong> {order.delivery_date}
          </p>

          <form
            action="/api/farm/procure"
            method="POST"
            className="mt-5"
          >
            <input
              type="hidden"
              name="orderId"
              value={order.id}
            />

            <button
              className="rounded bg-green-600 px-4 py-2 text-white"
            >
              Mark Procured
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}