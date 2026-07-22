import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  value: string;
};

export default function DashboardInfoRow({
  icon,
  label,
  value,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={icon}
            size={18}
            color="#64748B"
          />
        </View>

        <Text
          style={styles.label}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>

      <Text
        style={styles.value}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  left: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    marginRight: 16,
  },

  iconContainer: {
    width: 28,

    alignItems: "center",
  },

  label: {
    marginLeft: 10,

    fontSize: 14,

    fontWeight: "500",

    color: "#64748B",
  },

  value: {
    fontSize: 15,

    fontWeight: "700",

    color: "#111827",

    textAlign: "right",

    maxWidth: "45%",
  },
});