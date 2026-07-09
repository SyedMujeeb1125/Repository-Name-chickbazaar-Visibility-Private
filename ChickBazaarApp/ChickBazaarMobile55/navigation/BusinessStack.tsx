import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import OutstandingScreen from "../screens/OutstandingScreen";
import PaymentsScreen from "../screens/PaymentsScreen";
import ActivityScreen from "../screens/ActivityScreen";

const Stack =
  createNativeStackNavigator();

export default function BusinessStack() {

  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen
        name="Outstanding"
        component={OutstandingScreen}
      />

      <Stack.Screen
        name="Payments"
        component={PaymentsScreen}
      />

      <Stack.Screen
        name="Activity"
        component={ActivityScreen}
      />

    </Stack.Navigator>

  );

}
