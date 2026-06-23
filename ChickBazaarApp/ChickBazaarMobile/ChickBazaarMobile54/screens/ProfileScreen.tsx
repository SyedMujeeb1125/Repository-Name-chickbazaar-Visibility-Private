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
  Alert,
} from "react-native";

export default function ProfileScreen({
  navigation,
}: any) {
  const [retailer, setRetailer] =
    useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const mobile =
      await AsyncStorage.getItem(
        "retailerMobile"
      );

    const response =
      await fetch(
        `https://www.chickbazaar.com/api/mobile/profile?mobile=${mobile}`
      );

    const data =
      await response.json();

    setRetailer(data);
  }

  async function logout() {
    await AsyncStorage.removeItem(
      "retailerMobile"
    );

    Alert.alert(
      "Success",
      "Logged Out"
    );

    navigation.replace(
      "Login"
    );
  }

  if (!retailer) {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Profile
      </Text>

      <Text>
        Shop: {retailer.shopName}
      </Text>

      <Text>
        Owner: {retailer.ownerName}
      </Text>

      <Text>
        Mobile: {retailer.mobile}
      </Text>

      <Text>
        Email: {retailer.email}
      </Text>

      <Text>
        Address: {retailer.address}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={logout}
      >
        <Text
          style={styles.buttonText}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },

    button: {
      backgroundColor: "#f97316",
      padding: 16,
      borderRadius: 8,
      marginTop: 30,
    },

    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },
  });