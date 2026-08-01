import React, {
  useEffect,
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

export default function ProfileScreen({
  navigation,
}: any) {
  const [retailer, setRetailer] =
    useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
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

      setRetailer(data);
    } catch {
      Alert.alert(
        "Unable to Load",
        "Please try again."
      );
    }
  }

  async function logout() {
    await AsyncStorage.removeItem(
      "retailerMobile"
    );

    Alert.alert(
      "Success",
      "Logged Out"
    );

    navigation.replace(
      "Login"
    );
  }

  if (!retailer) {
    return (
      <SafeAreaView
        style={styles.loadingContainer}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
  style={styles.safeArea}
  edges={["top"]}
>
      <ScrollView
        contentContainerStyle={
          styles.container
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <View
          style={styles.profileHeader}
        >
          <View
            style={styles.avatar}
          >
            <Text
              style={
                styles.avatarText
              }
            >
              {(
                retailer.ownerName ||
                "R"
              )
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>

          <Text
            style={styles.ownerName}
          >
            {retailer.shopName}
          </Text>

          <View
            style={
              styles.statusBadge
            }
          >
            <Text
              style={
                styles.statusText
              }
            >
              ✓ Verified Retail Partner
            </Text>
          </View>

          <Text
            style={
              styles.memberSince
            }
          >
            Delivering with
            {" "}
            ChickBazaar
          </Text>
        </View>

        <View
          style={styles.card}
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            🏪 Shop Information
          </Text>

          <Text
            style={styles.label}
          >
            Shop Name
          </Text>

          <Text
            style={styles.value}
          >
            {retailer.shopName ||
              "-"}
          </Text>

          <Text
            style={styles.label}
          >
            Owner
          </Text>

          <Text
            style={styles.value}
          >
            {retailer.ownerName ||
              "-"}
          </Text>

          <Text
            style={styles.label}
          >
            Retailer ID
          </Text>

          <Text
            style={styles.value}
          >
            {retailer.retailerId ||
              retailer.id ||
              "-"}
          </Text>
        </View>

        <View
          style={styles.card}
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            📞 Contact Information
          </Text>

          <Text
            style={styles.label}
          >
            Mobile
          </Text>

          <Text
            style={styles.value}
          >
            {retailer.mobile ||
              "-"}
          </Text>

          <Text
            style={styles.label}
          >
            Email
          </Text>

          <Text
            style={styles.value}
          >
            {retailer.email ||
              "-"}
          </Text>

          <Text
            style={styles.label}
          >
            Address
          </Text>

          <Text
            style={styles.value}
          >
            {retailer.address ||
              "-"}
          </Text>
        </View>

        <View
          style={styles.card}
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            📄 Business Information
          </Text>

          <Text
            style={styles.label}
          >
            GST Number
          </Text>

          <Text
            style={styles.value}
          >
            {retailer.gstNumber ||
              retailer.gstin ||
              "Not Available"}
          </Text>

          <Text
            style={styles.label}
          >
            Delivery Area
          </Text>

          <Text
            style={styles.value}
          >
            {retailer.deliveryArea ||
              retailer.area ||
              retailer.city ||
              "-"}
          </Text>

          <Text
            style={styles.label}
          >
            Status
          </Text>

          <Text
            style={styles.value}
          >
            Active
          </Text>
        </View>

        <View
          style={styles.card}
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            ⚡ Quick Actions
          </Text>

          <TouchableOpacity
            style={
              styles.actionButton
            }
            onPress={() =>
              navigation.navigate(
                "MyShops"
              )
            }
          >
            <Text
              style={
                styles.actionText
              }
            >
              🏪 My Shops
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.actionButton
            }
            onPress={() =>
              navigation.navigate(
                "Activity"
              )
            }
          >
            <Text
              style={
                styles.actionText
              }
            >
              🔔 Notifications
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.actionButton
            }
            onPress={() =>
              Alert.alert(
                "Coming Soon",
                "Help & Support will be available soon."
              )
            }
          >
            <Text
              style={
                styles.actionText
              }
            >
              💬 Help & Support
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={
            styles.logoutButton
          }
          onPress={logout}
        >
          <Text
            style={
              styles.logoutText
            }
          >
            Logout
          </Text>
        </TouchableOpacity>

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
    padding: 18,
    paddingBottom: 40,
  },

  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },

  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    elevation: 3,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
  },

  ownerName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },

  welcome: {
    color: "#64748B",
    fontSize: 16,
    marginBottom: 6,
  },

  ownerRole: {
    color: "#64748B",
    marginTop: 4,
    fontSize: 15,
  },

  memberSince: {
    color: "#94A3B8",
    marginTop: 8,
    fontSize: 14,
  },

  statusBadge: {
    marginTop: 10,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: "#166534",
    fontWeight: "700",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 18,
  },

  label: {
    color: "#64748B",
    fontSize: 13,
    marginTop: 12,
    marginBottom: 5,
  },

  value: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "600",
  },

  actionButton: {
    backgroundColor: "#FFF7ED",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },

  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EA580C",
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    borderRadius: 16,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});