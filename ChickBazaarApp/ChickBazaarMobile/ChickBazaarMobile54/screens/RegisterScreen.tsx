import React, { useState } from "react";

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
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function RegisterScreen({
  navigation,
}: any) {
  const [shopName, setShopName] =
    useState("");

  const [ownerName, setOwnerName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [email, setEmail] =
    useState("");

  const submit = async () => {
    try {
      const response = await fetch(
        "https://www.chickbazaar.com/api/mobile/register-retailer",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            shopName,
            ownerName,
            mobile,
            email,
          }),
        }
      );

      const data =
        await response.json();

      if (!data.success) {
        Alert.alert(
          "Error",
          "Registration Failed"
        );
        return;
      }

      await AsyncStorage.setItem(
  "retailerMobile",
  mobile
);

Alert.alert(
  "Success",
  "Retailer Registered Successfully",
  [
    {
      text: "OK",
      onPress: () =>
        navigation.navigate(
          "Dashboard"
        ),
    },
  ]
);
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
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoImage}
          />

          <View style={styles.card}>
            <Text
              style={styles.title}
            >
              Retailer Registration
            </Text>

            <Text
              style={
                styles.subtitle
              }
            >
              Register your shop and
              start ordering from
              ChickBazaar
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
              placeholder="Owner Name"
              value={ownerName}
              onChangeText={
                setOwnerName
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              maxLength={10}
              value={mobile}
              onChangeText={
                setMobile
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={
                setEmail
              }
            />

            <TouchableOpacity
              style={
                styles.button
              }
              onPress={submit}
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
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
      flexGrow: 1,
      justifyContent:
        "center",
      padding: 24,
    },

    logoImage: {
      width: 220,
      height: 100,
      resizeMode: "contain",
      alignSelf: "center",
      marginBottom: 20,
    },

    card: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 24,
      padding: 24,
      elevation: 4,
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
      textAlign: "center",
      color: "#0F172A",
    },

    subtitle: {
      textAlign: "center",
      color: "#64748B",
      marginTop: 8,
      marginBottom: 24,
      fontSize: 14,
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
      marginBottom: 14,
    },

    button: {
      backgroundColor:
        "#F97316",
      padding: 16,
      borderRadius: 14,
      marginTop: 10,
    },

    buttonText: {
      color: "#FFFFFF",
      textAlign: "center",
      fontWeight: "700",
      fontSize: 16,
    },
  });