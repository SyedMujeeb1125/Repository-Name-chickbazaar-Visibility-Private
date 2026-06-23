import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function App() {
  const [screen, setScreen] = useState("login");

  const [mobile, setMobile] = useState("");

  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [gst, setGst] = useState("");
  const [address, setAddress] = useState("");

  if (screen === "profile") {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.logo}>🐔 ChickBazaar</Text>

          <Text style={styles.heading}>
            Retailer Onboarding
          </Text>

          <TextInput
            placeholder="Shop Name"
            value={shopName}
            onChangeText={setShopName}
            style={styles.input}
          />

          <TextInput
            placeholder="Owner Name"
            value={ownerName}
            onChangeText={setOwnerName}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="GST Number (Optional)"
            value={gst}
            onChangeText={setGst}
            style={styles.input}
          />

          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            multiline
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => setScreen("home")}
          >
            <Text style={styles.buttonText}>
              Save Profile
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === "home") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.logo}>🐔 ChickBazaar</Text>

          <Text style={styles.heading}>
            Welcome {ownerName || "Retailer"}
          </Text>

          <View style={styles.card}>
            <Text>Today's Live Bird Rate</Text>

            <Text style={styles.rate}>
              ₹110 / Kg
            </Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🐔 ChickBazaar</Text>

        <Text style={styles.heading}>
          Retailer Login
        </Text>

        <TextInput
          placeholder="Mobile Number"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setScreen("profile")}
        >
          <Text style={styles.buttonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  logo: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#f97316",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  rate: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
});