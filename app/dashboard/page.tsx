import { redirect } from "next/navigation";
import { getLoggedInRetailerMobile } from "@/lib/retailer";
import { readDb } from "@/lib/storage";

export default async function DashboardPage() {
  const mobile = await getLoggedInRetailerMobile();

  if (!mobile) {
    redirect("/login");
  }

  const db = await readDb();

  const myOrders = db.orders.filter(
    (order: any) => order.mobile === mobile
  );

  const totalOrders = myOrders.length;

  const pendingOrders = myOrders.filter(
    (order: any) =>
      order.status === "new" ||
      order.status === "confirmed" ||
      order.status === "procured" ||
      order.status === "dispatched"
  ).length;

  const completedOrders = myOrders.filter(
    (order: any) =>
      order.status === "delivered" ||
      order.status === "completed"
  ).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-navy">
        My Dashboard
      </h1>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-navy p-5 text-white">
          <p>Total Orders</p>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>

        <div className="rounded-lg bg-orange p-5 text-white">
          <p>Pending Orders</p>
          <p className="text-3xl font-bold">{pendingOrders}</p>
        </div>

        <div className="rounded-lg bg-green-600 p-5 text-white">
          <p>Completed Orders</p>
          <p className="text-3xl font-bold">{completedOrders}</p>
        </div>
      </div>

      <div className="mt-10 rounded-lg border bg-white p-6">
        <h2 className="text-xl font-bold">
          My Orders
        </h2>

        <div className="mt-6 space-y-4">
          {myOrders.length === 0 ? (
            <p className="text-slate-500">
              No orders found.
            </p>
          ) : (
            myOrders.map((order: any) => (
              <div
                key={order.id}
                className="rounded-lg border p-4"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">
                      {order.shop_name || order.shopName}
                    </p>

                    <p className="text-sm text-slate-500">
                      {order.birds} birds
                    </p>
                  </div>

                  <div>
                    <span className="rounded bg-slate-100 px-3 py-1 text-sm font-semibold">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}