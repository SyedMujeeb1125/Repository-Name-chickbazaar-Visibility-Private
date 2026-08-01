import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  amount: number;
  onPress: () => void;
};

export default function ReviewBar({
  amount,
  onPress,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 16),
        },
      ]}
    >
      <View>
        <Text style={styles.label}>
          Estimated Amount
        </Text>

        <Text style={styles.amount}>
          ₹{amount.toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>
          Review Order
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,
    borderColor: "#E5E7EB",

    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    elevation: 12,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
  },

  amount: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },

  button: {
    backgroundColor: "#F97316",
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});