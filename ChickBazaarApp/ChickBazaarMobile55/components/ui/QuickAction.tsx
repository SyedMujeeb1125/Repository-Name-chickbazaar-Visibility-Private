import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  icon: string;
  title: string;
  onPress: () => void;
};

export default function QuickAction({
  icon,
  title,
  onPress,
}: Props) {

  return (

    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >

      <View style={styles.iconContainer}>

        <MaterialCommunityIcons
          name={icon as any}
          size={26}
          color="#F97316"
        />

      </View>

      <Text style={styles.title}>
        {title}
      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  card: {

    width: "48%",

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    paddingVertical: 18,

    alignItems: "center",

    marginBottom: 14,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,

  },

  iconContainer: {

    width: 52,

    height: 52,

    borderRadius: 26,

    backgroundColor: "#FFF4EC",

    justifyContent: "center",

    alignItems: "center",

  },

  title: {

    marginTop: 10,

    fontSize: 15,

    fontWeight: "700",

    color: "#0F172A",

  },

});