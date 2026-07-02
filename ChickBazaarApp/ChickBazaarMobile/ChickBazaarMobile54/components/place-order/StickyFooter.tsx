import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  amount: number;
  onReview: () => void;
};

export default function StickyFooter({
  amount,
  onReview,
}: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>
          Estimated Bill
        </Text>

        <Text style={styles.amount}>
          ₹
          {amount.toLocaleString()}
        </Text>
      </View>

      <View style={styles.button}>
        <PrimaryButton
          title="REVIEW ORDER"
          onPress={onReview}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  label: {
    color: "#64748B",
    fontSize: 13,
  },

  amount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F97316",
    marginTop: 4,
  },

  button: {
    marginTop: 15,
  },
});