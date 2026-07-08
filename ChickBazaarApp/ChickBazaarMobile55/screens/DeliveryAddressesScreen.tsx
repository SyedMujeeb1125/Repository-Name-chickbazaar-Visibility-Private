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
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import EmptyProfileState from "../components/profile/EmptyProfileState";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileHeader from "../components/profile/ProfileHeader";

type Address = {

  id: string;

  name: string;

  address: string;

  city: string;

  pincode: string;

  isDefault: boolean;

};

export default function DeliveryAddressesScreen({
  navigation,
}: any) {

  const [loading, setLoading] =
    useState(true);

  const [addresses, setAddresses] =
    useState<Address[]>([]);

  useEffect(() => {

    loadAddresses();

  }, []);

  async function loadAddresses() {

    try {

      const mobile =
        await AsyncStorage.getItem(
          "retailerMobile"
        );

      const response =
        await fetch(
          `https://www.chickbazaar.com/api/mobile/addresses?mobile=${mobile}`
        );

      const data =
        await response.json();

      setAddresses(data ?? []);

    } catch {

      Alert.alert(
        "Error",
        "Unable to load addresses."
      );

    } finally {

      setLoading(false);

    }

  }

  function deleteAddress(id: string) {

    Alert.alert(

      "Delete Address",

      "Are you sure you want to delete this address?",

      [

        {
          text: "Cancel",
          style: "cancel",
        },

        {

          text: "Delete",

          style: "destructive",

          onPress() {

            setAddresses(current =>
              current.filter(
                x => x.id !== id
              )
            );

          },

        },

      ]

    );

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

      <FlatList

        data={addresses}

        keyExtractor={item => item.id}

        contentContainerStyle={
          styles.container
        }

        ListHeaderComponent={

          <>

            <ProfileHeader

              title="Delivery Addresses"

              subtitle="Manage delivery locations"

              onBack={() =>
                navigation.goBack()
              }

            />

            <TouchableOpacity

              style={styles.addButton}

              activeOpacity={0.9}

              onPress={() =>
                navigation.navigate(
                  "AddAddress"
                )
              }

            >

              <MaterialCommunityIcons
                name="plus-circle"
                size={22}
                color="#FFFFFF"
              />

              <Text style={styles.addText}>
                ADD NEW ADDRESS
              </Text>

            </TouchableOpacity>

          </>

        }

        ListEmptyComponent={

          <EmptyProfileState

            icon="map-marker-off"

            title="No Delivery Addresses"

            subtitle="Add your first delivery address to start placing orders."

            buttonTitle="ADD ADDRESS"

            onPress={() =>
              navigation.navigate(
                "AddAddress"
              )
            }

          />

        }

        renderItem={({ item }) => (

          <ProfileCard>

            <View
              style={styles.cardHeader}
            >

              <View style={{ flex: 1 }}>

                <Text
                  style={styles.name}
                >
                  {item.name}
                </Text>

                {item.isDefault && (

                  <View
                    style={styles.badge}
                  >

                    <Text
                      style={styles.badgeText}
                    >
                      DEFAULT
                    </Text>

                  </View>

                )}

              </View>

              <MaterialCommunityIcons
                name="map-marker"
                size={28}
                color="#F97316"
              />

            </View>

            <Text style={styles.address}>
              {item.address}
            </Text>

            <Text style={styles.city}>
              {item.city}
              {" • "}
              {item.pincode}
            </Text>

            <View style={styles.actions}>

              <TouchableOpacity

                style={styles.editButton}

                onPress={() =>
                  navigation.navigate(
                    "EditAddress",
                    {
                      address: item,
                    }
                  )
                }

              >

                <MaterialCommunityIcons
                  name="pencil"
                  size={18}
                  color="#2563EB"
                />

                <Text style={styles.editText}>
                  Edit
                </Text>

              </TouchableOpacity>

              <TouchableOpacity

                style={styles.deleteButton}

                onPress={() =>
                  deleteAddress(
                    item.id
                  )
                }

              >

                <MaterialCommunityIcons
                  name="delete"
                  size={18}
                  color="#DC2626"
                />

                <Text style={styles.deleteText}>
                  Delete
                </Text>

              </TouchableOpacity>

            </View>

          </ProfileCard>

        )}
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

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  addButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F97316",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 20,

    shadowColor: "#F97316",
    shadowOpacity: 0.30,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  addText: {
    marginLeft: 10,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.4,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  badge: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },

  badgeText: {
    color: "#166534",
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 0.5,
  },

  address: {
    marginTop: 16,
    color: "#334155",
    fontSize: 15,
    lineHeight: 24,
  },

  city: {
    marginTop: 8,
    color: "#64748B",
    fontSize: 14,
  },

  actions: {
    flexDirection: "row",
    marginTop: 22,
  },

  editButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginRight: 8,
  },

  editText: {
    marginLeft: 6,
    color: "#2563EB",
    fontWeight: "800",
    fontSize: 15,
  },

  deleteButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#FEF2F2",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginLeft: 8,
  },

  deleteText: {
    marginLeft: 6,
    color: "#DC2626",
    fontWeight: "800",
    fontSize: 15,
  },

});