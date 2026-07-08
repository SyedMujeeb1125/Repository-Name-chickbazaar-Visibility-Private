import React from "react";

import DashboardHero from "./DashboardHero";

import { DashboardState } from "../../utils/dashboard";

type Props = {
  state: DashboardState;

  deliveryStatus?: string;

  driverName?: string;

  eta?: string;

  onPlaceOrder: () => void;

  onTrackOrder: () => void;
};

export default function DashboardHeroRenderer({

  state,

  deliveryStatus,

  driverName,

  eta,

  onPlaceOrder,

  onTrackOrder,

}: Props) {

  const hasOrderToday = [

    DashboardState.ORDER_CONFIRMED,

    DashboardState.FARM_ALLOCATED,

    DashboardState.PREPARING,

    DashboardState.VEHICLE_ASSIGNED,

    DashboardState.OUT_FOR_DELIVERY,

    DashboardState.DELIVERED,

  ].includes(state);

  return (

    <DashboardHero

      hasOrderToday={hasOrderToday}

      deliveryStatus={deliveryStatus}

      driverName={driverName}

      eta={eta}

      onPlaceOrder={onPlaceOrder}

      onTrackOrder={onTrackOrder}

    />
   

  );
  
}