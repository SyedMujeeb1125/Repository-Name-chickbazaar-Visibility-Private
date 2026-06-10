export type SubmissionStatus =
  | "new"
  | "confirmed"
  | "procured"
  | "dispatched"
  | "delivered"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "partially_paid"
  | "paid"
  | "refunded";

export type OrderRecord = {
  id: string;

  orderNumber?: string;

  createdAt: string;

  status: SubmissionStatus;

  paymentStatus?: PaymentStatus;
  paymentAmount?: number;

  paymentType?: "advance" | "actual_weight";

  requestedWeight?: number;

  ratePerKg?: number;

  actualWeight?: number;

  finalAmount?: number;

  shopName: string;
  ownerName: string;
  mobile: string;
  email: string;
  address: string;

  birds: string;
  averageWeight: string;
  deliveryDate: string;

  notes: string;

  assignedFarm?: string;
  trackingNotes?: string;

  latitude?: number;
  longitude?: number;
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

  latitude?: number;
  longitude?: number;
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

  latitude?: number;
  longitude?: number;
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