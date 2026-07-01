"use client";

import { useState } from "react";

type Props = {
  id: string;
};

export default function ExecutePlanningButton({
  id,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  async function execute() {

    try {

      setLoading(true);

      const response =
        await fetch(
          `/api/admin/planning/${id}/execute`,
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

      alert(
        "Planning Run Executed Successfully."
      );

      location.reload();

    } catch (error) {

      alert(
        error instanceof Error
          ? error.message
          : "Execution failed."
      );

    } finally {

      setLoading(false);

    }

  }

  return (
    <button
      onClick={execute}
      disabled={loading}
      className="rounded-lg bg-purple-700 px-6 py-3 font-bold text-white"
    >
      {loading
        ? "Executing..."
        : "Execute Plan"}
    </button>
  );
}