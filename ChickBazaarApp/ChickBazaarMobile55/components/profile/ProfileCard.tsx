import React from "react";

import {
    StyleSheet,
    View,
    ViewProps,
} from "react-native";

type Props = ViewProps & {
  children: React.ReactNode;
};

export default function ProfileCard({
  children,
  style,
  ...rest
}: Props) {

  return (

    <View
      style={[
        styles.card,
        style,
      ]}
      {...rest}
    >

      {children}

    </View>

  );

}

const styles = StyleSheet.create({

  card: {

    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 20,

    marginBottom: 20,

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,

  },

});
