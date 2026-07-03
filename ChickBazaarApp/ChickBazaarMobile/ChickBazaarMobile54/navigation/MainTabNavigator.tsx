import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import DashboardScreen from "../screens/DashboardScreen";
import MyOrdersScreen from "../screens/MyOrdersScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import OutstandingScreen from "../screens/OutstandingScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#F97316",
        tabBarInactiveTintColor: "#94A3B8",

        tabBarStyle: {
          height: 68,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarIcon: ({ color, size }) => {
          let icon:
            keyof typeof MaterialCommunityIcons.glyphMap = "home";

          switch (route.name) {
            case "Home":
              icon = "home";
              break;

            case "Orders":
              icon = "clipboard-list";
              break;

            case "Order":
              icon = "plus-circle";
              break;

            case "Business":
              icon = "finance";
              break;

            case "Profile":
              icon = "account-circle";
              break;
          }

          return (
            <MaterialCommunityIcons
              name={icon}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
      />

      <Tab.Screen
        name="Orders"
        component={MyOrdersScreen}
      />

      <Tab.Screen
        name="Order"
        component={PlaceOrderScreen}
      />

      <Tab.Screen
        name="Business"
        component={OutstandingScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}