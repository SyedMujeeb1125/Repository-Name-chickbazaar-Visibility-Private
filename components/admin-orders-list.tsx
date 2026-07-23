"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminOrdersList({
  orders,
}: {
  orders: any[];
}) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [selectedDate, setSelectedDate] =
    useState("");

  const [orderDateFilter, setOrderDateFilter] =
    useState("");

  async function updateStatus(
    orderId: string,
    status: string
  ) {
    const formData = new FormData();

    formData.append("collection", "orders");
    formData.append("id", orderId);
    formData.append("status", status);

    const response = await fetch(
      "/api/admin/status",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const data = await response.json();

      alert(
        data.message ||
          "Unable to update status."
      );

      return;
    }

    router.refresh();
  }

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const term = search.toLowerCase();

      const matchesSearch =
        order.orderNumber
          ?.toLowerCase()
          ?.includes(term) ||
        order.shopName
          ?.toLowerCase()
          ?.includes(term) ||
        order.mobile?.includes(search);

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
          : order.status === statusFilter;

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
    statusFilter,
  ]);

  const statusCounts = {
    all: orders.length,

    new: orders.filter(
      (o) => o.status === "new"
    ).length,

    confirmed: orders.filter(
      (o) => o.status === "confirmed"
    ).length,

    allocated: orders.filter(
      (o) =>
        o.status === "allocated"
    ).length,

    preparing: orders.filter(
      (o) =>
        o.status === "preparing"
    ).length,

    vehicle_assigned:
      orders.filter(
        (o) =>
          o.status ===
          "vehicle_assigned"
      ).length,

    out_for_delivery:
      orders.filter(
        (o) =>
          o.status ===
          "out_for_delivery"
      ).length,

    delivered: orders.filter(
      (o) =>
        o.status === "delivered"
    ).length,

    cancelled: orders.filter(
      (o) =>
        o.status === "cancelled"
    ).length,
  };

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
          <p className="text-xl font-bold">
            {filtered.length}
          </p>
        </div>

        <div className="rounded-xl bg-green-600 p-5 text-white">
          <p>Total Birds</p>
          <p className="text-xl font-bold">
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
          Farm Allocation Summary
        </h3>

        {Object.entries(
          birdSizeSummary
        ).length === 0 ? (
          <p className="text-slate-500">
            No orders for selected
            date
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
          onClick={() =>
            setStatusFilter("all")
          }
          className="rounded bg-slate-700 px-4 py-2 text-white"
        >
          All ({statusCounts.all})
        </button>

        <button
          onClick={() =>
            setStatusFilter("new")
          }
          className="rounded bg-orange px-4 py-2 text-white"
        >
          New ({statusCounts.new})
        </button>

        <button
          onClick={() =>
            setStatusFilter(
              "confirmed"
            )
          }
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Confirmed (
          {statusCounts.confirmed})
        </button>

        <button
          onClick={() =>
            setStatusFilter(
              "allocated"
            )
          }
          className="rounded bg-purple-600 px-4 py-2 text-white"
        >
          Farm Allocated (
          {statusCounts.allocated})
        </button>

        <button
          onClick={() =>
            setStatusFilter(
              "preparing"
            )
          }
          className="rounded bg-yellow-600 px-4 py-2 text-white"
        >
          Preparing (
          {statusCounts.preparing})
        </button>

        <button
          onClick={() =>
            setStatusFilter(
              "vehicle_assigned"
            )
          }
          className="rounded bg-indigo-600 px-4 py-2 text-white"
        >
          Vehicle Assigned (
          {
            statusCounts.vehicle_assigned
          })
        </button>

        <button
          onClick={() =>
            setStatusFilter(
              "out_for_delivery"
            )
          }
          className="rounded bg-cyan-600 px-4 py-2 text-white"
        >
          Out For Delivery (
          {
            statusCounts.out_for_delivery
          })
        </button>

        <button
          onClick={() =>
            setStatusFilter(
              "delivered"
            )
          }
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          Delivered (
          {statusCounts.delivered})
        </button>

        <button
          onClick={() =>
            setStatusFilter(
              "cancelled"
            )
          }
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Cancelled (
          {statusCounts.cancelled})
        </button>

      </div>

      <div className="space-y-4">

        {[...filtered]
          .sort(
            (a: any, b: any) =>
              new Date(
                b.createdAt || 0
              ).getTime() -
              new Date(
                a.createdAt || 0
              ).getTime()
          )
          .map((order) => (
                        <div
              key={order.id}
              className="rounded-lg border bg-white p-5"
            >
              <h3 className="text-lg font-bold">
                {order.orderNumber || order.id}
              </h3>

              <p>Shop: {order.shopName}</p>

              {order.deliveryShopName && (
                <p className="font-semibold text-orange">
                  Delivery Shop:{" "}
                  {order.deliveryShopName}
                </p>
              )}

              <p>Mobile: {order.mobile}</p>

              <p>
                Order Date:{" "}
                {order.createdAt
                  ? new Date(order.createdAt)
                      .toISOString()
                      .split("T")[0]
                  : "-"}
              </p>

              <p>
                Actual Weight:{" "}
                {order.actualWeight || "-"}
              </p>

              <p>
                Final Amount:{" "}
                {order.finalAmount
                  ? `₹${order.finalAmount}`
                  : "Pending"}
              </p>

              <p>
                Advance Paid: ₹
                {order.paymentAmount || 0}
              </p>

              <p className="font-semibold text-red-600">
                Outstanding: ₹
                {order.outstandingAmount || 0}
              </p>

              <p>Birds: {order.birds}</p>

              <p>
                Preferred Size:{" "}
                {order.averageWeight}
              </p>

              <p>
                Zone: {order.zone || "-"}
              </p>

              <p>
                Driver:{" "}
                {order.assignedDriver || "-"}
              </p>

              <p>
                Vehicle:{" "}
                {order.assignedVehicle || "-"}
              </p>

              <p>
                Farm:{" "}
                {order.assignedFarm || "-"}
              </p>

              <p>
                Address: {order.address}
              </p>

              <p>
                Delivery Date:{" "}
                {order.deliveryDate || "-"}
              </p>

              <div className="mt-4 flex items-center gap-3">

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                  className="rounded border p-2"
                >
                  <option value="new">
                    New
                  </option>

                  <option value="confirmed">
                    Confirmed
                  </option>

                  <option value="allocated">
                    Farm Allocated
                  </option>

                  <option value="preparing">
                    Preparing
                  </option>

                  <option value="vehicle_assigned">
                    Vehicle Assigned
                  </option>

                  <option value="out_for_delivery">
                    Out for Delivery
                  </option>

                  <option value="delivered">
                    Delivered
                  </option>

                  <option value="cancelled">
                    Cancelled
                  </option>
                </select>

              </div>

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

              <p className="mt-3 text-sm text-slate-600">
                Current Status:{" "}
                {order.status}
              </p>

              <p
                className={`mt-2 font-semibold ${
                  order.finalAmount > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Settlement:{" "}
                {order.finalAmount > 0
                  ? "Completed"
                  : "Pending"}
              </p>

            </div>
          ))}

        {filtered.length === 0 && (
          <div className="rounded-lg border bg-white p-5 text-center text-slate-500">
            No orders found
          </div>
        )}

      </div>

    </div>
  );
}