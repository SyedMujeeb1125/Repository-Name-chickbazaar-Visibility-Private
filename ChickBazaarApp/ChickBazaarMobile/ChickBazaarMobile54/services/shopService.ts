import { API_BASE } from "../constants/api";
export async function getShops(
  mobile: string
) {
  const response = await fetch(
    `${API_BASE}/shops?mobile=${mobile}`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to load shops."
    );
  }

  return response.json();
}