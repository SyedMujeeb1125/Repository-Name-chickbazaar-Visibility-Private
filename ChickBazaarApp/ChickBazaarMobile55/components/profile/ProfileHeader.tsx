import React from "react";

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  title: string;
  subtitle?: string;
  onBack: () => void;
};

export default function ProfileHeader({
  title,
  subtitle,
  onBack,
}: Props) {

  return (

    <View style={styles.header}>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.backButton}
        onPress={onBack}
      >

        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color="#0F172A"
        />

      </TouchableOpacity>

      <View style={styles.textContainer}>

        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle ? (

          <Text style={styles.subtitle}>
            {subtitle}
          </Text>

        ) : null}

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
  },

});
