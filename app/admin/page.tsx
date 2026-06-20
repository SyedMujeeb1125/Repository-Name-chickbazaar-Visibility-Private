import Link from "next/link";
import { readDb } from "@/lib/storage";

export default async function AdminPage() {
  const db = await readDb();

  const totalOrders =
    db.orders.length;

  const totalRetailers =
    db.retailers.length;

  const totalFarms =
    db.farmPartners.length;

  const pendingRetailers =
    db.retailers.filter(
      (r: any) =>
        r.status === "new"
    ).length;

  const pendingFarms =
    db.farmPartners.filter(
      (f: any) =>
        f.status === "new"
    ).length;

  const totalBirds =
  db.orders.reduce(
    (sum: number, order: any) =>
      sum +
      Number(order.birds || 0),
    0
  );
  const today = new Date()
  .toISOString()
  .split("T")[0];

const todaysOrders =
  db.orders.filter(
    (o: any) =>
      o.createdAt &&
      o.createdAt.startsWith(today)
  ).length;

const totalOutstanding =
  db.orders.reduce(
    (sum: number, order: any) =>
      sum +
      Number(
        order.outstandingAmount || 0
      ),
    0
  );
  const recentOrders = [...db.orders]
  .sort(
    (a: any, b: any) =>
      new Date(
        b.createdAt || b.id
      ).getTime() -
      new Date(
        a.createdAt || a.id
      ).getTime()
  )
  .slice(0, 5);

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">
        Admin Dashboard
      </h1>

      <div className="mb-8 grid gap-4 md:grid-cols-6">

        <div className="rounded-xl bg-orange p-5 text-white">
          <p>Total Orders</p>
          <p className="text-3xl font-bold">
            {totalOrders}
          </p>
        </div>

        <div className="rounded-xl bg-green-600 p-5 text-white">
          <p>Retailers</p>
          <p className="text-3xl font-bold">
            {totalRetailers}
          </p>
        </div>

        <div className="rounded-xl bg-blue-600 p-5 text-white">
          <p>Farms</p>
          <p className="text-3xl font-bold">
            {totalFarms}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-5 text-white">
          <p>Total Birds</p>
          <p className="text-3xl font-bold">
            {totalBirds}
          </p>
        </div>
        <div className="rounded-xl bg-red-600 p-5 text-white">
  <p>Outstanding</p>

  <p className="text-3xl font-bold">
    ₹{totalOutstanding}
  </p>
</div>
<div className="rounded-xl bg-purple-600 p-5 text-white">
  <p>Today's Orders</p>
  <p className="text-3xl font-bold">
    {todaysOrders}
  </p>
</div>

      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">

        <div className="rounded-xl border bg-white p-5">
          <h3 className="mb-2 text-xl font-bold">
            Pending Retailers
          </h3>

          <p className="text-4xl font-bold text-orange">
            {pendingRetailers}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <h3 className="mb-2 text-xl font-bold">
            Pending Farms
          </h3>

          <p className="text-4xl font-bold text-orange">
            {pendingFarms}
          </p>
        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
  href="/admin/outstanding"
  className="rounded-xl border bg-white p-6 font-semibold hover:bg-slate-50"
>
  Outstanding Dashboard
</Link>

        <Link
          href="/admin/orders"
          className="rounded-xl border bg-white p-6 font-semibold hover:bg-slate-50"
        >
          Manage Orders
        </Link>

        <Link
  href="/admin/invoices"
  className="rounded-xl border bg-white p-6 font-semibold hover:bg-slate-50"
>
  Invoices
</Link>

        <Link
          href="/admin/retailers"
          className="rounded-xl border bg-white p-6 font-semibold hover:bg-slate-50"
        >
          Manage Retailers
        </Link>

        <Link
  href="/admin/settlement"
  className="rounded-xl border bg-white p-6 font-semibold hover:bg-slate-50"
>
  Settlement
</Link>

        <Link
          href="/admin/farms"
          className="rounded-xl border bg-white p-6 font-semibold hover:bg-slate-50"
        >
          Manage Farms
        </Link>

      </div>
      <div className="mt-8 rounded-xl border bg-white p-6">
  <h2 className="mb-4 text-xl font-bold">
    Recent Orders
  </h2>

  {recentOrders.length === 0 ? (
    <p>No orders found.</p>
  ) : (
    <div className="space-y-3">
      {recentOrders.map(
        (order: any) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b pb-3"
          >
            <div>
              <p className="font-semibold">
                {order.orderNumber ||
                  order.id}
              </p>

              <p className="text-sm text-slate-500">
                {order.shopName}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                {order.birds} Birds
              </p>

              <p className="text-sm text-slate-500">
                {order.status}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  )}
</div>
    </div>
  );
}