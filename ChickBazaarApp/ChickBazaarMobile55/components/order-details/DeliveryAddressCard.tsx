import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Card from "../ui/Card";

type Props = {
  address?: string;
  latitude?: number;
  longitude?: number;
};

export default function DeliveryAddressCard({
  address,
  latitude,
  longitude,
}: Props) {
  const openMap = () => {
    if (latitude && longitude) {
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
      );
    }
  };

  return (
    <Card>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="map-marker"
          size={24}
          color="#F97316"
        />

        <Text style={styles.title}>
          Delivery Address
        </Text>
      </View>

      <View style={styles.addressBox}>
        <MaterialCommunityIcons
          name="storefront-outline"
          size={22}
          color="#F97316"
        />

        <Text style={styles.address}>
          {address || "Address not available"}
        </Text>
      </View>

      {latitude && longitude && (
        <Pressable
          style={styles.button}
          onPress={openMap}
        >
          <MaterialCommunityIcons
            name="google-maps"
            color="#FFFFFF"
            size={20}
          />

          <Text style={styles.buttonText}>
            Open in Google Maps
          </Text>
        </Pressable>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    marginLeft: 10,
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  addressBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF7ED",
    padding: 16,
    borderRadius: 14,
  },

  address: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    lineHeight: 24,
    color: "#334155",
  },

  button: {
    marginTop: 18,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },
});