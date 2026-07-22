import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type LiveRateMode =
  | "today"
  | "tomorrow"
  | "publishing";

type Props = {
  mode: LiveRateMode;
  rate?: number;
};

const RATE_CONFIG = {
  today: {
    icon: "calendar-today",
    badge: "LIVE RATE",
    heading: "Today's Live Rate",
  },
  tomorrow: {
    icon: "calendar-arrow-right",
    badge: "LIVE RATE",
    heading: "Tomorrow's Live Rate",
  },
  publishing: {
    icon: "clock-outline",
    badge: "RATE UPDATE",
    heading: "Tomorrow's Live Rate",
  },
} as const;

export default function LiveRateCard({
  mode,
  rate,
}: Props) {
  const config = RATE_CONFIG[mode];

  return (
    <View style={styles.card}>
      <View style={styles.pattern1} />
      <View style={styles.pattern2} />

      <View style={styles.badge}>
        <MaterialCommunityIcons
          name={config.icon}
          size={14}
          color="#FFFFFF"
        />

        <Text style={styles.badgeText}>
          {config.badge}
        </Text>
      </View>

      {mode === "publishing" ? (
        <>
          <Text style={styles.publishHeading}>
            Tomorrow's Live Rate
          </Text>

          <Text style={styles.publishSubtitle}>
            Tomorrow's live rate will be published today at 7:00 PM.
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.heading}>
            {config.heading}
          </Text>

          <View style={styles.rateRow}>
            <Text style={styles.rate}>
              {rate != null
                ? `₹${rate.toLocaleString("en-IN")}`
                : "--"}
            </Text>

            <Text style={styles.unit}>
              /kg
            </Text>
          </View>

          {mode === "today" && (
            <View style={styles.infoContainer}>
              <Text style={styles.deliveryText}>
                Today's Delivery
              </Text>

              <Text style={styles.updatedText}>
                Updated • 7:00 PM
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    backgroundColor: "#F97316",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 1,
    minHeight: 76,
    shadowColor: "#000",
    shadowOpacity: 3,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 8,
  },

  pattern1: {
    position: "absolute",
    right: -40,
    top: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  pattern2: {
    position: "absolute",
    right: 5,
    bottom: -45,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  badgeText: {
    color: "#FFFFFF",
    marginLeft: 6,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  heading: {
    marginTop: 8,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  rateRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 4,
  },

  rate: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 30,
  },

  unit: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 5,
    marginBottom: 3,
  },

  publishHeading: {
    marginTop: 14,
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },

  publishSubtitle: {
    marginTop: 8,
    color: "#FFF7ED",
    fontSize: 16,
    fontWeight: "600",
  },

  infoContainer: {
    marginTop: 12,
  },

  deliveryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  updatedText: {
    marginTop: 4,
    color: "#FFF7ED",
    fontSize: 13,
  },
});