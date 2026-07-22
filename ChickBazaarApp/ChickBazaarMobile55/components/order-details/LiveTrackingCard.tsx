import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Card from "../ui/Card";

type Props = {
  status?: string;
  driverName?: string;
  vehicleNumber?: string;
  latitude?: number;
  longitude?: number;
};

export default function LiveTrackingCard({
  status,
  driverName,
  vehicleNumber,
  latitude,
  longitude,
}: Props) {
  const isTrackingAvailable =
    status === "out_for_delivery" &&
    latitude != null &&
    longitude != null;

  const openMaps = () => {
    if (!latitude || !longitude) return;

    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    );
  };

  return (
    <Card>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="crosshairs-gps"
          size={24}
          color="#F97316"
        />

        <Text style={styles.title}>
          Live Order Tracking
        </Text>
      </View>

      {!isTrackingAvailable ? (
        <View style={styles.waitingContainer}>
          <MaterialCommunityIcons
            name="truck-fast-outline"
            size={60}
            color="#CBD5E1"
          />

          <Text style={styles.waitingTitle}>
            Tracking Not Available Yet
          </Text>

          <Text style={styles.waitingText}>
            Live tracking will begin once your order leaves our distribution centre.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.driverBox}>
            <MaterialCommunityIcons
              name="account-circle"
              size={48}
              color="#F97316"
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.driver}>
                {driverName}
              </Text>

              <Text style={styles.vehicle}>
                {vehicleNumber}
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.trackButton}
            onPress={openMaps}
          >
            <MaterialCommunityIcons
              name="google-maps"
              size={20}
              color="#fff"
            />

            <Text style={styles.trackText}>
              Track Live Vehicle
            </Text>
          </Pressable>
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:20,
  },

  title:{
    marginLeft:10,
    fontSize:22,
    fontWeight:"700",
    color:"#0F172A",
  },

  waitingContainer:{
    alignItems:"center",
    paddingVertical:25,
  },

  waitingTitle:{
    marginTop:15,
    fontSize:18,
    fontWeight:"700",
    color:"#0F172A",
  },

  waitingText:{
    marginTop:10,
    textAlign:"center",
    color:"#64748B",
    lineHeight:22,
  },

  driverBox:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:18,
  },

  driver:{
    fontWeight:"700",
    fontSize:18,
    color:"#0F172A",
  },

  vehicle:{
    color:"#64748B",
    marginTop:4,
  },

  trackButton:{
    height:52,
    borderRadius:14,
    backgroundColor:"#F97316",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
  },

  trackText:{
    color:"#fff",
    fontWeight:"700",
    marginLeft:8,
    fontSize:16,
  },
});