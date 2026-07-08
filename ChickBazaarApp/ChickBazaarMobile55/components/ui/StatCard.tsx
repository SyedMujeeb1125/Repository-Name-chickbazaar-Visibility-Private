import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "../../theme";

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color?: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = Colors.primary,
}: Props) {
  return (
    <View style={styles.card}>
      {icon ? (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                Colors.primaryLight,
            },
          ]}
        >
          <Text style={styles.icon}>
            {icon}
          </Text>
        </View>
      ) : null}

      <Text style={styles.title}>
        {title}
      </Text>

      <Text
        style={[
          styles.value,
          {
            color,
          },
        ]}
      >
        {value}
      </Text>

      {subtitle ? (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,

    backgroundColor:
      Colors.surface,

    borderRadius:
      Radius.lg,

    padding:
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
      height: 2,
    },

    elevation: 3,
  },

  iconContainer: {
    width: 42,

    height: 42,

    borderRadius:
      Radius.round,

    justifyContent:
      "center",

    alignItems:
      "center",

    marginBottom:
      Spacing.sm,
  },

  icon: {
    fontSize: 18,
  },

  title: {
    fontSize:
      Typography.small,

    color:
      Colors.subtitle,
  },

  value: {
    marginTop:
      Spacing.xs,

    fontSize:
      Typography.h2,

    fontWeight:
      Typography.bold,
  },

  subtitle: {
    marginTop:
      Spacing.sm,

    fontSize:
      Typography.caption,

    color:
      Colors.subtitle,
  },
});