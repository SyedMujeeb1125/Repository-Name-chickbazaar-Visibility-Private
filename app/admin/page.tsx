export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function AdminPage() {
  const [
    { data: orders, error: ordersError },
    { data: retailers, error: retailersError },
    { data: farmPartners, error: farmsError },
    { data: vehicles, error: vehiclesError },
    { data: ledger, error: ledgerError },
  ] = await Promise.all([
    supabase.from("orders").select("*"),
    supabase.from("retailers").select("*"),
    supabase.from("farm_partners").select("*"),
    supabase.from("vehicles").select("*"),
    supabase.from("retailer_ledger").select("*"),
  ]);

  if (ordersError)
    console.error("[ADMIN][ORDERS]", ordersError);

  if (retailersError)
    console.error("[ADMIN][RETAILERS]", retailersError);

  if (farmsError)
    console.error("[ADMIN][FARMS]", farmsError);

  if (vehiclesError)
    console.error("[ADMIN][VEHICLES]", vehiclesError);

  if (ledgerError)
    console.error("[ADMIN][LEDGER]", ledgerError);

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const totalOrders = (orders ?? []).length;

  const totalRetailers =
    (retailers ?? []).length;

  const totalFarms =
    (farmPartners ?? []).length;

  const activeVehicles =
    (vehicles ?? []).filter(
      (v: any) =>
        !!v.vehicle_number
    ).length;

  const totalBirds =
    (orders ?? []).reduce(
      (
        sum: number,
        order: any
      ) =>
        sum +
        Number(
          order.birds ?? 0
        ),
      0
    );

  const ledgerOutstanding =
    (ledger ?? []).reduce(
      (
        sum: number,
        row: any
      ) =>
        sum +
        Number(
          row.debit ?? 0
        ) -
        Number(
          row.credit ?? 0
        ),
      0
    );

  const totalCollected =
    (ledger ?? []).reduce(
      (
        sum: number,
        row: any
      ) =>
        sum +
        Number(
          row.credit ?? 0
        ),
      0
    );

  const blockedRetailers =
    (retailers ?? []).filter(
      (r: any) =>
        Number(
          r.available_credit ?? 0
        ) === 0 &&
        Number(
          r.credit_limit ?? 0
        ) > 0
    ).length;

  const healthyRetailers =
    (retailers ?? []).filter(
      (r: any) =>
        Number(
          r.available_credit ?? 0
        ) >
        Number(
          r.credit_limit ?? 0
        ) * 0.5
    ).length;

  const pendingRetailers =
    (retailers ?? []).filter(
      (r: any) =>
        r.status === "new"
    ).length;

  const pendingFarms =
    (farmPartners ?? []).filter(
      (f: any) =>
        f.status === "new"
    ).length;

  const todaysOrders =
    (orders ?? []).filter(
      (o: any) =>
        o.created_at &&
        o.created_at.startsWith(
          today
        )
    ).length;

  const deliveredOrders =
    (orders ?? []).filter(
      (o: any) =>
        o.status ===
          "delivered" ||
        o.status ===
          "completed"
    ).length;

  const pendingDeliveries =
    (orders ?? []).filter(
      (o: any) =>
        o.status ===
          "confirmed" ||
        o.status ===
          "procured" ||
        o.status ===
          "dispatched"
    ).length;

  const todaysRevenue =
    (orders ?? [])
      .filter(
        (o: any) =>
          o.created_at &&
          o.created_at.startsWith(
            today
          )
      )
      .reduce(
        (
          sum: number,
          o: any
        ) =>
          sum +
          Number(
            o.final_amount ??
              0
          ),
        0
      );

  const totalRevenue =
    (orders ?? []).reduce(
      (
        sum: number,
        o: any
      ) =>
        sum +
        Number(
          o.final_amount ??
            0
        ),
      0
    );

  const totalOutstanding =
    (orders ?? []).reduce(
      (
        sum: number,
        order: any
      ) =>
        sum +
        Number(
          order.outstanding_amount ??
            0
        ),
      0
    );

  const recentOrders = [
    ...(orders ?? []),
  ]
    .sort(
      (
        a: any,
        b: any
      ) =>
        new Date(
          b.created_at ??
            0
        ).getTime() -
        new Date(
          a.created_at ??
            0
        ).getTime()
    )
    .slice(0, 5);

  return (
  <div>
    <h1 className="mb-8 text-4xl font-bold">
      Admin Dashboard
    </h1>

    <div className="mb-8 grid gap-4 md:grid-cols-4 lg:grid-cols-8">

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

      <div className="rounded-xl bg-cyan-600 p-5 text-white">
        <p>Vehicles</p>

        <p className="text-3xl font-bold">
          {activeVehicles}
        </p>
      </div>

      <div className="rounded-xl bg-slate-800 p-5 text-white">
        <p>Total Birds</p>

        <p className="text-3xl font-bold">
          {totalBirds.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="rounded-xl bg-red-600 p-5 text-white">
        <p>Outstanding</p>

        <p className="text-3xl font-bold">
          ₹{ledgerOutstanding.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="rounded-xl bg-green-700 p-5 text-white">
        <p>Collected</p>

        <p className="text-3xl font-bold">
          ₹{totalCollected.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="rounded-xl bg-red-800 p-5 text-white">
        <p>Blocked</p>

        <p className="text-3xl font-bold">
          {blockedRetailers}
        </p>
      </div>

      <div className="rounded-xl bg-emerald-600 p-5 text-white">
        <p>Healthy</p>

        <p className="text-3xl font-bold">
          {healthyRetailers}
        </p>
      </div>

      <div className="rounded-xl bg-purple-600 p-5 text-white">
        <p>Today's Orders</p>

        <p className="text-3xl font-bold">
          {todaysOrders}
        </p>
      </div>

      <div className="rounded-xl bg-emerald-700 p-5 text-white">
        <p>Delivered</p>

        <p className="text-3xl font-bold">
          {deliveredOrders}
        </p>
      </div>

      <div className="rounded-xl bg-yellow-600 p-5 text-white">
        <p>Pending Delivery</p>

        <p className="text-3xl font-bold">
          {pendingDeliveries}
        </p>
      </div>

      <div className="rounded-xl bg-indigo-600 p-5 text-white">
        <p>Today's Revenue</p>

        <p className="text-3xl font-bold">
          ₹{todaysRevenue.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="rounded-xl bg-indigo-800 p-5 text-white">
        <p>Total Revenue</p>

        <p className="text-3xl font-bold">
          ₹{totalRevenue.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="rounded-xl bg-rose-700 p-5 text-white">
        <p>Total Outstanding</p>

        <p className="text-3xl font-bold">
          ₹{totalOutstanding.toLocaleString("en-IN")}
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
    href="/admin/aging"
    className="rounded-xl border bg-white p-6 font-semibold hover:bg-slate-50"
  >
    Aging Report
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

  <Link
    href="/admin/procurement"
    className="rounded-xl border bg-white p-6 font-semibold hover:bg-slate-50"
  >
    Procurement
  </Link>

  <Link
    href="/admin/planning"
    className="rounded-xl border bg-white p-6 font-semibold hover:bg-slate-50"
  >
    Planning
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
            className="flex items-center justify-between border-b pb-3 last:border-0"
          >

            <div>

              <p className="font-semibold">
                {order.order_number ??
                  order.id}
              </p>

              <p className="text-sm text-slate-500">
                {order.shop_name}
              </p>

            </div>

            <div className="text-right">

              <p className="font-semibold">
                {Number(
                  order.birds ?? 0
                ).toLocaleString("en-IN")} Birds
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