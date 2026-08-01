import React from "react";

import PrimaryButton from "../ui/PrimaryButton";
import DashboardActionCard from "./DashboardActionCard";
import DashboardInfoRow from "./DashboardInfoRow";

type Props = {
  orderLabel?: string;

  statusTitle?: string;

  statusMessage?: string;

  orderWeight?: number;

  rate?: number;

  estimatedAmount?: number;

  deliveryWindow?: string;

  onTrackOrder: () => void;
};

export default function TrackingCard({
  orderLabel = "Today's Order",

  statusTitle = "Order Confirmed",

  statusMessage = "Your order has been confirmed and is progressing through our delivery process.",

  orderWeight,

  rate,

  estimatedAmount,

  deliveryWindow = "6:00 AM – 8:00 AM",

  onTrackOrder,
}: Props) {
  const normalizedStatus = statusTitle
    .trim()
    .toLowerCase();

  let badgeText = statusTitle.toUpperCase();
  let displayTitle: string | undefined = statusTitle;

  switch (normalizedStatus) {
    case "new":
      badgeText = "NEW";
      displayTitle = "Order Confirmed";
      break;

    case "allocated":
      badgeText = "FARM ALLOCATED";
      displayTitle = "Farm Allocated";
      break;

    case "preparing":
      badgeText = "PREPARING";
      displayTitle = "Preparing Your Order";
      break;

    case "vehicle_assigned":
      badgeText = "VEHICLE ASSIGNED";
      displayTitle = "Vehicle Assigned";
      break;

    case "out_for_delivery":
      badgeText = "OUT FOR DELIVERY";
      displayTitle = "Out for Delivery";
      break;

    default:
      break;
  }

  return (
    <DashboardActionCard
      badgeText={badgeText}
      badgeColor="#16A34A"
      icon="clipboard-check"
      iconBackground="#16A34A"
      title={displayTitle}
      subtitle={statusMessage}
      footer={
        <PrimaryButton
          title={
  normalizedStatus === "delivered"
    ? "ORDER DETAILS"
    : "TRACK ORDER"
}
          onPress={onTrackOrder}
        />
      }
    >
      <DashboardInfoRow
        icon="clock-outline"
        label="Delivery Window"
        value={deliveryWindow}
      />

      <DashboardInfoRow
        icon="weight-kilogram"
        label="Order Weight"
        value={
          orderWeight != null
            ? `${orderWeight} Kg`
            : "--"
        }
      />

      <DashboardInfoRow
        icon="currency-inr"
        label="Rate"
        value={
          rate != null
            ? `₹${rate} / Kg`
            : "--"
        }
      />

      <DashboardInfoRow
        icon="cash"
        label="Estimated Amount"
        value={
          estimatedAmount != null
            ? `₹${estimatedAmount.toLocaleString()}`
            : "--"
        }
      />
    </DashboardActionCard>
  );
}