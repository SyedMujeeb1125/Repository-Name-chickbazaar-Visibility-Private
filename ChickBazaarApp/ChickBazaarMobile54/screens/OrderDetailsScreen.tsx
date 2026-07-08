import React, {
  useEffect,
  useState,
} from "react";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

import OrderHeaderCard from "../components/order-details/OrderHeaderCard";
import OrderSummaryCard from "../components/order-details/OrderSummaryCard";
import OrderProgress from "../components/orders/OrderProgress";

export default function OrderDetailsScreen({
  route,
}: any) {
  const { orderId } = route.params;

  const [order, setOrder] =
    useState<any>(null);

  useEffect(() => {
    loadOrder();
  }, []);

  async function loadOrder() {
    const response =
      await fetch(
        `https://www.chickbazaar.com/api/mobile/order-details?orderId=${orderId}`
      );

    const data =
      await response.json();

    setOrder(data);
  }

  if (!order) {
    return (
      <SafeAreaView
        style={styles.loadingContainer}
      >
        <Text>
          Loading...
        </Text>
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
        <OrderHeaderCard
  orderNumber={order.orderNumber}
  status={order.status}
  orderDate={order.createdAt}
/>

<OrderSummaryCard
  quantity={
    order.orderBy === "birds"
      ? order.birds
      : order.requestedWeight
  }
  orderType={
    order.orderBy === "birds"
      ? "birds"
      : "weight"
  }
  amount={Number(order.estimatedAmount || 0)}
/>
        
        <View style={styles.card}>

  <Text style={styles.cardTitle}>
    🚚 Delivery Progress
  </Text>

  <OrderProgress
    status={order.status}
  />

  <Text
    style={{
      marginTop: 18,
      color: "#64748B",
      textAlign: "center",
      lineHeight: 22,
    }}
  >
    {order.status === "delivered"
      ? "Order Delivered Successfully"
      : order.status === "dispatched"
      ? "Your order is out for delivery."
      : order.status === "procured"
      ? "Birds have been allocated from the farm."
      : order.status === "confirmed"
      ? "Your order has been confirmed."
      : "Waiting for confirmation."}
  </Text>

</View>

        <View style={styles.card}>

  <Text style={styles.cardTitle}>
    📦 Order Preparation
  </Text>

  <Text style={styles.cardValue}>
    {order.status === "new"
      ? "Order received successfully."
      : order.status === "confirmed"
      ? "Your order has been confirmed."
      : order.status === "procured"
      ? "Birds have been allocated and quality checked."
      : order.status === "dispatched"
      ? "Your order has left our dispatch center."
      : "Your order has been delivered successfully."}
  </Text>

</View>

        <View style={styles.card}>

  <Text style={styles.cardTitle}>
    👨‍✈️ Captain
  </Text>

  {order.status === "dispatched" ||
  order.status === "delivered" ? (

    <>

      <Text style={styles.cardValue}>
        {order.assignedCaptain}
      </Text>

      {!!order.captainMobile && (

        <View style={styles.actionRow}>

          <TouchableOpacity
            style={styles.callButton}
            onPress={() =>
              Linking.openURL(
                `tel:${order.captainMobile}`
              )
            }
          >
            <Text style={styles.actionText}>
              📞 Call Captain
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={() =>
              Linking.openURL(
                `https://wa.me/${order.captainMobile}`
              )
            }
          >
            <Text style={styles.actionText}>
              💬 WhatsApp Captain
            </Text>
          </TouchableOpacity>

        </View>

      )}

    </>

  ) : (

    <Text style={styles.cardValue}>
      A Captain will be assigned before dispatch.
    </Text>

  )}

</View>

        <View style={styles.card}>

  <Text style={styles.cardTitle}>
    🚚 Dispatch Status
  </Text>

  <Text style={styles.cardValue}>
    {order.status === "dispatched"
      ? "Captain is on the way to your shop."
      : order.status === "delivered"
      ? "Order delivered successfully."
      : "Waiting for dispatch."}
  </Text>

</View>

        <View
          style={styles.card}
        >
          <Text
            style={
              styles.cardTitle
            }
          >
            📢 Delivery Updates
          </Text>

          <Text
            style={
              styles.cardValue
            }
          >
            {order.trackingNotes ||
              "Our operations team will keep you updated."}
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

    orderCard: {
      backgroundColor:
        "#F97316",
      borderRadius: 20,
      padding: 20,
      marginBottom: 18,
    },

    orderNumber: {
      fontSize: 22,
      fontWeight: "700",
      color: "#FFFFFF",
      marginBottom: 10,
    },

    badge: {
      alignSelf: "flex-start",
      backgroundColor:
        "#FFFFFF",
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 5,
      marginBottom: 12,
    },

    badgeText: {
      color: "#F97316",
      fontWeight: "700",
      textTransform:
        "capitalize",
    },

    info: {
      color: "#FFFFFF",
      fontSize: 15,
      marginBottom: 6,
    },

    card: {
      backgroundColor:
        "#FFFFFF",
      borderRadius: 18,
      padding: 18,
      marginBottom: 12,
      elevation: 2,
    },

    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#0F172A",
      marginBottom: 8,
    },

    cardValue: {
      fontSize: 15,
      color: "#475569",
    },
    timelineRow:{
  flexDirection:"row",
  alignItems:"center",
  marginBottom:12,
},

timelineIcon:{
  fontSize:18,
  marginRight:10,
},

timelineText:{
  fontSize:15,
  color:"#334155",
},
actionRow: {
  flexDirection: "row",
  marginTop: 16,
},

callButton: {
  flex: 1,
  backgroundColor: "#2563EB",
  paddingVertical: 12,
  borderRadius: 12,
  alignItems: "center",
  marginRight: 8,
},

whatsappButton: {
  flex: 1,
  backgroundColor: "#16A34A",
  paddingVertical: 12,
  borderRadius: 12,
  alignItems: "center",
},

actionText: {
  color: "#FFFFFF",
  fontWeight: "700",
},
  });