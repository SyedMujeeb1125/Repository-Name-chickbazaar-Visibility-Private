import React from "react";

import { StyleSheet, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  focused: boolean;
}

export default function TabIcon({
  icon,
  label,
  focused,
}: Props) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={focused ? "#F97316" : "#64748B"}
      />

      <Text
        style={[
          styles.label,
          focused && styles.activeLabel,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>

      {focused && <View style={styles.indicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 72,

    alignItems: "center",

    justifyContent: "flex-end",

    paddingTop: 10,

    paddingBottom: 6,
  },

  label: {
    marginTop: 4,

    fontSize: 11,

    fontWeight: "600",

    color: "#64748B",
  },

  activeLabel: {
    color: "#F97316",
  },

  indicator: {
    marginTop: 5,

    width: 22,

    height: 3,

    borderRadius: 2,

    backgroundColor: "#F97316",
  },
});