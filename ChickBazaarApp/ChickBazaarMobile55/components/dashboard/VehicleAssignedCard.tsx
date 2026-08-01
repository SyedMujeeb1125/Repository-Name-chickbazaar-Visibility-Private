import React from "react";

import PrimaryButton from "../ui/PrimaryButton";
import DashboardActionCard from "./DashboardActionCard";
import DashboardInfoRow from "./DashboardInfoRow";

type Props = {
  orderLabel?: string;

  vehicleNumber?: string;

  driverName?: string;

  driverPhone?: string;

  deliveryWindow?: string;

  eta?: string;

  onTrackOrder: () => void;
};

export default function VehicleAssignedCard({
  orderLabel = "Today's Order",

  vehicleNumber,

  driverName,

  driverPhone,

  deliveryWindow = "6:00 AM – 8:00 AM",

  eta,

  onTrackOrder,
}: Props) {
  return (
    <DashboardActionCard
      badgeText="VEHICLE ASSIGNED"
      badgeColor="#2563EB"
      icon="truck-check"
      iconBackground="#2563EB"
      title="Vehicle Assigned"
      subtitle="Your order has been loaded onto the delivery vehicle and is ready for dispatch."
      footer={
        <PrimaryButton
          title={`TRACK ${orderLabel.toUpperCase()}`}
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
        label="Driver"
        value={driverName ?? "--"}
      />

      <DashboardInfoRow
        icon="phone-outline"
        label="Driver Phone"
        value={driverPhone ?? "--"}
      />

      {eta ? (
        <DashboardInfoRow
          icon="map-marker-distance"
          label="Estimated Arrival"
          value={eta}
        />
      ) : null}

      <DashboardInfoRow
        icon="clock-outline"
        label="Delivery Window"
        value={deliveryWindow}
      />
    </DashboardActionCard>
  );
}