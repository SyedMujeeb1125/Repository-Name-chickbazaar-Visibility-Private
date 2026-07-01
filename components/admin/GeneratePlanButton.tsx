"use client";

import { useState } from "react";

export default function GeneratePlanButton() {
  const [loading, setLoading] =
    useState(false);

  async function generate() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/admin/planning/generate",
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
        "Tomorrow's plan generated successfully."
      );

      location.reload();

    } catch (error) {

      alert(
        error instanceof Error
          ? error.message
          : "Unable to generate plan."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <button
      onClick={generate}
      disabled={loading}
      className="rounded-lg bg-orange px-6 py-3 font-bold text-white"
    >
      {loading
        ? "Generating..."
        : "Generate Tomorrow's Plan"}
    </button>
  );
}