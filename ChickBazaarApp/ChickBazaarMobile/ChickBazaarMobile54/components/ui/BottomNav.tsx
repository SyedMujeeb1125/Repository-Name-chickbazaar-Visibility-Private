import React from "react";

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "../../theme";

type Tab = {
  key: string;
  label: string;
  icon: string;
};

type Props = {
  active: string;
  onPress: (key: string) => void;
};

const tabs: Tab[] = [
  {
    key: "dashboard",
    label: "Home",
    icon: "🏠",
  },
  {
    key: "orders",
    label: "Orders",
    icon: "📋",
  },
  {
    key: "placeOrder",
    label: "Order",
    icon: "➕",
  },
  {
    key: "payments",
    label: "Bills",
    icon: "💳",
  },
  {
    key: "profile",
    label: "Profile",
    icon: "👤",
  },
];

export default function BottomNav({
  active,
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const selected =
          active === tab.key;

        const isCenter =
          tab.key === "placeOrder";

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() =>
              onPress(tab.key)
            }
            style={[
              styles.item,
              isCenter &&
                styles.centerItem,
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                selected &&
                  styles.activeCircle,
                isCenter &&
                  styles.centerCircle,
              ]}
            >
              <Text
                style={[
                  styles.icon,
                  selected &&
                    styles.activeIcon,
                ]}
              >
                {tab.icon}
              </Text>
            </View>

            <Text
              style={[
                styles.label,
                selected &&
                  styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    justifyContent:
      "space-around",

    alignItems: "center",

    backgroundColor:
      Colors.surface,

    borderTopWidth: 1,

    borderTopColor:
      Colors.border,

    paddingVertical:
      Spacing.sm,

    elevation: 10,
  },

  item: {
    alignItems: "center",

    flex: 1,
  },

  centerItem: {
    marginTop: -22,
  },

  iconCircle: {
    width: 42,

    height: 42,

    borderRadius:
      Radius.round,

    justifyContent:
      "center",

    alignItems:
      "center",
  },

  centerCircle: {
    width: 60,

    height: 60,

    backgroundColor:
      Colors.primary,

    elevation: 6,
  },

  activeCircle: {
    backgroundColor:
      Colors.primaryLight,
  },

  icon: {
    fontSize: 22,
  },

  activeIcon: {
    color: Colors.primary,
  },

  label: {
    marginTop: 5,

    fontSize:
      Typography.caption,

    color:
      Colors.subtitle,
  },

  activeLabel: {
    color:
      Colors.primary,

    fontWeight:
      Typography.bold,
  },
});