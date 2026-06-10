import { redirect } from "next/navigation";
import { getLoggedInRetailerMobile } from "@/lib/retailer";
import { readDb } from "@/lib/storage";
const orderSteps = [
  "new",
  "confirmed",
  "procured",
  "dispatched",
  "delivered",
  "completed"
];
export default async function DashboardPage() {
  const mobile = await getLoggedInRetailerMobile();

  if (!mobile) {
    redirect("/login");
  }

  const db = await readDb();
  const retailer = db.retailers.find(
  (r: any) => r.mobile === mobile
  );
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
      {retailer?.status === "new" ? (
  <div className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-4">
    <p className="font-bold text-yellow-800">
      Account Under Review
    </p>

    <p className="text-sm text-yellow-700">
      Your retailer profile is being verified by ChickBazaar.
      Ordering will be enabled after approval.
    </p>
  </div>
) : (
  <div className="mt-4 rounded-lg border border-green-300 bg-green-50 p-4">
    <p className="font-bold text-green-800">
      Approved Retailer
    </p>

    <p className="text-sm text-green-700">
      Your account is verified and fully active.
    </p>
  </div>
)}
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
            myOrders.map((order: any) => {
  const currentStep = orderSteps.indexOf(order.status);

  return (
    <div
      key={order.id}
      className="rounded-lg border p-5"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-bold text-orange">
            {order.orderNumber || order.id}
          </p>

          <p className="font-bold text-lg">
            {order.shopName}
          </p>

          <p className="text-sm text-slate-500">
            {order.birds} birds
          </p>

          <p className="mt-2 text-sm">
            Payment:{" "}
            <span className="font-semibold">
              {order.paymentStatus || "pending"}
            </span>
          </p>
        </div>

        <span className="rounded bg-slate-100 px-3 py-1 text-sm font-semibold">
          {order.status}
        </span>
      </div>

      <div className="mt-4">
        <p className="font-semibold mb-2">
          Order Progress
        </p>

        <div className="grid gap-2">
          {orderSteps.map((step, index) => (
            <div
              key={step}
              className={`text-sm ${
                index <= currentStep
                  ? "text-green-600 font-semibold"
                  : "text-slate-400"
              }`}
            >
              {index <= currentStep ? "✓" : "○"}{" "}
              {step.charAt(0).toUpperCase() +
                step.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
})
          )}
        </div>
      </div>
    </div>
  );
}