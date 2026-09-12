/**
 * --------------------------------------------------------
 * ChickBazaar Business Types
 * --------------------------------------------------------
 * Shared across
 * - Website
 * - Mobile
 * - APIs
 * --------------------------------------------------------
 */

import { DeliveryWave } from "./delivery";

/**
 * Current business phase
 */
export enum BusinessPhase {
  BOOKING = "BOOKING",

  STANDARD_DELIVERY = "STANDARD_DELIVERY",

  EXPRESS_DELIVERY = "EXPRESS_DELIVERY",

  BOOKING_CLOSED = "BOOKING_CLOSED",
}

/**
 * Live pricing state
 */
export enum PricingState {
  PUBLISHED = "PUBLISHED",

  PUBLISHING = "PUBLISHING",

  WAITING = "WAITING",
}

/**
 * Business clock
 */
export interface BusinessClock {
  currentDate: string;

  currentTime: string;

  currentHour: number;

  currentMinute: number;

  serverTimestamp: Date;
}

/**
 * Current pricing
 */
export interface BusinessPricing {
  todayRate: number;

  tomorrowRate: number;

  publishedAt?: string;

  effectiveDate: string;

  state: PricingState;
}

/**
 * Delivery booking rules
 */
export interface BookingRules {
  bookingStartsAt: string;

  bookingEndsAt: string;

  expressStartsAt: string;

  expressEndsAt: string;

  bookingClosedStartsAt: string;

  bookingClosedEndsAt: string;
}

/**
 * Dashboard action
 */
export interface DashboardAction {
  title: string;

  subtitle: string;

  buttonText: string;

  enabled: boolean;
}

/**
 * Complete business status
 */
export interface BusinessStatus {
  phase: BusinessPhase;

  pricing: BusinessPricing;

  clock: BusinessClock;

  bookingRules: BookingRules;

  dashboard: DashboardAction;

  availableWaves: DeliveryWave[];

  bookingOpen: boolean;

  expressAvailable: boolean;

  bookingClosed: boolean;

  canPlaceOrder: boolean;

  canTrackOrder: boolean;

  canRepeatOrder: boolean;

  canScheduleTomorrow: boolean;
}

/**
 * Dashboard summary
 */
export interface BusinessSummary {
  totalRetailers: number;

  activeOrders: number;

  deliveriesToday: number;

  outstandingAmount: number;

  liveRate: number;

  businessDate: string;
}