import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

const ORANGE = "#F97316";
const GREY = "#64748B";

export default function ChickBazaarTabBar({
  state,
  navigation,
}: BottomTabBarProps) {

  function getIcon(routeName: string) {

    switch (routeName) {

      case "Home":
        return "home";

      case "Orders":
        return "clipboard-list";

      case "Order":
        return "cart-outline";

      case "Business":
        return "finance";

      case "Profile":
        return "account-circle";

      default:
        return "circle";

    }

  }

  return (

    <SafeAreaView
      edges={["bottom"]}
      style={styles.safeArea}
    >

      <View style={styles.container}>

        {state.routes.map((route, index) => {

          const focused =
            state.index === index;

          const icon =
            getIcon(route.name);

          const onPress = () => {

            const event =
              navigation.emit({

                type: "tabPress",

                target: route.key,

                canPreventDefault: true,

              });

            if (
              !focused &&
              !event.defaultPrevented
            ) {

              navigation.navigate(
                route.name as never
              );

            }

          };

          if (route.name === "Order") {

            return (

              <TouchableOpacity
                key={route.key}
                activeOpacity={0.9}
                onPress={onPress}
                style={styles.orderButtonWrapper}
              >

                <View style={styles.orderButton}>

                  <MaterialCommunityIcons
                    name="cart-outline"
                    size={32}
                    color="#FFFFFF"
                  />

                  <Text style={styles.orderText}>
                    PLACE{"\n"}ORDER
                  </Text>

                </View>

              </TouchableOpacity>

            );

          }

          return (

            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              activeOpacity={0.85}
              onPress={onPress}
            >

              <MaterialCommunityIcons
                name={icon as any}
                size={24}
                color={
                  focused
                    ? ORANGE
                    : GREY
                }
              />

              <Text
                style={[
                  styles.label,
                  focused &&
                    styles.activeLabel,
                ]}
              >
                {route.name}
              </Text>

              {focused && (
                <View
                  style={styles.activeLine}
                />
              )}

            </TouchableOpacity>

          );

        })}

      </View>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  safeArea: {
  
},

  container: {

    marginHorizontal: 14,

    marginBottom: 8,

    height: 82,

    borderRadius: 30,

    backgroundColor: "#FFFFFF",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-evenly",

    shadowColor: "#000",

    shadowOpacity: 0.12,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 18,

  },

  tab: {

    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    height: "100%",

  },

  orderButtonWrapper: {

    marginTop: -8,

    width: 92,

    alignItems: "center",

    justifyContent: "center",

  },

  orderButton: {

    width: 88,

    height: 88,

    borderRadius: 44,

    backgroundColor: ORANGE,

    borderWidth: 5,

    borderColor: "#FFFFFF",

    alignItems: "center",

    justifyContent: "center",

    shadowColor: ORANGE,

    shadowOpacity: 0.35,

    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 18,

  },

  orderText: {

    color: "#FFFFFF",

    fontSize: 10,

    fontWeight: "800",

    textAlign: "center",

    marginTop: 3,

    letterSpacing: 0.3,

  },

  label: {

    marginTop: 5,

    fontSize: 11,

    fontWeight: "600",

    color: GREY,

  },

  activeLabel: {

    color: ORANGE,

    fontWeight: "800",

  },

  activeLine: {

    marginTop: 5,

    width: 22,

    height: 3,

    borderRadius: 2,

    backgroundColor: ORANGE,

  },

});