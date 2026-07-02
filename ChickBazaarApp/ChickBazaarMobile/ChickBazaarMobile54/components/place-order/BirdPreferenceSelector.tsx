import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

const OPTIONS = [
  "1.8 KG",
  "2.0 KG",
  "2.2 KG",
];

type Props = {
  value: string;
  onChange: (
    value: string
  ) => void;
};

export default function BirdPreferenceSelector({
  value,
  onChange,
}: Props) {
  return (
    <Card>
      <Text style={styles.heading}>
        Bird Preference
      </Text>

      {OPTIONS.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            value === option &&
              styles.active,
          ]}
          onPress={() =>
            onChange(option)
          }
        >
          <Text style={styles.text}>
            🐔 {option}
          </Text>

          <Text style={styles.tick}>
            {value === option
              ? "✓"
              : ""}
          </Text>
        </TouchableOpacity>
      ))}
    </Card>
  );
}

const styles =
  StyleSheet.create({
    heading: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 15,
    },

    option: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#E2E8F0",
      marginBottom: 10,
    },

    active: {
      backgroundColor:
        "#FFF7ED",
      borderColor:
        "#F97316",
    },

    text: {
      fontSize: 16,
      fontWeight: "600",
      color: "#0F172A",
    },

    tick: {
      color: "#16A34A",
      fontWeight: "700",
      fontSize: 18,
    },
  });