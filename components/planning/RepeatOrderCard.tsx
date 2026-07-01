"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  calculateNextDelivery,
  formatDeliveryDate,
} from "@/lib/planning/scheduler";

type Props = {
  order: any;
};

export default function RepeatOrderCard({
  order,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const active =
    order.status === "active";

  const nextDelivery =
    formatDeliveryDate(
      calculateNextDelivery(order)
    );

  async function changeStatus() {
    try {
      setLoading(true);

      const endpoint = active
        ? `/api/repeat-orders/${order.id}/pause`
        : `/api/repeat-orders/${order.id}/resume`;

      const response = await fetch(
        endpoint,
        {
          method: "POST",
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message
        );
      }

      router.refresh();

    } catch (error) {

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
  }

  async function deleteOrder() {

    if (
      !confirm(
        "Delete this repeat order?"
      )
    ) {
      return;
    }

    try {

      setLoading(true);

      const response =
        await fetch(
          `/api/repeat-orders/${order.id}/delete`,
          {
            method: "POST",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message
        );
      }

      router.refresh();

    } catch (error) {

      alert(
        error instanceof Error
          ? error.message
          : "Unable to delete."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow">

      <div className="flex items-center justify-between">

        <div>

          <div
            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
              active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {active
              ? "ACTIVE"
              : "PAUSED"}
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            {order.frequency
              ?.charAt(0)
              .toUpperCase() +
              order.frequency?.slice(1)}
          </h2>

          <p className="mt-2 text-slate-500">
            {(order.requested_weight ??
              order.birds)}{" "}
            {order.order_by === "weight"
              ? "KG"
              : "Birds"}
          </p>

        </div>

        <div className="text-right space-y-2">

          <div>
            <p className="text-xs uppercase text-slate-500">
              Next Delivery
            </p>

            <p className="font-bold text-green-700">
              {nextDelivery}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">
              Started
            </p>

            <p className="font-semibold">
              {order.start_date}
            </p>
          </div>

        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        <Link
          href={`/repeat-orders/${order.id}/edit`}
          className="rounded-lg bg-orange px-5 py-3 font-bold text-white"
        >
          Edit
        </Link>

        <button
          disabled={loading}
          onClick={changeStatus}
          className={`rounded-lg px-5 py-3 font-bold text-white ${
            active
              ? "bg-red-600"
              : "bg-green-600"
          }`}
        >
          {loading
            ? "Processing..."
            : active
            ? "Pause"
            : "Resume"}
        </button>

        <button
          disabled={loading}
          onClick={deleteOrder}
          className="rounded-lg bg-slate-800 px-5 py-3 font-bold text-white"
        >
          Delete
        </button>

      </div>

    </div>
  );
}