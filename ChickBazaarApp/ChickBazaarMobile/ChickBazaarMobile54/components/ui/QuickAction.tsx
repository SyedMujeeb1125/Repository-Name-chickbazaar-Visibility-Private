import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  icon: string;
  title: string;
  onPress: () => void;
};

export default function QuickAction({
  icon,
  title,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    alignItems: "center",
    elevation: 2,
  },

  icon: {
    fontSize: 30,
  },

  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
});