import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
      if (!requestedWeight) {
        Alert.alert(
          "Error",
          "Please enter required weight"
        );
        return;
      }

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
        "Order Placed",
        data.orderNumber ||
          "Order submitted successfully"
      );

      setRequestedWeight("");
      setNotes("");
    } catch (error: any) {
      Alert.alert(
        "Error",
        String(error)
      );
    }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={
            styles.container
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={
            false
          }
        >
          <Text style={styles.title}>
            Order Chicken
          </Text>

          {retailer && (
            <View
              style={
                styles.retailerCard
              }
            >
              <Text
                style={
                  styles.shopName
                }
              >
                {retailer.shopName}
              </Text>

              <Text
                style={
                  styles.shopInfo
                }
              >
                👤{" "}
                {retailer.ownerName}
              </Text>

              <Text
                style={
                  styles.shopInfo
                }
              >
                📱{" "}
                {retailer.mobile}
              </Text>
            </View>
          )}

          <View
            style={styles.card}
          >
            <Text
              style={
                styles.label
              }
            >
              Required Weight
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter weight in KG"
              value={
                requestedWeight
              }
              onChangeText={
                setRequestedWeight
              }
              keyboardType="numeric"
            />

            <Text
              style={[
                styles.label,
                {
                  marginTop: 10,
                },
              ]}
            >
              Notes
            </Text>

            <TextInput
              style={
                styles.notesInput
              }
              placeholder="Any delivery instructions?"
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={
                setNotes
              }
            />
          </View>

          <TouchableOpacity
            style={
              styles.button
            }
            onPress={
              submitOrder
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Place Order
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor:
        "#F8FAFC",
    },

    container: {
      padding: 20,
      paddingBottom: 40,
    },

    title: {
      fontSize: 30,
      fontWeight: "700",
      color: "#0F172A",
      marginBottom: 20,
    },

    retailerCard: {
      backgroundColor:
        "#F97316",
      borderRadius: 20,
      padding: 20,
      marginBottom: 18,
    },

    shopName: {
      color: "#FFF",
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 8,
    },

    shopInfo: {
      color: "#FFF",
      fontSize: 15,
      marginBottom: 4,
    },

    card: {
      backgroundColor:
        "#FFF",
      borderRadius: 18,
      padding: 18,
      elevation: 2,
      marginBottom: 20,
    },

    label: {
      fontSize: 15,
      fontWeight: "600",
      color: "#334155",
      marginBottom: 8,
    },

    input: {
      backgroundColor:
        "#F8FAFC",
      borderWidth: 1,
      borderColor:
        "#E2E8F0",
      borderRadius: 14,
      padding: 16,
      fontSize: 16,
    },

    notesInput: {
      backgroundColor:
        "#F8FAFC",
      borderWidth: 1,
      borderColor:
        "#E2E8F0",
      borderRadius: 14,
      padding: 16,
      minHeight: 100,
      textAlignVertical:
        "top",
    },

    button: {
      backgroundColor:
        "#F97316",
      borderRadius: 16,
      padding: 18,
    },

    buttonText: {
      color: "#FFF",
      textAlign: "center",
      fontWeight: "700",
      fontSize: 16,
    },
  });