import React, {
  useEffect,
  useState,
} from "react";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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

        <MaterialCommunityIcons
          name="truck-delivery-outline"
          size={56}
          color="#F97316"
        />

        <Text style={styles.loadingTitle}>
          Loading Order
        </Text>

        <Text style={styles.loadingText}>
          Please wait while we fetch
          your order details.
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
          amount={Number(
            order.estimatedAmount || 0
          )}
        />

        {/* Delivery Progress */}

        <View style={styles.card}>

          <View style={styles.sectionHeader}>

            <MaterialCommunityIcons
              name="truck-delivery-outline"
              size={22}
              color="#F97316"
            />

            <Text style={styles.sectionTitle}>
              Delivery Progress
            </Text>

          </View>

          <OrderProgress
            status={order.status}
          />

          <Text style={styles.statusMessage}>

            {order.status === "delivered"
              ? "Your order has been delivered successfully."

              : order.status ===
                "dispatched"

              ? "Your captain is on the way."

              : order.status ===
                "procured"

              ? "Birds have been allocated and quality checked."

              : order.status ===
                "confirmed"

              ? "Your order has been confirmed and is being prepared."

              : "Your order has been received and is awaiting confirmation."}

          </Text>

        </View>         {/* Order Preparation */}

        <View style={styles.card}>

          <View style={styles.sectionHeader}>

            <MaterialCommunityIcons
              name="food-drumstick"
              size={22}
              color="#F97316"
            />

            <Text style={styles.sectionTitle}>
              Order Preparation
            </Text>

          </View>

          <Text style={styles.cardValue}>

            {order.status === "new"

              ? "We've received your order and our operations team will review it shortly."

              : order.status === "confirmed"

              ? "Your order has been confirmed and healthy live broiler chicken is being prepared."

              : order.status === "procured"

              ? "Healthy live broiler chicken has been allocated and passed quality checks."

              : order.status === "dispatched"

              ? "Your order has left our dispatch centre and is on the way."

              : "Your order has been delivered successfully."}

          </Text>

        </View>

        {/* Captain */}

        <View style={styles.card}>

          <View style={styles.sectionHeader}>

            <MaterialCommunityIcons
              name="account-tie-outline"
              size={22}
              color="#2563EB"
            />

            <Text style={styles.sectionTitle}>
              Delivery Captain
            </Text>

          </View>

          {order.status === "dispatched" ||
          order.status === "delivered" ? (

            <>

              <View style={styles.captainCard}>

                <View style={styles.avatar}>

                  <MaterialCommunityIcons
                    name="account"
                    size={34}
                    color="#2563EB"
                  />

                </View>

                <View style={{ flex: 1 }}>

                  <Text style={styles.captainName}>
                    {order.assignedCaptain}
                  </Text>

                  <Text style={styles.captainRole}>
                    ChickBazaar Delivery Captain
                  </Text>

                </View>

              </View>

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

                    <MaterialCommunityIcons
                      name="phone"
                      size={18}
                      color="#FFFFFF"
                    />

                    <Text style={styles.actionText}>
                      Call
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

                    <MaterialCommunityIcons
                      name="whatsapp"
                      size={18}
                      color="#FFFFFF"
                    />

                    <Text style={styles.actionText}>
                      WhatsApp
                    </Text>

                  </TouchableOpacity>

                </View>

              )}

            </>

          ) : (

            <View style={styles.waitingCard}>

              <MaterialCommunityIcons
                name="clock-outline"
                size={28}
                color="#F97316"
              />

              <Text style={styles.waitingTitle}>
                Captain Not Assigned Yet
              </Text>

              <Text style={styles.waitingText}>
                A delivery captain will be assigned
                before your order leaves our dispatch
                centre.
              </Text>

            </View>

          )}

        </View>         {/* Dispatch Status */}

        <View style={styles.card}>

          <View style={styles.sectionHeader}>

            <MaterialCommunityIcons
              name="truck-fast-outline"
              size={22}
              color="#16A34A"
            />

            <Text style={styles.sectionTitle}>
              Dispatch Status
            </Text>

          </View>

          <Text style={styles.cardValue}>

            {order.status === "dispatched"

              ? "Your captain is on the way with your healthy live broiler chicken."

              : order.status === "delivered"

              ? "Your order has been delivered successfully."

              : "Your order is currently being prepared for dispatch."}

          </Text>

        </View>

        {/* Delivery Updates */}

        <View style={styles.card}>

          <View style={styles.sectionHeader}>

            <MaterialCommunityIcons
              name="bell-ring-outline"
              size={22}
              color="#2563EB"
            />

            <Text style={styles.sectionTitle}>
              Delivery Updates
            </Text>

          </View>

          <Text style={styles.cardValue}>

            {order.trackingNotes ||
              "We'll keep you updated throughout every stage of your order."}

          </Text>

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  safeArea:{
    flex:1,
    backgroundColor:"#F8FAFC",
  },

  loadingContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#F8FAFC",
    padding:30,
  },

  loadingTitle:{
    marginTop:18,
    fontSize:24,
    fontWeight:"800",
    color:"#0F172A",
  },

  loadingText:{
    marginTop:8,
    textAlign:"center",
    color:"#64748B",
    lineHeight:22,
  },

  container:{
    padding:20,
    paddingBottom:40,
  },

  card:{
    backgroundColor:"#FFFFFF",
    borderRadius:24,
    padding:20,
    marginBottom:18,

    shadowColor:"#000",
    shadowOpacity:0.06,
    shadowRadius:14,
    shadowOffset:{
      width:0,
      height:6,
    },

    elevation:5,
  },

  sectionHeader:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:18,
  },

  sectionTitle:{
    marginLeft:10,
    fontSize:19,
    fontWeight:"700",
    color:"#0F172A",
  },

  statusMessage:{
    marginTop:18,
    fontSize:15,
    color:"#64748B",
    textAlign:"center",
    lineHeight:24,
  },

  cardValue:{
    fontSize:15,
    color:"#475569",
    lineHeight:24,
  },

  captainCard:{
    flexDirection:"row",
    alignItems:"center",
  },

  avatar:{
    width:64,
    height:64,
    borderRadius:32,
    backgroundColor:"#EFF6FF",
    justifyContent:"center",
    alignItems:"center",
    marginRight:16,
  },

  captainName:{
    fontSize:19,
    fontWeight:"700",
    color:"#0F172A",
  },

  captainRole:{
    marginTop:4,
    color:"#64748B",
    fontSize:14,
  },

  waitingCard:{
    backgroundColor:"#FFF7ED",
    borderRadius:18,
    padding:20,
    alignItems:"center",
  },

  waitingTitle:{
    marginTop:10,
    fontSize:17,
    fontWeight:"700",
    color:"#9A3412",
  },

  waitingText:{
    marginTop:8,
    textAlign:"center",
    color:"#7C2D12",
    lineHeight:22,
  },

  actionRow:{
    flexDirection:"row",
    marginTop:20,
  },

  callButton:{
    flex:1,
    height:52,
    backgroundColor:"#2563EB",
    borderRadius:16,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    marginRight:8,
  },

  whatsappButton:{
    flex:1,
    height:52,
    backgroundColor:"#16A34A",
    borderRadius:16,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    marginLeft:8,
  },

  actionText:{
    color:"#FFFFFF",
    fontWeight:"700",
    marginLeft:8,
    fontSize:15,
  },

});