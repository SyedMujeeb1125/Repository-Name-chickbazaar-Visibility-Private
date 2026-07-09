import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Card from "../ui/Card";

type Props = {
  icon: string;
  title: string;
  message: string;
  time: string;

  actionLabel?: string;
  onPress?: () => void;

  unread?: boolean;
};

function getIconColors(icon: string) {
  const value = icon.toLowerCase();

  if (
    value.includes("💰") ||
    value.includes("payment") ||
    value.includes("cash")
  ) {
    return {
      bg: "#ECFDF5",
      color: "#16A34A",
    };
  }

  if (
    value.includes("🚚") ||
    value.includes("🐔") ||
    value.includes("order")
  ) {
    return {
      bg: "#FFF7ED",
      color: "#F97316",
    };
  }

  if (
    value.includes("📈") ||
    value.includes("rate")
  ) {
    return {
      bg: "#EFF6FF",
      color: "#2563EB",
    };
  }

  if (
    value.includes("🎁") ||
    value.includes("offer")
  ) {
    return {
      bg: "#F5F3FF",
      color: "#7C3AED",
    };
  }

  if (
    value.includes("⚠") ||
    value.includes("❌") ||
    value.includes("alert")
  ) {
    return {
      bg: "#FEF2F2",
      color: "#DC2626",
    };
  }

  return {
    bg: "#F8FAFC",
    color: "#64748B",
  };
}

export default function NotificationCard({
  icon,
  title,
  message,
  time,
  actionLabel,
  onPress,
  unread = false,
}: Props) {

  const iconStyle = getIconColors(icon);

  return (

    <Card>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
      >

        <View style={styles.row}>

          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: iconStyle.bg,
              },
            ]}
          >

            <Text
              style={[
                styles.icon,
                {
                  color: iconStyle.color,
                },
              ]}
            >
              {icon}
            </Text>

          </View>

          <View style={styles.content}>

            <View style={styles.header}>

              <Text
                style={styles.title}
                numberOfLines={1}
              >
                {title}
              </Text>

              <View style={styles.timeBadge}>

                <Text style={styles.time}>
                  {time}
                </Text>

              </View>

            </View>

            <Text
              style={styles.message}
              numberOfLines={2}
            >
              {message}
            </Text>

            {actionLabel ? (

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.actionButton}
                onPress={onPress}
              >

                <Text style={styles.actionText}>
                  {actionLabel} →
                </Text>

              </TouchableOpacity>

            ) : null}

          </View>

        </View>

        {unread && (
          <View style={styles.unreadDot} />
        )}

      </TouchableOpacity>

    </Card>

  );

}

const styles = StyleSheet.create({

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  icon: {
    fontSize: 32,
  },

  content: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginRight: 10,
  },

  timeBadge: {
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  time: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },

  message: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
  },

  actionButton: {
    marginTop: 14,
    alignSelf: "flex-start",
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },

  actionText: {
    color: "#F97316",
    fontWeight: "800",
    fontSize: 13,
  },

  unreadDot: {
    position: "absolute",
    top: 18,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#F97316",
  },

});
