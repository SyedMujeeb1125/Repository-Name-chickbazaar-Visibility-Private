import React from "react";

import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import PrimaryButton from "../ui/PrimaryButton";

import {
  getDeliveryHeader,
  getTodayDate,
  getTomorrowDate,
} from "../../utils/dateHelpers";

type Props = {
  hasOrderToday: boolean;

  deliveryStatus?: string;

  driverName?: string;

  eta?: string;

  isDelivered?: boolean;

  onPlaceOrder: () => void;

  onTrackOrder: () => void;

  onRepeatOrder?: () => void;

  onChangeQuantity?: () => void;
};

export default function DashboardHero({

  hasOrderToday,

  deliveryStatus,

  driverName,

  eta,

  onPlaceOrder,

  onTrackOrder,

}: Props) {

  const hour = new Date().getHours();

  const today = getDeliveryHeader(
    getTodayDate()
  );

  getTomorrowDate();

  const isMorning = hour < 11;

  const isTomorrow = hour >= 18;

  if (!hasOrderToday) {

    const badge = isTomorrow
      ? "TOMORROW DELIVERY"
      : "TODAY DELIVERY";

    const badgeColor = isTomorrow
      ? "#2563EB"
      : "#16A34A";

    const title = isTomorrow
  ? "BOOK FOR TOMORROW"
  : "PLACE TODAY'S ORDER";

    const subtitle = isTomorrow
      ? "Reserve tomorrow's fresh stock in advance."
      : "Fresh live broiler chicken from verified farms.";

    const featureThree = isTomorrow
      ? "Scheduled Tomorrow Delivery"
      : "Same-Day Delivery";

    const button = isTomorrow
      ? "BOOK NOW"
      : "PLACE ORDER";

    return (

      <View style={styles.card}>

        <View style={styles.heroRow}>

          <Image
            source={require("../../assets/live-broiler.png")}
            resizeMode="contain"
            style={styles.heroImage}
          />

          <View style={styles.content}>

            <View
              style={[
                styles.badge,
                {
                  borderColor: badgeColor,
                  backgroundColor:
                    badgeColor + "12",
                },
              ]}
            >

              <MaterialCommunityIcons
                name="check-decagram"
                size={14}
                color={badgeColor}
              />

              <Text
                style={[
                  styles.badgeText,
                  {
                    color: badgeColor,
                  },
                ]}
              >
                {badge}
              </Text>

            </View>

            <Text style={styles.title}>
              {title}
            </Text>

            <Text style={styles.subtitle}>
              {subtitle}
            </Text>

            <View style={styles.featureRow}>

              <MaterialCommunityIcons
                name="check-circle"
                size={18}
                color="#16A34A"
              />

              <Text style={styles.featureText}>
                Healthy Live Broiler Chicken
              </Text>

            </View>

            <View style={styles.featureRow}>

              <MaterialCommunityIcons
                name="check-circle"
                size={18}
                color="#16A34A"
              />

              <Text style={styles.featureText}>
                Farm Fresh Quality
              </Text>

            </View>

            <View style={styles.featureRow}>

              <MaterialCommunityIcons
                name="check-circle"
                size={18}
                color="#16A34A"
              />

              <Text style={styles.featureText}>
                {featureThree}
              </Text>

            </View>

            <View style={styles.buttonContainer}>

              <PrimaryButton
                title={button}
                onPress={onPlaceOrder}
                style={styles.primaryButton}
              />

            </View>

          </View>

        </View>

      </View>

    );

  }

  return (

    <View style={styles.card}>

      <View style={styles.heroRow}>

        <Image
          source={require("../../assets/live-broiler.png")}
          resizeMode="contain"
          style={styles.deliveryImage}
        />

        <View style={styles.content}>

          <View
            style={[
              styles.badge,
              {
                borderColor: "#F97316",
                backgroundColor: "#FFF7ED",
              },
            ]}
          >

            <MaterialCommunityIcons
              name="truck-check-outline"
              size={14}
              color="#F97316"
            />

            <Text
              style={[
                styles.badgeText,
                {
                  color: "#F97316",
                },
              ]}
            >
              ORDER CONFIRMED
            </Text>

          </View>

          <Text style={styles.title}>
            TODAY'S ORDER
          </Text>

          <Text style={styles.subtitle}>
            Your order is being prepared.
          </Text>

          <View style={styles.infoRow}>

            <MaterialCommunityIcons
              name="calendar-check-outline"
              size={18}
              color="#64748B"
            />

            <Text style={styles.infoLabel}>
              Delivery
            </Text>

            <Text style={styles.infoValue}>
              {today.weekday}
            </Text>

          </View>

          <View style={styles.infoRow}>

            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={18}
              color="#64748B"
            />

            <Text style={styles.infoLabel}>
              Status
            </Text>

            <Text
              style={[
                styles.infoValue,
                {
                  color: "#16A34A",
                },
              ]}
            >
              {deliveryStatus || "Confirmed"}
            </Text>

          </View>

                    <View style={styles.infoRow}>

            <MaterialCommunityIcons
              name="account-circle-outline"
              size={18}
              color="#64748B"
            />

            <Text style={styles.infoLabel}>
              Captain
            </Text>

            <Text style={styles.infoValue}>
              {driverName || "Assigning..."}
            </Text>

          </View>

          <View style={styles.infoRow}>

            <MaterialCommunityIcons
              name="clock-outline"
              size={18}
              color="#64748B"
            />

            <Text style={styles.infoLabel}>
              ETA
            </Text>

            <Text style={styles.infoValue}>
              {eta || "--"}
            </Text>

          </View>

          <View style={styles.buttonContainer}>

            <PrimaryButton
              title="TRACK ORDER"
              onPress={onTrackOrder}
              style={styles.primaryButton}
            />

          </View>

        </View>

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 28,

    paddingHorizontal: 20,

    paddingVertical: 20,

    marginBottom: 12,

    minHeight: 340,

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  heroRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  heroImage: {
    width: 130,
    height: 165,
    marginRight: 10,
  },

  deliveryImage: {
    width: 100,
    height: 130,
    marginRight: 16,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  badge: {
    flexDirection: "row",

    alignItems: "center",

    alignSelf: "flex-start",

    borderRadius: 18,

    borderWidth: 1,

    paddingHorizontal: 10,

    paddingVertical: 6,

    marginBottom: 12,
  },

  badgeText: {
    marginLeft: 6,

    fontSize: 12,

    fontWeight: "800",
  },

  title: {
  fontSize: 14,
  lineHeight: 24,
  fontWeight: "900",
  color: "#0F172A",
},

  subtitle: {
    marginTop: 8,

    marginBottom: 8,

    fontSize: 14,

    lineHeight: 21,

    color: "#64748B",
  },

  featureRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 8,
  },

  featureText: {
    marginLeft: 8,

    fontSize: 14,

    fontWeight: "600",

    color: "#334155",
  },

  infoRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 10,
  },

  infoLabel: {
    marginLeft: 8,

    flex: 1,

    fontSize: 14,

    color: "#64748B",
  },

  infoValue: {
    fontSize: 14,

    fontWeight: "800",

    color: "#0F172A",
  },

  buttonContainer: {
    marginTop: 12,
  },

  primaryButton: {
    width: "100%",
    alignSelf: "center",
  },

});