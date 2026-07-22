import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Card from "../ui/Card";

type Shop = {
  id: string;
  shopName: string;
  address?: string;
};

type Props = {
  shop?: Shop;
  canChange?: boolean;
  onChange: () => void;
};

export default function SelectedShopCard({
  shop,
  canChange = true,
  onChange,
}: Props) {
  return (
    <Card>

      <View style={styles.header}>

        <Text style={styles.heading}>
          Delivery Shop
        </Text>

        {canChange && (
          <TouchableOpacity
            onPress={onChange}
            activeOpacity={0.8}
            style={styles.changeButton}
          >
            <MaterialCommunityIcons
              name="swap-horizontal"
              size={16}
              color="#F97316"
            />

            <Text style={styles.changeText}>
              Change
            </Text>
          </TouchableOpacity>
        )}

      </View>

      <View style={styles.shopContainer}>

        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="storefront-outline"
            size={26}
            color="#F97316"
          />
        </View>

        <View style={styles.info}>

          <Text
            numberOfLines={1}
            style={styles.shopName}
          >
            {shop?.shopName || "No Shop Selected"}
          </Text>

          {!!shop?.address && (
            <Text
              numberOfLines={2}
              style={styles.address}
            >
              {shop.address}
            </Text>
          )}

          {!shop?.address && (
            <Text style={styles.address}>
              Please select a delivery shop.
            </Text>
          )}

        </View>

      </View>

    </Card>
  );
}

const styles = StyleSheet.create({

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  heading: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  changeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  changeText: {
    marginLeft: 4,
    color: "#F97316",
    fontWeight: "700",
    fontSize: 13,
  },

  shopContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  info: {
    flex: 1,
  },

  shopName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  address: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
  },

});