import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen({
  navigation,
}: any) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        ChickBazaar
      </Text>

      <Text style={styles.subtitle}>
        Retailer Dashboard
      </Text>

      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Order Chicken
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            "MyOrders"
          )
        }
      >
        <Text style={styles.buttonText}>
          My Orders
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Outstanding
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  logo: {
    width: 280,
    height: 140,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#f97316",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});