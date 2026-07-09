export enum DashboardState {

  // No order placed yet (before booking cutoff)
  NO_ORDER = "NO_ORDER",

  // Booking cutoff crossed, retailer has not ordered
  AFTER_CUTOFF = "AFTER_CUTOFF",

  // Order lifecycle
  ORDER_CONFIRMED = "ORDER_CONFIRMED",

  FARM_ALLOCATED = "FARM_ALLOCATED",

  PREPARING = "PREPARING",

  VEHICLE_ASSIGNED = "VEHICLE_ASSIGNED",

  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",

  DELIVERED = "DELIVERED",

  // Yesterday's order can be repeated
  REPEAT_ORDER_AVAILABLE = "REPEAT_ORDER_AVAILABLE",

}