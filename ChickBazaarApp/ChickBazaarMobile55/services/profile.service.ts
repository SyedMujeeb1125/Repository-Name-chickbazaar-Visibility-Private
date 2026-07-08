import AsyncStorage from "@react-native-async-storage/async-storage";

import Api from "./api";

export type Profile = {

  ownerName: string;

  shopName: string;

  mobile: string;

  email: string;

  address: string;

  businessType?: string;

  gstNumber?: string;

  fssaiNumber?: string;

  creditLimit?: number;

  creditCategory?: string;

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

const ProfileService = {

  async getProfile() {

    const mobile =
      await getRetailerMobile();

    return Api.get<Profile>(
      `/profile?mobile=${mobile}`
    );

  },

  async updatePersonalDetails(data: {

    ownerName: string;

    email: string;

    address: string;

  }) {

    const mobile =
      await getRetailerMobile();

    return Api.put(
      "/profile",
      {
        mobile,
        ...data,
      }
    );

  },

  async updateShopDetails(data: {

    shopName: string;

    businessType: string;

    gstNumber: string;

    fssaiNumber: string;

    address: string;

  }) {

    const mobile =
      await getRetailerMobile();

    return Api.put(
      "/shop",
      {
        mobile,
        ...data,
      }
    );

  },

};

export default ProfileService;