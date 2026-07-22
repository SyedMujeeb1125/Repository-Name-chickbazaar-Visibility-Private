import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import OrderSuccessScreen from "../screens/OrderSuccessScreen";
import PaymentCheckoutScreen from "../screens/PaymentCheckoutScreen";
import PlaceOrderScreenV2 from "../screens/PlaceOrderScreenV2";

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

    </Stack.Navigator>

  );

}
