import React from "react";

import DashboardHero from "./DashboardHero";

type Props = {

  deliveryStatus?: string;

  driverName?: string;

  eta?: string;

  onRepeatOrder: () => void;

  onChangeQuantity: () => void;

};

export default function DashboardHeroCompleted({

  deliveryStatus,

  driverName,

  eta,

  onRepeatOrder,

  onChangeQuantity,

}: Props) {

  return (

    <DashboardHero

      hasOrderToday={true}

      isDelivered={true}

      deliveryStatus={deliveryStatus}

      driverName={driverName}

      eta={eta}

      onPlaceOrder={() => {}}

      onTrackOrder={() => {}}

      onRepeatOrder={onRepeatOrder}

      onChangeQuantity={onChangeQuantity}

    />

  );

}
