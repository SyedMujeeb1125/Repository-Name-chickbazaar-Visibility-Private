import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  amount: number;
  onPress: () => void;
};

export default function ReviewBar({
  amount,
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
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
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    paddingHorizontal: 24,
    height: 52,
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