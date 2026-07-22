import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../ui/Card";

type Props = {
  quantity: number;
  orderType: "weight" | "birds";
  amount: number;
};

export default function OrderSummaryCard({
  quantity,
  orderType,
  amount,
}: Props) {
  return (
    <Card>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="package-variant-closed"
          size={24}
          color="#F97316"
        />

        <Text style={styles.title}>
          Order Summary
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Quantity
        </Text>

        <Text style={styles.value}>
          {quantity} {orderType === "weight" ? "KG" : "Birds"}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>
          Estimated Bill
        </Text>

        <Text style={styles.amount}>
          ₹{Number(amount).toLocaleString("en-IN")}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontSize: 18,
    color: "#64748B",
  },

  value: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  amount: {
    fontSize: 30,
    fontWeight: "800",
    color: "#F97316",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 20,
  },
});