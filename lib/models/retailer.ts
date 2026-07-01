export interface Retailer {
  id: string;

  shopName: string;

  ownerName: string;

  mobile: string;

  email: string;

  address: string;

  zone: string;

  creditLimit: number;

  availableCredit: number;

  creditCategory: string;

  status:
    | "new"
    | "approved"
    | "blocked";
}