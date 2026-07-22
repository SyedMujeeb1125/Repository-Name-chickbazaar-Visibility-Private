import React from "react";

import PrimaryButton from "../ui/PrimaryButton";
import DashboardActionCard from "./DashboardActionCard";
import DashboardInfoRow from "./DashboardInfoRow";

type Props = {
  onPlaceOrder: () => void;
};

const ORDER_CUTOFF_HOUR = 19;

export default function OrderCard({
  onPlaceOrder,
}: Props) {
  const hour = new Date().getHours();

  const isTomorrowBooking =
    hour >= ORDER_CUTOFF_HOUR;

  const title = isTomorrowBooking
    ? "Book Tomorrow's Order"
    : "Place Today's Order";

  const subtitle = isTomorrowBooking
    ? "Reserve tomorrow morning's healthy live broiler chicken before stocks fill up."
    : "Place your order now for healthy live broiler chicken.";

  const buttonTitle = isTomorrowBooking
    ? "BOOK TOMORROW'S ORDER"
    : "PLACE TODAY'S ORDER";

  const badgeText = isTomorrowBooking
    ? "TOMORROW ORDER"
    : "PLACE TODAY'S ORDER";

  const deliveryWindow = isTomorrowBooking
    ? "Tomorrow • 6:00 AM – 8:00 AM"
    : "Today • 6:00 AM – 8:00 AM";

  return (
    <DashboardActionCard
      badgeText={badgeText}
      badgeColor="#F97316"
      icon="cart-outline"
      iconBackground="#F97316"
      title={title}
      subtitle={subtitle}
      footer={
        <PrimaryButton
          title={buttonTitle}
          onPress={onPlaceOrder}
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
        label="Minimum Order"
        value="100 Kg"
      />

      <DashboardInfoRow
        icon="credit-card-outline"
        label="Payment Option"
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