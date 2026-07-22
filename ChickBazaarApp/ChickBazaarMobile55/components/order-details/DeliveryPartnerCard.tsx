import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Card from "../ui/Card";

type Props = {
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
};

export default function DeliveryPartnerCard({
  driverName,
  driverPhone,
  vehicleNumber,
}: Props) {
  if (!driverName) {
  return (
    <Card>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="truck-delivery"
          size={24}
          color="#F97316"
        />

        <Text style={styles.title}>
          Delivery Partner
        </Text>
      </View>

      <View style={styles.waitingContainer}>
        <MaterialCommunityIcons
          name="clock-outline"
          size={54}
          color="#F97316"
        />

        <Text style={styles.waitingTitle}>
          Driver Not Assigned Yet
        </Text>

        <Text style={styles.waitingText}>
          We're preparing your order. Driver and vehicle details will appear here once dispatch begins.
        </Text>
      </View>
    </Card>
  );
}

  const callDriver = () => {
    if (driverPhone) {
      Linking.openURL(`tel:${driverPhone}`);
    }
  };

  const whatsappDriver = () => {
    if (driverPhone) {
      Linking.openURL(`https://wa.me/91${driverPhone}`);
    }
  };

  return (
    <Card>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="truck-delivery"
          size={24}
          color="#F97316"
        />

        <Text style={styles.title}>
          Delivery Partner
        </Text>
      </View>

      <View style={styles.avatar}>
        <MaterialCommunityIcons
          name="account"
          size={46}
          color="#FFFFFF"
        />
      </View>

      <Text style={styles.driverName}>
        {driverName}
      </Text>

      <Text style={styles.vehicle}>
        {vehicleNumber || "Vehicle details will be updated soon"}
      </Text>

      <View style={styles.buttonRow}>
        <Pressable
          style={styles.callButton}
          onPress={callDriver}
        >
          <MaterialCommunityIcons
            name="phone"
            color="#FFFFFF"
            size={20}
          />

          <Text style={styles.buttonText}>
            Call
          </Text>
        </Pressable>

        <Pressable
          style={styles.whatsappButton}
          onPress={whatsappDriver}
        >
          <MaterialCommunityIcons
            name="whatsapp"
            color="#FFFFFF"
            size={20}
          />

          <Text style={styles.buttonText}>
            WhatsApp
          </Text>
        </Pressable>
      </View>
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

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F97316",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  driverName: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  vehicle: {
    textAlign: "center",
    marginTop: 6,
    color: "#64748B",
    fontSize: 16,
    marginBottom: 22,
  },

  buttonRow: {
    flexDirection: "row",
  },

  callButton: {
    flex: 1,
    height: 52,
    backgroundColor: "#2563EB",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 8,
  },

  whatsappButton: {
    flex: 1,
    height: 52,
    backgroundColor: "#16A34A",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },

  waitingContainer: {
  alignItems: "center",
  paddingVertical: 20,
},

waitingTitle: {
  marginTop: 12,
  fontSize: 18,
  fontWeight: "700",
  color: "#0F172A",
},

waitingText: {
  marginTop: 8,
  textAlign: "center",
  color: "#64748B",
  lineHeight: 22,
},
});