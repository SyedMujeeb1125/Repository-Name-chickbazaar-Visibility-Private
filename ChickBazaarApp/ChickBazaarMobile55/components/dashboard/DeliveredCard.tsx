import React from "react";

import PrimaryButton from "../ui/PrimaryButton";
import DashboardActionCard from "./DashboardActionCard";
import DashboardInfoRow from "./DashboardInfoRow";

type Props = {
  deliveredOn?: string;
  orderWeight?: number;
  totalBill?: number;
  paymentStatus?: string;

  onPlaceTomorrowOrder: () => void;
};

export default function DeliveredCard({
  deliveredOn,
  orderWeight,
  totalBill,
  paymentStatus,
  onPlaceTomorrowOrder,
}: Props) {
  return (
    <DashboardActionCard
      badgeText="DELIVERED"
      badgeColor="#16A34A"
      icon="check-circle"
      iconBackground="#16A34A"
      title="Order Delivered"
      subtitle="Your order has been successfully delivered. Thank you for choosing ChickBazaar."
      footer={
        <PrimaryButton
          title="PLACE TOMORROW'S ORDER"
          onPress={onPlaceTomorrowOrder}
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
        label="Order Weight"
        value={
          orderWeight != null
            ? `${orderWeight} Kg`
            : "--"
        }
      />

      <DashboardInfoRow
        icon="cash-multiple"
        label="Total Bill"
        value={
          totalBill != null
            ? `₹${totalBill.toLocaleString()}`
            : "--"
        }
      />

      <DashboardInfoRow
        icon="check-decagram"
        label="Payment Status"
        value={paymentStatus ?? "Pending"}
      />
    </DashboardActionCard>
  );
}