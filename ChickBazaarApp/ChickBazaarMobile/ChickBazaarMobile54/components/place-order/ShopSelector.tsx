import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Shop = {
  id: string;
  shopName: string;
  address?: string;
};

type Props = {
  shops: Shop[];
  selectedShop: string;
  onSelect: (id: string) => void;
};

export default function ShopSelector({
  shops,
  selectedShop,
  onSelect,
}: Props) {
  return (
    <Card>
      <Text style={styles.heading}>
        🏪 Deliver To
      </Text>

      {shops.map((shop) => {
        const selected =
          selectedShop === shop.id;

        return (
          <TouchableOpacity
            key={shop.id}
            style={[
              styles.shop,
              selected &&
                styles.selected,
            ]}
            onPress={() =>
              onSelect(shop.id)
            }
          >
            <View>
              <Text
                style={
                  styles.name
                }
              >
                {shop.shopName}
              </Text>

              {!!shop.address && (
                <Text
                  style={
                    styles.address
                  }
                >
                  {shop.address}
                </Text>
              )}
            </View>

            <Text
              style={
                styles.tick
              }
            >
              {selected
                ? "✓"
                : ""}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Card>
  );
}

const styles =
  StyleSheet.create({
    heading: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 15,
    },

    shop: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      padding: 16,
      borderWidth: 1,
      borderColor: "#E2E8F0",
      borderRadius: 12,
      marginBottom: 10,
    },

    selected: {
      borderColor: "#F97316",
      backgroundColor:
        "#FFF7ED",
    },

    name: {
      fontSize: 16,
      fontWeight: "700",
      color: "#0F172A",
    },

    address: {
      marginTop: 4,
      color: "#64748B",
    },

    tick: {
      fontSize: 22,
      color: "#16A34A",
      fontWeight: "700",
    },
  });