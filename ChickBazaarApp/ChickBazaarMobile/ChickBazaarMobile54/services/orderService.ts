import { API_BASE } from "../constants/api";
import { PlaceOrderRequest } from "../types/placeOrder";

async function request(
  endpoint: string,
  options?: RequestInit
) {
  const response = await fetch(
    `${API_BASE}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      ...options,
    }
  );

  if (!response.ok) {
    const message =
      await response.text();

    throw new Error(
      message || "Request failed."
    );
  }

  return response.json();
}

export async function placeOrder(
  payload: PlaceOrderRequest
) {
  return request("/place-order", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMyOrders(
  mobile: string
) {
  return request(
    `/orders?mobile=${mobile}`
  );
}

export async function getOrderDetails(
  id: string
) {
  return request(`/orders/${id}`);
}

export async function getOutstanding(
  retailerId: string
) {
  return request(
    `/retailer/outstanding/${retailerId}`
  );
}

export async function getStatement(
  retailerId: string
) {
  return request(
    `/retailer/statement/${retailerId}`
  );
}

export async function getInvoices(
  retailerId: string
) {
  return request(
    `/retailer/invoices/${retailerId}`
  );
}