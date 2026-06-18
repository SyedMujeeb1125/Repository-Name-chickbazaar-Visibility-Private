"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const params = useParams();

  const orderId = String(
    params.orderId || ""
  );

  const [order, setOrder] =
    useState<any>(null);

  useEffect(() => {
    if (!orderId) return;

    fetch(`/api/orders/${orderId}`)
      .then((r) => r.json())
      .then((data) => {
        console.log(
          "ORDER DATA",
          data
        );

        setOrder(data);
      });
  }, [orderId]);

  async function payNow() {
    if (!order) return;

    console.log("PAYMENT AMOUNT SENT:", 1);

    const response = await fetch(
      "/api/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
       body: JSON.stringify({
  amount: order.advanceRequired
})
      }
    );

    const razorpayOrder =
      await response.json();
      console.log("RAZORPAY ORDER:", razorpayOrder);

    const options = {
      key:
        process.env
          .NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount:
        razorpayOrder.amount,

      currency:
        razorpayOrder.currency,

      order_id:
        razorpayOrder.id,

      name: "ChickBazaar",

      description:
        "Advance Payment",

      handler:
        async function (
          response: any
        ) {
          const verify =
            await fetch(
              "/api/payment/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json"
                },
                body: JSON.stringify({
                  orderId:
                    order.id,

                  paymentAmount:
                    order.advanceRequired,

                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature
                })
              }
            );

          const result =
            await verify.json();

          if (
            result.verified
          ) {
            alert(
              "Payment Successful"
            );

            window.location.href =
              "/dashboard";
          } else {
            alert(
              "Verification Failed"
            );
          }
        }
    };

    new window.Razorpay(
      options
    ).open();
  }

  if (!order) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-10">
      <h1 className="text-3xl font-bold">
        Advance Payment
      </h1>

      <div className="mt-6 rounded-lg border bg-white p-6">
        <p>
          Estimated Amount: ₹
          {order.estimatedAmount ||
            0}
        </p>

        <p>
          Advance Required: ₹
          {order.advanceRequired ||
            0}
        </p>

        <button
          onClick={payNow}
          className="mt-6 rounded bg-green-600 px-5 py-3 text-white"
        >
          Pay ₹
          {order.advanceRequired ||
            0}
        </button>
      </div>
    </div>
  );
}