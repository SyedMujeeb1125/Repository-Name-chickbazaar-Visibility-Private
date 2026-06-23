import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function LoginScreen({
  navigation,
}: any) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logoImage}
      />

      <Text style={styles.logo}>
        ChickBazaar
      </Text>

      <Text style={styles.title}>
        Retailer Login
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("Register")
        }
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },

  logoImage: {
    width: 280,
    height: 140,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },

  logo: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#f97316",
    padding: 16,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});