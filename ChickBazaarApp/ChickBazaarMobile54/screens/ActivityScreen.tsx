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
  FlatList,
  ActivityIndicator,
  RefreshControl,
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

        <Text
          style={styles.title}
        >
          Activity
        </Text>

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

              <Text
                style={styles.emptyText}
              >
                No activity available
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
      fontSize: 30,
      fontWeight: "700",
      color: "#0F172A",
      marginBottom: 20,
    },

    emptyContainer: {
      marginTop: 80,
      alignItems: "center",
    },

    emptyText: {
      fontSize: 16,
      color: "#94A3B8",
    },

  });