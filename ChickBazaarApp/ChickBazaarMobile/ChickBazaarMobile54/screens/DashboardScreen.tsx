import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

export default function DashboardScreen({
  navigation,
}: any) {
  const [dashboard, setDashboard] =
    useState<any>(null);

  useEffect(() => {
  loadDashboard();

  const timer =
    setInterval(() => {
      loadDashboard();
    }, 30000);

  return () =>
    clearInterval(timer);
}, []);

  async function loadDashboard() {
    const mobile =
      await AsyncStorage.getItem(
        "retailerMobile"
      );

    const response =
      await fetch(
        `https://www.chickbazaar.com/api/mobile/dashboard?mobile=${mobile}`
      );

    const data =
      await response.json();

    setDashboard(data);
  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        Welcome
      </Text>

      <Text style={styles.shopName}>
        {dashboard?.shopName ||
          "Retailer"}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          Total Orders
        </Text>

        <Text style={styles.cardValue}>
          {dashboard?.totalOrders ||
            0}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          Pending Orders
        </Text>

        <Text style={styles.cardValue}>
          {dashboard?.pendingOrders ||
            0}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>
          Available Credit
        </Text>

        <Text style={styles.cardValue}>
          ₹
          {(
            dashboard?.availableCredit ||
            0
          ).toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            "PlaceOrder"
          )
        }
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
        onPress={() =>
          navigation.navigate(
            "Outstanding"
          )
        }
      >
        <Text style={styles.buttonText}>
          Outstanding
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(
            "Profile"
          )
        }
      >
        <Text style={styles.buttonText}>
          Profile
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },

  logo: {
    width: 250,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  shopName: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },

  cardLabel: {
    color: "#666",
    fontSize: 14,
  },

  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
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