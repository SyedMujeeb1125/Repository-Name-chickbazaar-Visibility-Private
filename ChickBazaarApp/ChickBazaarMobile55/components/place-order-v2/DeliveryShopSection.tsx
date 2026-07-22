import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";
import SelectionCard from "./SelectionCard";

type Props = {
  shopName: string;
  address: string;
  onChange: () => void;
};

export default function DeliveryShopSection({
  shopName,
  address,
  onChange,
}: Props) {
  return (
    <SectionCard>
      <SectionHeader
        title="Delivery Shop"
        subtitle="Select where today's order will be delivered."
      />

      <SelectionCard
        icon={
          <MaterialCommunityIcons
            name="storefront-outline"
            size={24}
            color="#F97316"
          />
        }
        title={shopName}
        subtitle={address}
        value="Change"
        onPress={onChange}
      />
    </SectionCard>
  );
}