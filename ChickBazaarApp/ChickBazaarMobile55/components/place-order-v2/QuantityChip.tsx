import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

type Props = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export default function QuantityChip({
  label,
  selected = false,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.chip,
        selected && styles.selectedChip,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.label,
          selected && styles.selectedLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 44,

    minWidth: 72,

    paddingHorizontal: 16,

    borderRadius: 12,

    backgroundColor: "#F8FAFC",

    borderWidth: 1,

    borderColor: "#E5E7EB",

    justifyContent: "center",

    alignItems: "center",
  },

  selectedChip: {
    backgroundColor: "#F97316",

    borderColor: "#F97316",
  },

  label: {
    fontSize: 14,

    fontWeight: "700",

    color: "#374151",
  },

  selectedLabel: {
    color: "#FFFFFF",
  },
});