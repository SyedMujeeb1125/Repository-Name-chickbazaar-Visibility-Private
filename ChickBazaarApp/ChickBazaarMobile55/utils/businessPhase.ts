export enum BusinessPhase {
  BOOKING = "BOOKING",

  STANDARD_DELIVERY = "STANDARD_DELIVERY",

  EXPRESS_DELIVERY = "EXPRESS_DELIVERY",
}

export function getBusinessPhase(date = new Date()): BusinessPhase {
  const hour = date.getHours();

  // 7 PM onwards
  if (hour >= 19) {
    return BusinessPhase.BOOKING;
  }

  // 12 AM - 10:59 AM
  if (hour < 11) {
    return BusinessPhase.STANDARD_DELIVERY;
  }

  // 11 AM - 4:59 PM
  if (hour < 17) {
    return BusinessPhase.EXPRESS_DELIVERY;
  }

  // 5 PM - 6:59 PM
  return BusinessPhase.BOOKING;
}

export function getBusinessDeliveryDate(
  date = new Date()
): Date {
  const result = new Date(date);

  // 7 PM onwards means booking for tomorrow
  if (date.getHours() >= 19) {
    result.setDate(result.getDate() + 1);
  }

  result.setHours(0, 0, 0, 0);

  return result;
}

export function isStandardBookingOpen(
  date = new Date()
) {
  return date.getHours() >= 19;
}

export function isExpressOrderingOpen(
  date = new Date()
) {
  const hour = date.getHours();

  return hour >= 11 && hour < 17;
}

