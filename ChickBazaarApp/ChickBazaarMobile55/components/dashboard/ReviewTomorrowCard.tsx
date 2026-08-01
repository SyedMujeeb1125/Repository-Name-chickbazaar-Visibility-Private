import React from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  orderLabel?: string;

  rate: number;

  suggestedWeight: number;

  estimatedAmount: number;

  onReview: () => void;
};

export default function ReviewTomorrowCard({
  orderLabel = "Tomorrow's Order",

  rate,

  suggestedWeight,

  estimatedAmount,

  onReview,
}: Props) {
  const isTomorrow =
    orderLabel === "Tomorrow's Order";

  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <MaterialCommunityIcons
          name="calendar-arrow-right"
          size={16}
          color="#2563EB"
        />

        <Text style={styles.badgeText}>
          {isTomorrow
            ? "TOMORROW'S DELIVERY"
            : "TODAY'S DELIVERY"}
        </Text>
      </View>

      <Text style={styles.title}>
        Review {orderLabel}
      </Text>

      <Text style={styles.subtitle}>
        Review the live rate, verify the quantity, and confirm your order before the booking window closes.
      </Text>

      <View style={styles.rateCard}>
        <Text style={styles.rateLabel}>
          Live Rate
        </Text>

        <Text style={styles.rate}>
          ₹{rate.toLocaleString("en-IN")}
          <Text style={styles.rateUnit}>
            /kg
          </Text>
        </Text>
      </View>

      <View style={styles.summary}>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="weight-kilogram"
            size={18}
            color="#64748B"
          />

          <Text style={styles.label}>
            Quantity
          </Text>

          <Text style={styles.value}>
            {suggestedWeight} Kg
          </Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <MaterialCommunityIcons
            name="cash-multiple"
            size={18}
            color="#64748B"
          />

          <Text style={styles.label}>
            Estimated Amount
          </Text>

          <Text style={styles.total}>
            ₹{estimatedAmount.toLocaleString(
              "en-IN"
            )}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        <MaterialCommunityIcons
          name="information-outline"
          size={18}
          color="#2563EB"
        />

        <Text style={styles.infoText}>
          You can modify the quantity before confirming your order.
        </Text>
      </View>

      <PrimaryButton
        title={`REVIEW ${orderLabel.toUpperCase()}`}
        onPress={onReview}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 4,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    marginLeft: 6,
    color: "#2563EB",
    fontWeight: "800",
    fontSize: 12,
  },

  title: {
    marginTop: 18,
    fontSize: 28,
    fontWeight: "900",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 8,
    color: "#64748B",
    fontSize: 15,
    lineHeight: 24,
  },

  rateCard: {
    marginTop: 22,
    backgroundColor: "#FFF7ED",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
  },

  rateLabel: {
    color: "#64748B",
    fontSize: 14,
  },

  rate: {
    marginTop: 8,
    fontSize: 38,
    fontWeight: "900",
    color: "#F97316",
  },

  rateUnit: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F97316",
  },

  summary: {
    marginTop: 20,
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 18,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    flex: 1,
    marginLeft: 10,
    color: "#64748B",
    fontSize: 14,
  },

  value: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 15,
  },

  total: {
    color: "#16A34A",
    fontWeight: "900",
    fontSize: 18,
  },

  separator: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 14,
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

  button: {
    marginTop: 22,
  },
});