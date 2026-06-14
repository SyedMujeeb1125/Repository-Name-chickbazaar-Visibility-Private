"use client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function TestPaymentPage() {
  async function createPayment() {
  try {

    const response = await fetch(
      "/api/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: 100
        })
      }
    );

    const order = await response.json();


    if (!response.ok) {
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "ChickBazaar",
      description: "Test Payment",
      order_id: order.id,

      handler: async function (response: any) {
  const verifyResponse = await fetch(
    "/api/payment/verify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature
      })
    }
  );

  const result = await verifyResponse.json();

  alert(
    result.verified
      ? "Payment Verified Successfully"
      : "Payment Verification Failed"
  );
}
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  } catch (error) {
    console.error(error);
    alert("Error occurred. Check browser console.");
  }
}

  return (
    <div className="p-10">
      <button
        onClick={createPayment}
        className="rounded bg-orange px-6 py-3 text-white"
      >
        Test Razorpay Payment
      </button>
    </div>
  );
}