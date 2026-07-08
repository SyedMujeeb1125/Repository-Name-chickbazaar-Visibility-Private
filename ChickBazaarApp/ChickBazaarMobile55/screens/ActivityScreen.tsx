import React, {
  useEffect,
  useState,
} from "react";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import NotificationCard from "../components/notifications/NotificationCard";

type ActivityItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
};

export default function ActivityScreen() {

  const [
    activities,
    setActivities,
  ] = useState<ActivityItem[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {

    try {

      const response =
        await fetch(
          "https://www.chickbazaar.com/api/mobile/activity"
        );

      const data =
        await response.json();

      setActivities(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
      setRefreshing(false);

    }

  }

  async function onRefresh() {

    setRefreshing(true);

    await loadActivities();

  }

  if (loading) {

    return (

      <SafeAreaView
        style={styles.loadingContainer}
      >

        <ActivityIndicator
          size="large"
          color="#F97316"
        />

      </SafeAreaView>

    );

  }

  return (

    <SafeAreaView
      style={styles.safeArea}
    >

      <View
        style={styles.container}
      >

        <View style={styles.header}>

  <View style={styles.headerLeft}>

  <Text style={styles.title}>
    Activity
  </Text>

  <Text style={styles.subtitle}>
    Orders • Payments • Rates • Offers
  </Text>

</View>

  <View style={styles.activityBadge}>

  <Text style={styles.activityBadgeText}>
    {activities.length}
  </Text>

</View>

</View>

<View style={styles.filterRow}>

  <TouchableOpacity style={styles.activeChip}>
    <Text style={styles.activeChipText}>
      All
    </Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.chip}>
    <Text style={styles.chipText}>
      Orders
    </Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.chip}>
    <Text style={styles.chipText}>
      Payments
    </Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.chip}>
    <Text style={styles.chipText}>
      Rates
    </Text>
  </TouchableOpacity>

</View>

        <FlatList

        

          data={activities}

          keyExtractor={(item) =>
            item.id
          }
          

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
            
          }

          ListEmptyComponent={

            <View
              style={styles.emptyContainer}
            >

              <View
  style={styles.emptyIcon}
>

  <Text
    style={{
      fontSize: 60,
    }}
  >
    🔔
  </Text>

</View>

<Text
  style={styles.emptyTitle}
>
  No Notifications Yet
</Text>

<Text
  style={styles.emptyText}
>

  We'll notify you about
  orders, payments,
  live rates and deliveries.

</Text>

            </View>

          }

          renderItem={({ item }) => (

            <NotificationCard

              icon={item.icon}

              title={item.title}

              message={
                item.description
              }

              time={item.time}

              unread={false}

            />

          )}

        />

      </View>

      

    </SafeAreaView>

  );

}



const styles =
  StyleSheet.create({

    header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
},


    safeArea: {
      flex: 1,
      backgroundColor: "#F8FAFC",
    },

    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F8FAFC",
    },

    container: {
      flex: 1,
      padding: 20,
    },

    title: {
  fontSize:28,
  fontWeight:"800",
      color: "#0F172A",
      marginBottom: 20,
    },

    emptyContainer: {
      marginTop: 80,
      alignItems: "center",
    },

    emptyText:{
  fontSize:15,
  color:"#64748B",
  textAlign:"center",
  lineHeight:24,
  paddingHorizontal:40,
},

    emptyIcon: {
  marginBottom: 18,
},

emptyTitle: {
  fontSize: 22,
  fontWeight: "800",
  color: "#0F172A",
  marginBottom: 10,
},

headerLeft: {
  flex: 1,
},

subtitle: {
  marginTop: 4,
  fontSize: 14,
  color: "#64748B",
},

activityBadge: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#F97316",

  justifyContent: "center",
  alignItems: "center",
},

activityBadgeText: {
  color: "#FFFFFF",
  fontWeight: "800",
  fontSize: 16,
},

filterRow: {
  flexDirection: "row",
  marginBottom: 18,
},

activeChip: {
  backgroundColor: "#F97316",
  borderRadius: 18,
  paddingHorizontal: 16,
  paddingVertical: 8,
  marginRight: 8,
},

activeChipText: {
  color: "#FFFFFF",
  fontWeight: "700",
},

chip: {
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  paddingHorizontal: 16,
  paddingVertical: 8,
  marginRight: 8,
},

chipText: {
  color: "#64748B",
  fontWeight: "600",
},

  });