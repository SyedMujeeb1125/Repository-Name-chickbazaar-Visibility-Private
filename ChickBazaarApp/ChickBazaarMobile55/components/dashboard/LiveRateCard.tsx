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
  yesterdayRate?: number;
};

const RATE_CONFIG = {
  today: {
    icon: "calendar-today",
    badge: "LIVE RATE",
  },
  tomorrow: {
    icon: "calendar-arrow-right",
    badge: "LIVE RATE",
  },
  publishing: {
    icon: "clock-outline",
    badge: "RATE UPDATE",
  },
} as const;

export default function LiveRateCard({
  mode,
  rate,
  yesterdayRate,
}: Props) {
  const config = RATE_CONFIG[mode];

  const difference =
    rate != null && yesterdayRate != null
      ? rate - yesterdayRate
      : null;

  const isHigher = difference != null && difference > 0;
  const isLower = difference != null && difference < 0;
  const isSame = difference === 0;

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
            Tomorrow's Broiler Rate
          </Text>

          <Text style={styles.publishSubtitle}>
            Tomorrow's rate will be published today at 7:00 PM.
          </Text>
        </>
      ) : (
        <View style={styles.contentRow}>
          {/* LEFT */}
          <View style={styles.leftSection}>
            <Text style={styles.heading}>
              {mode === "today"
                ? "Today's Broiler Rate"
                : "Tomorrow's Broiler Rate"}
            </Text>

            <View style={styles.rateRow}>
              <Text style={styles.rate}>
                {rate != null
                  ? `₹${rate.toLocaleString("en-IN")}`
                  : "--"}
              </Text>

              <Text style={styles.unit}>/kg</Text>
            </View>

            <Text style={styles.updateText}>
              Price updates daily at 7:00 PM
            </Text>
          </View>

          <View style={styles.divider} />

          {/* RIGHT */}
          <View style={styles.rightSection}>
            <Text style={styles.compareLabel}>
              vs Yesterday
            </Text>

            {difference == null ? (
              <>
                <Text style={styles.compareValue}>
                  --
                </Text>

                <Text style={styles.compareStatus}>
                  Awaiting comparison
                </Text>
              </>
            ) : (
              <>
                <View style={styles.compareRow}>
                  <MaterialCommunityIcons
                    name={
                      isHigher
                        ? "arrow-up-bold"
                        : isLower
                        ? "arrow-down-bold"
                        : "minus"
                    }
                    size={18}
                    color="#FFFFFF"
                  />

                  <Text style={styles.compareValue}>
                    ₹{Math.abs(difference)}
                  </Text>
                </View>

                <Text style={styles.compareStatus}>
                  {isHigher
                    ? "Higher than yesterday"
                    : isLower
                    ? "Lower than yesterday"
                    : "No Change"}
                </Text>
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    backgroundColor: "#F97316",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 2,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 6,
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
    right: 0,
    bottom: -40,
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
    letterSpacing: 0.5,
  },

  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  leftSection: {
    flex: 1,
  },

  divider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: "rgba(255,255,255,0.20)",
    marginHorizontal: 16,
  },

  rightSection: {
    width: 105,
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 2,
  },

  rateRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  rate: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 34,
  },

  unit: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 4,
    marginBottom: 4,
  },

  updateText: {
    marginTop: 4,
    color: "#FFF7ED",
    fontSize: 11,
    lineHeight: 15,
  },

  compareLabel: {
    color: "#FFE7D1",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 6,
  },

  compareRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  compareValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    marginLeft: 2,
  },

  compareStatus: {
    marginTop: 4,
    color: "#FFF7ED",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 15,
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
    fontSize: 15,
    lineHeight: 22,
  },
});