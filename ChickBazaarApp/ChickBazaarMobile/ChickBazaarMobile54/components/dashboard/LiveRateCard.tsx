import React from "react";

import {
View,
Text,
StyleSheet,
} from "react-native";

type Props={
rate:number;
};

export default function LiveRateCard({
rate,
}:Props){

return(

<View style={styles.card}>

<Text style={styles.heading}>
📈 LIVE MARKET RATE
</Text>

<Text style={styles.rate}>
₹{rate.toLocaleString()}/KG
</Text>

<Text style={styles.time}>
Updated Today
</Text>

</View>

);

}

const styles=StyleSheet.create({

card:{
backgroundColor:"#F97316",
padding:22,
borderRadius:20,
marginBottom:20
},

heading:{
color:"#FFF",
fontSize:15,
fontWeight:"600"
},

rate:{
color:"#FFF",
fontSize:36,
fontWeight:"700",
marginTop:10
},

time:{
marginTop:10,
color:"#FFEDD5"
}

});