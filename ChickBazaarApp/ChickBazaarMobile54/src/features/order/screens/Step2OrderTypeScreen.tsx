import React from "react";

import {
View,
} from "react-native";

import SelectionCard
from "../components/SelectionCard";

import WizardLayout from "../components/WizardLayout";

import {
useOrder,
} from "../../../context/OrderContext";

export default function Step2OrderTypeScreen(){

const{
order,
updateOrder,
}=useOrder();

return(

<WizardLayout

step={2}

total={7}

title="How would you like to order?"

subtitle="Choose the ordering method that best suits your business."

onBack={()=>{}}

onNext={()=>{}}

>

<View>

<SelectionCard

icon="⚖️"

title="Order by Weight"

subtitle="Recommended for wholesale purchases measured in kilograms."

selected={
order.orderType==="weight"
}

onPress={()=>

updateOrder({

orderType:"weight",

})

}

/>

<SelectionCard

icon="🐔"

title="Order by Bird Count"

subtitle="Choose this when you know exactly how many birds you require."

selected={
order.orderType==="birds"
}

onPress={()=>

updateOrder({

orderType:"birds",

})

}

/>

</View>

</WizardLayout>

);

}