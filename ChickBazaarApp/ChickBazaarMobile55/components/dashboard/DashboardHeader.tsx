import React from "react";

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  shopName: string;
  address?: string;
  notificationCount?: number;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardHeader({
  shopName,
  address,
  notificationCount = 0,
  onMenuPress,
  onNotificationPress,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity
  activeOpacity={0.85}
  style={styles.circleButton}
  onPress={onMenuPress}
  accessibilityRole="button"
  accessibilityLabel="Open menu"
>
          <MaterialCommunityIcons
            name="menu"
            size={28}
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
  accessibilityRole="button"
  accessibilityLabel="Open notifications"
>
          <MaterialCommunityIcons
            name="bell-outline"
            size={27}
            color="#0F172A"
          />

          {notificationCount > 0 && (
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text
  numberOfLines={1}
  adjustsFontSizeToFit
  minimumFontScale={0.85}
  style={styles.shopName}
>
  👋 Hi, {shopName}
</Text>

        {!!address && (
          <View style={styles.locationRow}>
            <MaterialCommunityIcons
              name="map-marker"
              size={16}
              color="#F97316"
            />

            <Text
              numberOfLines={1}
              style={styles.location}
            >
              {address}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: 175,
    height: 60,
  },

  circleButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  badge: {
    position: "absolute",
    right: 14,
    top: 14,
  },

  badgeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F97316",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  content: {
  marginTop: 4,
  paddingHorizontal: 2,
},

  greeting: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
  },

  shopName: {
  fontSize: 22,
  fontWeight: "800",
  color: "#0F172A",
  letterSpacing: -0.3,
},

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  location: {
    marginLeft: 6,
    flex: 1,
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
});