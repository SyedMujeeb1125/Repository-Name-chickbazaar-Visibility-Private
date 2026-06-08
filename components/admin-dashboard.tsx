"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, LogOut, RefreshCw } from "lucide-react";
import type { FarmPartnerRecord, OrderRecord, RetailerRecord, SubmissionStatus } from "@/lib/types";

type AdminRetailer = Omit<RetailerRecord, "gstCertificatePath">;

export type AdminDashboardData = {
  orders: OrderRecord[];
  retailers: AdminRetailer[];
  farmPartners: FarmPartnerRecord[];
};

type AdminDashboardProps = {
  data: AdminDashboardData;
};

const statuses: SubmissionStatus[] = ["new", "contacted", "fulfilled", "rejected"];

function StatusSelect({
  collection,
  id,
  status
}: {
  collection: "orders" | "retailers" | "farmPartners";
  id: string;
  status: SubmissionStatus;
}) {
  const router = useRouter();
  const [value, setValue] = useState(status);

  async function updateStatus(nextStatus: SubmissionStatus) {
    setValue(nextStatus);
    const formData = new FormData();
    formData.set("collection", collection);
    formData.set("id", id);
    formData.set("status", nextStatus);
    await fetch("/api/admin/status", {
      method: "POST",
      body: formData
    });
    router.refresh();
  }

  return (
    <select
      value={value}
      onChange={(event) => updateStatus(event.target.value as SubmissionStatus)}
      className="focus-ring min-h-10 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-navy"
    >
      {statuses.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

function EmptyState({ label }: { label: string }) {
  return <p className="rounded-lg border border-slate-100 bg-white p-5 text-sm text-slate-500">{label}</p>;
}

export function AdminDashboard({ data }: AdminDashboardProps) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange">Admin Control</p>
          <h1 className="mt-2 text-3xl font-extrabold text-navy">ChickBazaar Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.refresh()}
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 px-4 text-sm font-bold text-navy hover:border-orange hover:text-orange"
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-navy px-4 text-sm font-bold text-white hover:bg-[#071a33]"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-navy p-5 text-white">
          <p className="text-sm text-white/70">Orders</p>
          <p className="mt-2 text-3xl font-extrabold">{data.orders.length}</p>
        </div>
        <div className="rounded-lg bg-orange p-5 text-white">
          <p className="text-sm text-white/80">Retailers</p>
          <p className="mt-2 text-3xl font-extrabold">{data.retailers.length}</p>
        </div>
        <div className="rounded-lg bg-slate-900 p-5 text-white">
          <p className="text-sm text-white/70">Farm Partners</p>
          <p className="mt-2 text-3xl font-extrabold">{data.farmPartners.length}</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-extrabold text-navy">Orders</h2>
        <div className="mt-4 grid gap-4">
          {data.orders.length ? (
            data.orders.map((order) => (
              <article key={order.id} className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <div>
                    <h3 className="text-lg font-extrabold text-navy">{order.shopName}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {order.ownerName} · {order.mobile} · {order.email}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {order.birds} birds · {order.averageWeight} · Delivery {order.deliveryDate}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">{order.address}</p>
                    {order.notes ? <p className="mt-2 text-sm text-slate-500">{order.notes}</p> : null}
                  </div>
                  <StatusSelect collection="orders" id={order.id} status={order.status} />
                </div>
              </article>
            ))
          ) : (
            <EmptyState label="No orders yet." />
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-extrabold text-navy">Retailers</h2>
        <div className="mt-4 grid gap-4">
          {data.retailers.length ? (
            data.retailers.map((retailer) => (
              <article key={retailer.id} className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <div>
                    <h3 className="text-lg font-extrabold text-navy">{retailer.shopName}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {retailer.ownerName} · {retailer.mobile} · {retailer.email}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">GST: {retailer.gst}</p>
                    <p className="mt-2 text-sm text-slate-600">{retailer.address}</p>
                    <a
                      href={`/api/admin/certificate/${retailer.id}`}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-orange hover:text-navy"
                    >
                      <Download size={16} /> Download GST Certificate
                    </a>
                  </div>
                  <StatusSelect collection="retailers" id={retailer.id} status={retailer.status} />
                </div>
              </article>
            ))
          ) : (
            <EmptyState label="No retailer registrations yet." />
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-extrabold text-navy">Farm Partners</h2>
        <div className="mt-4 grid gap-4">
          {data.farmPartners.length ? (
            data.farmPartners.map((farm) => (
              <article key={farm.id} className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <div>
                    <h3 className="text-lg font-extrabold text-navy">{farm.farmName}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {farm.contactPerson} · {farm.mobile} · {farm.email}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {farm.location} · Capacity {farm.dailyCapacity} · Avg {farm.averageBirdWeight}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">{farm.message}</p>
                  </div>
                  <StatusSelect collection="farmPartners" id={farm.id} status={farm.status} />
                </div>
              </article>
            ))
          ) : (
            <EmptyState label="No farm partner leads yet." />
          )}
        </div>
      </section>
    </div>
  );
}
