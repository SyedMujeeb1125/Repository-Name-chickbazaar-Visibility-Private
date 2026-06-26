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

export default function CBHeader({
  title,
  subtitle,
}: Props) {
  return (
    <View style={styles.container}>
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
      marginBottom: 20,
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
      color: Colors.text,
    },

    subtitle: {
      marginTop: 6,
      color: Colors.subtitle,
      fontSize: 15,
    },
  });