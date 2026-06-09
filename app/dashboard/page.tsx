import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Retailer dashboard"
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-navy">
        Retailer Dashboard
      </h1>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-navy p-5 text-white">
          <p>Total Orders</p>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="rounded-lg bg-orange p-5 text-white">
          <p>Pending Orders</p>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="rounded-lg bg-green-600 p-5 text-white">
          <p>Completed Orders</p>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="rounded-lg bg-slate-900 p-5 text-white">
          <p>Payments Due</p>
          <p className="text-3xl font-bold">₹0</p>
        </div>
      </div>

      <div className="mt-10 rounded-lg border bg-white p-6">
        <h2 className="text-xl font-bold">
          My Orders
        </h2>

        <p className="mt-4 text-slate-500">
          No orders yet.
        </p>
      </div>
    </div>
  );
}