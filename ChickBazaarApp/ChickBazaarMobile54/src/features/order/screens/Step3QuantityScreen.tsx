import React from "react";

import { useNavigation } from "@react-navigation/native";

import {
View,
Text,
TextInput,
StyleSheet,
} from "react-native";

import WizardLayout
from "../components/WizardLayout";

import QuantityCard
from "../components/QuantityCard";

import {
useOrder,
} from "../../../context/OrderContext";

const OPTIONS=[
50,
100,
200,
500,
1000,
];

export default function Step3QuantityScreen(){

const{
order,
updateOrder,
}=useOrder();

const navigation = useNavigation<any>();

const averageBirdWeight = 2;

const estimatedBirds = Math.round(
  order.requestedWeight / averageBirdWeight
);

return (

  <WizardLayout

    step={3}

    total={7}

    title="How much chicken do you need today?"

    subtitle="Choose a quick quantity or enter a custom weight."

    estimatedAmount={
      order.requestedWeight * 120
    }

    advanceAmount={
      order.requestedWeight * 12
    }

    onBack={() => navigation.goBack()}

    onNext={() =>
  navigation.navigate("Step4BirdPreference")
}

  >

<Text style={styles.heading}>

⭐ Suggested

</Text>

<QuantityCard

value={200}

selected={
order.requestedWeight===200
}

onPress={()=>

updateOrder({

requestedWeight:200,

})

}

/>

<Text style={styles.heading}>

Quick Select

</Text>

<View style={styles.grid}>

{

OPTIONS.map(item=>(

<QuantityCard

key={item}

value={item}

selected={
order.requestedWeight===item
}

onPress={()=>

updateOrder({

requestedWeight:item,

})

}

/>

))

}

</View>

<Text style={styles.heading}>

Custom Weight

</Text>

<TextInput

style={styles.input}

keyboardType="numeric"

placeholder="Enter KG"

value={
order.requestedWeight
?String(order.requestedWeight)
:""
}

onChangeText={(text)=>

updateOrder({

requestedWeight:
Number(text)||0,

})

}

/>

<Text style={styles.info}>

Estimated Birds

≈ {estimatedBirds}

</Text>

</WizardLayout>

);

}

const styles=StyleSheet.create({

heading:{
fontWeight:"700",
marginBottom:10,
marginTop:20,
fontSize:16,
},

grid:{
flexDirection:"row",
flexWrap:"wrap",
},

input:{
borderWidth:1,
borderColor:"#E5E7EB",
padding:15,
borderRadius:16,
},

info:{
marginTop:20,
color:"#64748B",
fontSize:16,
},

});