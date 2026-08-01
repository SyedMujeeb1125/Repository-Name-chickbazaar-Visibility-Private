export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";
import { AdminOrdersList } from "@/components/admin-orders-list";

export default async function OrdersPage() {
  const {
    data: orders,
    error,
  } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "[ADMIN_ORDERS]",
      error
    );
  }

  console.log(
    "ADMIN ORDERS COUNT:",
    orders?.length ?? 0
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Orders
      </h1>

      <AdminOrdersList
        orders={orders ?? []}
      />
    </div>
  );
}