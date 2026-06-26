import React, {
  useEffect,
  useState,
} from "react";

import AsyncStorage
from "@react-native-async-storage/async-storage";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  ScrollView,
} from "react-native";

import WizardHeader
from "../components/WizardHeader";

import WizardFooter
from "../components/WizardFooter";

import ShopCard
from "../components/ShopCard";

import {
  useOrder,
} from "../../../context/OrderContext";

export default function Step1ShopScreen(){

const {
order,
updateOrder,
}=useOrder();

const[
shops,
setShops,
]=useState<any[]>([]);

useEffect(()=>{

loadShops();

},[]);

async function loadShops(){

const mobile=
await AsyncStorage.getItem(
"retailerMobile"
);

const response=
await fetch(
`https://www.chickbazaar.com/api/mobile/shops?mobile=${mobile}`
);

const data=
await response.json();

setShops(data);

if(
data.length>0 &&
!order.shop
){

updateOrder({
shop:data[0],
});

}

}

return(

<SafeAreaView
style={{
flex:1,
backgroundColor:"#FFF",
}}
>

<ScrollView
contentContainerStyle={{
padding:20,
paddingBottom:40,
}}
>

<WizardHeader

step={1}

total={7}

title="Where should we deliver?"

subtitle="Choose your delivery shop."

/>

{

shops.map(shop=>(

<ShopCard

key={shop.id}

shop={shop}

selected={
order.shop?.shopName===
shop.shopName
}

onPress={()=>

updateOrder({

shop,

})

}

/>

))

}

<WizardFooter

nextTitle="Continue"

onNext={()=>{

}}

 />

</ScrollView>

</SafeAreaView>

);

}