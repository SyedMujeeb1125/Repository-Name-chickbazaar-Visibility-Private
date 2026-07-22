import React from "react";

import PrimaryButton from "../ui/PrimaryButton";
import DashboardActionCard from "./DashboardActionCard";
import DashboardInfoRow from "./DashboardInfoRow";

type Props = {
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  deliveryWindow?: string;

  onTrackOrder: () => void;
};

export default function VehicleAssignedCard({
  vehicleNumber,
  driverName,
  driverPhone,
  deliveryWindow,
  onTrackOrder,
}: Props) {
  return (
    <DashboardActionCard
      badgeText="VEHICLE ASSIGNED"
      badgeColor="#2563EB"
      icon="truck-check"
      iconBackground="#2563EB"
      title="Vehicle Assigned"
      subtitle="Your order has been loaded and assigned to a delivery vehicle."
      footer={
        <PrimaryButton
          title="TRACK ORDER"
          onPress={onTrackOrder}
        />
      }
    >
      <DashboardInfoRow
        icon="truck-outline"
        label="Vehicle Number"
        value={vehicleNumber ?? "--"}
      />

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
        icon="clock-outline"
        label="Delivery Window"
        value={deliveryWindow ?? "Today • 6:00 AM – 8:00 AM"}
      />
    </DashboardActionCard>
  );
}