import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
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

      Alert.alert(
        "Success",
        "Login Successful"
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
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logoImage}
      />

      <Text style={styles.title}>
        Retailer Login
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="numeric"
        value={mobile}
        onChangeText={setMobile}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={login}
      >
        <Text
          style={styles.buttonText}
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
          style={styles.register}
        >
          New Retailer?
          Register Here
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
    },

    logoImage: {
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

    register: {
      marginTop: 20,
      textAlign: "center",
      color: "#f97316",
    },
  });