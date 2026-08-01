import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Card from "../ui/Card";

type Props = {
  title: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
};

export default function TransactionCard({
  title,
  amount,
  date,
  type,
}: Props) {

  const isCredit =
    type === "credit";

  return (

    <Card>

      <View style={styles.container}>

        <View style={styles.leftSection}>

          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: isCredit
                  ? "#ECFDF5"
                  : "#FEF2F2",
              },
            ]}
          >

            <MaterialCommunityIcons
              name={
                isCredit
                  ? "arrow-down-bold-circle"
                  : "arrow-up-bold-circle"
              }
              size={24}
              color={
                isCredit
                  ? "#16A34A"
                  : "#EF4444"
              }
            />

          </View>

          <View style={styles.textContainer}>

            <Text style={styles.title}>
              {title}
            </Text>

            <Text style={styles.date}>
              {date}
            </Text>

          </View>

        </View>

        <View style={styles.rightSection}>

          <Text
            style={[
              styles.amount,
              {
                color: isCredit
                  ? "#16A34A"
                  : "#EF4444",
              },
            ]}
          >
            {isCredit ? "+" : "-"}₹
            {amount.toLocaleString()}
          </Text>

          <Text
            style={[
              styles.status,
              {
                color: isCredit
                  ? "#16A34A"
                  : "#EF4444",
              },
            ]}
          >
            {isCredit
              ? "Received"
              : "Paid"}
          </Text>

        </View>

      </View>

    </Card>

  );

}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    marginLeft: 14,
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  date: {
    marginTop: 5,
    fontSize: 13,
    color: "#64748B",
  },

  rightSection: {
    alignItems: "flex-end",
  },

  amount: {
    fontSize: 20,
    fontWeight: "800",
  },

  status: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
  },

});