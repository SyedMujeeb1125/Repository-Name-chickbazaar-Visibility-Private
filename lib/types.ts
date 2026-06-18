export type RetailerRecord = {
  id: string;

  createdAt: string;

  status: OrderStatus;

  creditCategory?:
    | "new"
    | "trusted"
    | "premium";

  shopName: string;

  ownerName: string;

  mobile: string;

  email: string;

  address: string;

  gst: string;

  gstCertificatePath?: string;

  latitude?: number;

  longitude?: number;
};
export type OrderStatus =
  | "new"
  | "confirmed"
  | "procured"
  | "dispatched"
  | "delivered"
  | "completed"
  | "cancelled";

export type PartnerStatus =
  | "new"
  | "approved"
  | "blocked"
  | "rejected";

export type PaymentStatus =
  | "pending"
  | "partially_paid"
  | "paid"
  | "refunded";

export type OrderRecord = {
  id: string;

  orderNumber?: string;

  createdAt: string;

  status: OrderStatus;

  paymentStatus?: PaymentStatus;
  paymentAmount?: number;

  razorpayOrderId?: string;
  razorpayPaymentId?: string;

  paymentType?: "advance" | "actual_weight";

  requestedWeight?: number;

  ratePerKg?: number;

  actualWeight?: number;

  finalAmount?: number;

  estimatedAmount?: number;

  advancePercentage?: number;

  advanceRequired?: number;

  shopName: string;
  deliveryShopName?: string;
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
export type RetailerLocationRecord = {
  id: string;

  retailerMobile: string;

  shopName: string;

  contactPerson: string;

  mobile: string;

  address: string;

  latitude?: number;
  longitude?: number;

  createdAt: string;
};

export type FarmInventoryRecord = {
  id: string;

  farmId: string;

  inventoryDate: string;

  weightCategory: string;

  birdCount: number;

  procurementPrice?: number;

  createdAt: string;
};

export type FarmPartnerRecord = {
  id: string;
  createdAt: string;
  status: PartnerStatus;

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

  retailerLocations: RetailerLocationRecord[];

  farmPartners: FarmPartnerRecord[];

  farmInventory: FarmInventoryRecord[];

  otps: OtpRecord[];
};