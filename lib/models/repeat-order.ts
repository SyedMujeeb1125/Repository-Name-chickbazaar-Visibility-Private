export interface RepeatOrder {
  id: string;

  retailerId: string;

  frequency:
    | "daily"
    | "weekly"
    | "monthly";

  orderBy:
    | "weight"
    | "birds";

  requestedWeight?: number;

  birds?: number;

  averageWeight?: number;

  paymentType:
    | "advance"
    | "actual_weight"
    | "credit";

  startDate: string;

  endDate?: string;

  status:
    | "active"
    | "paused";

  deliveryAddress: string;

  latitude?: number;

  longitude?: number;
}