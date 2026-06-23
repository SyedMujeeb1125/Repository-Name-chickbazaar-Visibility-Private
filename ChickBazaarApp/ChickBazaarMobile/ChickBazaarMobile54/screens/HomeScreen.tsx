import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        ChickBazaar
      </Text>

      <Text>
        Fresh Live Chicken Marketplace
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  logo: {
    width: 280,
    height: 140,
    resizeMode: "contain",
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});