import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import ProgressBar
from "./ProgressBar";

type Props = {

  step:number;

  total:number;

  title:string;

  subtitle:string;

};

export default function WizardHeader({

step,

total,

title,

subtitle,

}:Props){

return(

<View style={styles.container}>

<Text style={styles.step}>

Step {step} of {total}

</Text>

<ProgressBar

current={step}

total={total}

/>

<Text style={styles.title}>

{title}

</Text>

<Text style={styles.subtitle}>

{subtitle}

</Text>

</View>

);

}

const styles=StyleSheet.create({

container:{
marginBottom:30,
},

step:{
fontWeight:"700",
color:"#F97316",
},

title:{
fontSize:28,
fontWeight:"700",
marginTop:18,
},

subtitle:{
marginTop:10,
fontSize:16,
color:"#64748B",
lineHeight:24,
},

});