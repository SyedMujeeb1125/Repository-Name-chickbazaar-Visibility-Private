import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Props = {
  weight: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function BirdPreferenceCard({
  weight,
  quantity,
  onIncrease,
  onDecrease,
}: Props) {
  const selected = quantity > 0;

  return (
    <View
      style={[
        styles.container,
        selected && styles.selected,
      ]}
    >
      <View style={styles.row}>
        <Text style={styles.weight}>
          {weight.toFixed(1)} KG
        </Text>

        {selected && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Selected
            </Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.button}
          onPress={onDecrease}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.quantity}>
          {quantity}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={onIncrease}
        >
          <Text style={styles.buttonText}>＋</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>
        Preferred live bird weight.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  selected: {
    borderColor: "#16A34A",
    backgroundColor: "#F0FDF4",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  weight: {
    fontSize: 18,
    fontWeight: "700",
  },

  badge: {
    backgroundColor: "#16A34A",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  badgeText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 12,
  },

  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },

  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  quantity: {
    fontSize: 22,
    fontWeight: "700",
  },

  description: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 14,
  },
});