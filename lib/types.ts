export type SubmissionStatus = "new" | "contacted" | "fulfilled" | "rejected";

export type OrderRecord = {
  id: string;
  createdAt: string;
  status: SubmissionStatus;
  shopName: string;
  ownerName: string;
  mobile: string;
  email: string;
  address: string;
  birds: string;
  averageWeight: string;
  deliveryDate: string;
  notes: string;
};

export type RetailerRecord = {
  id: string;
  createdAt: string;
  status: SubmissionStatus;
  shopName: string;
  ownerName: string;
  mobile: string;
  email: string;
  address: string;
  gst: string;
  gstCertificatePath: string;
};

export type FarmPartnerRecord = {
  id: string;
  createdAt: string;
  status: SubmissionStatus;
  farmName: string;
  contactPerson: string;
  mobile: string;
  email: string;
  location: string;
  dailyCapacity: string;
  averageBirdWeight: string;
  message: string;
};

export type OtpRecord = {
  mobile: string;
  codeHash: string;
  expiresAt: string;
  createdAt: string;
};

export type ChickBazaarDb = {
  orders: OrderRecord[];
  retailers: RetailerRecord[];
  farmPartners: FarmPartnerRecord[];
  otps: OtpRecord[];
};
