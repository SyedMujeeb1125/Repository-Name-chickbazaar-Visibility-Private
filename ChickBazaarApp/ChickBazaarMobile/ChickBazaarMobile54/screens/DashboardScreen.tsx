import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function DashboardScreen({
  navigation,
}: any) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        Welcome to ChickBazaar
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("PlaceOrder")
        }
      >
        <Text style={styles.buttonText}>
          Order Chicken
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("MyOrders")
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
    backgroundColor: "#fff",
  },

  logo: {
    width: 250,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
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
  },
});