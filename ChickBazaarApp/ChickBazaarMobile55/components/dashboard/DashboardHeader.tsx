import React from "react";

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
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
    marginBottom: 8,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: 182,
    height: 70,
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

});