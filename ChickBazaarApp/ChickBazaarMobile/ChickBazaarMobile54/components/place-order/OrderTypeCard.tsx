import React from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import CBCard from "../common/CBCard";
import CBSection from "../common/CBSection";
import CBChip from "../common/CBChip";

type Props = {
  value: "weight" | "birds";
  onChange: (
    value: "weight" | "birds"
  ) => void;
};

export default function OrderTypeCard({
  value,
  onChange,
}: Props) {
  return (
    <CBCard>
      <CBSection title="Order Type" />

      <View style={styles.row}>
        <CBChip
          title="Weight"
          selected={value === "weight"}
          onPress={() =>
            onChange("weight")
          }
        />

        <CBChip
          title="Bird Count"
          selected={value === "birds"}
          onPress={() =>
            onChange("birds")
          }
        />
      </View>
    </CBCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});