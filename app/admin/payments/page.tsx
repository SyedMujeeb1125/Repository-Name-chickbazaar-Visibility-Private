"use client";

import { useEffect, useState } from "react";

interface Retailer {
  id: string;
  shop_name: string;
}

export default function PaymentsPage() {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [selectedRetailer, setSelectedRetailer] = useState("");
  const [outstanding, setOutstanding] = useState(0);

  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");

  const [loadingRetailers, setLoadingRetailers] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadRetailers();
  }, []);

  async function loadRetailers() {
    try {
      setLoadingRetailers(true);

      const res = await fetch(
        "/api/admin/retailers",
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to load retailers."
        );
      }

      const data = await res.json();

      setRetailers(
        data.retailers ?? []
      );
    } catch (error) {
      console.error(
        "[PAYMENTS][RETAILERS]",
        error
      );

      alert(
        "Unable to load retailers."
      );
    } finally {
      setLoadingRetailers(false);
    }
  }

  async function loadOutstanding(
    retailerId: string
  ) {
    if (!retailerId) {
      setOutstanding(0);
      return;
    }

    try {
      const res = await fetch(
        `/api/admin/outstanding?retailer=${retailerId}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          "Failed to load outstanding."
        );
      }

      const data = await res.json();

      setOutstanding(
        Number(
          data.outstanding ?? 0
        )
      );
    } catch (error) {
      console.error(
        "[PAYMENTS][OUTSTANDING]",
        error
      );

      setOutstanding(0);
    }
  }

  async function submitPayment() {
    if (!selectedRetailer) {
      alert(
        "Please select a retailer."
      );
      return;
    }

    if (
      Number(amount) <= 0
    ) {
      alert(
        "Enter a valid payment amount."
      );
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(
        "/api/admin/payments",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            retailer_id:
              selectedRetailer,
            amount: Number(
              amount
            ),
            remarks,
          }),
        }
      );

      const result =
        await res.json();

      if (
        !res.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed"
        );
      }

      alert(
        "Payment recorded successfully."
      );

      setAmount("");
      setRemarks("");

      await loadOutstanding(
        selectedRetailer
      );
    } catch (error) {
      console.error(
        "[PAYMENTS]",
        error
      );

      alert(
        "Failed to record payment."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">
        Payment Collection
      </h1>

      <div className="space-y-2">
        <label className="font-medium">
          Retailer
        </label>

        <select
          className="w-full rounded border p-2"
          value={
            selectedRetailer
          }
          disabled={
            loadingRetailers
          }
          onChange={(e) => {
            setSelectedRetailer(
              e.target.value
            );

            loadOutstanding(
              e.target.value
            );
          }}
        >
          <option value="">
            {loadingRetailers
              ? "Loading retailers..."
              : "Select Retailer"}
          </option>

          {retailers.map(
            (retailer) => (
              <option
                key={
                  retailer.id
                }
                value={
                  retailer.id
                }
              >
                {
                  retailer.shop_name
                }
              </option>
            )
          )}
        </select>
      </div>

      <div className="rounded border p-4">
        <h2 className="font-semibold">
          Outstanding Balance
        </h2>

        <p className="text-2xl font-bold">
          ₹
          {outstanding.toLocaleString(
            "en-IN"
          )}
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="number"
          min="1"
          placeholder="Payment Amount"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          className="w-full rounded border p-2"
        />

        <textarea
          placeholder="Remarks"
          value={remarks}
          onChange={(e) =>
            setRemarks(
              e.target.value
            )
          }
          className="w-full rounded border p-2"
          rows={4}
        />

        <button
          onClick={
            submitPayment
          }
          disabled={
            saving
          }
          className="rounded border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Recording Payment..."
            : "Record Payment"}
        </button>
      </div>
    </div>
  );
}