import React from "react";

import {
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";

type Props = {
  amount: number;
  size?: number;
};

export default function CBAmount({
  amount,
  size = 24,
}: Props) {
  return (
    <Text
      style={[
        styles.amount,
        {
          fontSize: size,
        },
      ]}
    >
      ₹{" "}
      {amount.toLocaleString(
        "en-IN",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}
    </Text>
  );
}

const styles =
  StyleSheet.create({
    amount: {
      color: Colors.primary,
      fontWeight: "700",
    },
  });