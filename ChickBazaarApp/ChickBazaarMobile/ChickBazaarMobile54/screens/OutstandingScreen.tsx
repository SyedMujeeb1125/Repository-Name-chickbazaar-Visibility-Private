import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function OutstandingScreen() {
  const [retailer, setRetailer] =
    useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
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

  if (!retailer) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const creditLimit =
    retailer.creditLimit || 0;

  const availableCredit =
    retailer.availableCredit || 0;

  const outstanding =
    creditLimit -
    availableCredit;

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Text style={styles.title}>
        Outstanding
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Credit Category
        </Text>

        <Text style={styles.value}>
          {retailer.creditCategory}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Credit Limit
        </Text>

        <Text style={styles.value}>
          ₹{creditLimit.toLocaleString()}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Available Credit
        </Text>

        <Text style={styles.value}>
          ₹{availableCredit.toLocaleString()}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Outstanding Balance
        </Text>

        <Text style={styles.value}>
          ₹{outstanding.toLocaleString()}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },

    card: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
    },

    label: {
      fontSize: 14,
      color: "#666",
    },

    value: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 5,
    },
  });