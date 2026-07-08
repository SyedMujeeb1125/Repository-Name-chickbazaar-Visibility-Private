import React, {
  createContext,
  useContext,
  useState,
} from "react";

export type BirdPreference = {
  weight: number;
  quantity: number;
};

export type FulfilmentPreference =
  | "closest"
  | "strict"
  | "contact";

export type DeliveryPriority =
  | "standard"
  | "earliest"
  | "scheduled";

export type OrderData = {

  retailer: any;

  shop: any;

  orderType:
    | "weight"
    | "birds";

  requestedWeight: number;

  birdCount: number;

  birdPreferences:
    BirdPreference[];

  fulfilmentPreference:
    FulfilmentPreference;

  deliveryPriority:
    DeliveryPriority;

  deliveryDate: string;

  notes: string;

};

type ContextType = {

  order: OrderData;

  updateOrder: (
    values: Partial<OrderData>
  ) => void;

  resetOrder: () => void;

};

const defaultOrder: OrderData = {

  retailer: null,

  shop: null,

  orderType: "weight",

  requestedWeight: 0,

  birdCount: 0,

  birdPreferences: [],

  fulfilmentPreference:
    "closest",

  deliveryPriority:
    "standard",

  deliveryDate: "",

  notes: "",

};

const OrderContext =
  createContext<ContextType>(
    {} as ContextType
  );

export function OrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [
    order,
    setOrder,
  ] = useState(defaultOrder);

  function updateOrder(
    values: Partial<OrderData>
  ) {

    setOrder((previous) => ({

      ...previous,

      ...values,

    }));

  }

  function resetOrder() {

    setOrder(defaultOrder);

  }

  return (

    <OrderContext.Provider
      value={{
        order,
        updateOrder,
        resetOrder,
      }}
    >

      {children}

    </OrderContext.Provider>

  );

}

export function useOrder() {

  return useContext(
    OrderContext
  );

}