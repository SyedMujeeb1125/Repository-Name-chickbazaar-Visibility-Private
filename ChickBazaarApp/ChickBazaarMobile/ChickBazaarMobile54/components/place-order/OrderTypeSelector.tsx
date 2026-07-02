import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

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
  return (
    <Card>
      <Text style={styles.heading}>
        How would you like to order?
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.option,
            value ===
              "weight" &&
              styles.active,
          ]}
          onPress={() =>
            onChange("weight")
          }
        >
          <Text
            style={
              styles.text
            }
          >
            ⚖️ By Weight
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            value ===
              "birds" &&
              styles.active,
          ]}
          onPress={() =>
            onChange("birds")
          }
        >
          <Text
            style={
              styles.text
            }
          >
            🐔 By Birds
          </Text>
        </TouchableOpacity>
      </View>
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

    row: {
      flexDirection: "row",
      justifyContent:
        "space-between",
    },

    option: {
      width: "48%",
      padding: 18,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#CBD5E1",
      alignItems: "center",
    },

    active: {
      backgroundColor:
        "#FFF7ED",
      borderColor:
        "#F97316",
    },

    text: {
      fontWeight: "700",
      color: "#0F172A",
    },
  });