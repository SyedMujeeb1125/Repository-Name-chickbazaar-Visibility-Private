import React, {
  useEffect,
  useRef,
} from "react";

import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const DRAWER_WIDTH =
  Dimensions.get("window").width * 0.82;

type Props = {
  visible: boolean;

  shopName: string;

  retailerId: string;

  onClose: () => void;

  onDashboard: () => void;
  onShops: () => void;
  onOrders: () => void;
  onBusiness: () => void;
  onPayments: () => void;
  onNotifications: () => void;
  onProfile: () => void;
  onHelp: () => void;
  onSettings: () => void;
  onLogout: () => void;
};

export default function SideDrawer({
  visible,
  shopName,
  retailerId,
  onClose,
  onDashboard,
  onShops,
  onOrders,
  onBusiness,
  onPayments,
  onNotifications,
  onProfile,
  onHelp,
  onSettings,
  onLogout,
}: Props) {

  const slide =
    useRef(
      new Animated.Value(
        -DRAWER_WIDTH
      )
    ).current;

  const overlay =
    useRef(
      new Animated.Value(0)
    ).current;

  useEffect(() => {

    Animated.parallel([

      Animated.timing(
        slide,
        {
          toValue: visible
            ? 0
            : -DRAWER_WIDTH,
          duration: 260,
          useNativeDriver: true,
        }
      ),

      Animated.timing(
        overlay,
        {
          toValue: visible
            ? 1
            : 0,
          duration: 260,
          useNativeDriver: true,
        }
      ),

    ]).start();

  }, [visible]);

  if (!visible) {
    return null;
  }

  return (

    <View
      style={StyleSheet.absoluteFill}
      pointerEvents="box-none"
    >

      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlay,
          },
        ]}
      >

        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />

      </Animated.View>

      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [
              {
                translateX: slide,
              },
            ],
          },
        ]}
      >

        <View style={styles.header}>

          <View style={styles.avatar}>

            <Text style={styles.avatarText}>
              {shopName
                ?.charAt(0)
                ?.toUpperCase()}
            </Text>

          </View>

          <View style={{ flex: 1 }}>

            <Text
              numberOfLines={1}
              style={styles.shopName}
            >
              {shopName}
            </Text>

            <Text style={styles.id}>
              Retailer ID
            </Text>

            <Text style={styles.idValue}>
              {retailerId}
            </Text>

            <View style={styles.verified}>

              <MaterialCommunityIcons
                name="check-decagram"
                size={14}
                color="#16A34A"
              />

              <Text
                style={styles.verifiedText}
              >
                Verified Retailer
              </Text>

            </View>

          </View>

          <TouchableOpacity
            onPress={onClose}
          >

            <MaterialCommunityIcons
              name="close"
              size={26}
              color="#FFFFFF"
            />

          </TouchableOpacity>

        </View>

        <ScrollView
  style={{ flex: 1 }}
  contentContainerStyle={styles.menuContent}
  showsVerticalScrollIndicator={false}
>

  <MenuItem
    icon="view-dashboard-outline"
    title="Dashboard"
    onPress={onDashboard}
  />

          <MenuItem
            icon="store-outline"
            title="My Shops"
            onPress={onShops}
          />

          <MenuItem
            icon="clipboard-list-outline"
            title="Orders"
            onPress={onOrders}
          />

          <MenuItem
            icon="finance"
            title="Business"
            onPress={onBusiness}
          />

          <MenuItem
            icon="credit-card-outline"
            title="Payments"
            onPress={onPayments}
          />

          <MenuItem
            icon="bell-outline"
            title="Notifications"
            onPress={onNotifications}
          />

          <MenuItem
            icon="account-circle-outline"
            title="Profile"
            onPress={onProfile}
          />

          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={onHelp}
          />

          <MenuItem
            icon="cog-outline"
            title="Settings"
            onPress={onSettings}
          />

          <View style={styles.divider} />

          <MenuItem
            icon="logout"
            title="Logout"
            color="#DC2626"
            onPress={onLogout}
          />

          <View style={styles.footer}>

  <Text style={styles.version}>
    ChickBazaar Retailer App
  </Text>

  <Text style={styles.versionNo}>
    Version 1.0.0
  </Text>

  <Text style={styles.powered}>
    Made with ❤️ in India
  </Text>

</View>

          

        </ScrollView>

      </Animated.View>

    </View>

  );

}

function MenuItem({
  icon,
  title,
  color = "#0F172A",
  onPress,
}: any) {

  return (

    <TouchableOpacity
      activeOpacity={0.75}
      style={styles.item}
      onPress={onPress}
    >

      <MaterialCommunityIcons
        name={icon}
        size={22}
        color={color}
      />

      <Text
        style={[
          styles.itemText,
          {
            color,
          },
        ]}
      >
        {title}
      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
  },

  drawer: {
    position: "absolute",

    left: 0,
    top: 0,
    bottom: 0,

    width: DRAWER_WIDTH,

    backgroundColor: "#FFFFFF",

    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 24,
  },

  menuContent: {
  paddingTop: 10,
  paddingBottom: 120,
},

  header: {
    backgroundColor: "#F97316",

    paddingTop: 58,
    paddingBottom: 24,
    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "flex-start",
  },

  avatar: {
    width: 58,
    height: 58,

    borderRadius: 29,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  avatarText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#F97316",
  },

  shopName: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },

  id: {
    marginTop: 6,
    color: "#FED7AA",
    fontSize: 12,
  },

  idValue: {
    marginTop: 2,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  verified: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  verifiedText: {
    marginLeft: 6,
    color: "#DCFCE7",
    fontSize: 12,
    fontWeight: "700",
  },

  item: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 22,

    paddingVertical: 16,

    marginHorizontal: 12,

    marginVertical: 3,

    borderRadius: 16,
  },

  itemText: {
    marginLeft: 18,
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },

  divider: {
    height: 1,

    backgroundColor: "#E2E8F0",

    marginHorizontal: 20,

    marginVertical: 16,
  },

  footer: {
  alignItems: "center",
  marginTop: 28,
  marginBottom: 40,
},

version: {
  color: "#334155",
  fontSize: 13,
  fontWeight: "700",
},

versionNo: {
  marginTop: 2,
  color: "#64748B",
  fontSize: 12,
},

powered: {
  marginTop: 8,
  color: "#94A3B8",
  fontSize: 12,
},

  
});