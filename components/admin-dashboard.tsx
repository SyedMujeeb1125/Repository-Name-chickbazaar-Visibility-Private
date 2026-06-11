"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, LogOut, RefreshCw } from "lucide-react";
import type {
  FarmPartnerRecord,
  OrderRecord,
  RetailerRecord,
  SubmissionStatus,
  PaymentStatus
} from "@/lib/types";

type AdminRetailer = Omit<RetailerRecord, "gstCertificatePath">;

export type AdminDashboardData = {
  orders: OrderRecord[];
  retailers: AdminRetailer[];
  farmPartners: FarmPartnerRecord[];
};

type AdminDashboardProps = {
  data: AdminDashboardData;
};

const statuses: SubmissionStatus[] = [
  "new",
  "confirmed",
  "procured",
  "dispatched",
  "delivered",
  "completed",
  "cancelled"
];
const paymentStatuses: PaymentStatus[] = [
  "pending",
  "partially_paid",
  "paid",
  "refunded"
];
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
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}
function OrderOperations({
  order,
  farms
}: {
  order: OrderRecord;
  farms: FarmPartnerRecord[];
}) {
  const router = useRouter();

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
  order.paymentStatus || "pending"
);

  const [assignedFarm, setAssignedFarm] = useState(
    order.assignedFarm || ""
  );

  const [trackingNotes, setTrackingNotes] = useState(
    order.trackingNotes || ""
  );

  const [saving, setSaving] = useState(false);
  const [paymentType, setPaymentType] = useState(
  order.paymentType || "advance"
);

const [ratePerKg, setRatePerKg] = useState(
  order.ratePerKg?.toString() || ""
);

const [actualWeight, setActualWeight] = useState(
  order.actualWeight?.toString() || ""
);

const finalAmount =
  Number(ratePerKg || 0) *
  Number(actualWeight || 0);
  const recommendedFarm =
  order.latitude &&
  order.longitude
    ? farms
        .filter(
          (farm) =>
            farm.latitude &&
            farm.longitude
        )
        .map((farm) => ({
          farm,
          distance: calculateDistance(
            Number(order.latitude),
            Number(order.longitude),
            Number(farm.latitude),
            Number(farm.longitude)
          )
        }))
        .sort(
          (a, b) =>
            a.distance - b.distance
        )[0]
    : null;
  async function save() {
    setSaving(true);

    const formData = new FormData();

    formData.set("id", order.id);
    formData.set("paymentStatus", paymentStatus);
    formData.set("assignedFarm", assignedFarm);
    formData.set("trackingNotes", trackingNotes);
    formData.set("paymentType", paymentType);
    formData.set("ratePerKg", String(ratePerKg));
    formData.set("actualWeight", String(actualWeight));
    formData.set("finalAmount", String(finalAmount));

    await fetch("/api/admin/order-details", {
      method: "POST",
      body: formData
    });

    setSaving(false);
    router.refresh();
  }

  return (
    <div className="mt-4 grid gap-3">
      <select
        value={paymentStatus}
        onChange={(e) =>
  setPaymentStatus(
    e.target.value as
      | "pending"
      | "partially_paid"
      | "paid"
      | "refunded"
  )
}
        className="rounded-md border p-2"
      >
        {paymentStatuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {recommendedFarm ? (
  <div className="rounded-md border border-green-300 bg-green-50 p-3 text-sm">
    <div className="font-bold text-green-700">
      Recommended Farm
    </div>

    <div>
      {recommendedFarm.farm.farmName}
    </div>

    <div>
      {recommendedFarm.distance.toFixed(1)} km away
    </div>

    <button
      type="button"
      onClick={() =>
        setAssignedFarm(
          recommendedFarm.farm.farmName
        )
      }
      className="mt-2 rounded bg-green-600 px-3 py-1 text-white"
    >
      Assign Recommended Farm
    </button>
  </div>
) : null}
<div className="rounded-md bg-slate-100 p-2 text-sm">
  <strong>Assigned Farm:</strong>{" "}
  {assignedFarm || "Not Assigned"}
</div>
      <select
        value={assignedFarm}
        onChange={(e) => setAssignedFarm(e.target.value)}
        className="rounded-md border p-2"
      >
        <option value="">
          Select Farm
        </option>

        {farms.map((farm) => (
          <option
            key={farm.id}
            value={farm.farmName}
          >
            {farm.farmName}
          </option>
        ))}
      </select>
      <select
  value={paymentType}
  onChange={(e) =>
  setPaymentType(
    e.target.value as
      | "advance"
      | "actual_weight"
  )
}
  className="rounded-md border p-2"
>
  <option value="advance">
    Advance Payment
  </option>

  <option value="actual_weight">
    Pay On Actual Weight
  </option>
</select>

<input
  type="number"
  value={ratePerKg}
  onChange={(e) =>
    setRatePerKg(e.target.value)
  }
  placeholder="Rate Per Kg"
  className="rounded-md border p-2"
/>

<input
  type="number"
  value={actualWeight}
  onChange={(e) =>
    setActualWeight(e.target.value)
  }
  placeholder="Actual Weight (Kg)"
  className="rounded-md border p-2"
/>

<div className="rounded-md bg-green-50 p-3 font-bold text-green-700">
  Final Amount: ₹{finalAmount}
</div>
      <textarea
        value={trackingNotes}
        onChange={(e) =>
          setTrackingNotes(e.target.value)
        }
        placeholder="Tracking Notes"
        className="rounded-md border p-2"
      />

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="rounded-md bg-orange px-4 py-2 text-white"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
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
                    <div>
  <p className="text-sm font-bold text-orange">
    {order.orderNumber || order.id}
  </p>

  <h3 className="text-lg font-extrabold text-navy">
    {order.shopName}
  </h3>
</div>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
  Payment: {order.paymentStatus || "pending"}
</p>
                    <p className="mt-2 text-sm text-slate-600">
                      {order.birds} birds · {order.averageWeight} · Delivery {order.deliveryDate}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">{order.address}</p>
                    {order.notes ? (
  <p className="mt-2 text-sm text-slate-500">
    {order.notes}
  </p>
) : null}

{order.trackingNotes ? (
  <p className="mt-2 text-sm font-semibold text-orange">
    Tracking: {order.trackingNotes}
  </p>
) : null}
                  </div>
                  <div className="flex flex-col gap-3">
  <StatusSelect
    collection="orders"
    id={order.id}
    status={order.status}
  />

  <OrderOperations
    order={order}
    farms={data.farmPartners}
  />
</div>
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
                    {retailer.latitude && retailer.longitude ? (
  <a
    href={`https://www.google.com/maps?q=${retailer.latitude},${retailer.longitude}`}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-2 inline-block text-sm font-bold text-orange"
  >
    📍 View on Google Maps
  </a>
) : null}
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
                    {farm.latitude && farm.longitude ? (
  <a
    href={`https://www.google.com/maps?q=${farm.latitude},${farm.longitude}`}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-2 inline-block text-sm font-bold text-orange"
  >
    📍 View Farm Location
  </a>
) : null}
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
