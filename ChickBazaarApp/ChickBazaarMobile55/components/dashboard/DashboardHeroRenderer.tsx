import React from "react";

import { DashboardState } from "../../utils/dashboard";

import AdditionalStockCard from "./AdditionalStockCard";
import DeliveredCard from "./DeliveredCard";
import OrderCard from "./OrderCard";
import OutForDeliveryCard from "./OutForDeliveryCard";
import PaymentPendingCard from "./PaymentPendingCard";
import ReviewTomorrowCard from "./ReviewTomorrowCard";
import TrackingCard from "./TrackingCard";
import VehicleAssignedCard from "./VehicleAssignedCard";

type Props = {
  state?: DashboardState;

  orderLabel?: string;

  account?: {
    balanceDue?: number;
  };

  deliveryStatus?: string;

  orderWeight?: number;

  rate?: number;

  estimatedAmount?: number;

  deliveryWindow?: string;

  driverName?: string;

  driverPhone?: string;

  vehicleNumber?: string;

  eta?: string;

  repeatOrder?: {
    weight?: number;
    rate?: number;
    amount?: number;
    deliveredAt?: string;
  };

  onPlaceOrder: () => void;

  onTrackOrder: () => void;

  onRepeatOrder?: () => void;

  onMakePayment?: () => void;
};

export default function DashboardHeroRenderer({
  state = DashboardState.NO_ORDER,

  orderLabel = "Today's Order",

  account,

  deliveryStatus,

  orderWeight,

  rate,

  estimatedAmount,

  deliveryWindow,

  driverName,

  driverPhone,

  vehicleNumber,

  eta,

  repeatOrder,

  onPlaceOrder,

  onTrackOrder,

  onRepeatOrder,

  onMakePayment,
}: Props) {
  switch (state) {
    case DashboardState.NO_ORDER:
    case DashboardState.READY_FOR_TOMORROW_ORDER:
      return (
        <OrderCard
          orderLabel={orderLabel}
          deliveryWindow={deliveryWindow}
          liveRate={rate}
          onPlaceOrder={onPlaceOrder}
        />
      );

    case DashboardState.ORDER_CONFIRMED:
    case DashboardState.FARM_ALLOCATED:
    case DashboardState.PREPARING:
      return (
        <TrackingCard
          orderLabel={orderLabel}
          statusTitle={deliveryStatus ?? "Order Confirmed"}
          orderWeight={orderWeight}
          rate={rate}
          estimatedAmount={estimatedAmount}
          deliveryWindow={deliveryWindow}
          onTrackOrder={onTrackOrder}
        />
      );

    case DashboardState.VEHICLE_ASSIGNED:
      return (
        <VehicleAssignedCard
          orderLabel={orderLabel}
          vehicleNumber={vehicleNumber}
          driverName={driverName}
          driverPhone={driverPhone}
          deliveryWindow={deliveryWindow}
          eta={eta}
          onTrackOrder={onTrackOrder}
        />
      );

    case DashboardState.OUT_FOR_DELIVERY:
      return (
        <OutForDeliveryCard
          orderLabel={orderLabel}
          driverName={driverName}
          driverPhone={driverPhone}
          vehicleNumber={vehicleNumber}
          eta={eta}
          onTrackLive={onTrackOrder}
        />
      );

    case DashboardState.PAYMENT_PENDING:
      return (
        <PaymentPendingCard
          orderLabel={orderLabel}
          outstandingAmount={account?.balanceDue}
          lastOrderNumber="Latest Order"
          onMakePayment={
            onMakePayment ?? (() => {})
          }
        />
      );

    case DashboardState.ADDITIONAL_ORDER:
      return (
        <AdditionalStockCard
          onRequest={onPlaceOrder}
        />
      );

    case DashboardState.SCHEDULE_CONFIRMATION_PENDING:
    case DashboardState.FUTURE_ORDER_CONFIRMED:
      return (
        <ReviewTomorrowCard
          orderLabel={orderLabel}
          rate={repeatOrder?.rate ?? rate ?? 0}
          suggestedWeight={
            repeatOrder?.weight ?? 0
          }
          estimatedAmount={
            repeatOrder?.amount ??
            estimatedAmount ??
            0
          }
          onReview={
            onRepeatOrder ?? (() => {})
          }
        />
      );

    case DashboardState.DELIVERED:
    case DashboardState.INVOICE_READY:
      return (
        <DeliveredCard
          orderLabel={orderLabel}
          deliveredOn={
            repeatOrder?.deliveredAt
          }
          orderWeight={
            repeatOrder?.weight
          }
          totalBill={
            repeatOrder?.amount
          }
          paymentStatus={
            account?.balanceDue &&
            account.balanceDue > 0
              ? "Pending"
              : "Paid"
          }
          nextActionLabel="BOOK TOMORROW'S ORDER"
          onNextAction={onPlaceOrder}
        />
      );

    default:
      if (__DEV__) {
        console.warn(
          "Unknown DashboardState:",
          state
        );
      }

      return (
        <OrderCard
          orderLabel={orderLabel}
          deliveryWindow={deliveryWindow}
          liveRate={rate}
          onPlaceOrder={onPlaceOrder}
        />
      );
  }
}