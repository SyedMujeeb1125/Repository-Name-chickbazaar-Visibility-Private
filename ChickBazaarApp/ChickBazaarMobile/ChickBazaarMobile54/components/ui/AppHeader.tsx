import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

type Props = {
  shopName: string;
};

export default function AppHeader({
  shopName,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.welcome}>
        Welcome Back
      </Text>

      <Text style={styles.shop}>
        {shopName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    width: 220,
    height: 90,
    resizeMode: "contain",
  },

  welcome: {
    fontSize: 16,
    color: "#64748B",
  },

  shop: {
    marginTop: 6,
    fontSize: 30,
    fontWeight: "700",
    color: "#0F172A",
  },
});