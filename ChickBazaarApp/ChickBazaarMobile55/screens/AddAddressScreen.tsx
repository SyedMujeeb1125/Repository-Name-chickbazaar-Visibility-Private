import React, {
  useState,
} from "react";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import ProfileCard from "../components/profile/ProfileCard";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInput from "../components/profile/ProfileInput";
import ProfileSaveButton from "../components/profile/ProfileSaveButton";

import AddressService from "../services/address.service";

export default function AddAddressScreen({
  navigation,
}: any) {

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    name,
    setName,
  ] = useState("");

  const [
    contactPerson,
    setContactPerson,
  ] = useState("");

  const [
    mobile,
    setMobile,
  ] = useState("");

  const [
    address,
    setAddress,
  ] = useState("");

  const [
    landmark,
    setLandmark,
  ] = useState("");

  const [
    city,
    setCity,
  ] = useState("");

  const [
    state,
    setState,
  ] = useState("Karnataka");

  const [
    pincode,
    setPincode,
  ] = useState("");

  const [
    isDefault,
  ] = useState(false);

  function validate() {

    if (!name.trim()) {

      Alert.alert(
        "Validation",
        "Please enter address name."
      );

      return false;

    }

    if (!contactPerson.trim()) {

      Alert.alert(
        "Validation",
        "Please enter contact person."
      );

      return false;

    }

    if (mobile.length !== 10) {

      Alert.alert(
        "Validation",
        "Please enter a valid mobile number."
      );

      return false;

    }

    if (!address.trim()) {

      Alert.alert(
        "Validation",
        "Please enter address."
      );

      return false;

    }

    if (!city.trim()) {

      Alert.alert(
        "Validation",
        "Please enter city."
      );

      return false;

    }

    if (!state.trim()) {

      Alert.alert(
        "Validation",
        "Please enter state."
      );

      return false;

    }

    if (pincode.length !== 6) {

      Alert.alert(
        "Validation",
        "Please enter a valid pincode."
      );

      return false;

    }

    return true;

  }

  async function saveAddress() {

    if (!validate()) {
      return;
    }

    try {

      setSaving(true);

      await AddressService.addAddress({

        name,

        contactPerson,

        mobile,

        address,

        landmark,

        city,

        state,

        pincode,

        isDefault,

      });

      Alert.alert(
        "Success",
        "Address added successfully.",
        [
          {
            text: "OK",
            onPress() {
              navigation.goBack();
            },
          },
        ]
      );

    } catch (error: any) {

      Alert.alert(
        "Error",
        error?.message ??
          "Unable to save address."
      );

    } finally {

      setSaving(false);

    }

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
          title="Add Delivery Address"
          subtitle="Create a delivery location for orders."
          onBack={() =>
            navigation.goBack()
          }
        />

        <View
          style={styles.heroCard}
        >

          <View
            style={styles.heroIcon}
          >

            <MaterialCommunityIcons
              name="map-marker-plus"
              size={34}
              color="#F97316"
            />

          </View>

          <View
            style={styles.heroContent}
          >

            <Text
              style={styles.heroTitle}
            >
              New Address
            </Text>

            <Text
              style={styles.heroSubtitle}
            >
              Add your shop,
              warehouse or home
              address for faster
              deliveries.
            </Text>

          </View>

        </View>

        <ProfileCard>

          <Text style={styles.sectionTitle}>
  Address Details
</Text>

<Text style={styles.helperText}>
  Enter the delivery location details below. This address will be used for order deliveries.
</Text>

          <ProfileInput
            label="Address Name"
            value={name}
            onChangeText={setName}
            placeholder="Shop / Warehouse / Home"
          />

          <ProfileInput
            label="Contact Person"
            value={contactPerson}
            onChangeText={setContactPerson}
            placeholder="Contact Person"
          />

          <ProfileInput
            label="Mobile Number"
            value={mobile}
            onChangeText={setMobile}
            placeholder="9876543210"
            keyboardType="phone-pad"
            maxLength={10}
          />

          <ProfileInput
            label="Complete Address"
            value={address}
            onChangeText={setAddress}
            placeholder="Enter complete delivery address"
            multiline
            textAlignVertical="top"
            style={{
              height: 120,
              paddingTop: 14,
            }}
          />

          <ProfileInput
            label="Landmark"
            value={landmark}
            onChangeText={setLandmark}
            placeholder="Near Metro Station"
          />

          <ProfileInput
            label="City"
            value={city}
            onChangeText={setCity}
            placeholder="Bangalore"
          />

          <ProfileInput
            label="State"
            value={state}
            onChangeText={setState}
            placeholder="Karnataka"
          />

          <ProfileInput
            label="Pincode"
            value={pincode}
            onChangeText={setPincode}
            placeholder="560001"
            keyboardType="number-pad"
            maxLength={6}
          />

          <View style={styles.saveContainer}>

  <ProfileSaveButton
    loading={saving}
    title="SAVE ADDRESS"
    onPress={saveAddress}
  />

</View>

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

  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 140,
  },

  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 22,

    flexDirection: "row",
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

  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 18,
  },

  heroContent: {
    flex: 1,
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },

  heroSubtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },

  helperText: {
    marginTop: -8,
    marginBottom: 18,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
  },

  saveContainer: {
    marginTop: 12,
  },

});