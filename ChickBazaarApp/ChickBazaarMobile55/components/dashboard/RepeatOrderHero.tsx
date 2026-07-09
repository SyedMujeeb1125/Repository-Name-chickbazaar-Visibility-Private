import React from "react";

import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryButton from "../ui/PrimaryButton";

type Props = {

  weight: number;

  rate: number;

  amount: number;

  deliveredAt?: string;

  loading?: boolean;

  onRepeat: () => void;

  onChangeQuantity: () => void;

};

export default function RepeatOrderHero({

  weight,

  rate,

  amount,

  deliveredAt,

  loading = false,

  onRepeat,

  onChangeQuantity,

}: Props) {

  const date =
    deliveredAt
      ? new Date(deliveredAt)
      : new Date();

  const weekday =
    date.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
      }
    );

  const formattedDate =
    date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  return (

    <View style={styles.card}>

      <Image
        source={require("../../assets/live-broiler.png")}
        resizeMode="contain"
        style={styles.chicken}
      />

      <View style={styles.content}>

        <View style={styles.badge}>

          <MaterialCommunityIcons
            name="star-circle"
            size={16}
            color="#F97316"
          />

          <Text style={styles.badgeText}>
            RECOMMENDED FOR TODAY
          </Text>

        </View>

        <Text style={styles.title}>
          Order Again
        </Text>

        <Text style={styles.date}>
          {weekday}
        </Text>

        <Text style={styles.subDate}>
          {formattedDate}
        </Text>

        <View style={styles.summaryCard}>

          <View style={styles.summaryRow}>

            <Text style={styles.label}>
              Recommended Weight
            </Text>

            <Text style={styles.value}>
              {weight} KG
            </Text>

          </View>

          <View style={styles.summaryRow}>

            <Text style={styles.label}>
              Today's Rate
            </Text>

            <Text style={styles.value}>
              ₹{rate}/kg
            </Text>

          </View>

          <View style={styles.summaryRow}>

            <Text style={styles.label}>
              Estimated Amount
            </Text>

            <Text style={styles.amount}>
              ₹{amount.toLocaleString("en-IN")}
            </Text>

          </View>

        </View>

        <View style={styles.recommendationRow}>

          <MaterialCommunityIcons
            name="check-decagram"
            size={18}
            color="#16A34A"
          />

          <Text style={styles.recommendationText}>
            Based on your previous successful delivery.
          </Text>

        </View>

        <View style={styles.buttonContainer}>

          <PrimaryButton
  title={
    loading
      ? "PLACING ORDER..."
      : "ORDER NOW"
  }
  loading={loading}
  disabled={loading}
  onPress={onRepeat}
/>

        </View>

        <PrimaryButton
          title="CHANGE QUANTITY"
          variant="outline"
          onPress={onChangeQuantity}
        />

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  card: {

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 18,

    flexDirection: "row",

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 16,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,

  },

  chicken: {

    width: 95,

    height: 120,

    marginRight: 16,

    alignSelf: "center",

  },

  content: {

    flex: 1,

  },

  badge: {

    flexDirection: "row",

    alignItems: "center",

    alignSelf: "flex-start",

    backgroundColor: "#FFF7ED",

    borderRadius: 20,

    paddingHorizontal: 10,

    paddingVertical: 5,

  },

  badgeText: {

    marginLeft: 6,

    color: "#F97316",

    fontSize: 11,

    fontWeight: "800",

  },

  title: {

    marginTop: 12,

    fontSize: 22,

    fontWeight: "900",

    color: "#0F172A",

  },

  date: {

    marginTop: 6,

    fontSize: 15,

    fontWeight: "700",

    color: "#334155",

  },

  subDate: {

    marginTop: 2,

    fontSize: 13,

    color: "#64748B",

  },

  summaryCard: {

    marginTop: 18,

    backgroundColor: "#FFF7ED",

    borderRadius: 18,

    padding: 14,

  },

  summaryRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 12,

  },

  label: {

    fontSize: 14,

    color: "#64748B",

  },

  value: {

    fontSize: 15,

    fontWeight: "800",

    color: "#0F172A",

  },

  amount: {

    fontSize: 20,

    fontWeight: "900",

    color: "#F97316",

  },

  recommendationRow: {

    flexDirection: "row",

    alignItems: "center",

    marginTop: 18,

  },

  recommendationText: {

    marginLeft: 8,

    flex: 1,

    fontSize: 13,

    color: "#475569",

    fontWeight: "600",

    lineHeight: 18,

  },

  buttonContainer: {

    marginTop: 22,

    marginBottom: 12,

  },

});