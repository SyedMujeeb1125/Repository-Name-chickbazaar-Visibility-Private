import React from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import WizardHeader from "./WizardHeader";
import WizardFooter from "./WizardFooter";

type Props = {

  step:number;

  total:number;

  title:string;

  subtitle:string;

  children:React.ReactNode;

  estimatedAmount?: number;
  
  advanceAmount?: number;

  onBack?:()=>void;

  onNext:()=>void;

  nextTitle?:string;

};

export default function WizardLayout({

step,

total,

title,

subtitle,

children,

estimatedAmount,

advanceAmount,

onBack,

onNext,

nextTitle,

}:Props){

return(

<SafeAreaView
style={styles.container}
>

<WizardHeader

step={step}

total={total}

title={title}

subtitle={subtitle}

/>

<View style={styles.content}>

{children}

</View>

<WizardFooter

estimatedAmount={estimatedAmount}

advanceAmount={advanceAmount}

onBack={onBack}

onNext={onNext}

nextTitle={nextTitle}

/>

</SafeAreaView>

);

}

const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#FFFFFF",
padding:20,
},

content:{
flex:1,
marginTop:10,
},

});