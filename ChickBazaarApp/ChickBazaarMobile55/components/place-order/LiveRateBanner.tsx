import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  rate: number;
};

export default function LiveRateBanner({ rate }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <View style={styles.titleRow}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons
              name="chart-line"
              size={20}
              color="#F97316"
            />
          </View>

          <View>
            <Text style={styles.title}>
              Today's Live Rate
            </Text>

            <Text style={styles.subtitle}>
              Updated today
            </Text>
          </View>
        </View>

        <View style={styles.liveBadge}>
          <View style={styles.dot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>

      </View>

      <View style={styles.rateRow}>
        <Text style={styles.rate}>
          ₹{rate.toLocaleString()}
        </Text>

        <Text style={styles.unit}>
          /kg
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 20,

    marginBottom: 18,

    borderWidth: 1,

    borderColor: "#E2E8F0",

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 4,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  titleRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  iconBox: {
    width: 44,

    height: 44,

    borderRadius: 14,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",

    alignItems: "center",

    marginRight: 12,
  },

  title: {
    fontSize: 16,

    fontWeight: "700",

    color: "#0F172A",
  },

  subtitle: {
    marginTop: 3,

    color: "#64748B",

    fontSize: 13,
  },

  liveBadge: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#ECFDF5",

    paddingHorizontal: 10,

    paddingVertical: 6,

    borderRadius: 20,
  },

  dot: {
    width: 8,

    height: 8,

    borderRadius: 4,

    backgroundColor: "#22C55E",

    marginRight: 6,
  },

  liveText: {
    color: "#15803D",

    fontWeight: "700",

    fontSize: 12,
  },

  rateRow: {
    flexDirection: "row",

    alignItems: "flex-end",

    marginTop: 22,
  },

  rate: {
    fontSize: 42,

    fontWeight: "800",

    color: "#0F172A",
  },

  unit: {
    marginLeft: 6,

    marginBottom: 7,

    color: "#64748B",

    fontSize: 18,

    fontWeight: "600",
  },

});