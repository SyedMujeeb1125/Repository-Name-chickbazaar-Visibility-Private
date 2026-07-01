export type OrderStatus =
  | "new"
  | "confirmed"
  | "procured"
  | "allocated"
  | "dispatched"
  | "delivered"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "partial"
  | "paid";

export interface Order {
  id: string;

  orderNumber: string;

  retailerId?: string;

  shopName: string;

  ownerName: string;

  mobile: string;

  email: string;

  address: string;

  zone: string;

  orderBy: "weight" | "birds";

  birds: number;

  requestedWeight: number;

  averageWeight?: number;

  ratePerKg: number;

  estimatedAmount: number;

  finalAmount?: number;

  paymentType:
    | "advance"
    | "actual_weight"
    | "credit";

  paymentStatus: PaymentStatus;

  paymentAmount: number;

  advanceRequired: number;

  outstandingAmount?: number;

  deliveryDate: string;

  createdAt: string;

  status: OrderStatus;

  assignedFarm?: string;

  assignedVehicle?: string;

  assignedDriver?: string;

  latitude?: number;

  longitude?: number;

  trackingNotes?: string;
}