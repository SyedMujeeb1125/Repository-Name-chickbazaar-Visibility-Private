type Props = {
  orders: number;
  retailers: number;
  farms: number;
  todayRate: number;
};

export function AdminHome({
  orders,
  retailers,
  farms,
  todayRate
}: Props) {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-extrabold text-navy">
          ChickBazaar Admin
        </h1>

        <p className="mt-2 text-slate-500">
          Operations Overview
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">

        <div className="rounded-xl bg-navy p-6 text-white">
          <p>Total Orders</p>
          <p className="mt-2 text-4xl font-bold">
            {orders}
          </p>
        </div>

        <div className="rounded-xl bg-orange p-6 text-white">
          <p>Retailers</p>
          <p className="mt-2 text-4xl font-bold">
            {retailers}
          </p>
        </div>

        <div className="rounded-xl bg-green-600 p-6 text-white">
          <p>Farm Partners</p>
          <p className="mt-2 text-4xl font-bold">
            {farms}
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 p-6 text-white">
          <p>Today's Rate</p>
          <p className="mt-2 text-4xl font-bold">
            ₹{todayRate}
          </p>
        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <a
          href="/admin/orders"
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <h3 className="text-xl font-bold">
            Orders
          </h3>

          <p className="mt-2 text-slate-500">
            View and manage orders
          </p>
        </a>

        <a
          href="/admin/retailers"
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <h3 className="text-xl font-bold">
            Retailers
          </h3>

          <p className="mt-2 text-slate-500">
            Approvals & shops
          </p>
        </a>

        <a
          href="/admin/farms"
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <h3 className="text-xl font-bold">
            Farm Partners
          </h3>

          <p className="mt-2 text-slate-500">
            Farm management
          </p>
        </a>

      </div>

    </div>
  );
}