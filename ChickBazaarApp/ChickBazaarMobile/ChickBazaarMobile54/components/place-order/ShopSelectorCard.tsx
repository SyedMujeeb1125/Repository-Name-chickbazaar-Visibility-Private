import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import CBCard from "../common/CBCard";
import CBSection from "../common/CBSection";

import { Colors } from "../../theme/colors";

type Shop = {
  id: string;
  shopName: string;
  address: string;
};

type Props = {
  shop: Shop | null;
  multiple: boolean;
  onPress: () => void;
};

export default function ShopSelectorCard({
  shop,
  multiple,
  onPress,
}: Props) {
  if (!shop) return null;

  return (
    <CBCard>
      <CBSection title="Delivery Shop" />

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.shop}>
          🏪 {shop.shopName}
          {multiple ? " ▼" : ""}
        </Text>

        <Text style={styles.address}>
          📍 {shop.address}
        </Text>

        {multiple && (
          <Text style={styles.change}>
            Tap to change shop
          </Text>
        )}
      </TouchableOpacity>
    </CBCard>
  );
}

const styles = StyleSheet.create({
  shop: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  address: {
    marginTop: 8,
    color: Colors.subtitle,
    fontSize: 15,
  },

  change: {
    marginTop: 12,
    color: Colors.primary,
    fontWeight: "600",
  },
});