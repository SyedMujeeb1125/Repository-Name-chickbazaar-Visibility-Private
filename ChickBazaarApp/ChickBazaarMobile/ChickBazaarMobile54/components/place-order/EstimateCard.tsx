import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  estimatedAmount: number;
  advanceAmount: number;
  paymentType: string;
};

export default function EstimateCard({
  estimatedAmount,
  advanceAmount,
  paymentType,
}: Props) {
  return (
    <Card>
      <Text style={styles.heading}>
        Estimated Bill
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>
          Estimated Amount
        </Text>

        <Text style={styles.value}>
          ₹
          {estimatedAmount.toLocaleString()}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Advance Required
        </Text>

        <Text style={styles.value}>
          ₹
          {advanceAmount.toLocaleString()}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Payment
        </Text>

        <Text style={styles.value}>
          {paymentType}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },

  label: {
    color: "#64748B",
    fontSize: 15,
  },

  value: {
    fontWeight: "700",
    fontSize: 16,
    color: "#0F172A",
  },
});