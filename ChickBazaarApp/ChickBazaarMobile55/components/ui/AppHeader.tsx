import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
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

  subtitle?: string;

  onBack?: () => void;

  rightComponent?: React.ReactNode;
};

export default function AppHeader({
  title,
  subtitle,
  onBack,
  rightComponent,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {onBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
          >
            <Text style={styles.backIcon}>
              ←
            </Text>
          </TouchableOpacity>
        )}

        <View>
          <Text style={styles.title}>
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
      </View>

      {rightComponent ? (
        <View>
          {rightComponent}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:
      Colors.surface,

    paddingHorizontal:
      Spacing.md,

    paddingVertical:
      Spacing.md,

    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    borderBottomWidth: 1,

    borderBottomColor:
      Colors.border,
  },

  left: {
    flexDirection: "row",

    alignItems: "center",

    flex: 1,
  },

  backButton: {
    width: 42,

    height: 42,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.light,

    justifyContent:
      "center",

    alignItems: "center",

    marginRight:
      Spacing.md,
  },

  backIcon: {
    fontSize: 22,

    color: Colors.text,

    fontWeight:
      Typography.bold,
  },

  title: {
    fontSize:
      Typography.h3,

    fontWeight:
      Typography.bold,

    color: Colors.text,
  },

  subtitle: {
    marginTop: 2,

    fontSize:
      Typography.small,

    color:
      Colors.subtitle,
  },
});
