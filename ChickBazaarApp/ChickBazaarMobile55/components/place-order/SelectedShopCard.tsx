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

      <Text style={styles.heading}>
        🏪 Delivery Shop
      </Text>

      <View style={styles.shopCard}>

        <View style={{ flex: 1 }}>

          <Text style={styles.shopName}>
            {shop?.shopName || "No Shop Selected"}
          </Text>

          {!!shop?.address && (
            <Text style={styles.shopAddress}>
              {shop.address}
            </Text>
          )}

        </View>

        {canChange && (
          <TouchableOpacity
            style={styles.changeButton}
            onPress={onChange}
          >
            <Text style={styles.changeText}>
              Change
            </Text>
          </TouchableOpacity>
        )}

      </View>

    </Card>
  );
}

const styles = StyleSheet.create({

  heading:{
    fontSize:20,
    fontWeight:"700",
    marginBottom:16,
  },

  shopCard:{
    backgroundColor:"#F8FAFC",
    borderRadius:16,
    padding:16,
    flexDirection:"row",
    alignItems:"center",
  },

  shopName:{
    fontSize:18,
    fontWeight:"700",
    color:"#0F172A",
  },

  shopAddress:{
    marginTop:6,
    color:"#64748B",
    lineHeight:20,
  },

  changeButton:{
    backgroundColor:"#F97316",
    paddingHorizontal:18,
    paddingVertical:10,
    borderRadius:12,
  },

  changeText:{
    color:"#FFF",
    fontWeight:"700",
  },

});