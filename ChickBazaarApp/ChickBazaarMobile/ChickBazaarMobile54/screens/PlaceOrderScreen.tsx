import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

export default function PlaceOrderScreen() {
  const [shopName, setShopName] =
    useState("");

  const [ownerName, setOwnerName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [requestedWeight, setRequestedWeight] =
    useState("");

  const submitOrder = async () => {
    try {
      const formData = new FormData();

      formData.append(
        "orderBy",
        "weight"
      );

      formData.append(
        "shopName",
        shopName
      );

      formData.append(
        "ownerName",
        ownerName
      );

      formData.append(
        "mobile",
        mobile
      );

      formData.append(
        "email",
        email
      );

      formData.append(
        "address",
        address
      );

      formData.append(
        "requestedWeight",
        requestedWeight
      );

      formData.append(
        "paymentType",
        "advance"
      );

      formData.append(
        "deliveryDate",
        new Date()
          .toISOString()
          .split("T")[0]
      );

      formData.append(
        "latitude",
        "12.9716"
      );

      formData.append(
        "longitude",
        "77.5946"
      );

      formData.append(
        "notes",
        "Mobile App Order"
      );

      const response =
        await fetch(
          "https://www.chickbazaar.com/api/orders",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      Alert.alert(
        "Success",
        JSON.stringify(data)
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        String(error)
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Text style={styles.title}>
        Order Chicken
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Shop Name"
        value={shopName}
        onChangeText={setShopName}
      />

      <TextInput
        style={styles.input}
        placeholder="Owner Name"
        value={ownerName}
        onChangeText={setOwnerName}
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Required Weight (Kg)"
        value={requestedWeight}
        onChangeText={
          setRequestedWeight
        }
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={submitOrder}
      >
        <Text
          style={styles.buttonText}
        >
          Place Order
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#f97316",
    padding: 16,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});