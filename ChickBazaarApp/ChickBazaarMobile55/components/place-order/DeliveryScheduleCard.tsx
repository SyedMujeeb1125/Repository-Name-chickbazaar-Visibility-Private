import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import CBCard from "../common/CBCard";
import CBSection from "../common/CBSection";

import { Colors } from "../../theme/colors";

type DeliveryType =
  | "sameDay"
  | "nextDay"
  | "later";

type Props = {
  value: DeliveryType;
  onChange: (
    value: DeliveryType
  ) => void;
};

export default function DeliveryScheduleCard({
  value,
  onChange,
}: Props) {
  return (
    <CBCard>
      <CBSection title="Delivery Schedule" />

      <ScheduleOption
        active={value === "sameDay"}
        title="🚚 Same Day Delivery"
        subtitle="Available for orders placed before 6:00 AM"
        onPress={() =>
          onChange("sameDay")
        }
      />

      <ScheduleOption
        active={value === "nextDay"}
        title="⭐ Next Day Delivery"
        subtitle="Delivery by tomorrow (Recommended)"
        onPress={() =>
          onChange("nextDay")
        }
      />

      <ScheduleOption
        active={value === "later"}
        title="📅 Schedule for Later"
        subtitle="Choose your preferred delivery date"
        onPress={() =>
          onChange("later")
        }
      />
    </CBCard>
  );
}

type OptionProps = {
  active: boolean;
  title: string;
  subtitle: string;
  onPress: () => void;
};

function ScheduleOption({
  active,
  title,
  subtitle,
  onPress,
}: OptionProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.option,
        active &&
          styles.activeOption,
      ]}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <Text
        style={styles.subtitle}
      >
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    option: {
      borderWidth: 1,
      borderColor:
        Colors.border,
      borderRadius: 12,
      padding: 16,
      marginBottom: 14,
    },

    activeOption: {
      borderColor:
        Colors.primary,
      backgroundColor:
        "#FFF7ED",
    },

    title: {
      fontSize: 17,
      fontWeight: "700",
      color: Colors.text,
    },

    subtitle: {
      marginTop: 6,
      color: Colors.subtitle,
      lineHeight: 20,
    },
  });