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
          Live Estimate
        </Text>

        <View style={styles.badge}>
          <View style={styles.liveDot} />

          <Text style={styles.badgeText}>
            LIVE RATE
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
            ? "Requested Weight"
            : "Requested Birds"
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
        label="Today's Live Rate"
        value={`₹${todayRate.toLocaleString("en-IN")}/kg`}
      />

      <View style={styles.divider} />

      <View style={styles.totalCard}>
        <Text style={styles.totalTitle}>
          Estimated Payable
        </Text>

        <Text style={styles.totalAmount}>
          ₹{estimatedAmount.toLocaleString("en-IN")}
        </Text>

        <Text style={styles.totalSubtitle}>
          Calculated using today's published live rate.
        </Text>
      </View>

      <View style={styles.info}>
        <MaterialCommunityIcons
          name="information-outline"
          size={18}
          color="#2563EB"
        />

        <Text style={styles.infoText}>
          Final billing is based on the actual delivered weight.
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
    marginBottom: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#16A34A",
    marginRight: 6,
  },

  badgeText: {
    color: "#EA580C",
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 0.6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
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
    marginVertical: 18,
  },

  totalCard: {
    backgroundColor: "#FFF7ED",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
  },

  totalTitle: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },

  totalAmount: {
    marginTop: 8,
    fontSize: 36,
    fontWeight: "900",
    color: "#F97316",
  },

  totalSubtitle: {
    marginTop: 8,
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
  },

  info: {
    flexDirection: "row",
    marginTop: 18,
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 12,
  },

  infoText: {
    flex: 1,
    marginLeft: 8,
    color: "#1E3A8A",
    fontSize: 13,
    lineHeight: 20,
  },
});