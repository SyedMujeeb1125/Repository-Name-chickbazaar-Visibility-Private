import React from "react";

import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  label: string;
  value: string;
};

export default function ReadOnlyField({
  label,
  value,
}: Props) {

  return (

    <View style={styles.container}>

      <Text style={styles.label}>
        {label}
      </Text>

      <View style={styles.box}>

        <Text
          style={styles.value}
          numberOfLines={1}
        >
          {value || "-"}
        </Text>

        <MaterialCommunityIcons
          name="lock"
          size={18}
          color="#94A3B8"
        />

      </View>

      <Text style={styles.helper}>
        This field cannot be changed.
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },

  box: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",

    paddingHorizontal: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  value: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    marginRight: 12,
  },

  helper: {
    marginTop: 8,
    fontSize: 13,
    color: "#94A3B8",
  },

});