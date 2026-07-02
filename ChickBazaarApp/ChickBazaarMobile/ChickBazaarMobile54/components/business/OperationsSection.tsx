import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  activeOrders: number;
  captain?: string;
  eta?: string;
};

export default function OperationsSection({
  activeOrders,
  captain,
  eta,
}: Props) {
  return (
    <Card>
      <Text style={styles.heading}>
        🚚 Today's Operations
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>
          Active Orders
        </Text>

        <Text style={styles.value}>
          {activeOrders}
        </Text>
      </View>

      {captain ? (
        <>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Captain
            </Text>

            <Text style={styles.value}>
              {captain}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              ETA
            </Text>

            <Text style={styles.value}>
              {eta}
            </Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.divider} />

          <Text style={styles.empty}>
            No active delivery assigned.
          </Text>
        </>
      )}
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
    marginVertical: 6,
  },

  label: {
    color: "#64748B",
    fontSize: 15,
  },

  value: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 14,
  },

  empty: {
    color: "#94A3B8",
    textAlign: "center",
    fontStyle: "italic",
  },
});