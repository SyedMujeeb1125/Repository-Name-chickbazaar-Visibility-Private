/**
 * --------------------------------------------------------
 * ChickBazaar Business Configuration
 * --------------------------------------------------------
 * Canonical business timings.
 * Business timezone: Asia/Kolkata
 * --------------------------------------------------------
 */

import { BusinessPhase } from "../types/business";

export const BUSINESS_TIMEZONE = "Asia/Kolkata";

export const BUSINESS_HOURS = {
  RATE_PUBLISH_TIME: "19:00",

  BOOKING_START: "19:00",
  BOOKING_END: "23:59",

  STANDARD_START: "00:00",
  STANDARD_END: "04:59",

  EXPRESS_START: "05:00",
  EXPRESS_END: "17:00",

  CLOSED_START: "17:00",
  CLOSED_END: "18:59",
} as const;

export const DASHBOARD = {
  AUTO_REFRESH_SECONDS: 60,
  FORCE_REFRESH_AT: "19:00",
};

export const PAYMENT = {
  ADVANCE_AMOUNT: 500,
  ADVANCE_PERCENTAGE: 0,
  PAYMENT_TIMEOUT_MINUTES: 15,
};

export const ORDER_RULES = {
  MINIMUM_WEIGHT_KG: 100,
  MAXIMUM_WEIGHT_KG: 10000,
  WEIGHT_INCREMENT_KG: 10,
  DEFAULT_RATE: 0,
};

export const EXPRESS = {
  ENABLED: true,
  MIN_WAIT_HOURS: 3,
  MAX_WAIT_HOURS: 4,
  SUBJECT_TO_AVAILABILITY: true,
};

export const BUSINESS_MESSAGES = {
  BOOKING:
    "Book tomorrow's healthy live broiler chicken.",

  STANDARD:
    "Place today's order for your preferred delivery wave.",

  EXPRESS:
    "Express delivery available in approximately 3–4 hours, subject to bird and vehicle availability.",

  CLOSED:
    "Booking is currently closed. Tomorrow's pricing will be published at 7:00 PM.",
};

export const DASHBOARD_ACTION = {
  [BusinessPhase.BOOKING]: {
    title: "Book Tomorrow's Order",
    button: "BOOK NOW",
  },

  [BusinessPhase.STANDARD_DELIVERY]: {
    title: "Place Today's Order",
    button: "PLACE ORDER",
  },

  [BusinessPhase.EXPRESS_DELIVERY]: {
    title: "Express Delivery",
    button: "ORDER NOW",
  },

  [BusinessPhase.BOOKING_CLOSED]: {
    title: "Booking Closed",
    button: "",
  },
};

export const FEATURES = {
  EXPRESS_ENABLED: true,
  SCHEDULED_ORDER_ENABLED: true,
  REPEAT_ORDER_ENABLED: true,
  LIVE_TRACKING_ENABLED: true,
  PARTNER_TRACKING_ENABLED: true,
  CAPTAIN_TRACKING_ENABLED: true,
  PUSH_NOTIFICATIONS_ENABLED: true,
  PAYMENT_COLLECTION_ENABLED: true,
};
