import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import OrderSuccessScreen from "../screens/OrderSuccessScreen";
import PaymentCheckoutScreen from "../screens/PaymentCheckoutScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import ReviewOrderScreen from "../screens/ReviewOrderScreen";

const Stack =
  createNativeStackNavigator();

export default function OrderStack() {

  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="PlaceOrder"
        component={PlaceOrderScreen}
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

    </Stack.Navigator>

  );

}
