import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import MyOrdersScreen from "../screens/MyOrdersScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";

const Stack =
  createNativeStackNavigator();

export default function OrdersStack() {

  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="MyOrders"
        component={MyOrdersScreen}
      />

      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
      />

    </Stack.Navigator>

  );

}
