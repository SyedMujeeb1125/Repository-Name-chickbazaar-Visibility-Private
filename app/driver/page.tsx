import { readDb } from "@/lib/storage";
import Link from "next/link";

export default async function DriverPage() {
  const db = await readDb();

  const driverName = "Ramesh";

  const myOrders = db.orders.filter(
    (o: any) =>
      o.assignedDriver === driverName &&
      [
        "new",
        "confirmed",
        "allocated",
        "procured",
        "dispatched",
      ].includes(o.status)
  );

  const myVehicle = db.vehicles.find(
  (v: any) => v.assignedDriver === driverName
);

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
        Vehicle: {myVehicle?.vehicleNumber || "-"}
      </p>

      <p>
        Zone: {myVehicle?.zone || "-"}
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
            <p><strong>Order:</strong> {order.orderNumber}</p>
            <p><strong>Shop:</strong> {order.shopName}</p>
            <p><strong>Status:</strong> {order.status}</p>

            <Link
              href={`/driver/order/${order.id}`}
              className="inline-block mt-3 rounded bg-green-600 px-4 py-2 text-white"
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