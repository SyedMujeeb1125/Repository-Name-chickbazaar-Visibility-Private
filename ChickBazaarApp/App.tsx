import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <Text style={styles.logo}>
          🐔 ChickBazaar
        </Text>

        <Text style={styles.tagline}>
          Fresh Live Chicken Marketplace
        </Text>

        <Text style={styles.footer}>
          Powered by ChickBazaar.com
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  logo: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 15,
  },

  tagline: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },

  footer: {
    position: "absolute",
    bottom: 40,
    color: "#999",
  },
});