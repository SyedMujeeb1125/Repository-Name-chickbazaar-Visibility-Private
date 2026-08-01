import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ProfileHome"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}