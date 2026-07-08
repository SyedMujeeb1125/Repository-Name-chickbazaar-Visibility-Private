export interface BirdPreference {
  size: string;

  qty: string;
}

export interface PlaceOrderRequest {
  retailerMobile: string;

  shopId: string;

  orderType: "weight" | "birds";

  quantity: number;

  birdPreference: BirdPreference[];

  deliveryType:
    | "sameDay"
    | "nextDay"
    | "later";

  deliveryDate: string;

  deliverySlot: string;

  notes: string;
}