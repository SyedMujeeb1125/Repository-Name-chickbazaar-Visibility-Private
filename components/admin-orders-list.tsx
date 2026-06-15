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

  const [selectedDate, setSelectedDate] =
    useState(today);

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

      const matchesDate =
        !selectedDate ||
        order.deliveryDate ===
          selectedDate;

      return (
        matchesSearch &&
        matchesDate
      );
    });
  }, [
    orders,
    search,
    selectedDate
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
          <p>Delivery Date</p>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(
                e.target.value
              )
            }
            className="mt-2 w-full rounded bg-white p-2 text-black"
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
                Delivery:{" "}
                {order.deliveryDate}
              </p>

              <p>
                Status: {order.status}
              </p>
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