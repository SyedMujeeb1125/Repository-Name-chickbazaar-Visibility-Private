import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import MyShopsScreen from "../screens/MyShopsScreen";
import AddShopScreen from "../screens/AddShopScreen";
import ActivityScreen from "../screens/ActivityScreen";

const Stack =
  createNativeStackNavigator();

export default function AccountStack() {

  return (

    <Stack.Navigator
      screenOptions={{
        headerShown:false,
      }}
    >

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
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
        name="Activity"
        component={ActivityScreen}
      />

    </Stack.Navigator>

  );

}