import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";

import LoadingView from "../components/ui/LoadingView";

import {
  useAuth,
} from "../context/AuthContext";

export default function RootNavigator() {

  const {
    loading,
    loggedIn,
  } = useAuth();

  if (loading) {

    return <LoadingView />;

  }

  return (

    <NavigationContainer>

      {loggedIn ? (

        <MainTabNavigator />

      ) : (

        <AuthNavigator />

      )}

    </NavigationContainer>

  );

}