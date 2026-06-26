import React from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import CBCard from "../common/CBCard";
import CBSection from "../common/CBSection";
import CBChip from "../common/CBChip";
import CBInput from "../common/CBInput";

type Props = {
  orderType: "weight" | "birds";

  value: string;

  customValue: string;

  onSelect: (value: string) => void;

  onCustomChange: (value: string) => void;
};

const weightOptions = [
  "100",
  "200",
  "500",
  "1000",
];

const birdOptions = [
  "100",
  "200",
  "500",
  "1000",
];

export default function QuantitySelectorCard({
  orderType,
  value,
  customValue,
  onSelect,
  onCustomChange,
}: Props) {
  const options =
    orderType === "weight"
      ? weightOptions
      : birdOptions;

  return (
    <CBCard>
      <CBSection
        title={
          orderType === "weight"
            ? "Required Weight"
            : "Required Bird Count"
        }
      />

      <View style={styles.row}>
        {options.map((item) => (
          <CBChip
            key={item}
            title={
              orderType === "weight"
                ? `${item} KG`
                : item
            }
            selected={
              value === item
            }
            onPress={() =>
              onSelect(item)
            }
          />
        ))}
      </View>

      <CBInput
        placeholder={
          orderType === "weight"
            ? "Custom Weight (KG)"
            : "Custom Bird Count"
        }
        keyboardType="numeric"
        value={customValue}
        onChangeText={
          onCustomChange
        }
      />
    </CBCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
});