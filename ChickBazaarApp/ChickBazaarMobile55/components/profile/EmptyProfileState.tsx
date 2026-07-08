import React from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle: string;
  buttonTitle?: string;
  onPress?: () => void;
};

export default function EmptyProfileState({
  icon,
  title,
  subtitle,
  buttonTitle,
  onPress,
}: Props) {

  return (

    <View style={styles.container}>

      <View style={styles.iconCircle}>

        <MaterialCommunityIcons
          name={icon}
          size={48}
          color="#CBD5E1"
        />

      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>

      {buttonTitle && onPress ? (

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.button}
          onPress={onPress}
        >

          <MaterialCommunityIcons
            name="plus"
            size={18}
            color="#FFFFFF"
          />

          <Text style={styles.buttonText}>
            {buttonTitle}
          </Text>

        </TouchableOpacity>

      ) : null}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 32,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#F8FAFC",

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 24,
    textAlign: "center",
  },

  button: {
    marginTop: 24,

    height: 52,

    paddingHorizontal: 22,

    borderRadius: 14,

    backgroundColor: "#F97316",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

});