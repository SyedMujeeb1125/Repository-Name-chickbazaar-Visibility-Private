import React from "react";

import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  value:
    | "standard"
    | "express"
    | "scheduled";

  onChange: (
    value:
      | "standard"
      | "express"
      | "scheduled"
  ) => void;
};

export default function DeliverySelector({
  value,
  onChange,
}: Props) {
  return (
    <Card>
      <Text style={styles.heading}>
        Delivery
      </Text>

      <Option
        active={
          value ===
          "standard"
        }
        title="🚚 Standard Delivery"
        subtitle="Recommended"
        onPress={() =>
          onChange(
            "standard"
          )
        }
      />

      <Option
        active={
          value ===
          "express"
        }
        title="⚡ Express Delivery"
        subtitle="Additional Charges"
        onPress={() =>
          onChange(
            "express"
          )
        }
      />

      <Option
        active={
          value ===
          "scheduled"
        }
        title="📅 Scheduled Delivery"
        subtitle="Choose Date"
        onPress={() =>
          onChange(
            "scheduled"
          )
        }
      />
    </Card>
  );
}

function Option({
  active,
  title,
  subtitle,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      style={[
        styles.option,
        active &&
          styles.active,
      ]}
      onPress={onPress}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <Text
        style={
          styles.subtitle
        }
      >
        {subtitle}
      </Text>
    </TouchableOpacity>
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
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#E2E8F0",
      marginBottom: 10,
    },

    active: {
      borderColor:
        "#F97316",
      backgroundColor:
        "#FFF7ED",
    },

    title: {
      fontWeight: "700",
      fontSize: 16,
      color: "#0F172A",
    },

    subtitle: {
      marginTop: 5,
      color: "#64748B",
      fontSize: 13,
    },
  });