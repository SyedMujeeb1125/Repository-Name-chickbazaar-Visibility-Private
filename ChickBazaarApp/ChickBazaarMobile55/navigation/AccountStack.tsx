import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import ActivityScreen from "../screens/ActivityScreen";
import AddShopScreen from "../screens/AddShopScreen";
import MyShopsScreen from "../screens/MyShopsScreen";
import ProfileScreen from "../screens/ProfileScreen";

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
  name="ProfileHome"
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
