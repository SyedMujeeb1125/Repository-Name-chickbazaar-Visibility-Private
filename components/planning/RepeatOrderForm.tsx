"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RepeatOrderForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [weight, setWeight] = useState("");

  const [frequency, setFrequency] = useState("daily");

  const [paymentType, setPaymentType] =
    useState("advance");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [skipSundays, setSkipSundays] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {
      const response = await fetch(
        "/api/repeat-orders",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            orderBy: "weight",

            requestedWeight: Number(
              weight
            ),

            frequency,

            paymentType,

            deliveryAddress:
              "Registered Shop",

            startDate,

            endDate:
              endDate || null,

            skipSundays,

            skipHolidays: false,
          }),
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
        "Repeat Order Created Successfully."
      );

      setTimeout(() => {
        router.push(
          "/repeat-orders"
        );

        router.refresh();
      }, 1000);

    } catch (err) {

      setMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
  }

  const monthlyKg =
    Number(weight || 0) * 30;

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-8 shadow"
    >
      <h1 className="text-3xl font-bold">
        New Repeat Order
      </h1>

      <div className="mt-8 space-y-6">

        <div>

          <label className="font-semibold">
            Requested Weight
          </label>

          <input
            type="number"
            value={weight}
            onChange={(e) =>
              setWeight(
                e.target.value
              )
            }
            className="mt-2 w-full rounded-lg border p-3"
            required
          />

        </div>

        <div>

          <label className="font-semibold">
            Frequency
          </label>

          <select
            value={frequency}
            onChange={(e) =>
              setFrequency(
                e.target.value
              )
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
              setPaymentType(
                e.target.value
              )
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
                setStartDate(
                  e.target.value
                )
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
                setEndDate(
                  e.target.value
                )
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

          <h2 className="mt-3 text-4xl font-bold">
            {monthlyKg} KG
          </h2>

          <p className="mt-5">
            Estimated Spend
          </p>

          <h3 className="text-2xl font-bold">
            ₹
            {monthlyKg * 120}
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
            ? "Creating..."
            : "Create Repeat Order"}
        </button>

      </div>
    </form>
  );
}