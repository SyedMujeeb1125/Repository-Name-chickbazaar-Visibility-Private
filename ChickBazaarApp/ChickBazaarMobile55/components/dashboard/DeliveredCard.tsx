import React from "react";

import PrimaryButton from "../ui/PrimaryButton";
import DashboardActionCard from "./DashboardActionCard";
import DashboardInfoRow from "./DashboardInfoRow";

type Props = {
  deliveredOn?: string;

  orderWeight?: number;

  totalBill?: number;

  paymentStatus?: string;

  orderLabel?: string;

  nextActionLabel?: string;

  onNextAction: () => void;
};

export default function DeliveredCard({
  deliveredOn,

  orderWeight,

  totalBill,

  paymentStatus = "Paid",

  orderLabel = "Today's Order",

  nextActionLabel = "BOOK TOMORROW'S ORDER",

  onNextAction,
}: Props) {
  return (
    <DashboardActionCard
      badgeText="DELIVERED"
      badgeColor="#16A34A"
      icon="check-circle"
      iconBackground="#16A34A"
      title={`${orderLabel} Delivered`}
      subtitle="Your healthy live broiler chicken has been delivered successfully."
      footer={
        <PrimaryButton
          title={nextActionLabel}
          onPress={onNextAction}
        />
      }
    >
      <DashboardInfoRow
        icon="calendar-check-outline"
        label="Delivered On"
        value={deliveredOn ?? "--"}
      />

      <DashboardInfoRow
        icon="weight-kilogram"
        label="Delivered Weight"
        value={
          orderWeight != null
            ? `${orderWeight} Kg`
            : "--"
        }
      />

      <DashboardInfoRow
        icon="cash-multiple"
        label="Final Amount"
        value={
          totalBill != null
            ? `₹${totalBill.toLocaleString()}`
            : "--"
        }
      />

      <DashboardInfoRow
        icon="check-decagram"
        label="Payment Status"
        value={paymentStatus}
      />
    </DashboardActionCard>
  );
}