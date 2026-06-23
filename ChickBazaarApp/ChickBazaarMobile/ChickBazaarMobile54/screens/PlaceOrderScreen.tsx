import React, {
  useEffect,
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
  ScrollView,
} from "react-native";

export default function PlaceOrderScreen() {
  const [retailer, setRetailer] =
    useState<any>(null);

  const [
    requestedWeight,
    setRequestedWeight,
  ] = useState("");

  const [notes, setNotes] =
    useState("");

  useEffect(() => {
    loadRetailer();
  }, []);

  async function loadRetailer() {
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

  const submitOrder = async () => {
    try {
      if (!retailer) {
        Alert.alert(
          "Error",
          "Retailer profile not loaded"
        );
        return;
      }

      const formData =
        new FormData();

      formData.append(
        "orderBy",
        "weight"
      );

      formData.append(
        "shopName",
        retailer.shopName
      );

      formData.append(
        "ownerName",
        retailer.ownerName
      );

      formData.append(
        "mobile",
        retailer.mobile
      );

      formData.append(
        "email",
        retailer.email
      );

      formData.append(
        "address",
        retailer.address
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
        String(
          retailer.latitude || 0
        )
      );

      formData.append(
        "longitude",
        String(
          retailer.longitude || 0
        )
      );

      formData.append(
        "notes",
        notes
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

      {retailer && (
        <>
          <Text
            style={styles.shop}
          >
            {retailer.shopName}
          </Text>

          <Text>
            {retailer.mobile}
          </Text>
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Required Weight (Kg)"
        value={requestedWeight}
        onChangeText={
          setRequestedWeight
        }
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
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

const styles =
  StyleSheet.create({
    container: {
      padding: 20,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },

    shop: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
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