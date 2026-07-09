import React from "react";

import { BottomTabBar } from "@react-navigation/bottom-tabs";

export default function FloatingTabBar(props: any) {
  return (
    <BottomTabBar
      {...props}
      style={{
        position: "absolute",

        left: 14,
        right: 14,

        bottom: 12,

        height: 86,

        paddingTop: 6,
        paddingBottom: 10,

        borderRadius: 32,

        backgroundColor: "#FFFFFF",

        borderTopWidth: 0,

        elevation: 24,

        shadowColor: "#000",

        shadowOpacity: 0.14,

        shadowRadius: 18,

        shadowOffset: {
          width: 0,
          height: 10,
        },
      }}
    />
  );
}
