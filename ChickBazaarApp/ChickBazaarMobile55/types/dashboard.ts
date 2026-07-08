import { DashboardState } from "../utils/dashboard";

export interface DashboardHeroData {
  state: DashboardState;

  orderId?: string;

  deliveryDate?: string;
  deliveryWindow?: string;

  driverName?: string;
  driverPhone?: string;

  vehicleNumber?: string;

  farmName?: string;

  eta?: string;

  trackingUrl?: string;

  statusMessage?: string;
}