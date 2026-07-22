import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import Card from "../ui/Card";

const SUPPORT_PHONE = "9353956243";

type Props = {
  status: string;
  canCancel?: boolean;
  driverPhone?: string;
  onCancel: () => void;
  onInvoice: () => void;
  onReorder: () => void;
};

export default function OrderActionCard({
  status,
  canCancel,
  driverPhone,
  onCancel,
  onInvoice,
  onReorder,
}: Props) {
  const callSupport = () =>
    Linking.openURL(`tel:${SUPPORT_PHONE}`);

  const whatsappSupport = () =>
    Linking.openURL(
      `https://wa.me/91${SUPPORT_PHONE}`
    );

  const callDriver = () => {
    if (!driverPhone) return;

    Linking.openURL(`tel:${driverPhone}`);
  };

  const ActionButton = ({
    icon,
    title,
    color,
    onPress,
  }: {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    title: string;
    color: string;
    onPress: () => void;
  }) => (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: color,
        },
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon}
        size={22}
        color="#FFFFFF"
      />

      <Text style={styles.buttonText}>
        {title}
      </Text>
    </Pressable>
  );

  return (
    <Card>
      <Text style={styles.heading}>
        Quick Actions
      </Text>

      {canCancel && (
        <>
          <ActionButton
            icon="close-circle-outline"
            title="Cancel Order"
            color="#DC2626"
            onPress={onCancel}
          />

          <View style={styles.space} />

          <ActionButton
            icon="headset"
            title="Contact Support"
            color="#2563EB"
            onPress={callSupport}
          />

          <View style={styles.space} />

          <ActionButton
            icon="whatsapp"
            title="WhatsApp Support"
            color="#16A34A"
            onPress={whatsappSupport}
          />
        </>
      )}

      {(status === "allocated" ||
        status === "preparing") && (
        <>
          <ActionButton
            icon="headset"
            title="Contact Support"
            color="#2563EB"
            onPress={callSupport}
          />

          <View style={styles.space} />

          <ActionButton
            icon="whatsapp"
            title="WhatsApp Support"
            color="#16A34A"
            onPress={whatsappSupport}
          />
        </>
      )}

      {(status === "vehicle_assigned" ||
        status === "out_for_delivery") && (
        <>
          <ActionButton
            icon="phone"
            title="Call Driver"
            color="#16A34A"
            onPress={callDriver}
          />

          <View style={styles.space} />

          <ActionButton
            icon="headset"
            title="Contact Support"
            color="#2563EB"
            onPress={callSupport}
          />

          <View style={styles.space} />

          <ActionButton
            icon="whatsapp"
            title="WhatsApp Support"
            color="#16A34A"
            onPress={whatsappSupport}
          />
        </>
      )}

            {status === "delivered" && (
        <>
          <ActionButton
            icon="download"
            title="Download Invoice"
            color="#F97316"
            onPress={onInvoice}
          />

          <View style={styles.space} />

          <ActionButton
            icon="reload"
            title="Reorder"
            color="#16A34A"
            onPress={onReorder}
          />

          <View style={styles.space} />

          <ActionButton
            icon="alert-circle-outline"
            title="Raise Issue"
            color="#DC2626"
            onPress={callSupport}
          />

          <View style={styles.space} />

          <ActionButton
            icon="whatsapp"
            title="WhatsApp Support"
            color="#16A34A"
            onPress={whatsappSupport}
          />
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 18,
  },

  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },

  space: {
    height: 12,
  },
});