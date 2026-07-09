import React from "react";

import DashboardHero from "./DashboardHero";


type Props = {

  deliveryStatus?: string;

  driverName?: string;

  eta?: string;

  onTrackOrder: () => void;

};

export default function DashboardHeroDelivery({

  deliveryStatus,

  driverName,

  eta,

  onTrackOrder,

}: Props) {

  return (

    <DashboardHero

      hasOrderToday={true}

      deliveryStatus={deliveryStatus}

      driverName={driverName}

      eta={eta}

      onPlaceOrder={() => {}}

      onTrackOrder={onTrackOrder}

    />

  );

}
