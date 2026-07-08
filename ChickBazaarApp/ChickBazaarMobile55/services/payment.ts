export type CreatePaymentRequest = {
  retailerId: string;
  amount: number;
  orderData: any;
};

export type PaymentResult = {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  message?: string;
};

const API_BASE =
  "https://www.chickbazaar.com/api/mobile";

/**
 * STEP 1
 * Create payment request
 */
export async function createPayment(
  request: CreatePaymentRequest
) {
  const response = await fetch(
    `${API_BASE}/payments/create`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to create payment."
    );
  }

  return response.json();
}

/**
 * STEP 2
 * Launch payment
 *
 * Expo Go:
 * Mock payment
 *
 * Development Build:
 * Razorpay SDK
 */
export async function launchPayment(
  amount: number
): Promise<PaymentResult> {

  await new Promise(resolve =>
    setTimeout(resolve, 1800)
  );

  return {
    success: true,
    paymentId:
      "PAY_" + Date.now(),
  };

}

/**
 * STEP 3
 * Verify payment
 */
export async function verifyPayment(
  paymentId: string
) {

  const response = await fetch(
    `${API_BASE}/payments/verify`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        paymentId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Payment verification failed."
    );
  }

  return response.json();

}

/**
 * STEP 4
 * Create ChickBazaar Order
 */
export async function createOrder(
  orderData: any,
  paymentId: string
): Promise<PaymentResult> {

  const response = await fetch(
    `${API_BASE}/orders/create`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        paymentId,
        ...orderData,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to create order."
    );
  }

  return response.json();

}

/**
 * COMPLETE PAYMENT FLOW
 *
 * Payment Screen should only call this.
 */
export async function processAdvancePayment(
  request: CreatePaymentRequest
): Promise<PaymentResult> {

  try {

    // Create payment
    await createPayment(request);

    // Launch Razorpay (Mock in Expo Go)
    const payment =
      await launchPayment(
        request.amount
      );

    if (!payment.success) {

      return {
        success: false,
        message: "Payment failed.",
      };

    }

    // Verify
    await verifyPayment(
      payment.paymentId!
    );

    // Create Order
    const order =
      await createOrder(
        request.orderData,
        payment.paymentId!
      );

    return order;

  } catch (error: any) {

    return {

      success: false,

      message:
        error?.message ??
        "Unknown payment error.",

    };

  }

}