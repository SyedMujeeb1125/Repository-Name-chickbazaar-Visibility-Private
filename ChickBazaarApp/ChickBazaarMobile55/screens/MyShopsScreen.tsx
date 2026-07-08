import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

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

type Shop = {
  id: string;
  shopName: string;
  address: string;
  mobile?: string;
  isPrimary?: boolean;
};

export default function MyShopsScreen({
  navigation,
}: any) {

  const [shops, setShops] =
    useState<Shop[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  useEffect(() => {

    loadShops();

  }, []);

  async function loadShops() {

    try {

      const mobile =
        await AsyncStorage.getItem(
          "retailerMobile"
        );

      const response =
        await fetch(
          `https://www.chickbazaar.com/api/mobile/shops?mobile=${mobile}`
        );

      const data =
        await response.json();

      setShops(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
      setRefreshing(false);

    }

  }

  async function onRefresh() {

    setRefreshing(true);

    await loadShops();

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

  function renderShop({
    item,
  }: {
    item: Shop;
  }) {
      return (

    <View
      style={[
        styles.card,
        item.isPrimary &&
          styles.primaryCard,
      ]}
    >

      {item.isPrimary && (

        <View style={styles.primaryBadge}>

          <MaterialCommunityIcons
            name="star"
            size={14}
            color="#FFFFFF"
          />

          <Text
            style={styles.primaryText}
          >
            PRIMARY SHOP
          </Text>

        </View>

      )}

      <Text
        style={styles.shopName}
      >
        {item.shopName}
      </Text>

      <View style={styles.infoRow}>

        <MaterialCommunityIcons
          name="map-marker"
          size={18}
          color="#EF4444"
        />

        <Text
          style={styles.info}
        >
          {item.address}
        </Text>

      </View>

      {!!item.mobile && (

        <View style={styles.infoRow}>

          <MaterialCommunityIcons
            name="phone"
            size={18}
            color="#16A34A"
          />

          <Text
            style={styles.info}
          >
            {item.mobile}
          </Text>

        </View>

      )}

      <TouchableOpacity
        style={styles.editButton}
        activeOpacity={0.8}
      >

        <Text
          style={styles.editText}
        >
          Edit Shop
        </Text>

        <MaterialCommunityIcons
          name="chevron-right"
          size={18}
          color="#F97316"
        />

      </TouchableOpacity>

    </View>

  );

}

return (

  <SafeAreaView
    style={styles.safeArea}
  >

    <FlatList

      data={shops}

      keyExtractor={(item) =>
        item.id
      }

      renderItem={renderShop}

      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#F97316"]}
        />
      }

      ListHeaderComponent={

        <>

          <Text style={styles.title}>
            My Shops
          </Text>

          <Text style={styles.subtitle}>
            Manage all your delivery locations.
          </Text>

        </>

      }

      ListEmptyComponent={

        <View
          style={styles.emptyContainer}
        >

          <MaterialCommunityIcons
            name="store-outline"
            size={64}
            color="#CBD5E1"
          />

          <Text
            style={styles.emptyTitle}
          >
            No Shops Found
          </Text>

          <Text
            style={styles.emptyText}
          >
            Add your first delivery location to start ordering.
          </Text>

        </View>

      }

      ListFooterComponent={

        <TouchableOpacity

          style={styles.addButton}

          activeOpacity={0.85}

          onPress={() =>
            navigation.navigate(
              "AddShop"
            )
          }

        >

          <MaterialCommunityIcons
            name="plus"
            size={22}
            color="#FFFFFF"
          />

          <Text
            style={styles.addText}
          >
            Add New Shop
          </Text>

        </TouchableOpacity>

      }

      contentContainerStyle={
        styles.content
      }

      showsVerticalScrollIndicator={false}

    />

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

  content: {
    padding: 18,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 24,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 20,

    marginBottom: 18,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 6,
  },

  primaryCard: {
    borderWidth: 2,
    borderColor: "#F97316",
  },

  primaryBadge: {

    alignSelf: "flex-start",

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#F97316",

    borderRadius: 14,

    paddingHorizontal: 12,

    paddingVertical: 6,

    marginBottom: 16,

  },

  primaryText: {

    marginLeft: 6,

    color: "#FFFFFF",

    fontWeight: "800",

    fontSize: 12,

    letterSpacing: 0.5,

  },

  shopName: {

    fontSize: 22,

    fontWeight: "800",

    color: "#0F172A",

    marginBottom: 14,

  },

  infoRow: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 12,

  },

  info: {

    flex: 1,

    marginLeft: 10,

    color: "#475569",

    fontSize: 15,

    lineHeight: 22,

  },

  editButton: {

    marginTop: 10,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "#FFF7ED",

    borderRadius: 16,

    paddingVertical: 14,

  },

  editText: {

    color: "#F97316",

    fontWeight: "700",

    fontSize: 15,

    marginRight: 4,

  },

  addButton: {

    marginTop: 12,

    height: 58,

    borderRadius: 18,

    backgroundColor: "#F97316",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    shadowColor: "#F97316",

    shadowOpacity: 0.25,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 8,

  },

  addText: {

    marginLeft: 10,

    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "800",

  },

  emptyContainer: {

    alignItems: "center",

    marginTop: 80,

    marginBottom: 80,

  },

  emptyTitle: {

    marginTop: 18,

    fontSize: 22,

    fontWeight: "800",

    color: "#0F172A",

  },

  emptyText: {

    marginTop: 10,

    fontSize: 15,

    color: "#64748B",

    textAlign: "center",

    lineHeight: 24,

    paddingHorizontal: 30,

  },

});