"use client";

import { useState } from "react";

type Props = {
  id: string;
};

export default function ApprovePlanningButton({
  id,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  async function approve() {
    try {
      setLoading(true);

      const response =
        await fetch(
          `/api/admin/planning/${id}/approve`,
          {
            method: "POST",
          }
        );

      if (!response.ok) {
        throw new Error(
          "Unable to approve."
        );
      }

      alert("Planning Run Approved.");

      location.reload();

    } finally {

      setLoading(false);

    }
  }

  return (
    <button
      onClick={approve}
      disabled={loading}
      className="rounded-lg bg-green-600 px-6 py-3 font-bold text-white"
    >
      {loading
        ? "Approving..."
        : "Approve Plan"}
    </button>
  );
}