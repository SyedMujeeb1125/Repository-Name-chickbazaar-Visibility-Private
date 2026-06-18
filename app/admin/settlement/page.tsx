import { readDb } from "@/lib/storage";

export default async function SettlementPage() {
  const db = await readDb();

  const orders = db.orders.filter(
    (o: any) =>
      o.status === "delivered" ||
      o.status === "confirmed"
  );

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Settlement
      </h1>

      <div className="space-y-4">
        {orders.map((order: any) => (
          <div
            key={order.id}
            className="rounded-lg border bg-white p-5"
          >
            <h3 className="font-bold">
              {order.orderNumber}
            </h3>

            <p>{order.shopName}</p>

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
        ))}
      </div>
    </div>
  );
}