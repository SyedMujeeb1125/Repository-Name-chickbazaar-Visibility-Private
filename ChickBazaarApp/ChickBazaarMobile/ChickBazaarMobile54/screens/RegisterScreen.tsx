import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
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

      Alert.alert(
        "Success",
        "Retailer Registered Successfully"
      );

      navigation.navigate("Dashboard");
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
      <Image
        source={require("../assets/logo.png")}
        style={styles.logoImage}
      />

      <Text style={styles.title}>
        Retailer Registration
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
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={submit}
      >
        <Text
          style={styles.buttonText}
        >
          Register
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },

  logoImage: {
    width: 280,
    height: 140,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },

  button: {
    backgroundColor: "#f97316",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});