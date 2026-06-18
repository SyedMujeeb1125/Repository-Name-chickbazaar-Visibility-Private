"use client";

import { useMemo, useState } from "react";

export function AdminOrdersList({
  orders
}: {
  orders: any[];
}) {
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const [search, setSearch] =
    useState("");
    const [statusFilter, setStatusFilter] =
  useState("all");

  const [selectedDate, setSelectedDate] =
    useState(today);
    const [orderDateFilter, setOrderDateFilter] =
  useState("");

  const statusCounts = {
  all: orders.length,

  new: orders.filter(
    (o) => o.status === "new"
  ).length,

  confirmed: orders.filter(
    (o) => o.status === "confirmed"
  ).length,

  procured: orders.filter(
    (o) => o.status === "procured"
  ).length,

  dispatched: orders.filter(
    (o) => o.status === "dispatched"
  ).length,

  delivered: orders.filter(
    (o) => o.status === "delivered"
  ).length,

  completed: orders.filter(
    (o) => o.status === "completed"
  ).length
};

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const term =
        search.toLowerCase();

      const matchesSearch =
        order.orderNumber
          ?.toLowerCase()
          ?.includes(term) ||
        order.shopName
          ?.toLowerCase()
          ?.includes(term) ||
        order.mobile
          ?.includes(search);

      const matchesDeliveryDate =
  !selectedDate ||
  order.deliveryDate ===
    selectedDate;

const matchesOrderDate =
  !orderDateFilter ||
  (order.createdAt &&
    order.createdAt.startsWith(
      orderDateFilter
    ));
    const matchesStatus =
  statusFilter === "all"
    ? true
    : order.status ===
      statusFilter;

      return (
  matchesSearch &&
  matchesDeliveryDate &&
  matchesOrderDate &&
  matchesStatus
);
    });
  }, [
  orders,
  search,
  selectedDate,
  orderDateFilter,
  statusFilter
]);

  const totalBirds =
    filtered.reduce(
      (sum, order) =>
        sum +
        Number(order.birds || 0),
      0
    );

  const birdSizeSummary =
    filtered.reduce(
      (acc: any, order) => {
        const size =
          order.averageWeight ||
          "Not Specified";

        acc[size] =
          (acc[size] || 0) +
          Number(order.birds || 0);

        return acc;
      },
      {}
    );

  return (
    <div>
      <div className="mb-6 grid gap-4 md:grid-cols-3">

        <div className="rounded-xl bg-orange p-5 text-white">
          <p>Total Orders</p>

          <p className="text-3xl font-bold">
            {filtered.length}
          </p>
        </div>

        <div className="rounded-xl bg-green-600 p-5 text-white">
          <p>Total Birds</p>

          <p className="text-3xl font-bold">
            {totalBirds}
          </p>
        </div>

        <div className="rounded-xl bg-navy p-5 text-white">
  <p className="mb-2">
    Order Date
  </p>

  <input
    type="date"
    value={orderDateFilter}
    onChange={(e) =>
      setOrderDateFilter(
        e.target.value
      )
    }
    className="mb-4 w-full rounded bg-white p-2 text-black"
  />

  <p className="mb-2">
    Delivery Date
  </p>

  <input
    type="date"
    value={selectedDate}
    onChange={(e) =>
      setSelectedDate(
        e.target.value
      )
    }
    className="w-full rounded bg-white p-2 text-black"
  />
</div>

      </div>

      <div className="mb-6 rounded-xl border bg-white p-5">
        <h3 className="mb-4 text-xl font-bold">
          Procurement Summary
        </h3>

        {Object.entries(
          birdSizeSummary
        ).length === 0 ? (
          <p className="text-slate-500">
            No orders for selected date
          </p>
        ) : (
          Object.entries(
            birdSizeSummary
          ).map(
            ([size, birds]) => (
              <div
                key={size}
                className="flex justify-between border-b py-2"
              >
                <span>{size}</span>

                <span>
                  {String(birds)} Birds
                </span>
              </div>
            )
          )
        )}
      </div>

      <input
        type="text"
        placeholder="Search Order Number, Shop Name or Mobile"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="mb-6 w-full rounded-lg border p-3"
      />
      <div className="mb-4 flex flex-wrap gap-2">

  <button
    onClick={() => setStatusFilter("all")}
    className="rounded bg-slate-700 px-4 py-2 text-white"
  >
    All ({statusCounts.all})
  </button>

  <button
    onClick={() => setStatusFilter("new")}
    className="rounded bg-orange px-4 py-2 text-white"
  >
    New ({statusCounts.new})
  </button>

  <button
    onClick={() => setStatusFilter("confirmed")}
    className="rounded bg-blue-600 px-4 py-2 text-white"
  >
    Confirmed ({statusCounts.confirmed})
  </button>

  <button
    onClick={() => setStatusFilter("procured")}
    className="rounded bg-purple-600 px-4 py-2 text-white"
  >
    Procured ({statusCounts.procured})
  </button>

  <button
    onClick={() => setStatusFilter("dispatched")}
    className="rounded bg-indigo-600 px-4 py-2 text-white"
  >
    Dispatched ({statusCounts.dispatched})
  </button>

  <button
    onClick={() => setStatusFilter("delivered")}
    className="rounded bg-green-600 px-4 py-2 text-white"
  >
    Delivered ({statusCounts.delivered})
  </button>

  <button
    onClick={() => setStatusFilter("completed")}
    className="rounded bg-emerald-700 px-4 py-2 text-white"
  >
    Completed ({statusCounts.completed})
  </button>

</div>

      <div className="space-y-4">

        {filtered.map(
          (order) => (
            <div
              key={order.id}
              className="rounded-lg border bg-white p-5"
            >
              <h3 className="text-lg font-bold">
                {order.orderNumber ||
                  order.id}
              </h3>

              <p>
                Shop: {order.shopName}
              </p>
              {order.deliveryShopName && (
  <p className="font-semibold text-orange">
    Delivery Shop:{" "}
    {order.deliveryShopName}
  </p>
)}

              <p>
  Mobile: {order.mobile}
</p>

<p>
  Order Date:{" "}
  {new Date(
    order.createdAt || Date.now()
  ).toLocaleDateString()}
</p>

<p>
  Actual Weight:
  {order.actualWeight || "-"}
</p>

<p>
  Final Amount:
  {order.finalAmount
    ? `₹${order.finalAmount}`
    : "Pending"}
</p>
<p>
  Advance Paid:
  ₹{order.paymentAmount || 0}
</p>

<p className="font-semibold text-red-600">
  Outstanding:
  ₹{order.outstandingAmount || 0}
</p>

              <p>
                Birds: {order.birds}
              </p>

              <p>
                Preferred Size:{" "}
                {order.averageWeight}
              </p>
              <p>
  Address: {order.address}
</p>

              <p>
  Delivery Date:{" "}
  {new Date(
    order.deliveryDate
  ).toLocaleDateString()}
</p>

              <div className="mt-3">
  <form
    action="/api/admin/status"
    method="POST"
    className="flex gap-2 items-center"
  >
    <input
      type="hidden"
      name="collection"
      value="orders"
    />

    <input
      type="hidden"
      name="id"
      value={order.id}
    />

    <select
      name="status"
      defaultValue={order.status}
      className="rounded border p-2"
    >
      <option value="new">New</option>
      <option value="confirmed">
        Confirmed
      </option>
      <option value="procured">
        Procured
      </option>
      <option value="dispatched">
        Dispatched
      </option>
      <option value="delivered">
        Delivered
      </option>
      <option value="completed">
        Completed
      </option>
      <option value="cancelled">
        Cancelled
      </option>
    </select>

    <button
      type="submit"
      className="rounded bg-orange px-4 py-2 text-white"
    >
      Update
    </button>
  </form>
  <form
  action="/api/admin/order-settlement"
  method="POST"
  className="mt-4 border-t pt-4"
>
  <input
    type="hidden"
    name="orderId"
    value={order.id}
  />

  <div className="grid gap-3 md:grid-cols-2">

    <input
      type="number"
      step="0.01"
      name="actualWeight"
      placeholder="Actual Weight"
      className="rounded border p-2"
    />

    <input
      type="number"
      step="0.01"
      name="ratePerKg"
      defaultValue={
        order.ratePerKg || 0
      }
      className="rounded border p-2"
    />
  </div>

  <button
    className="mt-3 rounded bg-green-600 px-4 py-2 text-white"
  >
    Save Settlement
  </button>
</form>

  <p className="mt-2 text-sm text-slate-600">
    Current Status: {order.status}
  </p>
</div>
            </div>
          )
        )}

        {filtered.length ===
          0 && (
          <div className="rounded-lg border bg-white p-5 text-center text-slate-500">
            No orders found
          </div>
        )}

      </div>
    </div>
  );
}