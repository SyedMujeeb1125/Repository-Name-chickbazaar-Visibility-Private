import React from "react";

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


type Props = {
  shopName: string;

  address?: string;

  notificationCount?: number;

  orderStatus?:
    | "regular"
    | "express"
    | "tomorrow";

  onMenuPress?: () => void;

  onNotificationPress?: () => void;
};

export default function DashboardHeader({

  shopName,

  address = "HSR Layout, Bangalore",

  notificationCount = 3,

  orderStatus = "regular",

  onMenuPress,

  onNotificationPress,

}: Props) {

  const hour =
    new Date().getHours();

  let greeting =
    "Good Evening";

  let emoji = "🌙";

  if (hour < 12) {

    greeting = "Good Morning";

    emoji = "🌅";

  }

  else if (hour < 17) {

    greeting =
      "Good Afternoon";

    emoji = "☀️";

  }

  let statusColor =
    "#16A34A";

  let statusBackground =
    "#ECFDF5";

  let statusIcon =
    "check-decagram";

  let statusTitle =
    "Regular Orders Open";

  let statusMessage =
    "Delivery slots available";

  if (
    orderStatus ===
    "express"
  ) {

    statusColor =
      "#F97316";

    statusBackground =
      "#FFF7ED";

    statusIcon =
      "lightning-bolt";

    statusTitle =
      "Express Orders Open";

    statusMessage =
      "Additional delivery charges may apply";

  }

  if (
    orderStatus ===
    "tomorrow"
  ) {

    statusColor =
      "#2563EB";

    statusBackground =
      "#EFF6FF";

    statusIcon =
      "calendar-clock";

    statusTitle =
      "Tomorrow Orders";

    statusMessage =
      "Book now for preferred delivery";

  }

  return (

  <View style={styles.container}>

    <View style={styles.topRow}>

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.circleButton}
        onPress={onMenuPress}
      >
        <MaterialCommunityIcons
          name="menu"
          size={26}
          color="#0F172A"
        />
      </TouchableOpacity>

      <Image
        source={require("../../assets/logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.circleButton}
        onPress={onNotificationPress}
      >
        <MaterialCommunityIcons
          name="bell-outline"
          size={25}
          color="#0F172A"
        />
      </TouchableOpacity>

    </View>

  </View>

);

}
const styles = StyleSheet.create({

  container: {
    marginBottom: 20,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  logo: {
    width: 170,
    height: 56,
  },

  circleButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  badge: {
    position: "absolute",
    right: 8,
    top: 8,

    minWidth: 20,
    height: 20,

    borderRadius: 10,

    backgroundColor: "#F97316",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  greeting: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },

  shopName: {
    marginTop: 4,
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  location: {
    marginLeft: 6,
    fontSize: 16,
    color: "#64748B",
    flex: 1,
  },

  statusCard: {
    marginTop: 18,

    borderRadius: 18,

    paddingVertical: 14,
    paddingHorizontal: 16,

    flexDirection: "row",

    alignItems: "center",

    borderWidth: 1,

    borderColor: "#E2E8F0",
  },

  statusTextContainer: {
    marginLeft: 12,
    flex: 1,
  },

  statusTitle: {
    fontSize: 15,
    fontWeight: "800",
  },

  statusMessage: {
    marginTop: 3,
    fontSize: 13,
    color: "#64748B",
    lineHeight: 18,
  },

});
