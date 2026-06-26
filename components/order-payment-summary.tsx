"use client";

import { useEffect, useState } from "react";

type Props = {
  rate: number;
};

export function OrderPaymentSummary({
  rate
}: Props) {
  const [weight, setWeight] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    const input = document.querySelector(
      'input[name="requestedWeight"]'
    ) as HTMLInputElement | null;

    if (input) {
      setWeight(Number(input.value || 0));
    }
  }, 200);

  return () => clearInterval(interval);
}, []);

  const estimatedValue = weight * rate;

  const advanceAmount =
    Math.round(estimatedValue * 0.2);

  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="text-lg font-bold text-navy">
        Order Estimate
      </h3>

      <div className="mt-4 space-y-2 text-sm">
        

        <p>
          <strong>Requested Weight:</strong>
          {" "}{weight} kg
        </p>

        <p>
          <strong>Estimated Value:</strong>
          {" "}₹{estimatedValue.toLocaleString()}
        </p>

        <p className="text-lg font-bold text-orange">
          20% Advance:
          {" "}₹{advanceAmount.toLocaleString()}
        </p>
      </div>
    </div>
  );
}