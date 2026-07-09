import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  orderType: "weight" | "birds";
  quantity: number;
  estimatedBirds: number;
  estimatedWeight: number;
  estimatedAmount: number;
  todayRate: number;
};

export default function LiveEstimateCard({
  orderType,
  quantity,
  estimatedBirds,
  estimatedWeight,
  estimatedAmount,
  todayRate,
}: Props) {

  function Row({
    icon,
    label,
    value,
  }: {
    icon: string;
    label: string;
    value: string;
  }) {
    return (
      <View style={styles.row}>

        <View style={styles.left}>

          <MaterialCommunityIcons
            name={icon as any}
            size={18}
            color="#F97316"
          />

          <Text style={styles.label}>
            {label}
          </Text>

        </View>

        <Text style={styles.value}>
          {value}
        </Text>

      </View>
    );
  }

  return (

    <Card>

      <View style={styles.header}>

        <Text style={styles.heading}>
          Order Summary
        </Text>

        <View style={styles.badge}>

          <Text style={styles.badgeText}>
            LIVE
          </Text>

        </View>

      </View>

      <Row
        icon={
          orderType === "weight"
            ? "weight-kilogram"
            : "food-drumstick"
        }
        label={
          orderType === "weight"
            ? "Weight"
            : "Birds"
        }
        value={
          orderType === "weight"
            ? `${quantity} KG`
            : `${quantity} Birds`
        }
      />

      <Row
        icon={
          orderType === "weight"
            ? "food-drumstick"
            : "weight-kilogram"
        }
        label={
          orderType === "weight"
            ? "Estimated Birds"
            : "Estimated Weight"
        }
        value={
          orderType === "weight"
            ? `${estimatedBirds} Birds`
            : `${estimatedWeight} KG`
        }
      />

      <Row
        icon="currency-inr"
        label="Today's Rate"
        value={`₹${todayRate}/kg`}
      />

      <View style={styles.divider} />

      <View style={styles.totalRow}>

        <Text style={styles.totalLabel}>
          TOTAL
        </Text>

        <Text style={styles.totalAmount}>
          ₹{estimatedAmount.toLocaleString()}
        </Text>

      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  heading: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },

  badge: {
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  badgeText: {
    color: "#EA580C",
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    marginLeft: 10,
    fontSize: 15,
    color: "#64748B",
    fontWeight: "600",
  },

  value: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 14,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#334155",
    letterSpacing: 1,
  },

  totalAmount: {
    fontSize: 28,
    fontWeight: "900",
    color: "#F97316",
  },

});
