"use client";

import { useState } from "react";

type Props = {
  rate: number;
};

export function OrderConfigurator({
  rate
}: Props) {
  const [orderBy, setOrderBy] =
    useState("weight");

  const [weight, setWeight] =
    useState("");

  const [birds, setBirds] =
    useState("");

    const [birds15, setBirds15] =
  useState("");

const [birds20, setBirds20] =
  useState("");

const [birds25, setBirds25] =
  useState("");

const [birds30, setBirds30] =
  useState("");

  const [paymentType, setPaymentType] =
    useState("advance");

  const totalBirds =
  Number(birds15 || 0) +
  Number(birds20 || 0) +
  Number(birds25 || 0) +
  Number(birds30 || 0);

const estimatedWeight =
  orderBy === "weight"
    ? Number(weight || 0)
    : Number(birds15 || 0) * 1.5 +
      Number(birds20 || 0) * 2 +
      Number(birds25 || 0) * 2.5 +
      Number(birds30 || 0) * 3;

const estimatedValue =
  estimatedWeight * rate;

  const payableToday =
    paymentType === "advance"
      ? estimatedValue * 0.2
      : estimatedValue;

  return (
    <div className="space-y-6 rounded-xl border bg-white p-5">
      <h3 className="text-xl font-bold text-navy">
        Order Configuration
      </h3>

      <div>
        <label className="font-semibold">
          Order By
        </label>

        <div className="mt-2 flex gap-5">
          <label>
            <input
              type="radio"
              name="orderBy"
              value="weight"
              checked={
                orderBy === "weight"
              }
              onChange={() =>
                setOrderBy("weight")
              }
            />
            {" "}Weight (Kg)
          </label>

          <label>
            <input
              type="radio"
              name="orderBy"
              value="birds"
              checked={
                orderBy === "birds"
              }
              onChange={() =>
                setOrderBy("birds")
              }
            />
            {" "}Number Of Birds
          </label>
        </div>
      </div>

      {orderBy === "weight" && (
        <div>
          <label className="font-semibold">
            Requested Weight
          </label>

          <div className="mt-2 flex flex-wrap gap-2">
            {[100, 200, 500, 1000].map(
              (preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() =>
                    setWeight(
                      String(preset)
                    )
                  }
                  className="rounded border border-orange px-4 py-2"
                >
                  {preset} Kg
                </button>
              )
            )}
          </div>

          <input
            name="requestedWeight"
            type="number"
            value={weight}
            onChange={(e) =>
              setWeight(
                e.target.value
              )
            }
            className="mt-3 w-full rounded border p-3"
          />
        </div>
      )}

      {orderBy === "birds" && (
        <div>
          <label className="font-semibold">
            Total Birds Required
          </label>

          <div className="mt-2 flex flex-wrap gap-2">
            {[100, 200, 500, 1000].map(
              (preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() =>
                    setBirds(
                      String(preset)
                    )
                  }
                  className="rounded border border-orange px-4 py-2"
                >
                  {preset} Birds
                </button>
              )
            )}
          </div>

          <input
            name="birds"
            type="number"
            value={birds}
            onChange={(e) =>
              setBirds(
                e.target.value
              )
            }
            className="mt-3 w-full rounded border p-3"
          />
          <div className="mt-5 space-y-3">
  <h4 className="font-semibold">
    Bird Mix (Optional)
  </h4>

  <input
    type="number"
    placeholder="1.5 Kg Birds"
    value={birds15}
    onChange={(e) =>
      setBirds15(e.target.value)
    }
    className="w-full rounded border p-3"
  />

  <input
    type="number"
    placeholder="2.0 Kg Birds"
    value={birds20}
    onChange={(e) =>
      setBirds20(e.target.value)
    }
    className="w-full rounded border p-3"
  />

  <input
    type="number"
    placeholder="2.5 Kg Birds"
    value={birds25}
    onChange={(e) =>
      setBirds25(e.target.value)
    }
    className="w-full rounded border p-3"
  />

  <input
    type="number"
    placeholder="3.0 Kg Birds"
    value={birds30}
    onChange={(e) =>
      setBirds30(e.target.value)
    }
    className="w-full rounded border p-3"
  />
  <div className="rounded-lg bg-slate-50 p-4 text-sm">
  <p>
    Total Birds Required:
    {" "}
    {birds || 0}
  </p>

  <p>
    Allocated:
    {" "}
    {totalBirds}
  </p>

  {Number(birds || 0) >= totalBirds ? (
    <p className="font-semibold text-green-700">
      Remaining:
      {" "}
      {Number(birds || 0) - totalBirds}
    </p>
  ) : (
    <p className="font-semibold text-red-700">
      Exceeded By:
      {" "}
      {totalBirds - Number(birds || 0)}
    </p>
  )}
</div>
  <div className="rounded bg-slate-50 p-3 text-sm">
    <p>
      Total Birds Required:
      {" "}
      {birds || 0}
    </p>

    <p>
      Allocated:
      {" "}
      {totalBirds}
    </p>

    <p>
      Remaining:
      {" "}
      {Math.max(
        Number(birds || 0) -
          totalBirds,
        0
      )}
    </p>
  </div>
</div>
        </div>
      )}

      <div>
        <label className="font-semibold">
          Payment Option
        </label>

        <div className="mt-2 space-y-2">
          <label className="block">
            <input
              type="radio"
              name="paymentType"
              value="advance"
              checked={
                paymentType ===
                "advance"
              }
              onChange={() =>
                setPaymentType(
                  "advance"
                )
              }
            />
            {" "}20% Advance Payment
          </label>

          <label className="block">
            <input
              type="radio"
              name="paymentType"
              value="full"
              checked={
                paymentType ===
                "full"
              }
              onChange={() =>
                setPaymentType(
                  "full"
                )
              }
            />
            {" "}100% Full Payment
          </label>
        </div>
      </div>

      <p>
  Estimated Weight:
  {" "}
  {estimatedWeight.toFixed(1)}
  {" "}Kg
</p>

<p>
  Estimated Value:
  ₹{estimatedValue.toLocaleString()}
</p>

<p className="font-bold text-orange">
  Payable Today:
  ₹{payableToday.toLocaleString()}
</p>

<p className="mt-2">
  Balance After Delivery:
  ₹
  {(
    estimatedValue -
    payableToday
  ).toLocaleString()}
</p>
    </div>
  );
}