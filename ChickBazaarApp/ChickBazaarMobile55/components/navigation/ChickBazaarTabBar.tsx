import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const ORANGE = "#F97316";
const GREY = "#64748B";

export default function ChickBazaarTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const getIcon = (
    routeName: string,
    focused: boolean
  ): keyof typeof MaterialCommunityIcons.glyphMap => {
    switch (routeName) {
      case "Home":
        return focused ? "home" : "home-outline";

      case "Orders":
        return focused
          ? "clipboard-text"
          : "clipboard-text-outline";

      case "PlaceOrder":
        return focused ? "cart" : "cart-outline";

      case "Business":
  return focused
    ? "briefcase"
    : "briefcase-outline";

      case "Profile":
        return focused
          ? "account-circle"
          : "account-circle-outline";

      default:
        return "circle-outline";
    }
  };

  return (
    <View style={styles.safeArea}>
      <SafeAreaView
        edges={["bottom"]}
        style={styles.safeContainer}
      >
        <View style={styles.container}>
          {state.routes.map((route, index) => {
            const focused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name as never);
              }
            };

            if (route.name === "PlaceOrder") {
              return (
                <TouchableOpacity
                  key={route.key}
                  activeOpacity={0.85}
                  style={styles.placeOrderTab}
                  onPress={onPress}
                >
                  <View style={styles.placeOrderIcon}>
                    <MaterialCommunityIcons
                      name={focused ? "cart" : "cart-outline"}
                      size={22}
                      color="#FFFFFF"
                    />
                  </View>

                  <Text
                    style={[
                      styles.placeOrderLabel,
                      focused && styles.activeLabel,
                    ]}
                  >
                    Place Order
                  </Text>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={route.key}
                style={styles.tab}
                activeOpacity={0.8}
                onPress={onPress}
              >
                <MaterialCommunityIcons
                  name={getIcon(route.name, focused)}
                  size={24}
                  color={focused ? ORANGE : GREY}
                />

                <Text
                  style={[
                    styles.label,
                    focused && styles.activeLabel,
                  ]}
                >
                  {route.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  safeArea: {
  backgroundColor: "#FFFFFF",
},

  safeContainer: {
    backgroundColor: "transparent",
  },

  container: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  height: 68,

  paddingHorizontal: 8,

  backgroundColor: "#FFFFFF",

  borderTopWidth: 1,
  borderTopColor: "#E5E7EB",

  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 6,
  shadowOffset: {
    width: 0,
    height: -2,
  },

  elevation: 8,
},

  tab: {
    flex: 1,
    height: "100%",

    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    marginTop: 3,

    fontSize: 11,

    fontWeight: "600",

    color: GREY,
  },

  activeLabel: {
    color: ORANGE,

    fontWeight: "700",
  },

  placeOrderTab: {
    flex: 1.2,

    height: "100%",

    alignItems: "center",

    justifyContent: "center",
  },

  placeOrderIcon: {
    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: ORANGE,

    alignItems: "center",

    justifyContent: "center",
  },

  placeOrderLabel: {
    marginTop: 4,

    fontSize: 11,

    fontWeight: "700",

    color: ORANGE,

    textAlign: "center",
  },
});