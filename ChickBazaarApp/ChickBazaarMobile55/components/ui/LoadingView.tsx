import React from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function LoadingView() {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <View style={styles.container}>
        <Text style={styles.title}>
          ChickBazaar
        </Text>

        <Text style={styles.subtitle}>
          Healthy Live Broiler Marketplace
        </Text>

        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size="large"
            color="#F97316"
          />

          <Text style={styles.loadingText}>
            Preparing today's live marketplace...
          </Text>
        </View>

        <Text style={styles.version}>
          Version 1.0
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: 0.3,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
  },

  loaderContainer: {
    marginTop: 42,
    alignItems: "center",
  },

  loadingText: {
    marginTop: 14,
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },

  version: {
    position: "absolute",
    bottom: 30,
    fontSize: 12,
    color: "#94A3B8",
  },
});