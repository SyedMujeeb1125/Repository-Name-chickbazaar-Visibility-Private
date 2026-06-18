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

  useEffect(() => {
    loadRetailers();
  }, []);

  async function loadRetailers() {
    const res = await fetch("/api/admin/retailers");
    const data = await res.json();

    setRetailers(data.retailers || []);
  }

  async function loadOutstanding(retailerId: string) {
    if (!retailerId) return;

    const res = await fetch(
      `/api/admin/outstanding?retailer=${retailerId}`
    );

    const data = await res.json();

    setOutstanding(Number(data.outstanding || 0));
  }

  async function submitPayment() {
    if (!selectedRetailer || !amount) {
      alert("Select retailer and amount");
      return;
    }

    const res = await fetch("/api/admin/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        retailer_id: selectedRetailer,
        amount: Number(amount),
        remarks,
      }),
    });

    const result = await res.json();

    if (result.success) {
      alert("Payment recorded");

      setAmount("");
      setRemarks("");

      loadOutstanding(selectedRetailer);
    } else {
      alert("Failed to record payment");
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Payment Collection
      </h1>

      <div className="space-y-2">
        <label>Retailer</label>

        <select
          className="border p-2 rounded w-full"
          value={selectedRetailer}
          onChange={(e) => {
            setSelectedRetailer(e.target.value);
            loadOutstanding(e.target.value);
          }}
        >
          <option value="">
            Select Retailer
          </option>

          {retailers.map((retailer) => (
            <option
              key={retailer.id}
              value={retailer.id}
            >
              {retailer.shop_name}
            </option>
          ))}
        </select>
      </div>

      <div className="border rounded p-4">
        <h2 className="font-semibold">
          Outstanding Balance
        </h2>

        <p className="text-2xl font-bold">
          ₹ {outstanding.toLocaleString()}
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Payment Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="border p-2 rounded w-full"
        />

        <textarea
          placeholder="Remarks"
          value={remarks}
          onChange={(e) =>
            setRemarks(e.target.value)
          }
          className="border p-2 rounded w-full"
        />

        <button
          onClick={submitPayment}
          className="px-4 py-2 border rounded"
        >
          Record Payment
        </button>
      </div>
    </div>
  );
}