import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

type Props = {

  value:number;

  selected:boolean;

  onPress:()=>void;

};

export default function QuantityCard({

value,

selected,

onPress,

}:Props){

return(

<TouchableOpacity

style={[
styles.card,
selected&&styles.selected,
]}

onPress={onPress}

>

<Text
style={[
styles.text,
selected&&styles.selectedText,
]}
>

{value} KG

</Text>

</TouchableOpacity>

);

}

const styles=StyleSheet.create({

card:{
flex:1,
margin:6,
paddingVertical:18,
borderRadius:18,
borderWidth:1,
borderColor:"#E5E7EB",
alignItems:"center",
},

selected:{
backgroundColor:"#F97316",
borderColor:"#F97316",
},

text:{
fontWeight:"700",
fontSize:17,
},

selectedText:{
color:"#FFF",
},

});