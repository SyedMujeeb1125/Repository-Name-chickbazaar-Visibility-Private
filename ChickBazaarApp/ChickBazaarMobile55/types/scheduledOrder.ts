export type ScheduleFrequency =
  | "Daily"
  | "Weekly"
  | "Monthly";

export interface ScheduledOrder {

  id: string;

  retailerId: string;

  frequency: ScheduleFrequency;

  weekdays: number[];

  dayOfMonth?: number;

  quantityKg: number;

  autoConfirm: boolean;

  nextConfirmationDate?: string;

  lastConfirmedAt?: string;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;

}

export interface CreateScheduledOrderRequest {

  frequency: ScheduleFrequency;

  weekdays: number[];

  dayOfMonth?: number;

  quantityKg: number;

  autoConfirm: boolean;

}

export interface UpdateScheduledOrderRequest {

  id: string;

  frequency: ScheduleFrequency;

  weekdays: number[];

  dayOfMonth?: number;

  quantityKg: number;

  autoConfirm: boolean;

}

export interface DashboardTomorrowOrder {

  available: boolean;

  scheduleId?: string;

  weight?: number;

  rate?: number;

  amount?: number;

  deliveryDate?: string;

}