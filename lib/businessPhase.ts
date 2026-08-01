export enum BusinessPhase {
  BOOKING = "BOOKING",
  STANDARD_DELIVERY = "STANDARD_DELIVERY",
  EXPRESS_DELIVERY = "EXPRESS_DELIVERY",
}

export function getBusinessPhase(date: Date = new Date()): BusinessPhase {
  const hour = date.getHours();

  if (hour >= 19) {
    return BusinessPhase.BOOKING;
  }

  if (hour >= 5 && hour < 11) {
    return BusinessPhase.STANDARD_DELIVERY;
  }

  return BusinessPhase.EXPRESS_DELIVERY;
}

export function getBusinessDeliveryDate(date: Date = new Date()): Date {
  const deliveryDate = new Date(date);

  if (date.getHours() >= 19) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  }

  deliveryDate.setHours(0, 0, 0, 0);

  return deliveryDate;
}

export function isStandardBookingOpen(date: Date = new Date()): boolean {
  return date.getHours() >= 19;
}

export function isExpressOrderingOpen(date: Date = new Date()): boolean {
  const hour = date.getHours();
  return hour >= 11 && hour < 17;
}