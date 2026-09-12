/**
 * --------------------------------------------------------
 * ChickBazaar Business Engine
 * --------------------------------------------------------
 * Single source of truth for business timings.
 *
 * Business timezone: Asia/Kolkata (IST)
 *
 * Daily cycle:
 * 00:00–04:59  TODAY / STANDARD DELIVERY
 * 05:00–16:59  EXPRESS DELIVERY
 * 17:00–18:59  CLOSED
 * 19:00–23:59  TOMORROW BOOKING
 * --------------------------------------------------------
 */

import {
  BUSINESS_HOURS,
  BUSINESS_MESSAGES,
  DASHBOARD_ACTION,
} from "../constants/businessPhases";

import {
  BusinessPhase,
  BusinessStatus,
  PricingState,
} from "../types/business";

import {
  DELIVERY_WAVES,
  EXPRESS_WAVE,
} from "../constants/deliveryWaves";

const BUSINESS_TIMEZONE = "Asia/Kolkata";

function parseTime(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function getIstParts(date: Date): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
} {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
  };
}

function formatIstDate(date: Date): string {
  const parts = getIstParts(date);

  return [
    parts.year.toString().padStart(4, "0"),
    parts.month.toString().padStart(2, "0"),
    parts.day.toString().padStart(2, "0"),
  ].join("-");
}

export function getBusinessPhase(
  date: Date = new Date()
): BusinessPhase {
  const { hour, minute } = getIstParts(date);
  const minutes = hour * 60 + minute;

  const bookingStart = parseTime(BUSINESS_HOURS.BOOKING_START);
  const standardStart = parseTime(BUSINESS_HOURS.STANDARD_START);
  const expressStart = 5 * 60;
  const expressEnd = parseTime(BUSINESS_HOURS.EXPRESS_END);
  const closedStart = parseTime(BUSINESS_HOURS.CLOSED_START);

  if (minutes >= bookingStart) {
    return BusinessPhase.BOOKING;
  }

  if (minutes >= standardStart && minutes < expressStart) {
    return BusinessPhase.STANDARD_DELIVERY;
  }

  if (minutes >= expressStart && minutes < expressEnd) {
    return BusinessPhase.EXPRESS_DELIVERY;
  }

  if (minutes >= closedStart) {
    return BusinessPhase.BOOKING_CLOSED;
  }

  return BusinessPhase.BOOKING_CLOSED;
}

export function isBookingOpen(
  date: Date = new Date()
): boolean {
  return getBusinessPhase(date) === BusinessPhase.BOOKING;
}

export function isStandardDeliveryOpen(
  date: Date = new Date()
): boolean {
  return getBusinessPhase(date) === BusinessPhase.STANDARD_DELIVERY;
}

export function isExpressOpen(
  date: Date = new Date()
): boolean {
  return getBusinessPhase(date) === BusinessPhase.EXPRESS_DELIVERY;
}

export function isBusinessClosed(
  date: Date = new Date()
): boolean {
  return getBusinessPhase(date) === BusinessPhase.BOOKING_CLOSED;
}

export function isOrderingOpen(
  date: Date = new Date()
): boolean {
  return !isBusinessClosed(date);
}

export function getBusinessDeliveryDate(
  date: Date = new Date()
): Date {
  const result = new Date(date);
  const { hour } = getIstParts(date);

  if (hour >= 19) {
    result.setUTCDate(result.getUTCDate() + 1);
  }

  result.setUTCHours(0, 0, 0, 0);

  return result;
}

export function getBusinessDateString(
  date: Date = new Date()
): string {
  const { year, month, day, hour } = getIstParts(date);

  if (hour >= 19) {
    const next = new Date(
      Date.UTC(year, month - 1, day + 1)
    );

    return next.toISOString().split("T")[0];
  }

  return formatIstDate(date);
}

export function getBusinessStatus(
  todayRate = 0,
  tomorrowRate = 0,
  date: Date = new Date()
): BusinessStatus {
  const phase = getBusinessPhase(date);
  const ist = getIstParts(date);

  const tomorrowVisible =
    phase === BusinessPhase.BOOKING;

  const retailerRate =
    phase === BusinessPhase.BOOKING
      ? tomorrowRate
      : todayRate;

  const pricingState =
    phase === BusinessPhase.BOOKING &&
    tomorrowRate > 0
      ? PricingState.PUBLISHED
      : PricingState.WAITING;

  return {
    phase,

    pricing: {
      todayRate,
      tomorrowRate,
      effectiveDate:
        phase === BusinessPhase.BOOKING
          ? getBusinessDateString(date)
          : formatIstDate(date),
      publishedAt:
        BUSINESS_HOURS.RATE_PUBLISH_TIME,
      state: pricingState,
    },

    clock: {
      currentDate: formatIstDate(date),
      currentTime: `${ist.hour
        .toString()
        .padStart(2, "0")}:${ist.minute
        .toString()
        .padStart(2, "0")}`,
      currentHour: ist.hour,
      currentMinute: ist.minute,
      serverTimestamp: date,
    },

    bookingRules: {
      bookingStartsAt:
        BUSINESS_HOURS.BOOKING_START,
      bookingEndsAt:
        BUSINESS_HOURS.BOOKING_END,
      expressStartsAt: "05:00",
      expressEndsAt:
        BUSINESS_HOURS.EXPRESS_END,
      bookingClosedStartsAt:
        BUSINESS_HOURS.CLOSED_START,
      bookingClosedEndsAt:
        BUSINESS_HOURS.CLOSED_END,
    },

    dashboard: {
      title:
        DASHBOARD_ACTION[phase].title,
      subtitle:
        BUSINESS_MESSAGES[
          phase === BusinessPhase.BOOKING
            ? "BOOKING"
            : phase ===
              BusinessPhase.STANDARD_DELIVERY
            ? "STANDARD"
            : phase ===
              BusinessPhase.EXPRESS_DELIVERY
            ? "EXPRESS"
            : "CLOSED"
        ],
      buttonText:
        DASHBOARD_ACTION[phase].button,
      enabled:
        phase !==
        BusinessPhase.BOOKING_CLOSED,
    },

    availableWaves:
      phase === BusinessPhase.EXPRESS_DELIVERY
        ? [EXPRESS_WAVE]
        : DELIVERY_WAVES,

    bookingOpen:
      phase === BusinessPhase.BOOKING,

    expressAvailable:
      phase === BusinessPhase.EXPRESS_DELIVERY,

    bookingClosed:
      phase === BusinessPhase.BOOKING_CLOSED,

    canPlaceOrder:
      phase !== BusinessPhase.BOOKING_CLOSED,

    canTrackOrder: true,

    canRepeatOrder: true,

    canScheduleTomorrow:
      phase === BusinessPhase.BOOKING,
  };
}
