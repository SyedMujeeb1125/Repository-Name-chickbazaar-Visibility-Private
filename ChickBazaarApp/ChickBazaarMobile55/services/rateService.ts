import { API_BASE } from "../constants/api";

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

export async function getTodayRate() {
  return request("/today-rate");
}

export async function getRateHistory() {
  return request("/rate-history");
}