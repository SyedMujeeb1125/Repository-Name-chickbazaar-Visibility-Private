export enum DashboardState {
  // -------------------------------------
  // Default
  // -------------------------------------

  NO_ORDER = "NO_ORDER",

  AFTER_CUTOFF = "AFTER_CUTOFF",

  // -------------------------------------
  // Order Lifecycle
  // -------------------------------------

  ORDER_CONFIRMED = "ORDER_CONFIRMED",

  FARM_ALLOCATED = "FARM_ALLOCATED",

  PREPARING = "PREPARING",

  VEHICLE_ASSIGNED = "VEHICLE_ASSIGNED",

  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",

  DELIVERED = "DELIVERED",

  // -------------------------------------
  // Payment
  // -------------------------------------

  PAYMENT_PENDING = "PAYMENT_PENDING",

  INVOICE_READY = "INVOICE_READY",

  // -------------------------------------
  // Additional Order
  // -------------------------------------

  ADDITIONAL_ORDER = "ADDITIONAL_ORDER",

  // -------------------------------------
  // Tomorrow Order
  // -------------------------------------

  READY_FOR_TOMORROW_ORDER =
    "READY_FOR_TOMORROW_ORDER",

  // -------------------------------------
  // Future Orders
  // -------------------------------------

  SCHEDULE_CONFIRMATION_PENDING =
    "SCHEDULE_CONFIRMATION_PENDING",

  FUTURE_ORDER_CONFIRMED =
    "FUTURE_ORDER_CONFIRMED",
}