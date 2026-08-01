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

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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

      setActivities(
        Array.isArray(data)
          ? data
          : []
      );

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

        <View
          style={styles.header}
        >

          <View
            style={styles.headerLeft}
          >

            <Text
              style={styles.title}
            >
              Activity
            </Text>

            <Text
              style={styles.subtitle}
            >
              Orders • Payments •
              Rates • Offers
            </Text>

          </View>

          <View
            style={styles.activityBadge}
          >

            <Text
              style={
                styles.activityBadgeCount
              }
            >
              {activities.length}
            </Text>

            <Text
              style={
                styles.activityBadgeLabel
              }
            >
              NEW
            </Text>

          </View>

        </View>

        <View
          style={styles.filterRow}
        >

          <TouchableOpacity
            style={styles.activeChip}
          >

            <Text
              style={
                styles.activeChipText
              }
            >
              All
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chip}
          >

            <Text
              style={styles.chipText}
            >
              Orders
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chip}
          >

            <Text
              style={styles.chipText}
            >
              Payments
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chip}
          >

            <Text
              style={styles.chipText}
            >
              Rates
            </Text>

          </TouchableOpacity>

        </View>

        <FlatList

          data={activities}

          keyExtractor={(
            item,
            index,
          ) =>
            String(
              item.id ??
              index
            )
          }

          contentContainerStyle={
            styles.listContent
          }

          refreshControl={

            <RefreshControl
              refreshing={
                refreshing
              }
              onRefresh={
                onRefresh
              }
            />

          }

          ListEmptyComponent={

            <View
              style={
                styles.emptyContainer
              }
            >

              <View
                style={
                  styles.emptyIcon
                }
              >

                <MaterialCommunityIcons
                  name="bell-outline"
                  size={56}
                  color="#CBD5E1"
                />

              </View>

              <Text
                style={
                  styles.emptyTitle
                }
              >
                No Notifications Yet
              </Text>

              <Text
                style={
                  styles.emptyText
                }
              >
                We'll notify you
                about orders,
                payments, live
                rates, offers and
                deliveries here.
              </Text>

            </View>

          }

          renderItem={({
            item,
          }) => (

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

const styles = StyleSheet.create({

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
    paddingHorizontal: 20,
    paddingTop: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  headerLeft: {
    flex: 1,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#64748B",
    lineHeight: 22,
  },

  activityBadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#F97316",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  activityBadgeCount: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  activityBadgeLabel: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 18,
  },

  activeChip: {
    backgroundColor: "#F97316",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
  },

  activeChipText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  chip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,

    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  chipText: {
    color: "#475569",
    fontWeight: "600",
    fontSize: 14,
  },

  listContent: {
    paddingBottom: 140,
    flexGrow: 1,
  },

  emptyContainer: {
    marginTop: 70,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 44,
    paddingHorizontal: 24,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 15,
    lineHeight: 24,
    paddingHorizontal: 12,
  },

});