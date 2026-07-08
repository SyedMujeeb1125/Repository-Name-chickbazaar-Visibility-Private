import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import OrdersStack from "./OrdersStack";
import OrderStack from "./OrderStack";
import BusinessStack from "./BusinessStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarHideOnKeyboard: true,

        tabBarActiveTintColor: "#F97316",
        tabBarInactiveTintColor: "#94A3B8",

        tabBarStyle: {
  height: 82,

  paddingTop: 10,

  paddingBottom: 18,

  borderTopWidth: 1,

  borderTopColor: "#E2E8F0",

  backgroundColor: "#FFFFFF",
},

        tabBarLabelStyle: {

  fontSize: 12,

  fontWeight: "600",

  marginBottom: 2,

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
  component={HomeStack}
/>

<Tab.Screen
  name="Orders"
  component={OrdersStack}
/>

<Tab.Screen
  name="Order"
  component={OrderStack}
/>

<Tab.Screen
  name="Business"
  component={BusinessStack}
/>

<Tab.Screen
  name="Profile"
  component={AccountStack}
/>
    </Tab.Navigator>
  );
}