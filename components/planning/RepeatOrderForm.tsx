"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type RepeatOrder = {
  id?: string;
  order_by?: "weight" | "birds";
  requested_weight?: number;
  birds?: number;
  frequency?: "daily" | "weekly" | "monthly";
  payment_type?: "advance" | "actual_weight" | "credit";
  start_date?: string;
  end_date?: string | null;
  skip_sundays?: boolean;
  skip_holidays?: boolean;
};

type Props = {
  mode?: "create" | "edit";
  repeatOrder?: RepeatOrder;
};

export default function RepeatOrderForm({
  mode = "create",
  repeatOrder,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [orderBy, setOrderBy] =
    useState<"weight" | "birds">(
      "weight"
    );

  const [weight, setWeight] =
    useState("");

  const [birds, setBirds] =
    useState("");

  const [frequency, setFrequency] =
    useState("daily");

  const [paymentType, setPaymentType] =
    useState("advance");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [skipSundays, setSkipSundays] =
    useState(false);

  useEffect(() => {
    if (!repeatOrder) {
      return;
    }

    setOrderBy(
      repeatOrder.order_by ?? "weight"
    );

    setWeight(
      String(
        repeatOrder.requested_weight ?? ""
      )
    );

    setBirds(
      String(
        repeatOrder.birds ?? ""
      )
    );

    setFrequency(
      repeatOrder.frequency ?? "daily"
    );

    setPaymentType(
      repeatOrder.payment_type ??
        "advance"
    );

    setStartDate(
      repeatOrder.start_date ?? ""
    );

    setEndDate(
      repeatOrder.end_date ?? ""
    );

    setSkipSundays(
      repeatOrder.skip_sundays ?? false
    );

  }, [repeatOrder]);

  const estimatedMonthlyKg =
    Number(weight || 0) * 30;

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    setMessage("");

    const payload = {
      orderBy,
      requestedWeight:
        orderBy === "weight"
          ? Number(weight)
          : undefined,

      birds:
        orderBy === "birds"
          ? Number(birds)
          : undefined,

      frequency,

      paymentType,

      deliveryAddress:
        "Registered Shop",

      startDate,

      endDate:
        endDate || null,

      skipSundays,

      skipHolidays: false,
    };

    try {
      const response =
        await fetch(
          mode === "edit"
            ? `/api/repeat-orders/${repeatOrder?.id}`
            : "/api/repeat-orders",
          {
            method:
              mode === "edit"
                ? "PUT"
                : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message
        );
      }

      setMessage(
        mode === "edit"
          ? "Repeat Order Updated Successfully."
          : "Repeat Order Created Successfully."
      );

      setTimeout(() => {
        router.push(
          "/repeat-orders"
        );

        router.refresh();
      }, 1000);

    } catch (error) {

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
  }
    return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-8 shadow"
    >
      <h1 className="text-3xl font-bold">
        {mode === "edit"
          ? "Edit Repeat Order"
          : "New Repeat Order"}
      </h1>

      <div className="mt-8 space-y-6">

        <div>
          <label className="font-semibold">
            Order By
          </label>

          <select
            value={orderBy}
            onChange={(e) =>
              setOrderBy(
                e.target.value as
                  | "weight"
                  | "birds"
              )
            }
            className="mt-2 w-full rounded-lg border p-3"
          >
            <option value="weight">
              Weight
            </option>

            <option value="birds">
              Birds
            </option>
          </select>
        </div>

        {orderBy === "weight" ? (
          <div>
            <label className="font-semibold">
              Requested Weight (KG)
            </label>

            <input
              type="number"
              required
              value={weight}
              onChange={(e) =>
                setWeight(e.target.value)
              }
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>
        ) : (
          <div>
            <label className="font-semibold">
              Number of Birds
            </label>

            <input
              type="number"
              required
              value={birds}
              onChange={(e) =>
                setBirds(e.target.value)
              }
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>
        )}

        <div>
          <label className="font-semibold">
            Frequency
          </label>

          <select
            value={frequency}
            onChange={(e) =>
              setFrequency(e.target.value)
            }
            className="mt-2 w-full rounded-lg border p-3"
          >
            <option value="daily">
              Daily
            </option>

            <option value="weekly">
              Weekly
            </option>

            <option value="monthly">
              Monthly
            </option>
          </select>
        </div>

        <div>
          <label className="font-semibold">
            Payment Type
          </label>

          <select
            value={paymentType}
            onChange={(e) =>
              setPaymentType(e.target.value)
            }
            className="mt-2 w-full rounded-lg border p-3"
          >
            <option value="advance">
              Advance
            </option>

            <option value="actual_weight">
              Actual Weight
            </option>

            <option value="credit">
              Credit
            </option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label className="font-semibold">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
              className="mt-2 w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="font-semibold">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(e.target.value)
              }
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

        </div>

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={skipSundays}
            onChange={(e) =>
              setSkipSundays(
                e.target.checked
              )
            }
          />

          Skip Sundays

        </label>

        <div className="rounded-xl bg-orange p-6 text-white">

          <p className="text-sm uppercase">
            Estimated Monthly Purchase
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {estimatedMonthlyKg} KG
          </h2>

          <p className="mt-4">
            Estimated Monthly Spend
          </p>

          <h3 className="text-2xl font-bold">
            ₹
            {estimatedMonthlyKg * 120}
          </h3>

        </div>

        {message && (
          <div className="rounded-lg bg-slate-100 p-4">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-green-600 px-6 py-4 font-bold text-white"
        >
          {loading
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
            ? "Update Repeat Order"
            : "Create Repeat Order"}
        </button>

      </div>

    </form>
  );
}