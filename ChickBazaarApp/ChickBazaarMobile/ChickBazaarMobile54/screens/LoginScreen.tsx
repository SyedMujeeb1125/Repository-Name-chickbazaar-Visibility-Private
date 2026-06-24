import React, { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function LoginScreen({
  navigation,
}: any) {
  const [mobile, setMobile] =
    useState("");

  const login = async () => {
    try {
      const response =
        await fetch(
          "https://www.chickbazaar.com/api/mobile/login",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              mobile,
            }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        Alert.alert(
          "Error",
          "Retailer not found"
        );
        return;
      }

      await AsyncStorage.setItem(
        "retailerMobile",
        mobile
      );

      navigation.navigate(
        "Dashboard"
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
        >
          <Image
            source={require("../assets/logo.png")}
            style={styles.logoImage}
          />

          <View style={styles.card}>
            <Text
              style={styles.title}
            >
              Retailer Login
            </Text>

            <Text
              style={
                styles.subtitle
              }
            >
              Login with your
              registered mobile
              number
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="number-pad"
              maxLength={10}
              value={mobile}
              onChangeText={
                setMobile
              }
            />

            <TouchableOpacity
              style={
                styles.button
              }
              onPress={login}
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  "Register"
                )
              }
            >
              <Text
                style={
                  styles.register
                }
              >
                New Retailer?
                Register Here
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
      marginBottom: 25,
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
      marginBottom: 18,
    },

    button: {
      backgroundColor:
        "#F97316",
      padding: 16,
      borderRadius: 14,
    },

    buttonText: {
      color: "#FFFFFF",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "700",
    },

    register: {
      textAlign: "center",
      marginTop: 20,
      color: "#F97316",
      fontWeight: "600",
    },
  });