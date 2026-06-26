"use client";

import { useState } from "react";
import { LocationPicker } from "@/components/location-picker";

type Props = {
  registeredAddress: string;

  shops: {
    id: string;
    shopName: string;
    address: string;
  }[];
};

export function DeliveryAddressSelector({
  registeredAddress,
  shops
}: Props) {
  const [selectedAddress, setSelectedAddress] =
    useState(registeredAddress);
    const [selectedShopName, setSelectedShopName] =
  useState("Registered Shop");

  const [customAddress, setCustomAddress] =
    useState(false);

  return (
    <div className="space-y-4">

      <label className="block text-sm font-semibold text-navy">
        Delivery Location
      </label>

      {/* Registered Shop */}

      <label className="flex items-start gap-2 rounded border p-3">
        <input
  type="radio"
  name="deliveryLocation"
  defaultChecked
  onChange={() => {
    setCustomAddress(false);

    setSelectedShopName(
      "Registered Shop"
    );

    setSelectedAddress(
      registeredAddress
    );
  }}
/>

        <div>
          <p className="font-semibold">
            Registered Shop
          </p>

          <p className="text-sm text-slate-500">
            {registeredAddress}
          </p>
        </div>
      </label>

      {/* Additional Shops */}

      {shops.map((shop) => (
        <label
          key={shop.id}
          className="flex items-start gap-2 rounded border p-3"
        >
          <input
            type="radio"
            name="deliveryLocation"
            onChange={() => {
  setCustomAddress(false);

  setSelectedShopName(
    shop.shopName
  );

  setSelectedAddress(
    shop.address
  );
}}
          />

          <div>
            <p className="font-semibold">
              {shop.shopName}
            </p>

            <p className="text-sm text-slate-500">
              {shop.address}
            </p>
          </div>
        </label>
      ))}

      {/* Different Address */}

      <label className="flex items-start gap-2 rounded border p-3">
        <input
          type="radio"
          name="deliveryLocation"
          onChange={() => {
  setCustomAddress(true);

  setSelectedShopName(
    "Custom Address"
  );

  setSelectedAddress("");
}}
        />

        <div>
          <p className="font-semibold">
            Different Address
          </p>

          <p className="text-sm text-slate-500">
            Enter a new delivery location
          </p>
        </div>
      </label>
      <input
  type="hidden"
  name="deliveryShopName"
  value={selectedShopName}
/>
      {!customAddress ? (
        <textarea
          name="address"
          readOnly
          value={selectedAddress}
          className="w-full rounded-md border border-slate-200 p-3"
        />
      ) : (
        <>
          <textarea
            name="address"
            required
            placeholder="Enter delivery address"
            className="w-full rounded-md border border-slate-200 p-3"
          />

          <LocationPicker />
        </>
      )}

    </div>
  );
}