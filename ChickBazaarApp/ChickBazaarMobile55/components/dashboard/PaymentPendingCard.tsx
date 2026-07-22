import React from "react";

import PrimaryButton from "../ui/PrimaryButton";
import DashboardActionCard from "./DashboardActionCard";
import DashboardInfoRow from "./DashboardInfoRow";

type Props = {
  outstandingAmount?: number;
  dueDate?: string;
  paymentMethod?: string;
  lastOrderNumber?: string;

  onMakePayment: () => void;
};

export default function PaymentPendingCard({
  outstandingAmount,
  dueDate,
  paymentMethod,
  lastOrderNumber,
  onMakePayment,
}: Props) {
  return (
    <DashboardActionCard
      badgeText="PAYMENT PENDING"
      badgeColor="#DC2626"
      icon="cash-clock"
      iconBackground="#DC2626"
      title="Payment Pending"
      subtitle="Please clear your outstanding balance to continue placing new orders."
      footer={
        <PrimaryButton
          title="MAKE PAYMENT"
          onPress={onMakePayment}
        />
      }
    >
      <DashboardInfoRow
        icon="currency-inr"
        label="Outstanding Amount"
        value={
          outstandingAmount != null
            ? `₹${outstandingAmount.toLocaleString()}`
            : "--"
        }
      />

      <DashboardInfoRow
        icon="calendar-outline"
        label="Due Date"
        value={dueDate ?? "--"}
      />

      <DashboardInfoRow
        icon="credit-card-outline"
        label="Payment Method"
        value={paymentMethod ?? "UPI / Bank Transfer"}
      />

      <DashboardInfoRow
        icon="clipboard-text-outline"
        label="Last Order"
        value={lastOrderNumber ?? "--"}
      />
    </DashboardActionCard>
  );
}