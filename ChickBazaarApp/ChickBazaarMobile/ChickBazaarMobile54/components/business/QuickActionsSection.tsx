import React from "react";
import {
  View,
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
    <View style={styles.grid}>
      <QuickAction
        icon="🏪"
        title="My Shops"
        onPress={onShops}
      />

      <QuickAction
        icon="📋"
        title="Orders"
        onPress={onOrders}
      />

      <QuickAction
        icon="💳"
        title="Bills"
        onPress={onBills}
      />

      <QuickAction
        icon="👤"
        title="Profile"
        onPress={onProfile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});