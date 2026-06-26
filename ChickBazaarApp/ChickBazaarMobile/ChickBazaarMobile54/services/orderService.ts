import { API_BASE } from "../constants/api";

import {
  PlaceOrderRequest,
} from "../types/placeOrder";

export async function placeOrder(
  payload: PlaceOrderRequest
) {
  const response = await fetch(
    `${API_BASE}/place-order`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to place order."
    );
  }

  return response.json();
}