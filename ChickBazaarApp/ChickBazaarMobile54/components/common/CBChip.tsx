import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";

type Props = {
  title: string;
  selected?: boolean;
  onPress: () => void;
};

export default function CBChip({
  title,
  selected = false,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chip,
        selected && styles.selected,
      ]}
    >
      <Text
        style={[
          styles.text,
          selected &&
            styles.selectedText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.xl,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: Colors.white,
  },

  selected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  text: {
    color: Colors.text,
    fontWeight: "600",
  },

  selectedText: {
    color: Colors.white,
  },
});