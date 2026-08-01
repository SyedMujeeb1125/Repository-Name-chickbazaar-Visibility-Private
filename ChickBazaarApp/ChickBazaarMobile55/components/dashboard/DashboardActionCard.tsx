import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  badgeText?: string;
  badgeColor?: string;

  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconBackground?: string;

  title?: string;
  subtitle?: string;

  children: React.ReactNode;

  footer?: React.ReactNode;
};

export default function DashboardActionCard({
  badgeText,
  badgeColor = "#16A34A",

  icon,
  iconBackground = "#16A34A",

  title,
  subtitle,

  children,

  footer,
}: Props) {
  return (
    <View style={styles.card}>
      {!!badgeText && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: `${badgeColor}18`,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="circle"
            size={8}
            color={badgeColor}
          />

          <Text
            style={[
              styles.badgeText,
              {
                color: badgeColor,
              },
            ]}
          >
            {badgeText}
          </Text>
        </View>
      )}

      <View style={styles.header}>
        <View
          style={[
            styles.statusCircle,
            {
              backgroundColor: iconBackground,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.headerContent}>
          {!!title && (
  <Text
    numberOfLines={1}
    style={styles.title}
  >
    {title}
  </Text>
)}

          {!!subtitle && (
  <Text
    numberOfLines={2}
    style={[
      styles.subtitle,
      !title && { marginTop: 0 },
    ]}
  >
    {subtitle}
  </Text>
)}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        {children}
      </View>

      {!!footer && (
        <>
          <View style={styles.divider} />

          <View style={styles.footer}>
            {footer}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
  backgroundColor: "#FFFFFF",

  borderRadius: 22,

  paddingHorizontal: 18,
  paddingTop: 20,
  paddingBottom: 20,

  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 12,
  shadowOffset: {
    width: 0,
    height: 5,
  },

  elevation: 4,
},

  badge: {
    alignSelf: "flex-start",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 999,

    marginBottom: 12,
  },

  badgeText: {
    marginLeft: 6,

    fontSize: 10,

    fontWeight: "700",

    textTransform: "uppercase",

    letterSpacing: 0.4,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",
  },

  statusCircle: {
    width: 40,
    height: 40,

    borderRadius: 20,

    justifyContent: "center",

    alignItems: "center",
  },

  headerContent: {
    flex: 1,

    marginLeft: 12,
  },

  title: {
    fontSize: 18,

    fontWeight: "800",

    color: "#111827",
  },

  subtitle: {
    marginTop: 2,

    fontSize: 13,

    lineHeight: 18,

    color: "#6B7280",
  },

  divider: {
    height: 1,

    backgroundColor: "#F1F5F9",

    marginVertical: 0,
  },

  content: {
    gap: 2,
  },

  footer: {
    marginTop: 16,
  },
});