import React from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import CBCard from "../common/CBCard";
import CBSection from "../common/CBSection";
import CBChip from "../common/CBChip";

type Props = {
  value: string;
  onChange: (
    value: string
  ) => void;
};

const slots = [
  "5-7 AM",
  "7-9 AM",
  "9-11 AM",
  "11-1 PM",
  "1-3 PM",
];

export default function DeliverySlotCard({
  value,
  onChange,
}: Props) {
  return (
    <CBCard>
      <CBSection title="Preferred Delivery Time" />

      <View style={styles.row}>
        {slots.map((slot) => (
          <CBChip
            key={slot}
            title={slot}
            selected={
              value === slot
            }
            onPress={() =>
              onChange(slot)
            }
          />
        ))}
      </View>
    </CBCard>
  );
}

const styles =
  StyleSheet.create({
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
  });