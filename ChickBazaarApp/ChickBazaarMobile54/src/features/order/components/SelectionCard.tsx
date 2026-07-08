import React from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

type Props = {

  icon:string;

  title:string;

  subtitle:string;

  selected:boolean;

  onPress:()=>void;

};

export default function SelectionCard({

icon,

title,

subtitle,

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

<View
style={styles.header}
>

<Text
style={styles.icon}
>

{icon}

</Text>

<Text
style={styles.title}
>

{title}

</Text>

</View>

<Text
style={styles.subtitle}
>

{subtitle}

</Text>

{selected&&(

<View
style={styles.badge}
>

<Text
style={styles.badgeText}
>

✓ Selected

</Text>

</View>

)}

</TouchableOpacity>

);

}

const styles=StyleSheet.create({

card:{
padding:20,
borderRadius:18,
borderWidth:1,
borderColor:"#E5E7EB",
backgroundColor:"#FFF",
marginBottom:18,
},

selected:{
borderColor:"#F97316",
backgroundColor:"#FFF7ED",
},

header:{
flexDirection:"row",
alignItems:"center",
},

icon:{
fontSize:28,
marginRight:12,
},

title:{
fontWeight:"700",
fontSize:18,
},

subtitle:{
marginTop:10,
color:"#64748B",
lineHeight:22,
},

badge:{
marginTop:15,
alignSelf:"flex-start",
backgroundColor:"#16A34A",
paddingHorizontal:12,
paddingVertical:5,
borderRadius:20,
},

badgeText:{
color:"#FFF",
fontWeight:"700",
},

});