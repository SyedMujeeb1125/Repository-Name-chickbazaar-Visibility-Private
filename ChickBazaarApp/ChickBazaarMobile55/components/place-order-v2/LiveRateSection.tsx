import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import SectionCard from "./SectionCard";

type Props = {
  rate: number;
  lastUpdated?: string;
};

export default function LiveRateSection({
  rate,
  lastUpdated,
}: Props) {
  return (
    <SectionCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="chart-line"
            size={18}
            color="#F97316"
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.label}>Today's Live Rate</Text>

          <Text style={styles.rate}>
            ₹{rate.toFixed(2)}
            <Text style={styles.unit}> / kg</Text>
          </Text>

          
        </View>
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FED7AA",
    paddingVertical: 12,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  titleContainer: {
    flex: 1,
  },

  label: {
    fontSize: 13,
    color: "#92400E",
    marginBottom: 2,
    fontWeight: "600",
  },

  rate: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 28,
  },

  unit: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },

  updated: {
    marginTop: 2,
    fontSize: 12,
    color: "#78716C",
  },
});