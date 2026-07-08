export type VerificationStatus =
  | "verified"
  | "pending"
  | "rejected";

export type ServiceZone =
  | "north"
  | "south"
  | "east"
  | "west"
  | "central"
  | "outside";

export interface CreateLocationRequest {
  retailerMobile: string;

  shopName: string;

  contactPerson: string;

  mobile: string;

  address: string;

  addressLine1?: string;

  addressLine2?: string;

  landmark?: string;

  city?: string;

  district?: string;

  state?: string;

  country?: string;

  pincode?: string;

  latitude?: number;

  longitude?: number;

  googlePlaceId?: string;

  formattedAddress?: string;

  plusCode?: string;

  accuracy?: number;

  confidenceScore?: number;

  verificationStatus?: VerificationStatus;

  serviceZone?: ServiceZone;

  isDefault?: boolean;
}

export type UpdateLocationRequest =
  Partial<CreateLocationRequest>;