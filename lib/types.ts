export type RetailerRecord = {
  id: string;

  createdAt: string;

  status: OrderStatus;

  zone?:
    | "north"
    | "south"
    | "east"
    | "west"
    | "central";

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

  zone?:
    | "north"
    | "south"
    | "east"
    | "west"
    | "central";

  orderBy?: "weight" | "birds";

  paymentStatus?: PaymentStatus;

  paymentAmount?: number;

  razorpayOrderId?: string;

  razorpayPaymentId?: string;

  paymentType?: "advance" | "actual_weight";

  requestedWeight?: number;

  birds?: number;

  averageWeight?: number;

  ratePerKg?: number;

  estimatedAmount?: number;

  advancePercentage?: number;

  advanceRequired?: number;

  actualWeight?: number;

  finalAmount?: number;

  outstandingAmount?: number;

  deliveryNotes?: string;

  deliveredAt?: string;

  shopName: string;

  deliveryShopName?: string;

  ownerName: string;

  mobile: string;

  email: string;

  address: string;

  deliveryDate: string;

  notes: string;

  assignedFarm?: string;

  assignedDriver?: string;

  assignedVehicle?: string;

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

  zone?:
    | "north"
    | "south"
    | "east"
    | "west"
    | "central";

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

export type UserRole =
  | "admin"
  | "operations"
  | "delivery"
  | "collections";

export type UserRecord = {
  id: string;

  createdAt: string;

  zone?:
    | "north"
    | "south"
    | "east"
    | "west"
    | "central";

  name: string;

  mobile: string;

  email: string;

  role: UserRole;

  active: boolean;
};

export type ChickBazaarDb = {users: UserRecord[];
  vehicles: VehicleRecord[];
  orders: OrderRecord[];

  retailers: RetailerRecord[];

  retailerLocations: RetailerLocationRecord[];

  farmPartners: FarmPartnerRecord[];

  farmInventory: FarmInventoryRecord[];

  otps: OtpRecord[];
};
export type VehicleRecord = {
  id: string;

  vehicleNumber: string;

  zone?:
    | "north"
    | "south"
    | "east"
    | "west"
    | "central";

  capacityKg: number;

  assignedDriver?: string;

  status:
    | "available"
    | "on_route"
    | "maintenance";

  createdAt: string;
};