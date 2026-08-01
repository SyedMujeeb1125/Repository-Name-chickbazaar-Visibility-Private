export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

export default async function SettlementPage() {
  const {
    data: orders,
    error,
  } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      shop_name,
      status
    `)
    .in("status", [
      "delivered",
      "confirmed",
    ])
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "[SETTLEMENT]",
      error
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Settlement
      </h1>

      <div className="space-y-4">
        {(orders ?? []).map(
          (order: any) => (
            <div
              key={order.id}
              className="rounded-lg border bg-white p-5"
            >
              <h3 className="font-bold">
                {order.order_number}
              </h3>

              <p>
                {order.shop_name}
              </p>

              <p>
                Status: {order.status}
              </p>

              <a
                href={`/admin/settlement/${order.id}`}
                className="mt-3 inline-block rounded bg-orange px-4 py-2 text-white"
              >
                Settle Order
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
}