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
    StyleSheet
} from "react-native";

import ProfileCard from "../components/profile/ProfileCard";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInput from "../components/profile/ProfileInput";
import ProfileSaveButton from "../components/profile/ProfileSaveButton";
import ReadOnlyField from "../components/profile/ReadOnlyField";

export default function PersonalDetailsScreen({
  navigation,
}: any) {

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [ownerName, setOwnerName] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  useEffect(() => {

    loadProfile();

  }, []);

  async function loadProfile() {

    try {

      const retailerMobile =
        await AsyncStorage.getItem(
          "retailerMobile"
        );

      const response =
        await fetch(
          `https://www.chickbazaar.com/api/mobile/profile?mobile=${retailerMobile}`
        );

      const data =
        await response.json();

      setOwnerName(
        data.ownerName || ""
      );

      setMobile(
        data.mobile || ""
      );

      setEmail(
        data.email || ""
      );

      setAddress(
        data.address || ""
      );

    } catch {

      Alert.alert(
        "Error",
        "Unable to load profile."
      );

    } finally {

      setLoading(false);

    }

  }

  async function saveProfile() {

    try {

      setSaving(true);

      /*
        Future API

        PUT

        /api/mobile/profile
      */

      await new Promise(resolve =>
        setTimeout(resolve, 1200)
      );

      Alert.alert(
        "Success",
        "Profile updated successfully."
      );

    } catch {

      Alert.alert(
        "Error",
        "Unable to update profile."
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
          title="Personal Details"
          subtitle="Manage your account information."
          onBack={() =>
            navigation.goBack()
          }
        />

        <ProfileCard>

          <ProfileInput
            label="Owner Name"
            value={ownerName}
            onChangeText={setOwnerName}
            placeholder="Owner Name"
          />

          <ReadOnlyField
            label="Mobile Number"
            value={mobile}
          />

          <ProfileInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ProfileInput
            label="Address"
            value={address}
            onChangeText={setAddress}
            placeholder="Complete Address"
            multiline
            textAlignVertical="top"
            style={{
              height: 110,
              paddingTop: 14,
            }}
          />

          <ProfileSaveButton
            loading={saving}
            onPress={saveProfile}
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