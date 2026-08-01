import { DashboardState } from "./dashboard";

export function resolveDashboardState(
  dashboard: any
): DashboardState {
  const business = dashboard?.business ?? {};

  const delivery = dashboard?.currentDelivery;

  const deliveredOrder =
    dashboard?.deliveredOrder;

  const outstanding = Number(
    dashboard?.outstanding ??
      delivery?.balanceDue ??
      deliveredOrder?.balanceDue ??
      0
  );

  // -------------------------------------
  // Active delivery lifecycle
  // -------------------------------------

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
        if (outstanding > 0) {
          return DashboardState.PAYMENT_PENDING;
        }

        if (business.additionalOrderAllowed) {
          return DashboardState.ADDITIONAL_ORDER;
        }

        if (business.invoiceAvailable) {
          return DashboardState.INVOICE_READY;
        }

        return DashboardState.READY_FOR_TOMORROW_ORDER;

      case "cancelled":
        return DashboardState.NO_ORDER;

      default:
        return DashboardState.NO_ORDER;
    }
  }

  // -------------------------------------
  // Delivered order completed
  // -------------------------------------

  if (deliveredOrder) {
    if (outstanding > 0) {
      return DashboardState.PAYMENT_PENDING;
    }

    if (business.additionalOrderAllowed) {
      return DashboardState.ADDITIONAL_ORDER;
    }

    if (business.invoiceAvailable) {
      return DashboardState.INVOICE_READY;
    }
  }

  // -------------------------------------
  // Future order
  // -------------------------------------

  if (dashboard?.futureOrder?.confirmationPending) {
    return DashboardState.SCHEDULE_CONFIRMATION_PENDING;
  }

  if (dashboard?.futureOrder?.confirmed) {
    return DashboardState.FUTURE_ORDER_CONFIRMED;
  }

  // -------------------------------------
  // Booking
  // -------------------------------------

  if (business.tomorrowRatePublished) {
    return DashboardState.READY_FOR_TOMORROW_ORDER;
  }

  // -------------------------------------
  // Default
  // -------------------------------------

  return DashboardState.NO_ORDER;
}