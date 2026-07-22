import React from "react";

import { StatusBar } from "expo-status-bar";

import {
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";

import LoadingView from "../components/ui/LoadingView";

import { useAuth } from "../context/AuthContext";

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

export default function RootNavigator() {
  const { loading, loggedIn } = useAuth();

  if (loading) {
    return <LoadingView />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar
        style="dark"
        translucent
        backgroundColor="transparent"
      />

      {loggedIn ? (
        <MainTabNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}