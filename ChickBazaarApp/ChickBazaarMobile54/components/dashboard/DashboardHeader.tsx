import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

type Props = {
  shopName: string;
  address?: string;
};

export default function DashboardHeader({
  shopName,
  address,
}: Props) {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (

    <View style={styles.container}>

      <View style={styles.topRow}>

        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>☰</Text>
        </TouchableOpacity>

        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.icon}>🔔</Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.greeting}>
        {greeting} ☀️
      </Text>

      <Text style={styles.shop}>
        {shopName}
      </Text>

      <Text style={styles.location}>
        📍 {address || "Bangalore"}
      </Text>

    </View>

  );
}

const styles = StyleSheet.create({

  container:{
    marginBottom:28,
  },

  topRow:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:18,
  },

  logo:{
    width:120,
    height:55,
  },

  iconButton:{
    width:48,
    height:48,
    borderRadius:24,
    backgroundColor:"#FFFFFF",
    justifyContent:"center",
    alignItems:"center",
    elevation:3,
  },

  icon:{
    fontSize:22,
  },

  greeting:{
    color:"#64748B",
    fontSize:17,
  },

  shop:{
    marginTop:4,
    fontSize:34,
    fontWeight:"800",
    color:"#0F172A",
  },

  location:{
    marginTop:8,
    color:"#64748B",
    fontSize:17,
  },

});