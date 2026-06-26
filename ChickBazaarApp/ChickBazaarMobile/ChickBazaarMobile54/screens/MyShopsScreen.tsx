import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Alert } from "react-native";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function MyShopsScreen({
  navigation,
}: any) {
  const [shops, setShops] =
    useState<any[]>([]);

  useEffect(() => {
    loadShops();
  }, []);

  async function loadShops() {
    const mobile =
      await AsyncStorage.getItem(
        "retailerMobile"
      );

      Alert.alert(
  "Stored Mobile",
  String(mobile)
);

      console.log(
  "Stored retailer mobile:",
  mobile
);

    const response =
      await fetch(
        `https://www.chickbazaar.com/api/mobile/shops?mobile=${mobile}`
      );

    const data =
      await response.json();

      console.log("Shops API Response:", data);

      console.log(
  "Shops API Response:",
  data
);

    console.log("Total Shops:", data.length);

setShops(data);
  }
 console.log("Rendering Shops:", shops);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Shops
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate(
            "AddShop"
          )
        }
      >
        <Text
          style={styles.addText}
        >
          + Add Shop
        </Text>
      </TouchableOpacity>

      {shops.map((item) => (
  <View
    key={item.id}
    style={styles.card}
  >
    <Text
      style={styles.shopName}
    >
      {item.shopName}
    </Text>

    <Text>
      {item.address}
    </Text>
  </View>
))}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor:
        "#fff",
    },

    title: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 20,
    },

    addButton: {
      backgroundColor:
        "#F97316",
      padding: 14,
      borderRadius: 10,
      marginBottom: 20,
    },

    addText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "700",
    },

    card: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 15,
      marginBottom: 12,
    },

    shopName: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 5,
    },
  });