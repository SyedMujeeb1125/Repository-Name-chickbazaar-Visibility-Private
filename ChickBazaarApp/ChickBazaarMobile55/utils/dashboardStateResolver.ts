import { DashboardState } from "./dashboard";

export function resolveDashboardState(
  dashboard: any
): DashboardState {

  const hour = new Date().getHours();

  const delivery = dashboard?.currentDelivery;

  const outstanding = Number(
    dashboard?.account?.balanceDue ?? 0
  );

  // Active delivery lifecycle
  if (delivery) {

    switch (delivery.status) {

      case "new":
      case "confirmed":
        return DashboardState.ORDER_CONFIRMED;

      case "allocated":
        return DashboardState.FARM_ALLOCATED;

      case "preparing":
        return DashboardState.PREPARING;

      case "vehicle_assigned":
        return DashboardState.VEHICLE_ASSIGNED;

      case "out_for_delivery":
        return DashboardState.OUT_FOR_DELIVERY;

      case "delivered":
      case "completed":

        // Delivery completed but payment still pending
        if (outstanding > 0) {
          return DashboardState.PAYMENT_PENDING;
        }

        // Payment completed, retailer can place tomorrow's order
        return DashboardState.READY_FOR_TOMORROW_ORDER;

    }

  }

  // Future scheduled orders (Phase 2)
  if (dashboard?.futureOrder?.confirmationPending) {
    return DashboardState.SCHEDULE_CONFIRMATION_PENDING;
  }

  if (dashboard?.futureOrder?.confirmed) {
    return DashboardState.FUTURE_ORDER_CONFIRMED;
  }

  // -------------------------------------
// Repeat Tomorrow Order
// -------------------------------------

if (dashboard?.repeatOrder?.available) {
  return DashboardState.READY_FOR_TOMORROW_ORDER;
}

// -------------------------------------
// Future scheduled orders
// -------------------------------------

if (dashboard?.futureOrder?.confirmationPending) {
  return DashboardState.SCHEDULE_CONFIRMATION_PENDING;
}

if (dashboard?.futureOrder?.confirmed) {
  return DashboardState.FUTURE_ORDER_CONFIRMED;
}

// -------------------------------------
// Booking cutoff crossed but no order
// -------------------------------------

if (hour >= 11 && hour < 18) {
  return DashboardState.AFTER_CUTOFF;
}

// -------------------------------------
// Default
// -------------------------------------

return DashboardState.NO_ORDER;

}