import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Typography,
  Spacing,
} from "../../theme";

type Props = {
  title: string;
  subtitle?: string;
};

export default function CBHeader({
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

      {subtitle ? (
        <Text
          style={
            styles.subtitle
          }
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginBottom:
        Spacing.lg,
    },

    title: {
      fontSize:
        Typography.h1,

      fontWeight:
        Typography.bold,

      color:
        Colors.text,
    },

    subtitle: {
      marginTop:
        Spacing.xs,

      color:
        Colors.subtitle,

      fontSize:
        Typography.body,
    },
  });