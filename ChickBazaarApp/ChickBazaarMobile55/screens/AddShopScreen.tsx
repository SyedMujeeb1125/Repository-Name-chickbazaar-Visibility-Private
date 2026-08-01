import React, {
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import ProfileCard from "../components/profile/ProfileCard";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInput from "../components/profile/ProfileInput";
import ProfileSaveButton from "../components/profile/ProfileSaveButton";

export default function AddShopScreen({
  navigation,
}: any) {

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    shopName,
    setShopName,
  ] = useState("");

  const [
    shopType,
    setShopType,
  ] = useState("Retail Shop");

  const [
    contactPerson,
    setContactPerson,
  ] = useState("");

  const [
    mobileNumber,
    setMobileNumber,
  ] = useState("");

  const [
    alternateMobile,
    setAlternateMobile,
  ] = useState("");

  const [
  useRegisteredMobile,
  setUseRegisteredMobile,
] = useState(true);

  const [
    address,
    setAddress,
  ] = useState("");

  const [
    landmark,
    setLandmark,
  ] = useState("");

  const [
    area,
    setArea,
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
    deliveryInstructions,
    setDeliveryInstructions,
  ] = useState("");

  const [
    gstNumber,
    setGstNumber,
  ] = useState("");

  const [
    fssaiNumber,
    setFssaiNumber,
  ] = useState("");

  function validate() {

    if (!shopName.trim()) {

      Alert.alert(
        "Validation",
        "Please enter shop name."
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

    if (
  !useRegisteredMobile &&
  mobileNumber.length !== 10
) {
  Alert.alert(
    "Validation",
    "Please enter a valid mobile number."
  );
  return false;
}

    if (!address.trim()) {

      Alert.alert(
        "Validation",
        "Please enter complete address."
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

  async function saveShop() {

    if (!validate()) {
      return;
    }

    try {

      setSaving(true);

      const retailerMobile =
        await AsyncStorage.getItem(
          "retailerMobile"
        );

      const response =
        await fetch(
          "https://www.chickbazaar.com/api/mobile/add-shop",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({

              mobile:
                retailerMobile,

              ownerName:
                contactPerson,

              shopName,

              address,

              landmark,

              area,

              city,

              state,

              pincode,

              shopType,

              mobileNumber: useRegisteredMobile
  ? retailerMobile
  : mobileNumber,

              alternateMobile,

              deliveryInstructions,

              gstNumber,

              fssaiNumber,

            }),

          }
        );

      const data =
        await response.json();

      if (data.success) {

        Alert.alert(
          "Success",
          "Shop added successfully.",
          [
            {
              text: "OK",
              onPress() {
                navigation.goBack();
              },
            },
          ]
        );

      } else {

        Alert.alert(
          "Error",
          data.message ??
            "Unable to save shop."
        );

      }

    } catch (error: any) {

      Alert.alert(
        "Error",
        error?.message ??
          "Something went wrong."
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
          title="Add Shop"
          subtitle="Create a new shop for placing and receiving orders."
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
              name="store-plus"
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
              New Shop
            </Text>

            <Text
              style={styles.heroSubtitle}
            >
              Add your retail shop,
              warehouse or branch to
              manage deliveries
              separately.
            </Text>

          </View>

        </View>

        <ProfileCard>

          <Text
            style={styles.sectionTitle}
          >
            Shop Information
          </Text>

          <Text
            style={styles.helperText}
          >
            Enter the basic details of
            your shop.
          </Text>

          <ProfileInput
            label="Shop Name"
            value={shopName}
            onChangeText={
              setShopName
            }
            placeholder="Royal Chicken Center"
          />

          <Text style={styles.inputLabel}>
  Shop Type
</Text>

<View style={styles.shopTypeContainer}>

  {[
    "Chicken Shop",
    "Wholesale Chicken Shop",
    "Retail + Wholesale",
  ].map((type) => {

    const selected = shopType === type;

    return (

      <TouchableOpacity
        key={type}
        activeOpacity={0.8}
        style={[
          styles.shopTypeCard,
          selected &&
            styles.shopTypeCardActive,
        ]}
        onPress={() =>
          setShopType(type)
        }
      >

        <MaterialCommunityIcons
          name={
            selected
              ? "radiobox-marked"
              : "radiobox-blank"
          }
          size={22}
          color={
            selected
              ? "#F97316"
              : "#94A3B8"
          }
        />

        <View
          style={{
            flex: 1,
            marginLeft: 12,
          }}
        >

          <Text
            style={[
              styles.shopTypeTitle,
              selected &&
                styles.shopTypeTitleActive,
            ]}
          >
            {type}
          </Text>

        </View>

      </TouchableOpacity>

    );

  })}

</View>

          <ProfileInput
            label="Contact Person"
            value={contactPerson}
            onChangeText={
              setContactPerson
            }
            placeholder="Contact Person"
          />

          <Text style={styles.inputLabel}>
  Shop Contact Number
</Text>

<TouchableOpacity
  activeOpacity={0.8}
  style={styles.mobileCard}
  onPress={() =>
    setUseRegisteredMobile(true)
  }
>

  <MaterialCommunityIcons
    name={
      useRegisteredMobile
        ? "radiobox-marked"
        : "radiobox-blank"
    }
    size={22}
    color={
      useRegisteredMobile
        ? "#F97316"
        : "#94A3B8"
    }
  />

  <View
    style={{
      flex: 1,
      marginLeft: 12,
    }}
  >

    <Text style={styles.mobileTitle}>
      Same as Registered Mobile
    </Text>

    <Text style={styles.mobileSubtitle}>
      Use your ChickBazaar account
      number for deliveries.
    </Text>

  </View>

</TouchableOpacity>

<TouchableOpacity
  activeOpacity={0.8}
  style={styles.mobileCard}
  onPress={() =>
    setUseRegisteredMobile(false)
  }
>

  <MaterialCommunityIcons
    name={
      !useRegisteredMobile
        ? "radiobox-marked"
        : "radiobox-blank"
    }
    size={22}
    color={
      !useRegisteredMobile
        ? "#F97316"
        : "#94A3B8"
    }
  />

  <View
    style={{
      flex: 1,
      marginLeft: 12,
    }}
  >

    <Text style={styles.mobileTitle}>
      Use Different Mobile Number
    </Text>

    <Text style={styles.mobileSubtitle}>
      Deliveries for this shop will
      use another contact number.
    </Text>

  </View>

</TouchableOpacity>

{!useRegisteredMobile && (

  <>
    <ProfileInput
      label="Shop Mobile Number"
      value={mobileNumber}
      onChangeText={setMobileNumber}
      keyboardType="phone-pad"
      maxLength={10}
      placeholder="9876543210"
    />

    <ProfileInput
      label="Alternate Mobile"
      value={alternateMobile}
      onChangeText={setAlternateMobile}
      keyboardType="phone-pad"
      maxLength={10}
      placeholder="Optional"
    />
  </>

)}

        </ProfileCard>

        <ProfileCard>

          <Text
            style={styles.sectionTitle}
          >
            Shop Address
          </Text>

          <Text
            style={styles.helperText}
          >
            This address will be used
            for order deliveries.
          </Text>

          <ProfileInput
            label="Complete Address"
            value={address}
            onChangeText={
              setAddress
            }
            placeholder="Enter complete address"
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
            onChangeText={
              setLandmark
            }
            placeholder="Near Metro Station"
          />

          <ProfileInput
            label="Area / Locality"
            value={area}
            onChangeText={
              setArea
            }
            placeholder="Jayanagar"
          />

                    <ProfileInput
            label="City"
            value={city}
            onChangeText={
              setCity
            }
            placeholder="Bangalore"
          />

          <ProfileInput
            label="State"
            value={state}
            onChangeText={
              setState
            }
            placeholder="Karnataka"
          />

          <ProfileInput
            label="Pincode"
            value={pincode}
            onChangeText={
              setPincode
            }
            keyboardType="number-pad"
            maxLength={6}
            placeholder="560001"
          />

        </ProfileCard>

        <ProfileCard>

          <Text
            style={styles.sectionTitle}
          >
            Business Information
          </Text>

          <Text
            style={styles.helperText}
          >
            Optional information to
            help manage your shop.
          </Text>

          <ProfileInput
            label="GST Number"
            value={gstNumber}
            onChangeText={
              setGstNumber
            }
            placeholder="Optional"
          />

          <ProfileInput
            label="FSSAI Number"
            value={fssaiNumber}
            onChangeText={
              setFssaiNumber
            }
            placeholder="Optional"
          />

          <ProfileInput
            label="Delivery Instructions"
            value={
              deliveryInstructions
            }
            onChangeText={
              setDeliveryInstructions
            }
            placeholder="Call before delivery, loading entrance, etc."
            multiline
            textAlignVertical="top"
            style={{
              height: 110,
              paddingTop: 14,
            }}
          />

          <View
            style={styles.locationCard}
          >

            <View
              style={styles.locationIcon}
            >

              <MaterialCommunityIcons
                name="map-marker-radius"
                size={28}
                color="#F97316"
              />

            </View>

            <View
              style={styles.locationContent}
            >

              <Text
                style={styles.locationTitle}
              >
                Shop Location
              </Text>

              <Text
                style={styles.locationSubtitle}
              >
                Map integration can be
                enabled later to allow
                selecting the exact
                delivery location.
              </Text>

            </View>

          </View>

          <View
            style={styles.saveContainer}
          >

            <ProfileSaveButton
              loading={saving}
              title="SAVE SHOP"
              onPress={saveShop}
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
    marginBottom: 6,
  },

  helperText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
    marginBottom: 18,
  },

  locationCard: {
    marginTop: 12,

    backgroundColor: "#FFF7ED",

    borderRadius: 20,

    padding: 18,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#FED7AA",
  },

  locationIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  locationContent: {
    flex: 1,
  },

  locationTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  locationSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },

  saveContainer: {
    marginTop: 24,
  },

  inputLabel: {
  fontSize: 15,
  fontWeight: "700",
  color: "#0F172A",
  marginBottom: 10,
},

shopTypeContainer: {
  marginBottom: 18,
},

shopTypeCard: {
  flexDirection: "row",
  alignItems: "center",

  padding: 16,

  borderRadius: 18,

  backgroundColor: "#F8FAFC",

  borderWidth: 1,
  borderColor: "#E2E8F0",

  marginBottom: 12,
},

shopTypeCardActive: {
  borderColor: "#F97316",
  backgroundColor: "#FFF7ED",
},

shopTypeTitle: {
  fontSize: 15,
  fontWeight: "600",
  color: "#334155",
},

shopTypeTitleActive: {
  color: "#F97316",
},

mobileCard: {
  flexDirection: "row",
  alignItems: "center",

  padding: 16,

  borderRadius: 18,

  backgroundColor: "#F8FAFC",

  borderWidth: 1,
  borderColor: "#E2E8F0",

  marginBottom: 14,
},

mobileTitle: {
  fontSize: 15,
  fontWeight: "700",
  color: "#0F172A",
},

mobileSubtitle: {
  marginTop: 3,
  fontSize: 13,
  color: "#64748B",
  lineHeight: 18,
},

});