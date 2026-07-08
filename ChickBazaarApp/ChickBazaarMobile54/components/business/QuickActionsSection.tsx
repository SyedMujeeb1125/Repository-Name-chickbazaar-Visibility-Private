import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import QuickAction from "../ui/QuickAction";

type Props = {
  onShops: () => void;
  onOrders: () => void;
  onBills: () => void;
  onProfile: () => void;
};

export default function QuickActionsSection({

  onShops,
  onOrders,
  onBills,
  onProfile,

}: Props) {

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Quick Actions
      </Text>

      <View style={styles.grid}>

        <QuickAction
          icon="🏪"
          title="My Shops"
          onPress={onShops}
        />

        <QuickAction
          icon="📦"
          title="Orders"
          onPress={onOrders}
        />

        <QuickAction
          icon="💳"
          title="Payments"
          onPress={onBills}
        />

        <QuickAction
          icon="👤"
          title="Profile"
          onPress={onProfile}
        />

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    marginBottom:22,
  },

  heading:{
    fontSize:22,
    fontWeight:"800",
    color:"#0F172A",
    marginBottom:18,
  },

  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between",
  },

});