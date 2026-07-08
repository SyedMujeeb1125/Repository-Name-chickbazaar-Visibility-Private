import React, {
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function AddShopScreen({
  navigation,
}: any) {
  const [shopName, setShopName] =
    useState("");

  const [address, setAddress] =
    useState("");

  async function saveShop() {
    try {
      const mobile =
        await AsyncStorage.getItem(
          "retailerMobile"
        );

      const response =
        await fetch(
          "https://www.chickbazaar.com/api/mobile/add-shop",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              mobile,
              ownerName:
                "Retailer",
              shopName,
              address,
            }),
          }
        );

      const data =
        await response.json();

      if (data.success) {
        Alert.alert(
          "Success",
          "Shop Added"
        );

        navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        String(error)
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Add Shop
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Shop Name"
        value={shopName}
        onChangeText={
          setShopName
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={
          setAddress
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveShop}
      >
        <Text
          style={styles.buttonText}
        >
          Save Shop
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
      backgroundColor:
        "#fff",
    },

    title: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 20,
    },

    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 14,
      marginBottom: 12,
    },

    button: {
      backgroundColor:
        "#F97316",
      padding: 16,
      borderRadius: 10,
    },

    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "700",
    },
  });