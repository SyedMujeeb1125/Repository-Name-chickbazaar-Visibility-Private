import React, { useEffect, useRef } from "react";

import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const DRAWER_WIDTH = Dimensions.get("window").width * 0.82;

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
  const slide = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlay = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      slide.setValue(-DRAWER_WIDTH);
      overlay.setValue(0);

      Animated.parallel([
        Animated.timing(slide, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlay, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(slide, {
        toValue: -DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(overlay, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={closeDrawer}
    >
      <View style={styles.modalRoot}>
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
            onPress={closeDrawer}
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
          <SafeAreaView
            edges={["top"]}
            style={styles.safeArea}
          >
            <View style={styles.header}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {shopName?.charAt(0)?.toUpperCase()}
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

                  <Text style={styles.verifiedText}>
                    Verified Retailer
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={closeDrawer}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={26}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.menuContent}
              showsVerticalScrollIndicator
              bounces
            >
                            <MenuItem
                icon="view-dashboard-outline"
                title="Dashboard"
                onPress={() => {
                  closeDrawer();
                  onDashboard();
                }}
              />

              <MenuItem
                icon="store-outline"
                title="My Shops"
                onPress={() => {
                  closeDrawer();
                  onShops();
                }}
              />

              <MenuItem
                icon="clipboard-list-outline"
                title="Orders"
                onPress={() => {
                  closeDrawer();
                  onOrders();
                }}
              />

              <MenuItem
                icon="finance"
                title="Business"
                onPress={() => {
                  closeDrawer();
                  onBusiness();
                }}
              />

              <MenuItem
                icon="credit-card-outline"
                title="Payments"
                onPress={() => {
                  closeDrawer();
                  onPayments();
                }}
              />

              <MenuItem
                icon="bell-outline"
                title="Notifications"
                onPress={() => {
                  closeDrawer();
                  onNotifications();
                }}
              />

              <MenuItem
                icon="account-circle-outline"
                title="Profile"
                onPress={() => {
                  closeDrawer();
                  onProfile();
                }}
              />

              <MenuItem
                icon="help-circle-outline"
                title="Help & Support"
                onPress={() => {
                  closeDrawer();
                  onHelp();
                }}
              />

              <MenuItem
                icon="cog-outline"
                title="Settings"
                onPress={() => {
                  closeDrawer();
                  onSettings();
                }}
              />

              <View style={styles.divider} />

              <MenuItem
                icon="logout"
                title="Logout"
                color="#DC2626"
                onPress={() => {
                  closeDrawer();
                  onLogout();
                }}
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
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}
function MenuItem({
  icon,
  title,
  color = "#0F172A",
  onPress,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  color?: string;
  onPress: () => void;
}) {
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
  modalRoot: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,42,0.42)",
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

    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 24,
  },

  safeArea: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  menuContent: {
    paddingTop: 10,
    paddingBottom: 40,
    flexGrow: 1,
  },

  header: {
    backgroundColor: "#F97316",

    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 16,

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