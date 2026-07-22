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
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
  width: 44,
  height: 44,
  borderRadius: 14,
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
},

  titleContainer: {
    flex: 1,
  },

  label: {
    fontSize: 14,
    color: "#92400E",
    marginBottom: 4,
    fontWeight: "600",
  },

  rate: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
  },

  unit: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "600",
  },

  updated: {
    marginTop: 6,
    fontSize: 13,
    color: "#78716C",
  },
});