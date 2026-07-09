import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";

type Props = {
  title: string;
  subtitle?: string;
};

export default function CBEmpty({
  title,
  subtitle,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>
        📦
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

      {!!subtitle && (
        <Text
          style={
            styles.subtitle
          }
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 40,
      alignItems: "center",
      justifyContent: "center",
    },

    icon: {
      fontSize: 40,
      marginBottom: 15,
    },

    title: {
      fontSize: 18,
      fontWeight: "700",
      color: Colors.text,
    },

    subtitle: {
      marginTop: 10,
      color: Colors.subtitle,
      textAlign: "center",
    },
  });
