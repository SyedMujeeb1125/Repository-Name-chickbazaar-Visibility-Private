import { notFound } from "next/navigation";
import { readDb } from "@/lib/storage";

export default async function SettlementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const db = await readDb();

  const order = db.orders.find(
    (o: any) => o.id === id
  );

  if (!order) {
    return notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Order Settlement
      </h1>

      <div className="rounded-lg border bg-white p-6">

        <p>
          <strong>Order:</strong>{" "}
          {order.orderNumber}
        </p>

        <p>
          <strong>Retailer:</strong>{" "}
          {order.shopName}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {order.status}
        </p>

        <form
          action="/api/admin/order-settlement"
          method="POST"
          className="mt-6 space-y-4"
        >
          <input
            type="hidden"
            name="orderId"
            value={order.id}
          />

          <div>
            <label className="block mb-1 font-medium">
              Actual Weight (Kg)
            </label>

            <input
              type="number"
              step="0.01"
              name="actualWeight"
              defaultValue={
                order.actualWeight || ""
              }
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Rate Per Kg
            </label>

            <input
              type="number"
              step="0.01"
              name="ratePerKg"
              defaultValue={
                order.ratePerKg || 0
              }
              className="w-full rounded border p-3"
            />
          </div>

          <button
            className="rounded bg-green-600 px-5 py-3 text-white"
          >
            Save Settlement
          </button>
          <form
  action="/api/admin/status"
  method="POST"
  className="mt-4"
>
  <input
    type="hidden"
    name="collection"
    value="orders"
  />

  <input
    type="hidden"
    name="id"
    value={order.id}
  />

  <input
    type="hidden"
    name="status"
    value="completed"
  />

  <button
    className="rounded bg-orange px-5 py-3 text-white font-bold"
  >
    Complete Order
  </button>
</form>
        </form>

      </div>
    </div>
  );
}