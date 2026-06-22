import { readDb } from "@/lib/storage";
import Link from "next/link";

export default async function DriverOrderPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const db = await readDb();

  const order = db.orders.find(
    (o: any) => o.id === id
  );

  console.log("Route ID:", id);

console.log(
  "Orders Count:",
  db.orders.length
);

console.log(
  "Matching Order:",
  db.orders.find(
    (o: any) => o.id === id
  )
);

  if (!order) {
    return <div>Order not found</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const mapsUrl = `https://www.google.com/maps?q=${order.latitude},${order.longitude}`;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Delivery Details
      </h1>

      <div className="rounded-lg border bg-white p-5">

        <p>
          <strong>Order:</strong>{" "}
          {order.orderNumber}
        </p>

        <p>
          <strong>Shop:</strong>{" "}
          {order.shopName}
        </p>

        <p>
          <strong>Owner:</strong>{" "}
          {order.ownerName}
        </p>

        <p>
          <strong>Mobile:</strong>{" "}
          {order.mobile}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {order.address}
        </p>

        <p>
          <strong>Birds:</strong>{" "}
          {order.birds}
        </p>

        <p>
          <strong>Farm:</strong>{" "}
          {order.assignedFarm}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {order.status}
        </p>

        <div className="mt-5 flex gap-3">

          <a
            href={`tel:${order.mobile}`}
            className="rounded bg-green-600 px-4 py-2 text-white"
          >
            Call Customer
          </a>

          <a
            href={`https://wa.me/91${order.mobile}`}
            target="_blank"
            className="rounded bg-green-700 px-4 py-2 text-white"
          >
            WhatsApp
          </a>

          <a
            href={mapsUrl}
            target="_blank"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Navigate
          </a>

        </div>
        <form
  action="/api/driver/deliver"
  method="POST"
  encType="multipart/form-data"
  className="mt-6"
>
  <input
    type="hidden"
    name="orderId"
    value={order.id}
  />

  <input
    type="number"
    step="0.01"
    name="actualWeight"
    placeholder="Actual Weight (Kg)"
    className="w-full rounded border p-3"
    required
  />

<input
  type="file"
  name="podPhoto"
  accept="image/*"
  className="mt-3 w-full rounded border p-3"
/>
  <textarea
  name="deliveryNotes"
  placeholder="Delivery Notes"
  rows={3}
  className="mt-3 w-full rounded border p-3"
/>

  <button
    type="submit"
    className="mt-3 rounded bg-green-600 px-4 py-2 text-white"
  >
    Mark Delivered
  </button>
</form>
      </div>
    </div>
  );
}