import React from "react";

import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Value =
  | "nearest"
  | "lowest"
  | "premium";

type Props = {
  value: Value;
  onChange: (value: Value) => void;
};

export default function FulfilmentSelector({
  value,
  onChange,
}: Props) {
  return (
    <Card>
      <Text style={styles.heading}>
        Fulfilment Preference
      </Text>

      <Option
        active={value === "nearest"}
        title="🚚 Nearest Farm"
        subtitle="Fastest delivery"
        onPress={() =>
          onChange("nearest")
        }
      />

      <Option
        active={value === "lowest"}
        title="💰 Lowest Cost"
        subtitle="Best price"
        onPress={() =>
          onChange("lowest")
        }
      />

      <Option
        active={value === "premium"}
        title="⭐ Premium Farm"
        subtitle="Highest quality"
        onPress={() =>
          onChange("premium")
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
        active && styles.active,
      ]}
      onPress={onPress}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#FFF7ED",
    borderColor: "#F97316",
  },

  title: {
    fontWeight: "700",
    fontSize: 16,
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 13,
  },
});