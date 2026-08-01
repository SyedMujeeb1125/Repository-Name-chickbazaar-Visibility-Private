import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  icon: React.ComponentProps<
    typeof MaterialCommunityIcons
  >["name"];
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
            size={17}
            color="#64748B"
          />
        </View>

        <Text
          numberOfLines={1}
          style={styles.label}
        >
          {label}
        </Text>
      </View>

      <Text
        numberOfLines={1}
        style={styles.value}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 36,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  left: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    marginRight: 10,
  },

  iconContainer: {
    width: 22,

    alignItems: "center",
  },

  label: {
    marginLeft: 6,

    fontSize: 13,

    fontWeight: "500",

    color: "#64748B",
  },

  value: {
    fontSize: 14,

    fontWeight: "700",

    color: "#111827",

    textAlign: "right",

    maxWidth: "48%",
  },
});