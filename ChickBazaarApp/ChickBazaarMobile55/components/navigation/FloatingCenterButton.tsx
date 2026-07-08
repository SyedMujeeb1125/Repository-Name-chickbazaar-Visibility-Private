import React from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
}

export default function FloatingCenterButton({
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.wrapper}
      onPress={onPress}
    >
      <View style={styles.button}>
        <MaterialCommunityIcons
          name="cart-outline"
          size={32}
          color="#FFFFFF"
        />

        <Text style={styles.text}>
          PLACE{"\n"}ORDER
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    top: -34,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: 88,
    height: 88,
    borderRadius: 44,

    backgroundColor: "#F97316",

    borderWidth: 6,
    borderColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 16,
  },

  text: {
    marginTop: 2,

    color: "#FFFFFF",

    fontSize: 10,

    fontWeight: "700",

    textAlign: "center",

    letterSpacing: 0.4,
  },
});