import React from "react";

import DashboardHero from "./DashboardHero";

type Props = {
  onPlaceOrder: () => void;
};

export default function DashboardHeroNoOrder({
  onPlaceOrder,
}: Props) {

  return (

    <DashboardHero

      hasOrderToday={false}

      onPlaceOrder={onPlaceOrder}

      onTrackOrder={() => {}}

    />

  );

}
