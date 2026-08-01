import React from "react";

import PrimaryButton from "../ui/PrimaryButton";
import DashboardActionCard from "./DashboardActionCard";
import DashboardInfoRow from "./DashboardInfoRow";

type Props = {
  onPlaceOrder: () => void;

  orderLabel?: string;

  deliveryWindow?: string;

  liveRate?: number;
};

export default function OrderCard({
  onPlaceOrder,
  orderLabel = "Tomorrow's Order",
  deliveryWindow = "6:00 AM – 8:00 AM",
  liveRate,
}: Props) {
  const isTomorrow =
    orderLabel === "Tomorrow's Order";

  return (
    <DashboardActionCard
      badgeText={
        isTomorrow
          ? "TOMORROW ORDER"
          : "TODAY ORDER"
      }
      badgeColor="#F97316"
      icon="cart-outline"
      iconBackground="#F97316"
      title={
        isTomorrow
          ? "Book Tomorrow's Order"
          : "Place Today's Order"
      }
      subtitle={
        isTomorrow
          ? "Reserve tomorrow morning's healthy live broiler chicken."
          : "Healthy live broiler chicken available today."
      }
      footer={
        <PrimaryButton
          title={
            isTomorrow
              ? "BOOK TOMORROW'S ORDER"
              : "PLACE TODAY'S ORDER"
          }
          onPress={onPlaceOrder}
        />
      }
    >
      {liveRate ? (
        <DashboardInfoRow
          icon="currency-inr"
          label="Today's Live Rate"
          value={`₹${liveRate} / Kg`}
        />
      ) : null}

      <DashboardInfoRow
        icon="clock-outline"
        label="Delivery Window"
        value={deliveryWindow}
      />

      <DashboardInfoRow
        icon="weight-kilogram"
        label="Minimum Order"
        value="100 Kg"
      />

      <DashboardInfoRow
        icon="credit-card-outline"
        label="Payment"
        value="Cash / UPI / Bank Transfer"
      />

      <DashboardInfoRow
        icon="truck-fast-outline"
        label="Product"
        value="Healthy Live Broiler Chicken"
      />
    </DashboardActionCard>
  );
}