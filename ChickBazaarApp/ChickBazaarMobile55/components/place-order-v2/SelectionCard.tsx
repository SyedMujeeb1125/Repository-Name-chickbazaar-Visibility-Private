import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  value?: string;
  onPress?: () => void;
};

export default function SelectionCard({
  icon,
  title,
  subtitle,
  value,
  onPress,
}: Props) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={styles.container}
      {...(onPress ? { onPress } : {})}
    >
      <View style={styles.left}>
        <View style={styles.icon}>{icon}</View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          {!!subtitle && (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {!!value && (
        <Text style={styles.value}>
          {value}
        </Text>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 76,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEF2F7",
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },

  value: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F97316",
    marginLeft: 12,
  },
});