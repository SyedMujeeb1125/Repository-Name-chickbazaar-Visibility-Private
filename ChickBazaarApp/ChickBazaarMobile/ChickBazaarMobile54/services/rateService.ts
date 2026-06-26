import { API_BASE } from "../constants/api";
export async function getTodayRate() {
  const response = await fetch(
    `${API_BASE}/today-rate`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to load today's rate."
    );
  }

  return response.json();
}