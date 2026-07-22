import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    CreateScheduledOrderRequest,
    UpdateScheduledOrderRequest
} from "../types/scheduledOrder";

const BASE_URL =
  "https://www.chickbazaar.com/api/mobile/scheduled-orders";

async function getMobile() {

  const mobile =
    await AsyncStorage.getItem(
      "retailerMobile"
    );

  if (!mobile) {
    throw new Error(
      "Retailer mobile not found."
    );
  }

  return mobile;

}

export async function getScheduledOrders() {

  const mobile =
    await getMobile();

  const response =
    await fetch(
      `${BASE_URL}?mobile=${mobile}`
    );

  if (!response.ok) {

    throw new Error(
      "Unable to load schedules."
    );

  }

  return await response.json();

}

export async function createScheduledOrder(
  request: CreateScheduledOrderRequest
) {

  const mobile =
    await getMobile();

  const response =
    await fetch(BASE_URL, {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({

        mobile,

        ...request,

      }),

    });

  const result =
    await response.json();

  if (!response.ok) {

    throw new Error(
      result.message ??
      "Unable to create schedule."
    );

  }

  return result;

}

export async function updateScheduledOrder(
  request: UpdateScheduledOrderRequest
) {

  const mobile =
    await getMobile();

  const response =
    await fetch(BASE_URL, {

      method: "PUT",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({

        mobile,

        ...request,

      }),

    });

  const result =
    await response.json();

  if (!response.ok) {

    throw new Error(
      result.message ??
      "Unable to update schedule."
    );

  }

  return result;

}

export async function deleteScheduledOrder(
  id: string
) {

  const mobile =
    await getMobile();

  const response =
    await fetch(BASE_URL, {

      method: "DELETE",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({

        mobile,

        id,

      }),

    });

  const result =
    await response.json();

  if (!response.ok) {

    throw new Error(
      result.message ??
      "Unable to delete schedule."
    );

  }

  return result;

}