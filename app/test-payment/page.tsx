"use client";

export default function TestPaymentPage() {
  async function createPayment() {
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

    const data = await response.json();

    console.log(data);

    alert(
      data.id
        ? "Razorpay Order Created"
        : "Failed"
    );
  }

  return (
    <div className="p-10">
      <button
        onClick={createPayment}
        className="rounded bg-orange px-6 py-3 text-white"
      >
        Test Razorpay
      </button>
    </div>
  );
}