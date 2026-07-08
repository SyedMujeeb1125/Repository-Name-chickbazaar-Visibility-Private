export interface Retailer {
  id: string;

  shopName: string;

  ownerName: string;

  mobile: string;

  email: string;

  address: string;

  gst: string;

  status: string;

  zone?: string;

  creditCategory: string;

  creditLimit?: number;

  availableCredit?: number;

  latitude?: number;

  longitude?: number;

  createdAt: string;
}