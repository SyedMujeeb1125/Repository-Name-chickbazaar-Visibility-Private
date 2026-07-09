import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
};

export default function HeroOrderCard({
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.iconContainer}>

        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name="food-drumstick"
            size={46}
            color="#F97316"
          />
        </View>

      </View>

      <View style={styles.content}>

        <Text style={styles.title}>
          Place Today's Order
        </Text>

        <Text style={styles.subtitle}>
          Order before 12:00 PM for same-day delivery.
        </Text>

      </View>

      <View style={styles.arrowContainer}>
        <MaterialCommunityIcons
          name="arrow-right"
          size={30}
          color="#FFFFFF"
        />
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {

    backgroundColor: "#FFFFFF",

    borderRadius: 26,

    padding: 20,

    marginBottom: 22,

    flexDirection: "row",

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 16,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,
  },

  iconContainer: {

    marginRight: 16,

  },

  iconCircle: {

    width: 72,

    height: 72,

    borderRadius: 36,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",

    alignItems: "center",

  },

  content: {

    flex: 1,

  },

  title: {

    fontSize: 22,

    fontWeight: "800",

    color: "#0F172A",

  },

  subtitle: {

    marginTop: 6,

    color: "#64748B",

    fontSize: 15,

    lineHeight: 22,

  },

  arrowContainer: {

    width: 56,

    height: 56,

    borderRadius: 26,

    backgroundColor: "#F97316",

    justifyContent: "center",

    alignItems: "center",

    marginLeft: 12,

  },

});
