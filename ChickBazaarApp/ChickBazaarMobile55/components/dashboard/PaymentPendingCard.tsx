import React from "react";

import PrimaryButton from "../ui/PrimaryButton";
import DashboardActionCard from "./DashboardActionCard";
import DashboardInfoRow from "./DashboardInfoRow";

type Props = {
  outstandingAmount?: number;

  dueDate?: string;

  paymentMethod?: string;

  lastOrderNumber?: string;

  orderLabel?: string;

  onMakePayment: () => void;
};

export default function PaymentPendingCard({
  outstandingAmount = 0,

  dueDate = "Pay Today",

  paymentMethod = "UPI / Bank Transfer",

  lastOrderNumber,

  orderLabel = "Today's Order",

  onMakePayment,
}: Props) {
  return (
    <DashboardActionCard
      badgeText="PAYMENT PENDING"
      badgeColor="#DC2626"
      icon="cash-clock"
      iconBackground="#DC2626"
      title="Outstanding Payment"
      subtitle={`Please clear the outstanding amount for your ${orderLabel.toLowerCase()} to continue ordering.`}
      footer={
        <PrimaryButton
          title="PAY NOW"
          onPress={onMakePayment}
        />
      }
    >
      <DashboardInfoRow
        icon="currency-inr"
        label="Outstanding Amount"
        value={`₹${outstandingAmount.toLocaleString()}`}
      />

      <DashboardInfoRow
        icon="calendar-outline"
        label="Due"
        value={dueDate}
      />

      <DashboardInfoRow
        icon="credit-card-outline"
        label="Payment Method"
        value={paymentMethod}
      />

      <DashboardInfoRow
        icon="clipboard-text-outline"
        label="Order Number"
        value={lastOrderNumber ?? "--"}
      />
    </DashboardActionCard>
  );
}