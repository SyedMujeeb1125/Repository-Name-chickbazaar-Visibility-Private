import React from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CBCard from "../common/CBCard";

type Props = {

  orderType: "weight" | "birds";

  value: number;

  onSelect: (
    qty: number
  ) => void;

  onIncrease: () => void;

  onDecrease: () => void;

  onEdit: () => void;

};

const WEIGHT_PRESETS = [
  100,
  200,
  500,
  1000,
];

const BIRD_PRESETS = [
  50,
  100,
  150,
  200,
];

export default function QuantitySelector({

  orderType,

  value,

  onSelect,

  onIncrease,

  onDecrease,

  onEdit,

}: Props) {

  const presets =
    orderType === "weight"
      ? WEIGHT_PRESETS
      : BIRD_PRESETS;

  return (

    <CBCard>

      <Text style={styles.heading}>
        Select Quantity
      </Text>

      <View style={styles.presetContainer}>

        {presets.map((item) => (

          <TouchableOpacity

            key={item}

            activeOpacity={0.85}

            onPress={() =>
              onSelect(item)
            }

            style={[
              styles.preset,
              item === value &&
                styles.selectedPreset,
            ]}

          >

            <Text
              style={[
                styles.presetValue,
                item === value &&
                  styles.selectedValue,
              ]}
            >
              {item}
            </Text>

            <Text
              style={[
                styles.presetUnit,
                item === value &&
                  styles.selectedValue,
              ]}
            >
              {orderType === "weight"
                ? "KG"
                : "Birds"}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      <View style={styles.quantityCard}>

        <TouchableOpacity

          style={styles.circleButton}

          activeOpacity={0.85}

          onPress={onDecrease}

        >

          <MaterialCommunityIcons
            name="minus"
            size={30}
            color="#F97316"
          />

        </TouchableOpacity>

        <TouchableOpacity

          activeOpacity={0.9}

          style={styles.center}

          onPress={onEdit}

        >

          <Text style={styles.value}>
            {value}
          </Text>

          <Text style={styles.unit}>
            {orderType === "weight"
              ? "KG"
              : "Birds"}
          </Text>

          <Text style={styles.helper}>
            Tap to customize
          </Text>

        </TouchableOpacity>

        <TouchableOpacity

          style={styles.circleButton}

          activeOpacity={0.85}

          onPress={onIncrease}

        >

          <MaterialCommunityIcons
            name="plus"
            size={30}
            color="#F97316"
          />

        </TouchableOpacity>

      </View>

    </CBCard>

  );

}
const styles = StyleSheet.create({

  heading: {

    fontSize: 22,

    fontWeight: "800",

    color: "#0F172A",

    marginBottom: 18,

  },

  presetContainer: {

    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",

    marginBottom: 24,

  },

  preset: {

    width: "48%",

    height: 72,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    borderWidth: 1.5,

    borderColor: "#E2E8F0",

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 14,

  },

  selectedPreset: {

    backgroundColor: "#FFF7ED",

    borderColor: "#F97316",

    borderWidth: 2,

  },

  presetValue: {

    fontSize: 22,

    fontWeight: "800",

    color: "#334155",

  },

  presetUnit: {

    marginTop: 2,

    fontSize: 13,

    fontWeight: "700",

    color: "#64748B",

  },

  selectedValue: {

    color: "#EA580C",

  },

  quantityCard: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginTop: 8,

  },

  circleButton: {

    width: 64,

    height: 64,

    borderRadius: 32,

    backgroundColor: "#FFFFFF",

    borderWidth: 2,

    borderColor: "#F97316",

    justifyContent: "center",

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,

  },

  center: {

    flex: 1,

    marginHorizontal: 18,

    alignItems: "center",

    backgroundColor: "#FFF7ED",

    borderRadius: 22,

    paddingVertical: 18,

    borderWidth: 1,

    borderColor: "#FED7AA",

  },

  value: {

    fontSize: 54,

    fontWeight: "900",

    color: "#0F172A",

    lineHeight: 58,

  },

  unit: {

    marginTop: -2,

    fontSize: 18,

    fontWeight: "700",

    color: "#64748B",

  },

  helper: {

    marginTop: 8,

    fontSize: 13,

    color: "#94A3B8",

    fontWeight: "600",

  },

});
