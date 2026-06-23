import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
        />

        <Stack.Screen
          name="PlaceOrder"
          component={PlaceOrderScreen}
        />

        <Stack.Screen
          name="MyOrders"
          component={MyOrdersScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}