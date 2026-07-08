import AsyncStorage from "@react-native-async-storage/async-storage";

import Api from "./api";

export type Order = {

  id: string;

  orderNumber: string;

  orderDate: string;

  deliveryDate: string;

  status: string;

  quantity: number;

  orderType: "kg" | "birds";

  ratePerKg: number;

  estimatedAmount: number;

  advancePaid: number;

  finalAmount?: number;

  shopName?: string;

};

async function getRetailerMobile() {

  const mobile =
    await AsyncStorage.getItem(
      "retailerMobile"
    );

  if (!mobile) {

    throw new Error(
      "Retailer not logged in."
    );

  }

  return mobile;

}

const OrderService = {

  async getOrders() {

    const mobile =
      await getRetailerMobile();

    return Api.get<Order[]>(
      `/orders?mobile=${mobile}`
    );

  },

  async getOrder(
    id: string
  ) {

    return Api.get<Order>(
      `/orders/${id}`
    );

  },

  async createOrder(
    data: any
  ) {

    const mobile =
      await getRetailerMobile();

    return Api.post(
      "/orders",
      {
        mobile,
        ...data,
      }
    );

  },

  async cancelOrder(
    id: string
  ) {

    return Api.put(
      `/orders/${id}/cancel`,
      {}
    );

  },

  async trackOrder(
    id: string
  ) {

    return Api.get(
      `/orders/${id}/tracking`
    );

  },

};

export default OrderService;