import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Card from "../ui/Card";

type Props = {
  outstanding: number;
  creditLimit: number;
};

export default function OutstandingCard({
  outstanding,
}: Props) {

  const paymentPending =
    outstanding > 0;

  return (

    <Card>

      <View style={styles.header}>

        <View style={styles.iconContainer}>

          <MaterialCommunityIcons
            name="wallet-outline"
            size={24}
            color="#F97316"
          />

        </View>

        <View>

          <Text style={styles.heading}>
            Business Summary
          </Text>

          <Text style={styles.subHeading}>
            Outstanding Balance
          </Text>

        </View>

      </View>

      <Text style={styles.amount}>
        ₹{outstanding.toLocaleString()}
      </Text>

      <View style={styles.statusContainer}>

        <MaterialCommunityIcons
          name={
            paymentPending
              ? "alert-circle"
              : "check-circle"
          }
          size={18}
          color={
            paymentPending
              ? "#F97316"
              : "#16A34A"
          }
        />

        <Text
          style={[
            styles.statusText,
            {
              color:
                paymentPending
                  ? "#F97316"
                  : "#16A34A",
            },
          ]}
        >
          {paymentPending
            ? "Payment Pending"
            : "No Outstanding Dues"}
        </Text>

      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>

        <View>

          <Text style={styles.label}>
            Last Updated
          </Text>

          <Text style={styles.value}>
            Today
          </Text>

        </View>

        <View>

          <Text style={styles.label}>
            Status
          </Text>

          <Text
            style={[
              styles.value,
              {
                color:
                  paymentPending
                    ? "#F97316"
                    : "#16A34A",
              },
            ]}
          >
            {paymentPending
              ? "Pending"
              : "Clear"}
          </Text>

        </View>

      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  heading: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },

  subHeading: {
    marginTop: 2,
    color: "#64748B",
    fontSize: 14,
  },

  amount: {
    marginTop: 22,
    fontSize: 36,
    fontWeight: "800",
    color: "#EF4444",
  },

  statusContainer: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  statusText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 22,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 13,
    color: "#64748B",
  },

  value: {
    marginTop: 6,
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

});