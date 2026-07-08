import React from "react";
import { LogBox } from "react-native";

LogBox.ignoreLogs([]);

const oldError = console.error;

console.error = (...args) => {
  oldError(...args);
  console.trace("TRACE");
};

import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/AuthContext";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}