export const dynamic = "force-dynamic";

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
  const myOrders = db.orders
  .filter(
    (order: any) => order.mobile === mobile
  )
  .sort(
    (a: any, b: any) =>
      new Date(b.createdAt || b.id).getTime() -
      new Date(a.createdAt || a.id).getTime()
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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <h1 className="text-3xl font-extrabold text-navy">
  My Dashboard
</h1>

  {retailer?.status === "confirmed" ? (
    <a
      href="/order-chicken"
      className="inline-flex items-center justify-center rounded-md bg-orange px-5 py-3 font-bold text-white"
    >
      Place New Order
    </a>
  ) : (
    <button
      disabled
      className="cursor-not-allowed rounded-md bg-slate-300 px-5 py-3 font-bold text-white"
    >
      Awaiting Approval
    </button>
  )}
</div>
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
            myOrders.map((order: any, index: number) => {
  const currentStep = orderSteps.indexOf(order.status);

  return (
  <div
    key={order.id}
    className="rounded-xl border bg-white p-6 shadow-sm"
  >
    {/* Header */}
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-lg font-bold text-orange">
            {order.orderNumber || order.id}
          </p>

          {index === 0 && (
            <span className="rounded bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              LATEST ORDER
            </span>
          )}
        </div>

        <p className="text-sm text-slate-500">
          Placed On:{" "}
          {new Date(
            order.createdAt || Date.now()
          ).toLocaleString()}
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          {order.shopName}
        </h3>

        <p className="text-slate-500">
          {order.birds} Birds
        </p>
      </div>

      <span className="rounded-lg bg-orange/10 px-4 py-2 font-bold text-orange">
        {order.status?.toUpperCase()}
      </span>
    </div>

    {/* Main Content */}
    <div className="mt-6 grid gap-6 lg:grid-cols-2">

      {/* Left Side */}
      <div className="rounded-lg bg-slate-50 p-5">
        <h4 className="mb-4 text-lg font-bold">
          Payment & Delivery Details
        </h4>

        <div className="space-y-3 text-sm">
          <p>
            <strong>Payment Type:</strong>{" "}
            {order.paymentType || "-"}
          </p>

          <p>
            <strong>Requested Weight:</strong>{" "}
            {order.requestedWeight || "-"} Kg
          </p>

          <p>
            <strong>Rate Per Kg:</strong>{" "}
            {order.ratePerKg
              ? `₹${order.ratePerKg}`
              : "Not Updated"}
          </p>

          <p>
            <strong>Actual Weight:</strong>{" "}
            {order.actualWeight
              ? `${order.actualWeight} Kg`
              : "Not Updated"}
          </p>

          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-xs uppercase text-green-700">
              Final Amount
            </p>

            <p className="text-3xl font-extrabold text-green-700">
              {order.finalAmount
                ? `₹${order.finalAmount}`
                : "Pending"}
            </p>
          </div>

          <p>
  <strong>Procurement Status:</strong>{" "}
  {order.status === "procured"
    ? "Birds Procured"
    : order.status === "dispatched"
    ? "Vehicle Dispatched"
    : order.status === "delivered"
    ? "Delivered"
    : "In Progress"}
</p>

          <p>
            <strong>Tracking Notes:</strong>{" "}
            {order.trackingNotes || "-"}
          </p>

          <p>
            <strong>Payment Status:</strong>{" "}
            {order.paymentStatus || "pending"}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="rounded-lg bg-slate-50 p-5">
        <h4 className="mb-4 text-lg font-bold">
          Order Progress
        </h4>

        <div className="space-y-3">
          {orderSteps.map((step, stepIndex) => (
            <div
              key={step}
              className={`flex items-center gap-3 ${
                stepIndex <= currentStep
                  ? "text-green-600 font-semibold"
                  : "text-slate-400"
              }`}
            >
              <span className="text-lg">
                {stepIndex <= currentStep
                  ? "✓"
                  : "○"}
              </span>

              <span>
                {step.charAt(0).toUpperCase() +
                  step.slice(1)}
              </span>
            </div>
          ))}
        </div>
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