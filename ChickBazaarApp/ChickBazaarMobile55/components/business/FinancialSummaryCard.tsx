import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  outstanding: number;
  creditLimit: number;
  availableCredit: number;
};

function formatAmount(amount: number) {

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }

  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }

  return `₹${amount}`;

}

export default function FinancialSummaryCard({
  outstanding,
  creditLimit,
  availableCredit,
}: Props) {

  const utilization =
    creditLimit > 0
      ? (outstanding / creditLimit) * 100
      : 0;

  return (

    <View style={styles.card}>

      <Text style={styles.heading}>
        Credit Summary
      </Text>

      <View style={styles.row}>

        <View style={styles.item}>

          <Text style={styles.label}>
            Outstanding
          </Text>

          <Text
            style={[
              styles.amount,
              {
                color: "#DC2626",
              },
            ]}
          >
            {formatAmount(outstanding)}
          </Text>

        </View>

        <View style={styles.item}>

          <Text style={styles.label}>
            Credit Limit
          </Text>

          <Text
            style={[
              styles.amount,
              {
                color: "#2563EB",
              },
            ]}
          >
            {formatAmount(creditLimit)}
          </Text>

        </View>

      </View>

      <View style={styles.separator} />

      <View style={styles.availableRow}>

        <Text style={styles.label}>
          Available Credit
        </Text>

        <Text
          style={[
            styles.amount,
            {
              color: "#16A34A",
            },
          ]}
        >
          {formatAmount(availableCredit)}
        </Text>

      </View>

      <View style={styles.progressBackground}>

        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min(
                utilization,
                100
              )}%`,
            },
          ]}
        />

      </View>

      <Text style={styles.progressText}>
        {utilization.toFixed(0)}% Credit Utilized
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 22,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 6,

    marginBottom: 22,
  },

  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 22,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  item: {
    flex: 1,
  },

  label: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
  },

  amount: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "800",
  },

  separator: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 22,
  },

  availableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressBackground: {
    marginTop: 20,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },

  progressFill: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F97316",
  },

  progressText: {
    marginTop: 10,
    textAlign: "center",
    color: "#64748B",
    fontWeight: "700",
    fontSize: 13,
  },

});