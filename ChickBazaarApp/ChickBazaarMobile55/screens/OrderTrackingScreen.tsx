import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  navigation: any;
  route: any;
};

export default function OrderTrackingScreen({
  navigation,
  route,
}: Props) {

  const {
    orderId = "CB-2026-000245",
    status = "farm_allocated",
    requestedWeight = 250,
    estimatedBirds = 165,
    deliverySlot = "2:00 PM – 4:00 PM",
    captainName,
    captainPhone,
    estimatedInvoice = 37500,
    advancePaid = 500,
  } = route.params || {};

  const balance =
    estimatedInvoice - advancePaid;

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <View style={styles.header}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >

            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#0F172A"
            />

          </TouchableOpacity>

          <View style={{ flex: 1 }}>

            <Text style={styles.title}>
              Order Tracking
            </Text>

            <Text style={styles.subtitle}>
              Track your live order status.
            </Text>

          </View>

        </View>

                {/* Order Status Card */}

        <View style={styles.statusCard}>

          <View style={styles.statusTop}>

            <View style={{ flex: 1 }}>

              <Text style={styles.orderId}>
                {orderId}
              </Text>

              <Text style={styles.statusText}>
                {status === "order_confirmed"
                  ? "Order Confirmed"
                  : status === "farm_allocated"
                  ? "Farm Allocation in Progress"
                  : status === "preparing"
                  ? "Preparing Your Order"
                  : status === "vehicle_assigned"
                  ? "Captain Assigned"
                  : status === "out_for_delivery"
                  ? "Out For Delivery"
                  : "Delivered"}
              </Text>

            </View>

            <View style={styles.successIcon}>

              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={34}
                color="#F97316"
              />

            </View>

          </View>

          <View style={styles.liveBadge}>

            <MaterialCommunityIcons
              name="circle"
              size={10}
              color="#22C55E"
            />

            <Text style={styles.liveText}>
              Live Order Status
            </Text>

          </View>

        </View>

        {/* Order Summary */}

        <View style={styles.summaryCard}>

          <Text style={styles.cardTitle}>
            Order Summary
          </Text>

          <View style={styles.summaryGrid}>

            <View style={styles.summaryItem}>

              <MaterialCommunityIcons
                name="scale"
                size={24}
                color="#F97316"
              />

              <Text style={styles.summaryValue}>
                {requestedWeight} KG
              </Text>

              <Text style={styles.summaryLabel}>
                Requested Weight
              </Text>

            </View>

            <View style={styles.summaryItem}>

              <MaterialCommunityIcons
                name="food-drumstick"
                size={24}
                color="#F97316"
              />

              <Text style={styles.summaryValue}>
                ≈{estimatedBirds}
              </Text>

              <Text style={styles.summaryLabel}>
                Estimated Birds
              </Text>

            </View>

          </View>

          <View style={styles.deliveryCard}>

            <MaterialCommunityIcons
              name="clock-outline"
              size={22}
              color="#F97316"
            />

            <View style={{ marginLeft: 12 }}>

              <Text style={styles.deliveryTitle}>
                Delivery Slot
              </Text>

              <Text style={styles.deliveryValue}>
                {deliverySlot}
              </Text>

            </View>

          </View>

        </View>

        {/* Live Progress */}

        <View style={styles.timelineCard}>

          <Text style={styles.cardTitle}>
            Live Order Progress
          </Text>
                    <View style={styles.timeline}>

            <TimelineItem
              completed
              title="Order Confirmed"
              subtitle="Order received successfully."
            />

            <TimelineLine />

            <TimelineItem
              completed
              title="₹500 Advance Received"
              subtitle="Payment verified successfully."
            />

            <TimelineLine />

            <TimelineItem
              completed={
                status !== "order_confirmed"
              }
              current={
                status === "farm_allocated"
              }
              title="Farm Allocated"
              subtitle="Healthy live broiler chicken is being prepared."
            />

            <TimelineLine />

            <TimelineItem
              completed={
                status === "vehicle_assigned" ||
                status === "out_for_delivery" ||
                status === "delivered"
              }
              current={
                status === "vehicle_assigned"
              }
              title="Captain Assigned"
              subtitle={
                captainName
                  ? captainName
                  : "Waiting for captain assignment."
              }
            />

            <TimelineLine />

            <TimelineItem
              completed={
                status === "delivered"
              }
              current={
                status === "out_for_delivery"
              }
              title="Out For Delivery"
              subtitle="Captain is on the way."
            />

            <TimelineLine />

            <TimelineItem
              completed={
                status === "delivered"
              }
              title="Delivered"
              subtitle="Order delivered successfully."
            />

          </View>

        </View>

        {(status === "vehicle_assigned" ||
          status === "out_for_delivery") && (

          <View style={styles.captainCard}>

            <View style={styles.captainHeader}>

              <MaterialCommunityIcons
                name="account-circle"
                size={48}
                color="#16A34A"
              />

              <View style={{ flex: 1, marginLeft: 12 }}>

                <Text style={styles.captainTitle}>
                  Delivery Captain
                </Text>

                <Text style={styles.captainName}>
                  {captainName || "Captain Assigned"}
                </Text>

              </View>

            </View>

            <View style={styles.captainButtons}>

              <TouchableOpacity
                style={styles.callButton}
              >

                <MaterialCommunityIcons
                  name="phone"
                  size={20}
                  color="#F97316"
                />

                <Text style={styles.callButtonText}>
                  CALL
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.whatsappButton}
              >

                <MaterialCommunityIcons
                  name="whatsapp"
                  size={20}
                  color="#16A34A"
                />

                <Text style={styles.whatsappButtonText}>
                  WHATSAPP
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        )}

        {/* Invoice Summary */}

        <View style={styles.invoiceCard}>

          <Text style={styles.cardTitle}>
            Invoice Summary
          </Text>

          <View style={styles.invoiceRow}>

            <Text style={styles.invoiceLabel}>
              Estimated Invoice
            </Text>

            <Text style={styles.invoiceValue}>
              ₹{estimatedInvoice.toLocaleString()}
            </Text>

          </View>

          <View style={styles.invoiceRow}>

            <Text style={styles.invoiceLabel}>
              Advance Paid
            </Text>

            <Text style={styles.advanceValue}>
              ₹{advancePaid}
            </Text>

          </View>

          <View style={styles.invoiceDivider} />

          <View style={styles.invoiceRow}>

            <Text style={styles.balanceLabel}>
              Balance
            </Text>

            <Text style={styles.balanceValue}>
              ₹{balance.toLocaleString()}
            </Text>

          </View>

        </View>

                {/* Help Card */}

        <View style={styles.helpCard}>

          <MaterialCommunityIcons
            name="headset"
            size={34}
            color="#F97316"
          />

          <Text style={styles.helpTitle}>
            Need Help?
          </Text>

          <Text style={styles.helpText}>
            Our support team is available if you
            need assistance with your order.
          </Text>

          <TouchableOpacity
            style={styles.supportButton}
          >

            <MaterialCommunityIcons
              name="phone"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.supportButtonText}>
              CALL SUPPORT
            </Text>

          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={() =>
            navigation.navigate("Dashboard")
          }
        >

          <Text style={styles.dashboardButtonText}>
            BACK TO DASHBOARD
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>

  );

}

/* ---------------------------- */
/* Timeline Components */
/* ---------------------------- */

function TimelineItem({
  completed,
  current,
  title,
  subtitle,
}: any) {

  const color = completed
    ? "#16A34A"
    : current
    ? "#F97316"
    : "#CBD5E1";

  const icon = completed
    ? "check-circle"
    : current
    ? "progress-clock"
    : "circle-outline";

  return (

    <View style={styles.timelineItem}>

      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={color}
      />

      <View style={{ flex: 1, marginLeft: 12 }}>

        <Text
          style={[
            styles.timelineTitle,
            { color },
          ]}
        >
          {title}
        </Text>

        <Text style={styles.timelineSubtitle}>
          {subtitle}
        </Text>

      </View>

    </View>

  );

}

function TimelineLine() {

  return (
    <View style={styles.timelineLine} />
  );

}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#F8FAFC",
  },

  content:{
    padding:20,
    paddingBottom:40,
  },

  header:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:20,
  },

  backButton:{
    width:46,
    height:46,
    borderRadius:16,
    backgroundColor:"#FFFFFF",
    justifyContent:"center",
    alignItems:"center",
    marginRight:14,
    elevation:4,
  },

  title:{
    fontSize:28,
    fontWeight:"900",
    color:"#0F172A",
  },

  subtitle:{
    marginTop:4,
    color:"#64748B",
  },

  statusCard:{
    backgroundColor:"#FFFFFF",
    borderRadius:24,
    padding:20,
    marginBottom:18,
    elevation:5,
  },

  statusTop:{
    flexDirection:"row",
    alignItems:"center",
  },

  orderId:{
    fontSize:20,
    fontWeight:"800",
    color:"#0F172A",
  },

  statusText:{
    marginTop:6,
    color:"#F97316",
    fontWeight:"700",
    fontSize:16,
  },

  successIcon:{
    width:64,
    height:64,
    borderRadius:20,
    backgroundColor:"#FFF7ED",
    justifyContent:"center",
    alignItems:"center",
  },

  liveBadge:{
    marginTop:18,
    alignSelf:"flex-start",
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#ECFDF5",
    paddingHorizontal:12,
    paddingVertical:6,
    borderRadius:20,
  },

  liveText:{
    marginLeft:8,
    color:"#166534",
    fontWeight:"700",
  },

  summaryCard:{
    backgroundColor:"#FFFFFF",
    borderRadius:24,
    padding:20,
    marginBottom:18,
    elevation:4,
  },

  cardTitle:{
    fontSize:18,
    fontWeight:"800",
    color:"#0F172A",
    marginBottom:18,
  },

  summaryGrid:{
    flexDirection:"row",
    justifyContent:"space-between",
  },

  summaryItem:{
    flex:1,
    alignItems:"center",
    backgroundColor:"#F8FAFC",
    borderRadius:18,
    padding:16,
    marginHorizontal:5,
  },

  summaryValue:{
    marginTop:10,
    fontSize:22,
    fontWeight:"900",
    color:"#0F172A",
  },

  summaryLabel:{
    marginTop:6,
    fontSize:12,
    color:"#64748B",
    textAlign:"center",
  },

  deliveryCard:{
    marginTop:18,
    backgroundColor:"#FFF7ED",
    borderRadius:18,
    padding:16,
    flexDirection:"row",
    alignItems:"center",
  },

  deliveryTitle:{
    color:"#64748B",
    fontSize:13,
  },

  deliveryValue:{
    marginTop:2,
    fontSize:17,
    fontWeight:"800",
    color:"#EA580C",
  },

  timelineCard:{
    backgroundColor:"#FFFFFF",
    borderRadius:24,
    padding:20,
    marginBottom:18,
    elevation:4,
  },

  timeline:{},

  timelineItem:{
    flexDirection:"row",
    alignItems:"flex-start",
  },

  timelineLine:{
    width:2,
    height:28,
    backgroundColor:"#E2E8F0",
    marginLeft:11,
    marginVertical:4,
  },

  timelineTitle:{
    fontSize:16,
    fontWeight:"800",
  },

  timelineSubtitle:{
    marginTop:3,
    color:"#64748B",
    fontSize:13,
    lineHeight:18,
  },

  captainCard:{
    backgroundColor:"#FFFFFF",
    borderRadius:24,
    padding:20,
    marginBottom:18,
    elevation:4,
  },

  captainHeader:{
    flexDirection:"row",
    alignItems:"center",
  },

  captainTitle:{
    color:"#64748B",
    fontSize:13,
  },

  captainName:{
    marginTop:3,
    fontSize:18,
    fontWeight:"800",
    color:"#0F172A",
  },

  captainButtons:{
    flexDirection:"row",
    marginTop:20,
  },

  callButton:{
    flex:1,
    height:50,
    borderRadius:16,
    borderWidth:1,
    borderColor:"#F97316",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    marginRight:8,
  },

  callButtonText:{
    marginLeft:8,
    color:"#F97316",
    fontWeight:"800",
  },

  whatsappButton:{
    flex:1,
    height:50,
    borderRadius:16,
    backgroundColor:"#ECFDF5",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    marginLeft:8,
  },

  whatsappButtonText:{
    marginLeft:8,
    color:"#16A34A",
    fontWeight:"800",
  },

  invoiceCard:{
    backgroundColor:"#FFFFFF",
    borderRadius:24,
    padding:20,
    marginBottom:18,
    elevation:4,
  },

  invoiceRow:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:14,
  },

  invoiceLabel:{
    color:"#64748B",
  },

  invoiceValue:{
    fontWeight:"800",
    color:"#0F172A",
  },

  advanceValue:{
    fontWeight:"800",
    color:"#16A34A",
  },

  invoiceDivider:{
    height:1,
    backgroundColor:"#E2E8F0",
    marginVertical:8,
  },

  balanceLabel:{
    fontSize:16,
    fontWeight:"800",
    color:"#0F172A",
  },

  balanceValue:{
    fontSize:18,
    fontWeight:"900",
    color:"#DC2626",
  },

  helpCard:{
    backgroundColor:"#FFFFFF",
    borderRadius:24,
    padding:22,
    alignItems:"center",
    marginBottom:20,
    elevation:4,
  },

  helpTitle:{
    marginTop:12,
    fontSize:22,
    fontWeight:"800",
    color:"#0F172A",
  },

  helpText:{
    marginTop:8,
    textAlign:"center",
    color:"#64748B",
    lineHeight:22,
  },

  supportButton:{
    marginTop:20,
    height:52,
    width:"100%",
    borderRadius:16,
    backgroundColor:"#F97316",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
  },

  supportButtonText:{
    marginLeft:8,
    color:"#FFFFFF",
    fontWeight:"800",
    fontSize:16,
  },

  dashboardButton:{
    height:54,
    borderRadius:16,
    backgroundColor:"#0F172A",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:20,
  },

  dashboardButtonText:{
    color:"#FFFFFF",
    fontWeight:"800",
    fontSize:16,
  },

});