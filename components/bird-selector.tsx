"use client";

import { useState } from "react";

export function BirdSelector() {
  const [birds, setBirds] = useState("");

  const presets = [100, 200, 500, 1000];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-navy">
        Number Of Birds Required
      </label>

      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setBirds(String(preset))}
            className="rounded-md border border-orange px-4 py-2 text-sm font-bold text-orange hover:bg-orange hover:text-white"
          >
            {preset} Birds
          </button>
        ))}
      </div>

      <input
        name="birds"
        type="number"
        min="1"
        value={birds}
        onChange={(e) => setBirds(e.target.value)}
        placeholder="Or enter custom bird count"
        required
        className="focus-ring min-h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-slate-800"
      />
    </div>
  );
}