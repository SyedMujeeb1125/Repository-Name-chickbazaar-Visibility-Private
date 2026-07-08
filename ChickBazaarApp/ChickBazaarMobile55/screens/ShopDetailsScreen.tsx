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
    ScrollView,
    StyleSheet,
} from "react-native";

import ProfileCard from "../components/profile/ProfileCard";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInput from "../components/profile/ProfileInput";
import ProfileSaveButton from "../components/profile/ProfileSaveButton";

export default function ShopDetailsScreen({
  navigation,
}: any) {

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [shopName, setShopName] =
    useState("");

  const [businessType, setBusinessType] =
    useState("");

  const [gstNumber, setGstNumber] =
    useState("");

  const [fssaiNumber, setFssaiNumber] =
    useState("");

  const [shopAddress, setShopAddress] =
    useState("");

  useEffect(() => {

    loadShop();

  }, []);

  async function loadShop() {

    try {

      const mobile =
        await AsyncStorage.getItem(
          "retailerMobile"
        );

      const response =
        await fetch(
          `https://www.chickbazaar.com/api/mobile/profile?mobile=${mobile}`
        );

      const data =
        await response.json();

      setShopName(
        data.shopName || ""
      );

      setBusinessType(
        data.businessType ||
        "Chicken Shop"
      );

      setGstNumber(
        data.gstNumber || ""
      );

      setFssaiNumber(
        data.fssaiNumber || ""
      );

      setShopAddress(
        data.address || ""
      );

    } catch {

      Alert.alert(
        "Error",
        "Unable to load shop details."
      );

    } finally {

      setLoading(false);

    }

  }

  async function saveShop() {

    try {

      setSaving(true);

      /*
        Future API

        PUT

        /api/mobile/shop
      */

      await new Promise(resolve =>
        setTimeout(resolve, 1200)
      );

      Alert.alert(
        "Success",
        "Shop details updated successfully."
      );

    } catch {

      Alert.alert(
        "Error",
        "Unable to update shop details."
      );

    } finally {

      setSaving(false);

    }

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >

        <ProfileHeader
          title="Shop Details"
          subtitle="Manage your business information."
          onBack={() =>
            navigation.goBack()
          }
        />

        <ProfileCard>

          <ProfileInput
            label="Shop Name"
            value={shopName}
            onChangeText={setShopName}
            placeholder="Shop Name"
          />

          <ProfileInput
            label="Business Type"
            value={businessType}
            onChangeText={setBusinessType}
            placeholder="Business Type"
          />

          <ProfileInput
            label="GST Number"
            value={gstNumber}
            onChangeText={setGstNumber}
            placeholder="GST Number"
            autoCapitalize="characters"
          />

          <ProfileInput
            label="FSSAI Number"
            value={fssaiNumber}
            onChangeText={setFssaiNumber}
            placeholder="FSSAI Number"
          />

          <ProfileInput
            label="Shop Address"
            value={shopAddress}
            onChangeText={setShopAddress}
            placeholder="Complete Shop Address"
            multiline
            textAlignVertical="top"
            style={{
              height: 110,
              paddingTop: 14,
            }}
          />

          <ProfileSaveButton
            loading={saving}
            onPress={saveShop}
          />

        </ProfileCard>
              </ScrollView>

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

});