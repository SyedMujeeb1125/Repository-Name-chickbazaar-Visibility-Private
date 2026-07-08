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
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

export default function ProfileScreen({
  navigation,
}: any) {
  const [retailer, setRetailer] =
    useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
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

  async function logout() {
    await AsyncStorage.removeItem(
      "retailerMobile"
    );

    Alert.alert(
      "Success",
      "Logged Out"
    );

    navigation.replace(
      "Login"
    );
  }

  if (!retailer) {
    return (
      <SafeAreaView
        style={styles.loadingContainer}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
  <SafeAreaView
    style={styles.safeArea}
  >
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <View
        style={styles.profileHeader}
      >
        <View
          style={styles.avatar}
        >
          <Text
            style={
              styles.avatarText
            }
          >
            {(
              retailer.ownerName ||
              "R"
            )
              .charAt(0)
              .toUpperCase()}
          </Text>
        </View>

        <Text style={styles.welcome}>
          Welcome Back 👋
        </Text>

        <Text style={styles.ownerName}>
          {retailer.shopName}
        </Text>

        <Text style={styles.ownerRole}>
          Retail Partner
        </Text>

        <Text style={styles.memberSince}>
          Delivering with ChickBazaar
        </Text>
      </View>

      <View style={styles.card}>

        <Text style={styles.sectionTitle}>
          🏪 Shop Information
        </Text>

        <Text style={styles.label}>
          Shop Name
        </Text>

        <Text style={styles.value}>
          {retailer.shopName || "-"}
        </Text>

        <Text style={styles.label}>
          Owner
        </Text>

        <Text style={styles.value}>
          {retailer.ownerName || "-"}
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.sectionTitle}>
          📞 Contact Information
        </Text>

        <Text style={styles.label}>
          Mobile
        </Text>

        <Text style={styles.value}>
          {retailer.mobile || "-"}
        </Text>

        <Text style={styles.label}>
          Email
        </Text>

        <Text style={styles.value}>
          {retailer.email || "-"}
        </Text>

        <Text style={styles.label}>
          Address
        </Text>

        <Text style={styles.value}>
          {retailer.address || "-"}
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.sectionTitle}>
          📄 Business Information
        </Text>

        <Text style={styles.label}>
          Credit Category
        </Text>

        <Text style={styles.value}>
          {(
            retailer.creditCategory ||
            "NEW"
          ).toUpperCase()}
        </Text>

        <Text style={styles.label}>
          Credit Limit
        </Text>

        <Text style={styles.value}>
          ₹
          {Number(
            retailer.creditLimit ||
            0
          ).toLocaleString()}
        </Text>

      </View>
      </ScrollView>
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

    loadingContainer: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    container: {
      padding: 20,
      paddingBottom: 40,
    },

    profileHeader: {
      alignItems: "center",
      marginBottom: 24,
    },

    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor:
        "#F97316",
      justifyContent:
        "center",
      alignItems:
        "center",
      marginBottom: 12,
    },

    avatarText: {
      color: "#FFF",
      fontSize: 36,
      fontWeight: "700",
    },

    ownerName: {
      fontSize: 24,
      fontWeight: "700",
      color: "#0F172A",
    },

    ownerRole: {
      color: "#64748B",
      marginTop: 4,
    },

    card: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 18,
      padding: 18,
      marginBottom: 12,
      elevation: 2,
    },

    label: {
      color: "#64748B",
      fontSize: 14,
      marginBottom: 6,
    },

    value: {
      fontSize: 16,
      fontWeight: "600",
      color: "#0F172A",
    },

    logoutButton: {
      backgroundColor:
        "#DC2626",
      borderRadius: 16,
      padding: 16,
      marginTop: 20,
    },

    logoutText: {
      color: "#FFFFFF",
      textAlign: "center",
      fontWeight: "700",
      fontSize: 16,
    },

    welcome: {
  color: "#64748B",
  fontSize: 16,
  marginBottom: 6,
},

memberSince: {
  color: "#94A3B8",
  marginTop: 6,
  fontSize: 14,
},

sectionTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#0F172A",
  marginBottom: 18,
},
  });