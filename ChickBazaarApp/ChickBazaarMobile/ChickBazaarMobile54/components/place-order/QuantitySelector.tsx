import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  orderType: "weight" | "birds";
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function QuantitySelector({
  orderType,
  value,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <Card>
      <Text style={styles.heading}>
        Required Quantity
      </Text>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={onDecrease}
        >
          <Text style={styles.sign}>−</Text>
        </TouchableOpacity>

        <View style={styles.center}>
          <Text style={styles.value}>
            {value}
          </Text>

          <Text style={styles.unit}>
            {orderType === "weight"
              ? "KG"
              : "Birds"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onIncrease}
        >
          <Text style={styles.sign}>+</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
  },

  sign: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "700",
  },

  center: {
    alignItems: "center",
  },

  value: {
    fontSize: 34,
    fontWeight: "700",
    color: "#0F172A",
  },

  unit: {
    marginTop: 6,
    color: "#64748B",
  },
});