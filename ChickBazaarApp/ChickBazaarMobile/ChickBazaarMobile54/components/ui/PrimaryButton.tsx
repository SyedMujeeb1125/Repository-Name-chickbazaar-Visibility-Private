import React from "react";
import {
  TouchableOpacity,
  Text,
 StyleSheet,
} from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({
  title,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F97316",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
  },

  text: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});