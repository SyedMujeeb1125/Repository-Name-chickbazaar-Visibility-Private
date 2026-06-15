"use client";

import { useState } from "react";
import { WeightSelector } from "./weight-selector";
import { BirdSelector } from "./bird-selector";

export function OrderTypeSelector() {
  const [orderBy, setOrderBy] =
    useState("weight");

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-navy">
        Order By
      </label>

      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="orderBy"
            value="weight"
            checked={orderBy === "weight"}
            onChange={() =>
              setOrderBy("weight")
            }
          />
          Weight (Kg)
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="orderBy"
            value="birds"
            checked={orderBy === "birds"}
            onChange={() =>
              setOrderBy("birds")
            }
          />
          Number Of Birds
        </label>
      </div>

      {orderBy === "weight" && (
        <WeightSelector />
      )}

      {orderBy === "birds" && (
        <BirdSelector />
      )}
    </div>
  );
}