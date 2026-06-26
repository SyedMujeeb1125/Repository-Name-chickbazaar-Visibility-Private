import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Radius } from "../../theme/radius";

type Props = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function CBCard({
  children,
  style,
}: Props) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: 18,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },
});