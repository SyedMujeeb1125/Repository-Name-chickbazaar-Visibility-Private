import React from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  onRequest: () => void;
};

export default function AdditionalStockCard({
  onRequest,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <MaterialCommunityIcons
          name="truck-plus-outline"
          size={16}
          color="#F97316"
        />

        <Text style={styles.badgeText}>
          ADDITIONAL STOCK
        </Text>
      </View>

      <Text style={styles.title}>
        Need More Chicken Today?
      </Text>

      <Text style={styles.subtitle}>
  Need additional healthy live broiler chicken after placing today's order? Submit a request, and we'll check farm inventory, vehicle availability, and delivery schedules before confirming.
</Text>

      <View style={styles.highlightCard}>
        <MaterialCommunityIcons
          name="warehouse"
          size={22}
          color="#F97316"
        />

        <View style={styles.highlightContent}>
          <Text style={styles.highlightTitle}>
            Subject to Availability
          </Text>

          <Text style={styles.highlightText}>
            Approval depends on farm inventory, vehicle capacity, and delivery schedule.
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        <MaterialCommunityIcons
          name="clock-outline"
          size={18}
          color="#2563EB"
        />

        <Text style={styles.infoText}>
          Requests are reviewed by our operations team, and you'll be notified once they're approved.
        </Text>
      </View>

      <PrimaryButton
        title="REQUEST ADDITIONAL STOCK"
        onPress={onRequest}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 22,

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,
  },

  badge: {
    flexDirection: "row",

    alignItems: "center",

    alignSelf: "flex-start",

    backgroundColor: "#FFF7ED",

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 20,
  },

  badgeText: {
    marginLeft: 6,

    color: "#EA580C",

    fontWeight: "800",

    fontSize: 12,
  },

  title: {
    marginTop: 18,

    fontSize: 28,

    fontWeight: "900",

    color: "#0F172A",
  },

  subtitle: {
    marginTop: 8,

    color: "#64748B",

    fontSize: 15,

    lineHeight: 24,
  },

  highlightCard: {
    flexDirection: "row",

    alignItems: "flex-start",

    marginTop: 22,

    backgroundColor: "#FFF7ED",

    borderRadius: 18,

    padding: 18,
  },

  highlightContent: {
    flex: 1,

    marginLeft: 12,
  },

  highlightTitle: {
    color: "#9A3412",

    fontSize: 15,

    fontWeight: "800",
  },

  highlightText: {
    marginTop: 4,

    color: "#7C2D12",

    fontSize: 13,

    lineHeight: 20,
  },

  info: {
    flexDirection: "row",

    marginTop: 18,

    backgroundColor: "#EFF6FF",

    borderRadius: 14,

    padding: 12,
  },

  infoText: {
    flex: 1,

    marginLeft: 8,

    color: "#1E3A8A",

    fontSize: 13,

    lineHeight: 20,
  },

  button: {
    marginTop: 22,
  },
});