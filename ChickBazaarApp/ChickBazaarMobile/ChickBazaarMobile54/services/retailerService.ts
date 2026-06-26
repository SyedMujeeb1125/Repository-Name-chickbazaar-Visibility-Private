import { API_BASE } from "../constants/api";

export async function getRetailerProfile(
  mobile: string
) {
  const response = await fetch(
    `${API_BASE}/profile?mobile=${mobile}`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to load retailer profile."
    );
  }

  return response.json();
}

export async function loginRetailer(
  mobile: string
) {
  const response = await fetch(
    `${API_BASE}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        mobile,
      }),
    }
  );

  return response.json();
}

export async function registerRetailer(
  payload: {
    shopName: string;
    ownerName: string;
    mobile: string;
    email: string;
  }
) {
  const response = await fetch(
    `${API_BASE}/register-retailer`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return response.json();
}