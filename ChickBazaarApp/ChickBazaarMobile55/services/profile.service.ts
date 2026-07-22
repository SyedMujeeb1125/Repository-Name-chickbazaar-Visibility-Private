import { API } from "../config/api";
import Api from "./api";
import SessionService from "./session";

export interface Profile {
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
}

async function getRetailerMobile(): Promise<string> {
  const retailer =
    await SessionService.getRetailer<{
      mobile: string;
    }>();

  if (!retailer?.mobile) {
    throw new Error("Retailer not logged in.");
  }

  return retailer.mobile;
}

const ProfileService = {
  async getProfile() {
    const mobile =
      await getRetailerMobile();

    return Api.get<Profile>(
      `${API.PROFILE.GET}?mobile=${encodeURIComponent(
        mobile
      )}`
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
      API.PROFILE.UPDATE,
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
      API.PROFILE.UPDATE_SHOP,
      {
        mobile,
        ...data,
      }
    );
  },
};

export default ProfileService;