import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  status: string;
  captain: string;
  eta: string;
};

export default function OrderStatusCard({
  status,
  captain,
  eta,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        Current Delivery
      </Text>

      <Text style={styles.status}>
        🛡 {status}
      </Text>

      <Text style={styles.row}>
        👨‍✈️ Captain {captain}
      </Text>

      <Text style={styles.row}>
        ⏰ ETA {eta}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 2,
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  status: {
    color: "#16A34A",
    fontWeight: "600",
    marginBottom: 8,
  },

  row: {
    color: "#475569",
    marginTop: 4,
  },
});
