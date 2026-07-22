import React from "react";

import AdditionalStockCard from "./AdditionalStockCard";
import DeliveredCard from "./DeliveredCard";
import OrderCard from "./OrderCard";
import OutForDeliveryCard from "./OutForDeliveryCard";
import PaymentPendingCard from "./PaymentPendingCard";
import ReviewTomorrowCard from "./ReviewTomorrowCard";
import TrackingCard from "./TrackingCard";
import VehicleAssignedCard from "./VehicleAssignedCard";

export type BusinessStatus =
  | "NO_ORDER"
  | "BOOK_TOMORROW"
  | "ORDER_IN_PROGRESS"
  | "TRACK_ORDER"
  | "PAYMENT_PENDING"
  | "ADDITIONAL_STOCK"
  | "WAITING_FOR_RATE"
  | "REVIEW_TOMORROW"
  | "DELIVERED";

type Props = {
  state?: BusinessStatus;

  account?: {
    currentBill?: number;
    amountPaid?: number;
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
  onChangeQuantity?: () => void;

  placingRepeatOrder?: boolean;
};

function getTrackingState(
  deliveryStatus?: string
):
  | "ORDER"
  | "VEHICLE"
  | "LIVE" {
  const status = (deliveryStatus ?? "")
    .toLowerCase()
    .replace(/\s+/g, "_");

  switch (status) {
    case "vehicle_assigned":
      return "VEHICLE";

    case "out_for_delivery":
      return "LIVE";

    default:
      return "ORDER";
  }
}

export default function DashboardHeroRenderer({
  state,

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
}: Props) {
  switch (state) {
    case "BOOK_TOMORROW":
    case "NO_ORDER":
      return (
        <OrderCard
          onPlaceOrder={onPlaceOrder}
        />
      );

    case "TRACK_ORDER":
    case "ORDER_IN_PROGRESS": {
      const trackingState =
        getTrackingState(deliveryStatus);

      if (trackingState === "VEHICLE") {
        return (
          <VehicleAssignedCard
            vehicleNumber={vehicleNumber}
            driverName={driverName}
            driverPhone={driverPhone}
            deliveryWindow={deliveryWindow}
            onTrackOrder={onTrackOrder}
          />
        );
      }

      if (trackingState === "LIVE") {
        return (
          <OutForDeliveryCard
            driverName={driverName}
            driverPhone={driverPhone}
            eta={eta}
            vehicleNumber={vehicleNumber}
            onTrackLive={onTrackOrder}
          />
        );
      }

      return (
        <TrackingCard
          orderWeight={orderWeight}
          rate={rate}
          estimatedAmount={estimatedAmount}
          deliveryWindow={deliveryWindow}
          onTrackOrder={onTrackOrder}
        />
      );
    }

    case "PAYMENT_PENDING":
      return (
        <PaymentPendingCard
          outstandingAmount={
            account?.balanceDue
          }
          paymentMethod="UPI / Bank Transfer"
          dueDate="Pay Today"
          lastOrderNumber="Latest Order"
          onMakePayment={() => {}}
        />
      );

    case "ADDITIONAL_STOCK":
      return (
        <AdditionalStockCard
          onRequest={onPlaceOrder}
        />
      );

    case "REVIEW_TOMORROW":
      return (
        <ReviewTomorrowCard
          rate={repeatOrder?.rate ?? 0}
          suggestedWeight={
            repeatOrder?.weight ?? 0
          }
          estimatedAmount={
            repeatOrder?.amount ?? 0
          }
          onReview={
            onRepeatOrder ?? (() => {})
          }
        />
      );

    case "DELIVERED":
      return (
        <DeliveredCard
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
            account?.balanceDue && account.balanceDue > 0
              ? "Pending"
              : "Paid"
          }
          onPlaceTomorrowOrder={
            onPlaceOrder
          }
        />
      );

    case "WAITING_FOR_RATE":
      return (
        <ReviewTomorrowCard
          rate={0}
          suggestedWeight={0}
          estimatedAmount={0}
          onReview={() => {}}
        />
      );

    default:
      if (__DEV__) {
        console.warn(
          "Unknown DashboardHeroRenderer state:",
          state
        );
      }

      return (
        <OrderCard
          onPlaceOrder={onPlaceOrder}
        />
      );
  }
}