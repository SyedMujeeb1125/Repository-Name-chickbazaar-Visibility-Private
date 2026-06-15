import { readDb } from "@/lib/storage";
import { AdminOrdersList } from "@/components/admin-orders-list";

export default async function OrdersPage() {
  const db = await readDb();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Orders
      </h1>

      <AdminOrdersList
        orders={db.orders}
      />
    </div>
  );
}