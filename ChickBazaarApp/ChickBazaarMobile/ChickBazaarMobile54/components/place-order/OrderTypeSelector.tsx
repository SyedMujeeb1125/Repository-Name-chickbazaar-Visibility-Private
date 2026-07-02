import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import CBCard from "../common/CBCard";

import {
  Colors,
  Typography,
  Spacing,
} from "../../theme";

type Props = {
  value: "weight" | "birds";
  onChange: (
    value: "weight" | "birds"
  ) => void;
};

export default function OrderTypeSelector({
  value,
  onChange,
}: Props) {
  return (
    <CBCard>
      <Text style={styles.heading}>
        Order By
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() =>
            onChange("weight")
          }
          style={[
            styles.option,
            value === "weight" &&
              styles.active,
          ]}
        >
          <Text style={styles.icon}>
            ⚖️
          </Text>

          <Text style={styles.title}>
            Weight
          </Text>

          <Text
            style={styles.subtitle}
          >
            Order by KG
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            onChange("birds")
          }
          style={[
            styles.option,
            value === "birds" &&
              styles.active,
          ]}
        >
          <Text style={styles.icon}>
            🐔
          </Text>

          <Text style={styles.title}>
            Birds
          </Text>

          <Text
            style={styles.subtitle}
          >
            Order by Count
          </Text>
        </TouchableOpacity>
      </View>
    </CBCard>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: Typography.h3,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  option: {
    width: "48%",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
  },

  active: {
    backgroundColor:
      Colors.primaryLight,
    borderColor:
      Colors.primary,
  },

  icon: {
    fontSize: 28,
    marginBottom: 8,
  },

  title: {
    fontSize: Typography.body,
    fontWeight: Typography.bold,
    color: Colors.text,
  },

  subtitle: {
    marginTop: 4,
    color: Colors.subtitle,
    fontSize: Typography.small,
    textAlign: "center",
  },
});