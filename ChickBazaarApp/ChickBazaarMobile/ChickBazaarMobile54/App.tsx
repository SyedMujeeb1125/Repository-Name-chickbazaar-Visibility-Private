import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import ProfileScreen from "./screens/ProfileScreen";

import OrderDetailsScreen from "./screens/OrderDetailsScreen";

import MyShopsScreen from "./screens/MyShopsScreen";

import AddShopScreen from "./screens/AddShopScreen";

import OutstandingScreen
from "./screens/OutstandingScreen";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import PaymentsScreen from "./screens/PaymentsScreen";

const Stack =
  createNativeStackNavigator();

export default function App() {
  const [
    initialRoute,
    setInitialRoute,
  ] = useState("Login");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    const mobile =
      await AsyncStorage.getItem(
        "retailerMobile"
      );

    if (mobile) {
      setInitialRoute(
        "Dashboard"
      );
    }

    setLoading(false);
  }

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          initialRoute
        }
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
          component={
            DashboardScreen
          }
        />

        <Stack.Screen
          name="PlaceOrder"
          component={
            PlaceOrderScreen
          }
        />

        <Stack.Screen
          name="MyOrders"
          component={
            MyOrdersScreen
          }
        />
        <Stack.Screen
  name="Profile"
  component={ProfileScreen}
/>
<Stack.Screen
  name="Outstanding"
  component={OutstandingScreen}
/>
<Stack.Screen
  name="OrderDetails"
  component={OrderDetailsScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}