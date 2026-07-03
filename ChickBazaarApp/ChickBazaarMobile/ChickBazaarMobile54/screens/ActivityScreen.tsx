import React from "react";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import NotificationCard from "../components/notifications/NotificationCard";

const notifications = [

  {
    id: "1",
    icon: "🟢",
    title: "Order Confirmed",
    message:
      "Your order CB-2026-00145 has been confirmed.",
    time: "10:25 AM",
    unread: true,
  },

  {
    id: "2",
    icon: "🚚",
    title: "Captain Assigned",
    message:
      "Captain Salman has been assigned to your order.",
    time: "11:10 AM",
    unread: true,
  },

  {
    id: "3",
    icon: "🚛",
    title: "Order Dispatched",
    message:
      "Your order has left our dispatch center.",
    time: "12:40 PM",
  },

  {
    id: "4",
    icon: "💰",
    title: "Payment Received",
    message:
      "₹20,000 payment received successfully.",
    time: "Yesterday",
  },

  {
    id: "5",
    icon: "📄",
    title: "Invoice Generated",
    message:
      "Invoice CB-2026-00145 is now available.",
    time: "Yesterday",
  },

];

export default function ActivityScreen() {

  return (

    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>

        <Text style={styles.title}>
          Activity
        </Text>

        <FlatList

          data={notifications}

          keyExtractor={(item) => item.id}

          showsVerticalScrollIndicator={false}

          renderItem={({ item }) => (

            <NotificationCard

              icon={item.icon}

              title={item.title}

              message={item.message}

              time={item.time}

              unread={item.unread}

            />

          )}

        />

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

safeArea:{
flex:1,
backgroundColor:"#F8FAFC",
},

container:{
flex:1,
padding:20,
},

title:{
fontSize:30,
fontWeight:"700",
color:"#0F172A",
marginBottom:20,
},

});