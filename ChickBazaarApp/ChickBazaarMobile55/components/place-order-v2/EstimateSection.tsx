import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";

type Props = {
  quantity: number;
  rate: number;
  estimatedAmount: number;
};

export default function EstimateSection({
  quantity,
  rate,
  estimatedAmount,
}: Props) {
  return (
    <SectionCard>
      <SectionHeader
        title="Order Estimate"
        subtitle="Based on today's live rate."
      />

      <View style={styles.summaryCard}>
        <View style={styles.amountRow}>
          <View>
            <Text style={styles.amountLabel}>
              Estimated Amount
            </Text>

            <Text style={styles.amount}>
              ₹{estimatedAmount.toLocaleString()}
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="calculator-variant-outline"
              size={28}
              color="#F97316"
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.left}>
            Quantity
          </Text>

          <Text style={styles.right}>
  {quantity} kg
</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.left}>
            Today's Rate
          </Text>

          <Text style={styles.right}>
            ₹{rate.toFixed(2)} / kg
          </Text>
        </View>

        <View style={styles.note}>
          <MaterialCommunityIcons
            name="information-outline"
            size={18}
            color="#F97316"
          />

          <Text style={styles.noteText}>
            Final invoice is calculated using
            the actual delivered weight.
          </Text>
        </View>
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 18,
  },

  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amountLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },

  amount: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  left: {
    fontSize: 15,
    color: "#6B7280",
  },

  right: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  note: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF7ED",
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
  },

  noteText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: "#92400E",
    lineHeight: 18,
  },
});