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

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">
        Admin Dashboard
      </h1>

      <div className="mb-8 grid gap-4 md:grid-cols-4">

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
          href="/admin/orders"
          className="rounded-xl border bg-white p-6 font-semibold hover:bg-slate-50"
        >
          Manage Orders
        </Link>

        <Link
          href="/admin/retailers"
          className="rounded-xl border bg-white p-6 font-semibold hover:bg-slate-50"
        >
          Manage Retailers
        </Link>

        <Link
          href="/admin/farms"
          className="rounded-xl border bg-white p-6 font-semibold hover:bg-slate-50"
        >
          Manage Farms
        </Link>

      </div>
    </div>
  );
}