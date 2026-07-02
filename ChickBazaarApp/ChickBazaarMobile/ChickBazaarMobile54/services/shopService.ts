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

export async function getShops(
  mobile: string
) {
  return request(
    `/shops?mobile=${mobile}`
  );
}

export async function addShop(
  payload: {
    mobile: string;
    shopName: string;
    contactPerson: string;
    address: string;
    latitude?: number;
    longitude?: number;
  }
) {
  return request("/shops", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateShop(
  id: string,
  payload: any
) {
  return request(
    `/shops/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}

export async function deleteShop(
  id: string
) {
  return request(
    `/shops/${id}`,
    {
      method: "DELETE",
    }
  );
}