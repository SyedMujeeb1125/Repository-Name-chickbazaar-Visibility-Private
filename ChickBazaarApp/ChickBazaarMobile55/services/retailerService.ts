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
    const message = await response.text();

    throw new Error(
      message || "Request failed."
    );
  }

  return response.json();
}

export async function loginRetailer(
  mobile: string
) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify({
      mobile,
    }),
  });
}

export async function registerRetailer(
  payload: {
    shopName: string;
    ownerName: string;
    mobile: string;
    email: string;
  }
) {
  return request(
    "/register-retailer",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}

export async function getRetailerProfile(
  mobile: string
) {
  return request(
    `/profile?mobile=${mobile}`
  );
}

export async function getRetailerDashboard(
  mobile: string
) {
  return request(
    `/retailer/dashboard?mobile=${mobile}`
  );
}

export async function getRetailerCredit(
  retailerId: string
) {
  return request(
    `/retailer/credit/${retailerId}`
  );
}

export async function getRetailerShops(
  mobile: string
) {
  return request(
    `/shops?mobile=${mobile}`
  );
}

export async function updateRetailerProfile(
  retailerId: string,
  payload: any
) {
  return request(
    `/retailer/${retailerId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}

