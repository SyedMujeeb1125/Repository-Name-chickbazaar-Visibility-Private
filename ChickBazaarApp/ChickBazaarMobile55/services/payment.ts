export type CreatePaymentRequest = {
  retailerId: string;
  amount: number;
  orderData: Record<string, unknown>;
};

export interface PaymentResult {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  paymentId?: string;
  message?: string;
}

const API_BASE = "http://10.144.143.74:3000/api/mobile";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

async function postJson<T>(
  endpoint: string,
  body: unknown,
  defaultError: string
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? defaultError);
  }

  return data as T;
}

/**
 * STEP 1
 * Create payment request
 */
export async function createPayment(
  request: CreatePaymentRequest
) {
  return postJson(
    "/payments/create",
    request,
    "Unable to create payment."
  );
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
  // Simulate payment gateway
  await new Promise((resolve) => setTimeout(resolve, 1800));

  return {
    success: true,
    paymentId: `PAY_${Date.now()}`,
  };
}

/**
 * STEP 3
 * Verify payment
 */
export async function verifyPayment(
  paymentId: string
) {
  return postJson(
    "/payments/verify",
    {
      paymentId,
    },
    "Payment verification failed."
  );
}

/**
 * STEP 4
 * Create ChickBazaar Order
 */
export async function createOrder(
  request: CreatePaymentRequest,
  paymentId: string
): Promise<PaymentResult> {
  const payload = {
    retailerId: request.retailerId,
    paymentId,
    ...request.orderData,
  };

  return postJson<PaymentResult>(
    "/orders/create",
    payload,
    "Unable to create order."
  );
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
    // STEP 1
    await createPayment(request);

    // STEP 2
    const payment = await launchPayment(request.amount);

    if (!payment.success || !payment.paymentId) {
      return {
        success: false,
        message: "Payment failed.",
      };
    }

    // STEP 3
    await verifyPayment(payment.paymentId);

    // STEP 4

        const order = await createOrder(
      request,
      payment.paymentId
    );

    return order;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unexpected payment error. Please try again.",
    };
  }
}