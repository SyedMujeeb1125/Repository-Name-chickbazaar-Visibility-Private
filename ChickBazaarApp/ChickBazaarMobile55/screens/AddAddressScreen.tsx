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
} from "react-native";

import ProfileCard from "../components/profile/ProfileCard";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInput from "../components/profile/ProfileInput";
import ProfileSaveButton from "../components/profile/ProfileSaveButton";

import AddressService from "../services/address.service";

export default function AddAddressScreen({
  navigation,
}: any) {

  const [saving, setSaving] =
    useState(false);

  const [name, setName] =
    useState("");

  const [contactPerson, setContactPerson] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [landmark, setLandmark] =
    useState("");

  const [city, setCity] =
    useState("");

  const [state, setState] =
    useState("Karnataka");

  const [pincode, setPincode] =
    useState("");

  const [isDefault] =
    useState(false);

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
          title="Add Address"
          subtitle="Create a new delivery address."
          onBack={() =>
            navigation.goBack()
          }
        />

        <ProfileCard>

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
            placeholder="Enter full address"
            multiline
            textAlignVertical="top"
            style={{
              height: 110,
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

          <ProfileSaveButton
            loading={saving}
            title="SAVE ADDRESS"
            onPress={saveAddress}
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

  container: {
    padding: 20,
    paddingBottom: 40,
  },

});