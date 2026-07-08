import React, { useState } from "react";

import { useAuth } from "../context/AuthContext";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen({
  navigation,
}: any) {

  const [mobile, setMobile] =
    useState("");

  const { login: signIn } =
    useAuth();

  const handleLogin = async () => {

    if (mobile.length !== 10) {

      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number."
      );

      return;

    }

    try {

      const response =
        await fetch(
          "http://10.144.143.74:3000/api/mobile/login",
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

        console.log(data);

      if (!data.success) {

        Alert.alert(
          "Login Failed",
          "Retailer not found."
        );

        return;

      }

      await signIn(mobile);

    } catch (error: any) {

      Alert.alert(
        "Error",
        error?.message ??
          "Something went wrong."
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
          showsVerticalScrollIndicator={false}
        >

          <Image
            source={require("../assets/logo.png")}
            style={styles.logoImage}
          />

          <View style={styles.card}>

            <Text style={styles.title}>
              Retailer Login
            </Text>

            <Text style={styles.subtitle}>
              Login using your registered
              mobile number to continue.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
            />

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={handleLogin}
            >

              <Text style={styles.buttonText}>
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
                style={styles.register}
              >
                Don't have an account? Register
              </Text>

            </TouchableOpacity>

          </View>

          <View style={styles.footer}>

            <Text style={styles.version}>
              ChickBazaar Retailer App
            </Text>

            <Text style={styles.versionNo}>
              Version 1.0.0
            </Text>

            <Text style={styles.powered}>
              Made with ❤️ in India
            </Text>

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
      paddingHorizontal: 24,
      paddingVertical: 40,
    },

    logoImage: {
      width: 250,
      height: 120,
      resizeMode: "contain",
      alignSelf: "center",
      marginBottom: 35,
    },

    card: {
      backgroundColor:
        "#FFFFFF",

      borderRadius: 24,

      padding: 24,

      shadowColor: "#000",

      shadowOpacity: 0.08,

      shadowRadius: 12,

      shadowOffset: {
        width: 0,
        height: 6,
      },

      elevation: 6,
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
      marginTop: 10,
      marginBottom: 24,
      fontSize: 15,
      lineHeight: 22,
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

      paddingVertical: 16,

      borderRadius: 14,
    },

    buttonText: {
      color: "#FFFFFF",
      textAlign: "center",
      fontSize: 17,
      fontWeight: "700",
    },

    register: {
      textAlign: "center",
      marginTop: 22,
      color: "#F97316",
      fontWeight: "700",
      fontSize: 15,
    },

    footer: {
      alignItems: "center",
      marginTop: 34,
    },

    version: {
      color: "#334155",
      fontSize: 14,
      fontWeight: "700",
    },

    versionNo: {
      marginTop: 2,
      color: "#64748B",
      fontSize: 13,
    },

    powered: {
      marginTop: 8,
      color: "#94A3B8",
      fontSize: 12,
    },

  });