import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import OrderProgress from "../components/orders/OrderProgress";

function formatAmount(amount: number) {

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }

  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }

  return `₹${amount}`;
}

function formatStatus(status: string) {

  switch (status) {

    case "order_confirmed":
      return "Confirmed";

    case "farm_allocated":
      return "Farm Allocated";

    case "preparing":
      return "Preparing";

    case "vehicle_assigned":
      return "Vehicle Assigned";

    case "out_for_delivery":
      return "Out for Delivery";

    case "delivered":
      return "Delivered";

    case "cancelled":
      return "Cancelled";

    default:
      return status;

  }

}

function formatDeliveryDate(date?: string) {

  if (!date) {
    return "Today";
  }

  const delivery = new Date(date);

  const today = new Date();

  const tomorrow = new Date();

  tomorrow.setDate(today.getDate() + 1);

  if (
    delivery.toDateString() ===
    today.toDateString()
  ) {

    return "Today";

  }

  if (
    delivery.toDateString() ===
    tomorrow.toDateString()
  ) {

    return "Tomorrow";

  }

  return delivery.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
    }
  );

}

export default function MyOrdersScreen({
  navigation,
}: any) {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [selectedTab, setSelectedTab] =
    useState<"active" | "history">("active");

  useEffect(() => {

    loadOrders();

    const timer = setInterval(
      loadOrders,
      30000
    );

    return () => clearInterval(timer);

  }, []);

  async function loadOrders() {

    try {

      const mobile =
        await AsyncStorage.getItem(
          "retailerMobile"
        );

      const response =
        await fetch(
          `https://www.chickbazaar.com/api/mobile/my-orders?mobile=${mobile}`
        );

      const data =
        await response.json();

      setOrders(data || []);

    } catch (err) {

      console.log(err);

    }

  }

  const filteredOrders = useMemo(() => {

    if (selectedTab === "active") {

      return orders.filter(
        (item) =>
          item.status !== "delivered" &&
          item.status !== "cancelled"
      );

    }

    return orders.filter(
      (item) =>
        item.status === "delivered" ||
        item.status === "cancelled"
    );

  }, [orders, selectedTab]);

  return (

    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>

        <View style={styles.header}>

  <View style={{ flex: 1 }}>

    <Text style={styles.title}>
      My Orders
    </Text>

    <Text style={styles.subtitle}>
      Track your active and completed orders.
    </Text>

  </View>

  <View style={styles.orderBadge}>

    <MaterialCommunityIcons
      name="clipboard-list-outline"
      size={26}
      color="#F97316"
    />

  </View>

</View>

        <View style={styles.tabs}>

  <TouchableOpacity
    activeOpacity={0.9}
    onPress={() =>
      setSelectedTab("active")
    }
    style={[
      styles.tab,
      selectedTab === "active" &&
        styles.activeTab,
    ]}
  >

    <Text
      style={[
        styles.tabText,
        selectedTab === "active" &&
          styles.activeTabText,
      ]}
    >
      Active (
      {
        orders.filter(
          o =>
            o.status !== "delivered" &&
            o.status !== "cancelled"
        ).length
      }
      )
    </Text>

  </TouchableOpacity>

  <TouchableOpacity
    activeOpacity={0.9}
    onPress={() =>
      setSelectedTab("history")
    }
    style={[
      styles.tab,
      selectedTab === "history" &&
        styles.activeTab,
    ]}
  >

    <Text
      style={[
        styles.tabText,
        selectedTab === "history" &&
          styles.activeTabText,
      ]}
    >
      Completed (
      {
        orders.filter(
          o =>
            o.status === "delivered"
        ).length
      }
      )
    </Text>

  </TouchableOpacity>

</View>

        <FlatList

          data={filteredOrders}

          keyExtractor={(item) => item.id}

          showsVerticalScrollIndicator={false}

          ListEmptyComponent={

            <View style={styles.emptyContainer}>

              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={56}
                color="#CBD5E1"
              />

              <Text style={styles.emptyTitle}>
                No Orders Yet
              </Text>

              <Text style={styles.emptyText}>
                Place your first ChickBazaar order.

You'll be able to track every
delivery from here.
              </Text>

            </View>

          }

          renderItem={({ item }) => (

            <TouchableOpacity
  activeOpacity={0.9}
  style={styles.card}
  onPress={() =>
    navigation.navigate(
      "OrderDetails",
      {
        orderId: item.id,
      }
    )
  }
>

  {/* Header */}

  <View style={styles.cardHeader}>

    <View style={{ flex: 1 }}>

      <Text style={styles.orderNumber}>
        {item.orderNumber}
      </Text>

      <Text style={styles.orderDate}>
        {new Date(
          item.createdAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )}
      </Text>

    </View>

    <View
      style={[
        styles.badge,
        item.status === "delivered"
          ? styles.badgeGreen
          : item.status === "out_for_delivery"
          ? styles.badgePurple
          : item.status === "vehicle_assigned"
          ? styles.badgeBlue
          : styles.badgeOrange,
      ]}
    >

      <Text style={styles.badgeText}>
        {formatStatus(item.status)}
      </Text>

    </View>

  </View>

  <View style={styles.divider} />

  {/* Weight + Invoice */}

  <View style={styles.summaryRow}>

    <View style={styles.summaryBox}>

      <Text style={styles.summaryValue}>
        {item.requestedWeight || "--"} KG
      </Text>

      <Text style={styles.summaryLabel}>
        Weight
      </Text>

    </View>

    <View style={styles.summaryBox}>

  <Text style={styles.summaryValueOrange}>
    {formatAmount(
      Number(item.estimatedAmount || 0)
    )}
  </Text>

  <Text style={styles.summaryLabel}>
    Estimated Invoice
  </Text>

  {item.status === "delivered" ? (

  <View style={styles.balanceBadge}>

    <MaterialCommunityIcons
      name="cash-clock"
      size={14}
      color="#DC2626"
    />

    <Text style={styles.balanceBadgeText}>
      Balance ₹
      {Number(
        (item.estimatedAmount || 0) - 500
      ).toLocaleString()}
    </Text>

  </View>

) : (

  <View style={styles.advanceBadge}>

    <MaterialCommunityIcons
      name="check-circle"
      size={14}
      color="#16A34A"
    />

    <Text style={styles.advanceBadgeText}>
      ₹500 Advance Paid
    </Text>

  </View>

)}

</View>

  </View>

  {/* Birds + Delivery */}

  <View style={styles.summaryRow}>

    <View style={styles.summaryBox}>

      <Text style={styles.summaryValue}>
        {item.birds || "--"}
      </Text>

      <Text style={styles.summaryLabel}>
        Estimated Birds
      </Text>

    </View>

    <View style={styles.summaryBox}>

      <Text style={styles.summaryValue}>
        {formatDeliveryDate(
          item.deliveryDate
        )}
      </Text>

      <Text style={styles.summaryLabel}>
        Delivery
      </Text>

    </View>

  </View>

  {(item.status === "vehicle_assigned" ||
  item.status === "out_for_delivery") && (

  <View style={styles.captainCard}>

    <View style={styles.captainLeft}>

      <View style={styles.captainAvatar}>

        <MaterialCommunityIcons
          name="account"
          size={24}
          color="#16A34A"
        />

      </View>

      <View style={{ marginLeft: 12 }}>

        <Text style={styles.captainTitle}>
          Delivery Captain
        </Text>

        <Text style={styles.captainName}>
          {item.driverName || "Captain Assigned"}
        </Text>

      </View>

    </View>

    <View style={styles.captainActions}>

      <TouchableOpacity
        style={styles.iconButton}
      >

        <MaterialCommunityIcons
          name="phone"
          size={20}
          color="#F97316"
        />

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
      >

        <MaterialCommunityIcons
          name="whatsapp"
          size={20}
          color="#16A34A"
        />

      </TouchableOpacity>

    </View>

  </View>

)}

  <View style={styles.progressContainer}>

  <OrderProgress
    status={item.status}
  />

</View>

<View style={styles.actionRow}>

  {item.status === "delivered" ? (

    <>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.secondaryButton}
        onPress={() =>
          navigation.navigate("InvoiceDetails", {
            orderId: item.id,
          })
        }
      >
        <MaterialCommunityIcons
          name="file-document-outline"
          size={18}
          color="#F97316"
        />

        <Text style={styles.secondaryButtonText}>
          INVOICE
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.trackButton}
        onPress={() =>
          navigation.navigate("PlaceOrder", {
            repeatOrder: item.id,
          })
        }
      >
        <MaterialCommunityIcons
          name="reload"
          size={18}
          color="#FFFFFF"
        />

        <Text style={styles.trackButtonText}>
          REPEAT ORDER
        </Text>
      </TouchableOpacity>
    </>

  ) : (

    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.trackButton}
      onPress={() =>
        navigation.navigate("OrderTracking", {
          orderId: item.id,
        })
      }
    >
      <MaterialCommunityIcons
        name="truck-fast-outline"
        size={20}
        color="#FFFFFF"
      />

      <Text style={styles.trackButtonText}>
        TRACK ORDER
      </Text>
    </TouchableOpacity>

  )}

</View>



  </TouchableOpacity>



          )}

        />

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    flex: 1,
    padding: 20,
  },

  title:{
    fontSize:26,
    fontWeight:"800",
    color:"#0F172A",
},

  subtitle:{
    marginTop:4,
    marginBottom:12,
    color:"#64748B",
    fontSize:14,
},

  tabs: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: 18,
    padding: 4,
    marginBottom: 16,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },

  activeTab: {
    backgroundColor: "#FFFFFF",
  },

  tabText: {
    color: "#64748B",
    fontWeight: "600",
    fontSize: 15,
  },

  activeTabText: {
    color: "#F97316",
    fontWeight: "700",
  },

  emptyContainer: {
    marginTop: 60,
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: "700",
    color: "#334155",
  },

  emptyText: {
    marginTop: 10,
    textAlign: "center",
    color: "#94A3B8",
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 4,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderNumber:{
    fontSize:18,
    fontWeight:"800",
    color:"#0F172A",
},

  orderDate:{
    marginTop:4,
    color:"#94A3B8",
    fontSize:12,
},

  badge: {
    paddingHorizontal:10,
paddingVertical:6,
borderRadius:14,
  },

  badgeOrange: {
    backgroundColor: "#F97316",
  },

  badgeBlue: {
    backgroundColor: "#2563EB",
  },

  badgePurple: {
    backgroundColor: "#7C3AED",
  },

  badgeGreen: {
    backgroundColor: "#16A34A",
  },

  badgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor:"#F1F5F9",
    marginVertical: 14,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoLabel: {
    marginLeft: 10,
    color: "#64748B",
    fontSize: 15,
  },

  infoValue: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 15,
  },

  amount:{
    color:"#F97316",
    fontSize:20,
    fontWeight:"800",
},

  progressContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#EEF2F7",
    paddingTop: 12,
  },

  header: {

  flexDirection: "row",

  justifyContent: "space-between",

  alignItems: "center",

  marginBottom: 16,

},

orderBadge: {

  width: 54,

  height: 54,

  borderRadius: 18,

  backgroundColor: "#FFFFFF",

  justifyContent: "center",

  alignItems: "center",

  shadowColor: "#000",

  shadowOpacity: 0.08,

  shadowRadius: 10,

  shadowOffset: {
    width: 0,
    height: 5,
  },

  elevation: 5,

},

summaryRow: {

  flexDirection: "row",

  justifyContent: "space-between",

  marginBottom: 16,

},

summaryBox: {

  flex: 1,

  backgroundColor: "#F8FAFC",

  borderRadius: 16,

  paddingVertical: 14,

  marginHorizontal: 4,

  alignItems: "center",

},

summaryValue: {

  fontSize: 20,

  fontWeight: "800",

  color: "#0F172A",

},

summaryValueOrange: {

  fontSize: 20,

  fontWeight: "900",

  color: "#F97316",

},

summaryLabel: {

  marginTop: 6,

  color: "#64748B",

  fontSize: 12,

  fontWeight: "600",

},

trackButton: {

  height: 48,

  backgroundColor: "#F97316",

  borderRadius: 14,

  marginTop: 16,

  flexDirection: "row",

  justifyContent: "center",

  alignItems: "center",

},

trackButtonText: {

  marginLeft: 8,

  color: "#FFFFFF",

  fontWeight: "800",

  fontSize: 15,

},

actionRow: {

  flexDirection: "row",

  marginTop: 18,

},

secondaryButton: {

  flex: 1,

  height: 48,

  borderRadius: 14,

  borderWidth: 1,

  borderColor: "#F97316",

  justifyContent: "center",

  alignItems: "center",

  flexDirection: "row",

  marginRight: 10,

},

secondaryButtonText: {

  marginLeft: 8,

  color: "#F97316",

  fontWeight: "800",

  fontSize: 14,

},

captainCard: {

  marginTop: 18,

  marginBottom: 18,

  backgroundColor: "#ECFDF5",

  borderRadius: 18,

  padding: 14,

  flexDirection: "row",

  justifyContent: "space-between",

  alignItems: "center",

},

captainLeft: {

  flexDirection: "row",

  alignItems: "center",

},

captainAvatar: {

  width: 46,

  height: 46,

  borderRadius: 23,

  backgroundColor: "#DCFCE7",

  justifyContent: "center",

  alignItems: "center",

},

captainTitle: {

  color: "#64748B",

  fontSize: 12,

},

captainName: {

  marginTop: 2,

  color: "#166534",

  fontWeight: "800",

  fontSize: 16,

},

captainActions: {

  flexDirection: "row",

},

iconButton: {

  width: 42,

  height: 42,

  borderRadius: 21,

  backgroundColor: "#FFFFFF",

  justifyContent: "center",

  alignItems: "center",

  marginLeft: 10,

},

advanceBadge: {

  flexDirection: "row",

  alignItems: "center",

  marginTop: 8,

  backgroundColor: "#ECFDF5",

  borderRadius: 12,

  paddingHorizontal: 8,

  paddingVertical: 4,

},

advanceBadgeText: {

  marginLeft: 4,

  color: "#166534",

  fontSize: 11,

  fontWeight: "700",

},

balanceBadge: {

  flexDirection: "row",

  alignItems: "center",

  marginTop: 8,

  backgroundColor: "#FEF2F2",

  borderRadius: 12,

  paddingHorizontal: 8,

  paddingVertical: 4,

},

balanceBadgeText: {

  marginLeft: 4,

  color: "#B91C1C",

  fontSize: 11,

  fontWeight: "700",

},

});