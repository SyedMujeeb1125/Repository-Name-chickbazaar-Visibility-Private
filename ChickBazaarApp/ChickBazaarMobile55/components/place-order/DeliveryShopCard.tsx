import React from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {

  shopName: string;

  address: string;

  primary?: boolean;

  onPress: () => void;

};

export default function DeliveryShopCard({

  shopName,

  address,

  primary = true,

  onPress,

}: Props) {

  return (

    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}
    >

      <Text style={styles.heading}>
        Delivery Shop
      </Text>

      <View style={styles.row}>

        <View style={styles.avatar}>

          <Text style={styles.avatarText}>
            {shopName.charAt(0)}
          </Text>

        </View>

        <View style={styles.content}>
                  <View style={styles.titleRow}>

            <Text
              numberOfLines={1}
              style={styles.shopName}
            >
              {shopName}
            </Text>

            <MaterialCommunityIcons
              name="chevron-down"
              size={24}
              color="#64748B"
            />

          </View>

          <View style={styles.addressRow}>

            <MaterialCommunityIcons
              name="map-marker"
              size={16}
              color="#EF4444"
            />

            <Text
              numberOfLines={2}
              style={styles.address}
            >
              {address}
            </Text>

          </View>

          <View style={styles.badgeRow}>

            {primary && (

              <View style={styles.primaryBadge}>

                <MaterialCommunityIcons
                  name="star"
                  size={13}
                  color="#FFFFFF"
                />

                <Text style={styles.badgeText}>
                  Primary Shop
                </Text>

              </View>

            )}

            <View style={styles.deliveryBadge}>

              <MaterialCommunityIcons
                name="truck-fast"
                size={13}
                color="#16A34A"
              />

              <Text style={styles.deliveryText}>
                Today's Delivery
              </Text>

            </View>

          </View>

        </View>

      </View>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  card: {

    backgroundColor: "#FFFFFF",

    borderRadius: 26,

    padding: 20,

    marginBottom: 18,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,

  },

  heading: {

    fontSize: 16,

    fontWeight: "800",

    color: "#0F172A",

    marginBottom: 18,

  },

  row: {

    flexDirection: "row",

    alignItems: "flex-start",

  },

  avatar: {

    width: 56,

    height: 56,

    borderRadius: 26,

    backgroundColor: "#F97316",

    justifyContent: "center",

    alignItems: "center",

    marginRight: 16,

  },

  avatarText: {

    color: "#FFFFFF",

    fontSize: 24,

    fontWeight: "900",

  },

  content: {

    flex: 1,

  },

  titleRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },

  shopName: {

    flex: 1,

    fontSize: 19,

    fontWeight: "800",

    color: "#0F172A",

    marginRight: 8,

  },

  addressRow: {

    flexDirection: "row",

    alignItems: "flex-start",

    marginTop: 10,

  },

  address: {

    flex: 1,

    marginLeft: 6,

    fontSize: 14,

    color: "#64748B",

    lineHeight: 20,

  },

  badgeRow: {

    flexDirection: "row",

    marginTop: 16,

    flexWrap: "wrap",

  },

  primaryBadge: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#F97316",

    borderRadius: 16,

    paddingHorizontal: 12,

    paddingVertical: 7,

    marginRight: 10,

  },

  badgeText: {

    color: "#FFFFFF",

    marginLeft: 5,

    fontSize: 12,

    fontWeight: "700",

  },

  deliveryBadge: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#ECFDF5",

    borderRadius: 16,

    paddingHorizontal: 12,

    paddingVertical: 7,

  },

  deliveryText: {

    color: "#16A34A",

    marginLeft: 5,

    fontSize: 12,

    fontWeight: "700",

  },

});
