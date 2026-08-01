import React from "react";

import PrimaryButton from "../ui/PrimaryButton";
import DashboardActionCard from "./DashboardActionCard";
import DashboardInfoRow from "./DashboardInfoRow";

type Props = {
  orderLabel?: string;

  driverName?: string;

  driverPhone?: string;

  vehicleNumber?: string;

  eta?: string;

  onTrackLive: () => void;
};

export default function OutForDeliveryCard({
  orderLabel = "Today's Order",

  driverName,

  driverPhone,

  vehicleNumber,

  eta,

  onTrackLive,
}: Props) {
  return (
    <DashboardActionCard
      badgeText="OUT FOR DELIVERY"
      badgeColor="#9333EA"
      icon="truck-fast"
      iconBackground="#9333EA"
      title="Out for Delivery"
      subtitle="Your healthy live broiler chicken is on the way."
      footer={
        <PrimaryButton
          title={`TRACK ${orderLabel.toUpperCase()}`}
          onPress={onTrackLive}
        />
      }
    >
      <DashboardInfoRow
        icon="account-outline"
        label="Driver"
        value={driverName ?? "--"}
      />

      <DashboardInfoRow
        icon="phone-outline"
        label="Driver Phone"
        value={driverPhone ?? "--"}
      />

      <DashboardInfoRow
        icon="truck-outline"
        label="Vehicle"
        value={vehicleNumber ?? "--"}
      />

      <DashboardInfoRow
        icon="clock-fast"
        label="Estimated Arrival"
        value={eta ?? "--"}
      />
    </DashboardActionCard>
  );
}