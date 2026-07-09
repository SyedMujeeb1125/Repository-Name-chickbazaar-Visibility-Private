import React from "react";

import { DashboardState } from "../../utils/dashboard";

import DashboardHeroCompleted from "./DashboardHeroCompleted";
import DashboardHeroDelivery from "./DashboardHeroDelivery";
import DashboardHeroNoOrder from "./DashboardHeroNoOrder";
import RepeatOrderHero from "./RepeatOrderHero";

type Props = {
  state: DashboardState;

  deliveryStatus?: string;

  driverName?: string;

  eta?: string;

  repeatOrder?: {
    weight?: number;
    rate?: number;
    amount?: number;
    deliveredAt?: string;
  };

  onPlaceOrder: () => void;

  onTrackOrder: () => void;

  onRepeatOrder?: () => void;

  onChangeQuantity?: () => void;

  placingRepeatOrder?: boolean;
};

export default function DashboardHeroRenderer({
  state,
  deliveryStatus,
  driverName,
  eta,
  repeatOrder,
  onPlaceOrder,
  onTrackOrder,
  onRepeatOrder,
  onChangeQuantity,
  placingRepeatOrder,
}: Props) {
  switch (state) {
    case DashboardState.NO_ORDER:
      return (
        <DashboardHeroNoOrder
          onPlaceOrder={onPlaceOrder}
        />
      );

    case DashboardState.REPEAT_ORDER_AVAILABLE:
      return (
        <RepeatOrderHero
          weight={
            repeatOrder?.weight ?? 0
          }
          rate={
            repeatOrder?.rate ?? 0
          }
          amount={
            repeatOrder?.amount ?? 0
          }
          deliveredAt={
            repeatOrder?.deliveredAt
          }
          loading={
            placingRepeatOrder
          }
          onRepeat={
            onRepeatOrder ??
            (() => {})
          }
          onChangeQuantity={
            onChangeQuantity ??
            (() => {})
          }
        />
      );

    case DashboardState.DELIVERED:
      return (
        <DashboardHeroCompleted
          deliveryStatus={
            deliveryStatus
          }
          driverName={
            driverName
          }
          eta={eta}
          onRepeatOrder={
            onRepeatOrder ??
            (() => {})
          }
          onChangeQuantity={
            onChangeQuantity ??
            (() => {})
          }
        />
      );

    default:
      return (
        <DashboardHeroDelivery
          deliveryStatus={
            deliveryStatus
          }
          driverName={
            driverName
          }
          eta={eta}
          onTrackOrder={
            onTrackOrder
          }
        />
      );
  }
}