import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import CBCard from "../common/CBCard";
import CBSection from "../common/CBSection";

import { Colors } from "../../theme/colors";

type Props = {
  rate: number;
  quantity: number;
  estimated: number;
  advance: number;
  delivery: string;
};

export default function OrderSummaryCard({
  rate,
  quantity,
  estimated,
  advance,
  delivery,
}: Props) {
  return (
    <CBCard>
      <CBSection title="Order Summary" />

      <SummaryRow
        label="Today's Rate"
        value={`₹ ${rate.toFixed(
          2
        )}/KG`}
      />

      <SummaryRow
        label="Quantity"
        value={`${quantity} KG`}
      />

      <SummaryRow
        label="Estimated Amount"
        value={`₹ ${estimated.toFixed(
          2
        )}`}
      />

      <SummaryRow
        label="Advance"
        value={`₹ ${advance.toFixed(
          2
        )}`}
      />

      <SummaryRow
        label="Delivery"
        value={delivery}
      />
    </CBCard>
  );
}

type RowProps = {
  label: string;
  value: string;
};

function SummaryRow({
  label,
  value,
}: RowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor:
        Colors.border,
    },

    label: {
      color: Colors.subtitle,
      fontSize: 15,
    },

    value: {
      fontWeight: "700",
      color: Colors.text,
      fontSize: 15,
    },
  });