import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Card from "../ui/Card";

type Props = {
  supportPhone: string;
  supportWhatsapp: string;
};

export default function NeedHelpCard({
  supportPhone,
  supportWhatsapp,
}: Props) {

  const callSupport = () => {
    Linking.openURL(`tel:${supportPhone}`);
  };

  const whatsappSupport = () => {
    Linking.openURL(
      `https://wa.me/91${supportWhatsapp}`
    );
  };

  return (
    <Card>

      <View style={styles.header}>
        <MaterialCommunityIcons
          name="lifebuoy"
          size={24}
          color="#F97316"
        />

        <Text style={styles.title}>
          Need Help?
        </Text>
      </View>

      <Text style={styles.subtitle}>
        Our support team is available to help with
        delivery, payments or order-related queries.
      </Text>

      <View style={styles.buttons}>

        <Pressable
          style={styles.callButton}
          onPress={callSupport}
        >
          <MaterialCommunityIcons
            name="phone"
            color="#fff"
            size={20}
          />

          <Text style={styles.buttonText}>
            Call
          </Text>
        </Pressable>

        <Pressable
          style={styles.whatsappButton}
          onPress={whatsappSupport}
        >
          <MaterialCommunityIcons
            name="whatsapp"
            color="#fff"
            size={20}
          />

          <Text style={styles.buttonText}>
            WhatsApp
          </Text>
        </Pressable>

      </View>

    </Card>
  );
}

const styles = StyleSheet.create({

  header:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:15,
  },

  title:{
    marginLeft:10,
    fontSize:22,
    fontWeight:"700",
    color:"#0F172A",
  },

  subtitle:{
    fontSize:15,
    color:"#64748B",
    lineHeight:24,
    marginBottom:20,
  },

  buttons:{
    flexDirection:"row",
  },

  callButton:{
    flex:1,
    height:52,
    borderRadius:14,
    backgroundColor:"#2563EB",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    marginRight:8,
  },

  whatsappButton:{
    flex:1,
    height:52,
    borderRadius:14,
    backgroundColor:"#16A34A",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    marginLeft:8,
  },

  buttonText:{
    marginLeft:8,
    color:"#fff",
    fontWeight:"700",
    fontSize:16,
  },

});