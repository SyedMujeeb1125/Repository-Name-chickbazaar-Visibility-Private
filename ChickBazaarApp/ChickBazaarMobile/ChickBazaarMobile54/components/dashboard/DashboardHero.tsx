import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  hasOrderToday: boolean;
  deliveryStatus?: string;
  driverName?: string;
  eta?: string;
  onPlaceOrder: () => void;
  onTrackOrder: () => void;
};

export default function DashboardHero({
  hasOrderToday,
  deliveryStatus,
  driverName,
  eta,
  onPlaceOrder,
  onTrackOrder,
}: Props) {

  if (!hasOrderToday) {

    return (

      <View style={styles.orderCard}>

        <Text style={styles.icon}>
          🐔
        </Text>

        <Text style={styles.title}>
          Place Today's Order
        </Text>

        <Text style={styles.subtitle}>
          Order before 12:00 PM for
          same-day delivery.
        </Text>

        <View style={styles.button}>
          <PrimaryButton
            title="PLACE ORDER"
            onPress={onPlaceOrder}
          />
        </View>

      </View>

    );

  }

  return (

    <View style={styles.deliveryCard}>

      <View style={styles.headerRow}>

        <Text style={styles.deliveryIcon}>
          🚚
        </Text>

        <View>

          <Text style={styles.deliveryTitle}>
            Today's Delivery
          </Text>

          <Text style={styles.status}>
            {deliveryStatus || "Confirmed"}
          </Text>

        </View>

      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>
          Driver
        </Text>

        <Text style={styles.value}>
          {driverName || "-"}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>
          ETA
        </Text>

        <Text style={styles.value}>
          {eta || "--"}
        </Text>
      </View>

      <View style={styles.button}>
        <PrimaryButton
          title="TRACK ORDER"
          onPress={onTrackOrder}
        />
      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  orderCard:{
    backgroundColor:"#FFFFFF",
    borderRadius:24,
    padding:24,
    marginBottom:22,
    elevation:3,
  },

  deliveryCard:{
    backgroundColor:"#FFFFFF",
    borderRadius:24,
    padding:24,
    marginBottom:22,
    elevation:3,
  },

  icon:{
    fontSize:52,
    textAlign:"center",
    marginBottom:12,
  },

  title:{
    fontSize:26,
    fontWeight:"800",
    color:"#0F172A",
    textAlign:"center",
  },

  subtitle:{
    marginTop:10,
    color:"#64748B",
    fontSize:16,
    lineHeight:24,
    textAlign:"center",
  },

  button:{
    marginTop:24,
  },

  headerRow:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:20,
  },

  deliveryIcon:{
    fontSize:40,
    marginRight:16,
  },

  deliveryTitle:{
    fontSize:24,
    fontWeight:"800",
    color:"#0F172A",
  },

  status:{
    color:"#16A34A",
    marginTop:4,
    fontWeight:"600",
  },

  infoRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:14,
    paddingVertical:6,
  },

  label:{
    color:"#64748B",
    fontSize:15,
  },

  value:{
    color:"#0F172A",
    fontSize:15,
    fontWeight:"700",
  },

});