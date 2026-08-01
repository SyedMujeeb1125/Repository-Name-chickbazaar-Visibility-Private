import React from "react";

import { StatusBar } from "expo-status-bar";

import {
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";

import LoadingView from "../components/ui/LoadingView";

import { useAuth } from "../context/AuthContext";

import OrderSuccessScreen from "../screens/OrderSuccessScreen";
import PaymentCheckoutScreen from "../screens/PaymentCheckoutScreen";
import PlaceOrderScreenV2 from "../screens/PlaceOrderScreenV2";
import ReviewOrderScreen from "../screens/ReviewOrderScreen";

import ActivityScreen from "../screens/ActivityScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import OrderTrackingScreen from "../screens/OrderTrackingScreen";
import PaymentsScreen from "../screens/PaymentsScreen";

import AddShopScreen from "../screens/AddShopScreen";
import MyShopsScreen from "../screens/MyShopsScreen";
import ScheduledOrdersScreen from "../screens/ScheduledOrdersScreen";

const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F8FAFC",
  },
};

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Bottom Tabs */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
      />

      {/* Order Flow */}
      <Stack.Screen
        name="PlaceOrderV2"
        component={PlaceOrderScreenV2}
      />

      <Stack.Screen
        name="ReviewOrder"
        component={ReviewOrderScreen}
      />

      <Stack.Screen
        name="PaymentCheckout"
        component={PaymentCheckoutScreen}
      />

      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccessScreen}
      />

      {/* Common Screens */}
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
      />

      <Stack.Screen
  name="OrderTracking"
  component={OrderTrackingScreen}
/>

      <Stack.Screen
        name="Activity"
        component={ActivityScreen}
      />

      <Stack.Screen
        name="Payments"
        component={PaymentsScreen}
      />

      <Stack.Screen
        name="MyShops"
        component={MyShopsScreen}
      />

      <Stack.Screen
        name="AddShop"
        component={AddShopScreen}
      />

      <Stack.Screen
        name="ScheduledOrders"
        component={ScheduledOrdersScreen}
      />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { loading, loggedIn } = useAuth();

  if (loading) {
    return <LoadingView />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar
        style="dark"
        translucent
        backgroundColor="transparent"
      />

      {loggedIn ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}