import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountStack from "./AccountStack";
import BusinessStack from "./BusinessStack";
import HomeStack from "./HomeStack";
import OrdersStack from "./OrdersStack";
import OrderStack from "./OrderStack";

import ChickBazaarTabBar from "../components/navigation/ChickBazaarTabBar";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <ChickBazaarTabBar {...props} />
      )}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
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