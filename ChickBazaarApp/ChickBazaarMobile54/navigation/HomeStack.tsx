import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import DashboardScreen from "../screens/DashboardScreen";
import MyShopsScreen from "../screens/MyShopsScreen";
import AddShopScreen from "../screens/AddShopScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import ActivityScreen from "../screens/ActivityScreen";

const Stack =
  createNativeStackNavigator();

export default function HomeStack() {

  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
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
        name="OrderDetails"
        component={OrderDetailsScreen}
      />

      <Stack.Screen
        name="Activity"
        component={ActivityScreen}
      />

    </Stack.Navigator>

  );

}