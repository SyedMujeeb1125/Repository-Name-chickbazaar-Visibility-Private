import React,{
useState,
} from "react";

import Step1ShopScreen
from "../features/order/screens/Step1ShopScreen";

import Step2OrderTypeScreen
from "../features/order/screens/Step2OrderTypeScreen";

export default function OrderWizardNavigator(){

const[
step,
setStep,
]=useState(1);

if(step===1){

return(
<Step1ShopScreen/>
);

}

return(
<Step2OrderTypeScreen/>
);

}