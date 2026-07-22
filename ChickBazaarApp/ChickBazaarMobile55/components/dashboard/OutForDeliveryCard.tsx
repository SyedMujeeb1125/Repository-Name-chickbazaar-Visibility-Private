import React from "react";

import PrimaryButton from "../ui/PrimaryButton";
import DashboardActionCard from "./DashboardActionCard";
import DashboardInfoRow from "./DashboardInfoRow";

type Props = {
  driverName?: string;
  driverPhone?: string;
  eta?: string;
  vehicleNumber?: string;

  onTrackLive: () => void;
};

export default function OutForDeliveryCard({
  driverName,
  driverPhone,
  eta,
  vehicleNumber,
  onTrackLive,
}: Props) {
  return (
    <DashboardActionCard
      badgeText="OUT FOR DELIVERY"
      badgeColor="#9333EA"
      icon="truck-fast"
      iconBackground="#9333EA"
      title="Out for Delivery"
      subtitle="Your order is on the way and will arrive shortly."
      footer={
        <PrimaryButton
          title="TRACK LIVE"
          onPress={onTrackLive}
        />
      }
    >
      <DashboardInfoRow
        icon="account-outline"
        label="Driver Name"
        value={driverName ?? "--"}
      />

      <DashboardInfoRow
        icon="phone-outline"
        label="Driver Phone"
        value={driverPhone ?? "--"}
      />

      <DashboardInfoRow
        icon="clock-fast"
        label="Estimated Arrival"
        value={eta ?? "--"}
      />

      <DashboardInfoRow
        icon="truck-outline"
        label="Vehicle Number"
        value={vehicleNumber ?? "--"}
      />
    </DashboardActionCard>
  );
}