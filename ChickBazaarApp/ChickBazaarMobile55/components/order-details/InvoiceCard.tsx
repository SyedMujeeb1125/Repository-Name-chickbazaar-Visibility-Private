import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Card from "../ui/Card";

type Props = {
  paymentStatus?: string;
  estimatedAmount?: number;
  finalAmount?: number | null;
  paidAmount?: number;
  actualWeight?: number | null;
};

export default function InvoiceCard({
  paymentStatus,
  estimatedAmount = 0,
  finalAmount,
  paidAmount = 0,
  actualWeight,
}: Props) {
  const bill = finalAmount ?? estimatedAmount;
  const balance = Math.max(0, bill - paidAmount);

  return (
    <Card>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="file-document-outline"
          size={24}
          color="#F97316"
        />

        <Text style={styles.title}>
          Invoice & Payment
        </Text>
      </View>

      <Row
        label="Invoice Amount"
        value={`₹${bill.toLocaleString("en-IN")}`}
      />

      <Row
        label="Paid"
        value={`₹${paidAmount.toLocaleString("en-IN")}`}
      />

      <Row
        label="Outstanding"
        value={`₹${balance.toLocaleString("en-IN")}`}
        highlight={balance > 0}
      />

      {actualWeight != null && (
        <Row
          label="Actual Weight"
          value={`${actualWeight} KG`}
        />
      )}

      <View style={styles.statusBox}>
        <MaterialCommunityIcons
          name={
            paymentStatus === "paid"
              ? "check-circle"
              : "clock-outline"
          }
          size={22}
          color={
            paymentStatus === "paid"
              ? "#16A34A"
              : "#F97316"
          }
        />

        <Text style={styles.statusText}>
          {paymentStatus === "paid"
            ? "Payment Completed"
            : "Payment Pending"}
        </Text>
      </View>

      <Pressable style={styles.button}>
        <MaterialCommunityIcons
          name="download"
          color="#FFFFFF"
          size={20}
        />

        <Text style={styles.buttonText}>
          Download Invoice
        </Text>
      </Pressable>
    </Card>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text
        style={[
          styles.value,
          highlight && styles.highlight,
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
    marginBottom: 20,
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
    color: "#64748B",
    fontSize: 16,
  },

  value: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0F172A",
  },

  highlight: {
    color: "#DC2626",
    fontWeight: "700",
  },

  statusBox: {
    marginTop: 18,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    padding: 14,
    borderRadius: 12,
  },

  statusText: {
    marginLeft: 10,
    fontWeight: "700",
    color: "#0F172A",
  },

  button: {
    height: 50,
    borderRadius: 14,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});