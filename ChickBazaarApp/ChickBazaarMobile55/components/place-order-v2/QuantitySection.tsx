import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import QuantityChip from "./QuantityChip";
import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";

type Props = {
  selected: number;
  onSelect: (value: number) => void;
};

const quantities = [
  100,
  200,
  500,
  1000,
];

export default function QuantitySection({
  selected,
  onSelect,
}: Props) {
  return (
    <SectionCard>
      <SectionHeader
        title="Order Quantity"
        subtitle="Choose a quantity or enter a custom amount."
      />

      <View style={styles.container}>
        {quantities.map((item) => (
  <QuantityChip
    key={item}
    label={`${item} kg`}
    selected={selected === item}
    onPress={() => onSelect(item)}
  />
))}
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 12,
  },
});