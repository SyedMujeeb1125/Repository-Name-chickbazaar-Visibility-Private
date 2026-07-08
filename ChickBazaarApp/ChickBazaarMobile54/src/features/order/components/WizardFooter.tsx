import React from "react";

import {
View,
Text,
TouchableOpacity,
StyleSheet,
} from "react-native";

type Props={

estimatedAmount?:number;

advanceAmount?:number;

onBack?:()=>void;

onNext:()=>void;

nextTitle?:string;

};

export default function WizardFooter({

estimatedAmount,

advanceAmount,

onBack,

onNext,

nextTitle="Continue",

}:Props){

return(

<View>

{estimatedAmount!==undefined&&(

<View style={styles.summary}>

<Row

label="Estimated Amount"

value={`₹${estimatedAmount.toLocaleString()}`}

/>

<Row

label="Advance"

value={`₹${(advanceAmount??0).toLocaleString()}`}

/>

</View>

)}

<View style={styles.buttons}>

{onBack?(
<TouchableOpacity
style={styles.back}
onPress={onBack}
>
<Text>
← Back
</Text>
</TouchableOpacity>
):(
<View/>
)}

<TouchableOpacity
style={styles.next}
onPress={onNext}
>

<Text
style={styles.nextText}
>

{nextTitle}

→

</Text>

</TouchableOpacity>

</View>

</View>

);

}

function Row({

label,

value,

}:{

label:string;

value:string;

}){

return(

<View style={styles.row}>

<Text style={styles.label}>

{label}

</Text>

<Text style={styles.value}>

{value}

</Text>

</View>

);

}

const styles=StyleSheet.create({

summary:{
backgroundColor:"#FFF7ED",
padding:18,
borderRadius:18,
marginBottom:18,
},

row:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:10,
},

label:{
color:"#64748B",
},

value:{
fontWeight:"700",
fontSize:16,
},

buttons:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
},

back:{
padding:15,
},

next:{
backgroundColor:"#F97316",
paddingHorizontal:30,
paddingVertical:16,
borderRadius:16,
},

nextText:{
color:"#FFF",
fontWeight:"700",
fontSize:16,
},

});