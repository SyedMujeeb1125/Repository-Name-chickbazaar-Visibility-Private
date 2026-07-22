import React from "react";

import PrimaryButton from "../ui/PrimaryButton";
import DashboardActionCard from "./DashboardActionCard";
import DashboardInfoRow from "./DashboardInfoRow";

type Props = {
  orderWeight?: number;
  rate?: number;
  estimatedAmount?: number;
  deliveryWindow?: string;

  onTrackOrder: () => void;
};

export default function TrackingCard({
  orderWeight,
  rate,
  estimatedAmount,
  deliveryWindow,
  onTrackOrder,
}: Props) {
  return (
    <DashboardActionCard
      badgeText="ORDER CONFIRMED"
      badgeColor="#16A34A"
      icon="clipboard-check"
      iconBackground="#16A34A"
      title="Order Confirmed"
      subtitle="Your order has been confirmed and is being prepared for delivery."
      footer={
        <PrimaryButton
          title="TRACK TODAY'S ORDER"
          onPress={onTrackOrder}
        />
      }
    >
      <DashboardInfoRow
        icon="clock-outline"
        label="Delivery Window"
        value={deliveryWindow ?? "Today • 6:00 AM – 8:00 AM"}
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
        label="Live Rate"
        value={
          rate != null
            ? `₹${rate} / Kg`
            : "--"
        }
      />

      <DashboardInfoRow
        icon="cash"
        label="Estimated Bill"
        value={
          estimatedAmount != null
            ? `₹${estimatedAmount.toLocaleString()}`
            : "--"
        }
      />
    </DashboardActionCard>
  );
}