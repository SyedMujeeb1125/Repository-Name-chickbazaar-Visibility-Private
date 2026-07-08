import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  icon: string;
  title: string;
  onPress: () => void;
};

export default function QuickAction({
  icon,
  title,
  onPress,
}: Props) {

  return (

    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >

      <View style={styles.iconContainer}>
        <Text style={styles.icon}>
          {icon}
        </Text>
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  card:{
    width:"48%",
    backgroundColor:"#FFFFFF",
    borderRadius:22,
    paddingVertical:24,
    alignItems:"center",
    marginBottom:16,
    elevation:3,
  },

  iconContainer:{
    width:62,
    height:62,
    borderRadius:31,
    backgroundColor:"#FFF4EC",
    justifyContent:"center",
    alignItems:"center",
  },

  icon:{
    fontSize:30,
  },

  title:{
    marginTop:16,
    fontSize:16,
    fontWeight:"700",
    color:"#0F172A",
  },

});