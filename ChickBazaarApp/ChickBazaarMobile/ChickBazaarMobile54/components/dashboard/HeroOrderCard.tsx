import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import PrimaryButton from "../ui/PrimaryButton";

type Props = {
  onPress: () => void;
};

export default function HeroOrderCard({
  onPress,
}: Props) {
  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        🐔 Fresh Live Chicken
      </Text>

      <Text style={styles.subtitle}>
        Farm Fresh • Quality Checked
      </Text>

      <Text style={styles.delivery}>
        Order before 12 PM for Same-Day Delivery
      </Text>

      <PrimaryButton
        title="PLACE ORDER"
        onPress={onPress}
      />

    </View>
  );
}

const styles = StyleSheet.create({

card:{
backgroundColor:"#FFFFFF",
padding:22,
borderRadius:20,
marginBottom:20,
elevation:3
},

title:{
fontSize:24,
fontWeight:"700",
color:"#0F172A"
},

subtitle:{
marginTop:6,
fontSize:15,
color:"#16A34A"
},

delivery:{
marginTop:12,
marginBottom:20,
color:"#64748B",
lineHeight:22
}

});