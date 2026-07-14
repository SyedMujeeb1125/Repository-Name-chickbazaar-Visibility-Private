"use client";

import { useMemo, useState } from "react";

type Props = {
  requestedWeight: number;
  ratePerKg: number;
  advanceAmount: number;
  estimatedAmount: number;
};

export default function PaymentCalculator({
  requestedWeight,
  ratePerKg,
  advanceAmount,
  estimatedAmount,
}: Props) {

  const [actualWeight, setActualWeight] =
    useState("");

  const [paymentMode, setPaymentMode] =
    useState("cash");

  const [cashReceived, setCashReceived] =
    useState("");

  const [upiReceived, setUpiReceived] =
    useState("");

  const [upiTransactionId, setUpiTransactionId] =
    useState("");

  const finalBill = useMemo(() => {

    const weight =
      Number(actualWeight || 0);

    if (weight <= 0) {
      return estimatedAmount;
    }

    return weight * ratePerKg;

  }, [
    actualWeight,
    estimatedAmount,
    ratePerKg,
  ]);

  const amountToCollect =
    Math.max(
      finalBill - advanceAmount,
      0
    );

  const totalReceived =
    Number(cashReceived || 0) +
    Number(upiReceived || 0);

  const balanceDue =
    Math.max(
      amountToCollect -
      totalReceived,
      0
    );

      return (
    <div className="mt-6 rounded-2xl border bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-bold">
        Payment Collection
      </h2>

      {/* Actual Weight */}

      <label className="mb-2 block font-medium">
        Actual Weight (Kg)
      </label>

      <input
        type="number"
        step="0.01"
        name="actualWeight"
        value={actualWeight}
        onChange={(e) =>
          setActualWeight(e.target.value)
        }
        placeholder={`Requested Weight : ${requestedWeight} Kg`}
        className="w-full rounded-lg border p-3"
        required
      />

      {/* Bill Summary */}

      <div className="mt-6 rounded-xl border bg-orange-50 p-5">

        <h3 className="mb-4 text-lg font-bold text-orange-700">
          Bill Summary
        </h3>

        <div className="flex justify-between">
          <span>Today's Rate</span>

          <strong>
            ₹{ratePerKg}/Kg
          </strong>
        </div>

        <div className="mt-2 flex justify-between">
          <span>Final Bill</span>

          <strong>
            ₹{finalBill.toLocaleString()}
          </strong>
        </div>

        <div className="mt-2 flex justify-between">
          <span>Booking Advance</span>

          <strong className="text-green-600">
            ₹{advanceAmount.toLocaleString()}
          </strong>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between text-lg">

          <strong>
            Amount To Collect
          </strong>

          <strong className="text-orange-600">
            ₹{amountToCollect.toLocaleString()}
          </strong>

        </div>

      </div>

      {/* Payment Mode */}

      <div className="mt-6">

        <label className="mb-2 block font-medium">
          Payment Mode
        </label>

        <select
          name="paymentMode"
          value={paymentMode}
          onChange={(e) =>
            setPaymentMode(e.target.value)
          }
          className="w-full rounded-lg border p-3"
        >

          <option value="cash">
            Cash
          </option>

          <option value="upi">
            UPI
          </option>

          <option value="split">
            Cash + UPI
          </option>

        </select>

      </div>

      {(paymentMode === "cash" ||
        paymentMode === "split") && (

        <input
          type="number"
          name="cashReceived"
          value={cashReceived}
          onChange={(e) =>
            setCashReceived(e.target.value)
          }
          placeholder="Cash Received"
          className="mt-4 w-full rounded-lg border p-3"
        />

      )}

      {(paymentMode === "upi" ||
        paymentMode === "split") && (

        <>

          <input
            type="number"
            name="upiReceived"
            value={upiReceived}
            onChange={(e) =>
              setUpiReceived(e.target.value)
            }
            placeholder="UPI Received"
            className="mt-4 w-full rounded-lg border p-3"
          />

          <input
            type="text"
            name="upiTransactionId"
            value={upiTransactionId}
            onChange={(e) =>
              setUpiTransactionId(
                e.target.value
              )
            }
            placeholder="UPI Transaction ID"
            className="mt-4 w-full rounded-lg border p-3"
          />

        </>

      )}

      {/* Live Collection */}

      <div className="mt-6 rounded-xl border bg-green-50 p-5">

        <h3 className="mb-3 text-lg font-bold text-green-700">
          Live Collection Summary
        </h3>

        <div className="flex justify-between">

          <span>Total Received</span>

          <strong>
            ₹{totalReceived.toLocaleString()}
          </strong>

        </div>

        <div className="mt-3 flex justify-between">

          <span>Balance Pending</span>

          <strong
            className={
              balanceDue === 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            ₹{balanceDue.toLocaleString()}
          </strong>

        </div>

        <div className="mt-4">

          {balanceDue === 0 ? (

            <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">

              ✓ Payment Completed

            </span>

          ) : (

            <span className="rounded-full bg-orange-100 px-4 py-2 font-semibold text-orange-700">

              ₹{balanceDue.toLocaleString()} Pending

            </span>

          )}

        </div>

      </div>

    </div>
  );
}