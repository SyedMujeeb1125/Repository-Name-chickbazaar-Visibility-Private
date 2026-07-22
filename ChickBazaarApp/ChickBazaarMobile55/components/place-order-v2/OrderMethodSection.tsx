import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import SectionCard from "./SectionCard";
import SectionHeader from "./SectionHeader";

export type OrderMethod = "weight" | "birds";

type Props = {
  value: OrderMethod;
  onChange: (value: OrderMethod) => void;
};

export default function OrderMethodSection({
  value,
  onChange,
}: Props) {
  return (
    <SectionCard>
      <SectionHeader
        title="Order Method"
        subtitle="Choose how you'd like to place today's order."
      />

      <View style={styles.container}>
        <MethodCard
          selected={value === "weight"}
          icon="scale-bathroom"
          title="By Weight"
          subtitle="Place order in kilograms"
          onPress={() => onChange("weight")}
        />

        <MethodCard
          selected={value === "birds"}
          icon="food-drumstick-outline"
          title="By Birds"
          subtitle="Place order by bird count"
          onPress={() => onChange("birds")}
        />
      </View>
    </SectionCard>
  );
}

type MethodCardProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
};

function MethodCard({
  icon,
  title,
  subtitle,
  selected,
  onPress,
}: MethodCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        selected && styles.selectedCard,
      ]}
    >
      <View
        style={[
          styles.iconBox,
          selected && styles.selectedIconBox,
        ]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={selected ? "#FFFFFF" : "#F97316"}
        />
      </View>

      <Text
        style={[
          styles.title,
          selected && styles.selectedTitle,
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.subtitle,
          selected && styles.selectedSubtitle,
        ]}
      >
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },

  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    padding: 18,
  },

  selectedCard: {
    borderColor: "#F97316",
    backgroundColor: "#FFF7ED",
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  selectedIconBox: {
    backgroundColor: "#F97316",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  selectedTitle: {
    color: "#F97316",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },

  selectedSubtitle: {
    color: "#9A3412",
  },
});