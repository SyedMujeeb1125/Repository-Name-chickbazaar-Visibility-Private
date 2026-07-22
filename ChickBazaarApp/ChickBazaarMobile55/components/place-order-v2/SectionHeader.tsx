import React from "react";

import {
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
  title: string;

  subtitle?: string;
};

export default function SectionHeader({
  title,
  subtitle,
}: Props) {
  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >
        {title}
      </Text>

      {subtitle && (
        <Text
          style={styles.subtitle}
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
      marginBottom: 18,
    },

    title: {
      fontSize: 20,

      fontWeight: "700",

      color: "#111827",
    },

    subtitle: {
      marginTop: 5,

      fontSize: 14,

      color: "#6B7280",

      lineHeight: 20,
    },

});