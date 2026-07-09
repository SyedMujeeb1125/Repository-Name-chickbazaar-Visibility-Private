import React, { ReactNode } from "react";

import {
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
} from "../../theme";

type Props = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function CBCard({
  children,
  style,
}: Props) {
  return (
    <View
      style={[
        styles.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        Colors.surface,

      borderRadius:
        Radius.lg,

      padding:
        Spacing.md,

      marginBottom:
        Spacing.md,

      borderWidth: 1,

      borderColor:
        Colors.border,

      shadowColor:
        Colors.shadow,

      shadowOpacity: 0.08,

      shadowRadius: 8,

      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 3,
    },
  });
