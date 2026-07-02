import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  rate: number;
};

export default function LiveRateBanner({
  rate,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        📈 TODAY'S LIVE RATE
      </Text>

      <Text style={styles.rate}>
        ₹{rate.toLocaleString()} / KG
      </Text>

      <Text style={styles.updated}>
        Updated Today
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F97316",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  label: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },

  rate: {
    color: "#FFF",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 8,
  },

  updated: {
    color: "#FFEDD5",
    marginTop: 8,
    fontSize: 13,
  },
});