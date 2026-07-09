import React from "react";

import {
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";

import LoadingView from "../components/ui/LoadingView";

import {
  useAuth,
} from "../context/AuthContext";

const ChickBazaarTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function RootNavigator() {

  const {
    loading,
    loggedIn,
  } = useAuth();

  if (loading) {

    return <LoadingView />;

  }

  return (

    <NavigationContainer
  theme={ChickBazaarTheme}
>

      {loggedIn ? (

        <MainTabNavigator />

      ) : (

        <AuthNavigator />

      )}

    </NavigationContainer>

  );

}
