import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  message: string;
  color?: string;
};

export default function StatusBanner({
  icon,
  title,
  message,
  color = "#F97316",
}: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
        <MaterialCommunityIcons
          name={icon}
          size={28}
          color={color}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    alignItems: "center",
    elevation: 2,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  message: {
    marginTop: 4,
    color: "#64748B",
    lineHeight: 20,
  },
});