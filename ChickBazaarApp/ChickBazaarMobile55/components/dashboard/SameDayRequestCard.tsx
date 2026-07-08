import React from "react";

import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  visible: boolean;
  onPress: () => void;
};

export default function SameDayRequestCard({
  visible,
  onPress,
}: Props) {

  if (!visible) {
    return null;
  }

  return (

    <View style={styles.card}>

      <View style={styles.header}>

        <View style={styles.iconCircle}>

          <MaterialCommunityIcons
            name="lightning-bolt"
            size={30}
            color="#F97316"
          />

        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.title}>
            Need Birds Today?
          </Text>

          <Text style={styles.subtitle}>
            Request Same-Day Delivery
          </Text>

        </View>

      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={18}
          color="#16A34A"
        />

        <Text style={styles.info}>
          Subject to bird availability
        </Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={18}
          color="#16A34A"
        />

        <Text style={styles.info}>
          Subject to vehicle availability
        </Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name="clock-outline"
          size={18}
          color="#EA580C"
        />

        <Text style={styles.info}>
          Estimated delivery: 2–4 Hours
        </Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons
          name="cash"
          size={18}
          color="#EA580C"
        />

        <Text style={styles.info}>
          Additional delivery charges may apply
        </Text>
      </View>

      <View style={styles.button}>
        <PrimaryButton
          title="REQUEST SAME-DAY DELIVERY"
          onPress={onPress}
        />
      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  card:{

    backgroundColor:"#FFFFFF",

    borderRadius:28,

    padding:22,

    marginBottom:18,

    shadowColor:"#000",

    shadowOpacity:0.08,

    shadowRadius:18,

    shadowOffset:{
      width:0,
      height:8,
    },

    elevation:8,

  },

  header:{
    flexDirection:"row",
    marginBottom:18,
    alignItems:"center",
  },

  iconCircle:{
    width:58,
    height:58,
    borderRadius:29,
    backgroundColor:"#FFF7ED",
    justifyContent:"center",
    alignItems:"center",
    marginRight:16,
  },

  title:{
    fontSize:22,
    fontWeight:"800",
    color:"#0F172A",
  },

  subtitle:{
    marginTop:4,
    fontSize:15,
    color:"#64748B",
  },

  infoRow:{
    flexDirection:"row",
    alignItems:"center",
    marginTop:12,
  },

  info:{
    marginLeft:10,
    fontSize:14,
    color:"#475569",
    flex:1,
  },

  button:{
    marginTop:22,
  },

});