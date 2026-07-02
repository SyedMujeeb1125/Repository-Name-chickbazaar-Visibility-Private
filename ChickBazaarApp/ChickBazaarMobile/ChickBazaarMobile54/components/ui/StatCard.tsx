import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  label: string;
  value: string | number;
};

export default function StatCard({
  label,
  value,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 18,
    elevation: 2,
  },

  label: {
    color: "#64748B",
    fontSize: 14,
  },

  value: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 10,
    color: "#0F172A",
  },
});