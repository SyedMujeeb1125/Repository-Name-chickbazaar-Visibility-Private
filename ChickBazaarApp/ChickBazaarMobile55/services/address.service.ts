import AsyncStorage from "@react-native-async-storage/async-storage";

import Api from "./api";

export type DeliveryAddress = {

  id: string;

  name: string;

  contactPerson?: string;

  mobile?: string;

  address: string;

  landmark?: string;

  city: string;

  state?: string;

  pincode: string;

  isDefault: boolean;

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

const AddressService = {

  async getAddresses() {

    const mobile =
      await getRetailerMobile();

    return Api.get<DeliveryAddress[]>(
      `/addresses?mobile=${mobile}`
    );

  },

  async addAddress(
    data: Omit<
      DeliveryAddress,
      "id"
    >
  ) {

    const mobile =
      await getRetailerMobile();

    return Api.post(
      "/addresses",
      {
        mobile,
        ...data,
      }
    );

  },

  async updateAddress(
    id: string,
    data: Omit<
      DeliveryAddress,
      "id"
    >
  ) {

    const mobile =
      await getRetailerMobile();

    return Api.put(
      `/addresses/${id}`,
      {
        mobile,
        ...data,
      }
    );

  },

  async deleteAddress(
    id: string
  ) {

    return Api.delete(
      `/addresses/${id}`
    );

  },

  async setDefaultAddress(
    id: string
  ) {

    return Api.put(
      `/addresses/${id}/default`,
      {}
    );

  },

};

export default AddressService;