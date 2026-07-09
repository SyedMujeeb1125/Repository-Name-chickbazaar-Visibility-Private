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
  value: "weight" | "birds";
  onChange: (
    value: "weight" | "birds"
  ) => void;
};

export default function OrderTypeSelector({
  value,
  onChange,
}: Props) {

  function Option({
    selected,
    icon,
    title,
    subtitle,
    onPress,
  }: {
    selected: boolean;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    title: string;
    subtitle: string;
    onPress: () => void;
  }) {

    return (

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={[
          styles.option,
          selected &&
            styles.active,
        ]}
      >

        <View style={styles.iconRow}>

          <MaterialCommunityIcons
            name={icon}
            size={30}
            color={
              selected
                ? "#F97316"
                : "#64748B"
            }
          />

          {selected && (

            <View style={styles.checkCircle}>

              <MaterialCommunityIcons
                name="check"
                size={14}
                color="#FFFFFF"
              />

            </View>

          )}

        </View>

        <Text
          style={[
            styles.title,
            selected &&
              styles.activeTitle,
          ]}
        >
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

      </TouchableOpacity>

    );

  }

  return (

    <CBCard>

      <Text style={styles.heading}>
        How would you like to order?
      </Text>

      <View style={styles.row}>

        <Option
          selected={value === "weight"}
          icon="weight-kilogram"
          title="By Weight"
          subtitle="Recommended"
          onPress={() =>
            onChange("weight")
          }
        />

        <Option
          selected={value === "birds"}
          icon="food-drumstick"
          title="By Birds"
          subtitle="Live Conversion"
          onPress={() =>
            onChange("birds")
          }
        />

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

  row: {

    flexDirection: "row",

    justifyContent: "space-between",

  },

  option: {

    width: "48.5%",

    backgroundColor: "#FFFFFF",

    borderWidth: 1.5,

    borderColor: "#E2E8F0",

    borderRadius: 22,

    paddingVertical: 20,

    paddingHorizontal: 16,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,

  },

  active: {

    backgroundColor: "#FFF7ED",

    borderColor: "#F97316",

    shadowColor: "#F97316",

    shadowOpacity: 0.20,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,

  },

  iconRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-start",

    marginBottom: 18,

  },

  checkCircle: {

    width: 24,

    height: 24,

    borderRadius: 12,

    backgroundColor: "#F97316",

    justifyContent: "center",

    alignItems: "center",

  },

  title: {

    fontSize: 18,

    fontWeight: "800",

    color: "#0F172A",

  },

  activeTitle: {

    color: "#EA580C",

  },

  subtitle: {

    marginTop: 6,

    fontSize: 13,

    color: "#64748B",

    lineHeight: 18,

  },

});
