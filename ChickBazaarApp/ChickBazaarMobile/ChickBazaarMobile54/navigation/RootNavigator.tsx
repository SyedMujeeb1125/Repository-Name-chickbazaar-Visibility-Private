import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  NavigationContainer,
} from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";

import LoadingView from "../components/ui/LoadingView";

export default function RootNavigator() {

  const [loading, setLoading] =
    useState(true);

  const [loggedIn, setLoggedIn] =
    useState(false);

  useEffect(() => {

    checkLogin();

  }, []);

  async function checkLogin() {

    try {

      const mobile =
        await AsyncStorage.getItem(
          "retailerMobile"
        );

      setLoggedIn(!!mobile);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

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