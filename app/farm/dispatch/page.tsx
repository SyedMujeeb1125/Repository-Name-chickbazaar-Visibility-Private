import { supabase } from "@/lib/supabase";

export default async function DispatchPage() {
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("status", "procured")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Dispatch Dashboard
      </h1>

      {!orders?.length && (
        <p>No orders ready for dispatch.</p>
      )}

      {orders?.map((order: any) => (
        <div
          key={order.id}
          className="mb-5 rounded-xl border bg-white p-5"
        >
          <p><strong>Order:</strong> {order.order_number}</p>
          <p><strong>Shop:</strong> {order.shop_name}</p>
          <p><strong>Driver:</strong> {order.assigned_driver}</p>
          <p><strong>Vehicle:</strong> {order.assigned_vehicle}</p>

          <form
            action="/api/farm/dispatch"
            method="POST"
            className="mt-4"
          >
            <input
              type="hidden"
              name="orderId"
              value={order.id}
            />

            <button
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Dispatch Vehicle
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}