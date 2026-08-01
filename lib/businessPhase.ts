export enum BusinessPhase {
  TOMORROW_BOOKING = "TOMORROW_BOOKING",
  TODAY_BOOKING = "TODAY_BOOKING",
  EXPRESS = "EXPRESS",
  CLOSED = "CLOSED",
}

export function getBusinessPhase(
  date: Date = new Date()
): BusinessPhase {
  const hour = date.getHours();

  // 7 PM - 11:59 PM
  if (hour >= 19) {
    return BusinessPhase.TOMORROW_BOOKING;
  }

  // 12 AM - 6:59 AM
  if (hour < 7) {
    return BusinessPhase.TODAY_BOOKING;
  }

  // 7 AM - 4:59 PM
  if (hour < 17) {
    return BusinessPhase.EXPRESS;
  }

  // 5 PM - 6:59 PM
  return BusinessPhase.CLOSED;
}

export function getBusinessDeliveryDate(
  date: Date = new Date()
): Date {
  const delivery = new Date(date);

  const hour = date.getHours();

  // Orders after 7 PM are for tomorrow
  if (hour >= 19) {
    delivery.setDate(delivery.getDate() + 1);
  }

  delivery.setHours(0, 0, 0, 0);

  return delivery;
}

export function isBookingAllowed(
  date: Date = new Date()
): boolean {
  return getBusinessPhase(date) !== BusinessPhase.CLOSED;
}

export function isExpressPhase(
  date: Date = new Date()
): boolean {
  return (
    getBusinessPhase(date) ===
    BusinessPhase.EXPRESS
  );
}

// Backward compatibility
export function isStandardBookingOpen(
  date: Date = new Date()
): boolean {
  return isBookingAllowed(date);
}

export function isExpressOrderingOpen(
  date: Date = new Date()
): boolean {
  return isExpressPhase(date);
}