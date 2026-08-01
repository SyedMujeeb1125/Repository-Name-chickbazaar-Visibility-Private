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

  borderRadius: 20,

  padding: 16,

  marginBottom: 14,

  borderWidth: 1,

  borderColor: "#EEF2F7",

  shadowColor: "#000",

  shadowOffset: {
    width: 0,
    height: 6,
  },

  shadowOpacity: 0.05,

  shadowRadius: 12,

  elevation: 3,
},
});