import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type Props = {
  onPress: () => void;
};

export default function HeroOrderCard({
  onPress,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>

        <Text style={styles.small}>
          Today's Rate
        </Text>

        <Text style={styles.rate}>
          ₹150
          <Text style={styles.kg}> / Kg</Text>
        </Text>

        <Text style={styles.time}>
          Valid till 6:00 PM
        </Text>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>
          →
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

card:{
backgroundColor:"#F97316",
borderRadius:22,
padding:22,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:20,
},

left:{
flex:1,
},

small:{
color:"#FFE7D4",
fontSize:13,
},

rate:{
color:"#FFFFFF",
fontSize:34,
fontWeight:"700",
marginTop:6,
},

kg:{
fontSize:18,
},

time:{
color:"#FFF7ED",
marginTop:8,
fontSize:13,
},

button:{
width:52,
height:52,
borderRadius:26,
backgroundColor:"rgba(255,255,255,.2)",
justifyContent:"center",
alignItems:"center",
},

buttonText:{
fontSize:30,
color:"#FFF",
fontWeight:"700",
}

});