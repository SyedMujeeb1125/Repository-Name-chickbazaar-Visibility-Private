import React from "react";

import {
  TouchableOpacity,
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
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
};

export default function QuickAction({
  icon,
  title,
  subtitle,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.iconBox}>
        <Text style={styles.icon}>
          {icon}
        </Text>
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      {subtitle ? (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",

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

    alignItems: "center",

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

  iconBox: {
    width: 56,

    height: 56,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.primaryLight,

    justifyContent: "center",

    alignItems: "center",

    marginBottom:
      Spacing.sm,
  },

  icon: {
    fontSize: 26,
  },

  title: {
    fontSize:
      Typography.body,

    fontWeight:
      Typography.bold,

    color:
      Colors.text,

    textAlign: "center",
  },

  subtitle: {
    marginTop:
      Spacing.xs,

    fontSize:
      Typography.caption,

    color:
      Colors.subtitle,

    textAlign: "center",
  },
});