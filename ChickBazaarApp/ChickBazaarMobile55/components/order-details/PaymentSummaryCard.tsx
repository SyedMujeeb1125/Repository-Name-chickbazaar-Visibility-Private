import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../ui/Card";

type Props = {
  ratePerKg?: number;
  quantity: number;
  estimatedAmount: number;
  paidAmount?: number;
};

export default function PaymentSummaryCard({
  ratePerKg,
  quantity,
  estimatedAmount,
  paidAmount = 0,
}: Props) {
  const balance = estimatedAmount - paidAmount;

  return (
    <Card>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="cash-multiple"
          size={24}
          color="#F97316"
        />

        <Text style={styles.title}>
          Payment Summary
        </Text>
      </View>

      <Row
        label="Rate / KG"
        value={
          ratePerKg
            ? `₹${ratePerKg.toLocaleString("en-IN")}`
            : "-"
        }
      />

      <Row
        label="Quantity"
        value={`${quantity} KG`}
      />

      <Row
        label="Estimated Amount"
        value={`₹${estimatedAmount.toLocaleString("en-IN")}`}
        highlight
      />

      <View style={styles.divider} />

      <Row
        label="Paid"
        value={`₹${paidAmount.toLocaleString("en-IN")}`}
      />

      <Row
        label="Balance"
        value={`₹${balance.toLocaleString("en-IN")}`}
        balance
      />
    </Card>
  );
}

function Row({
  label,
  value,
  highlight,
  balance,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  balance?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text
        style={[
          styles.value,
          highlight && styles.highlight,
          balance && styles.balance,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  title: {
    marginLeft: 10,
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  label: {
    fontSize: 16,
    color: "#64748B",
  },

  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },

  highlight: {
    color: "#F97316",
    fontSize: 22,
    fontWeight: "800",
  },

  balance: {
    color: "#DC2626",
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 14,
  },
});