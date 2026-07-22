import React from "react";
import {
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function SectionCard({
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 20,

    marginBottom: 18,

    borderWidth: 1,

    borderColor: "#EEF2F7",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.05,

    shadowRadius: 18,

    elevation: 4,
  },
});