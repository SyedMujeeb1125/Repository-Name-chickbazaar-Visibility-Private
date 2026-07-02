import React from "react";

import {
View,
Text,
StyleSheet,
} from "react-native";

import Card from "../ui/Card";

type Props={

activeOrders:number;

pendingBills:number;

availableCredit:number;

};

export default function BusinessSummaryCard({

activeOrders,

pendingBills,

availableCredit,

}:Props){

return(

<Card>

<Text style={styles.heading}>
📊 Today's Business
</Text>

<Row
title="Active Orders"
value={String(activeOrders)}
/>

<Row
title="Pending Bills"
value={`₹${pendingBills.toLocaleString()}`}
/>

<Row
title="Available Credit"
value={`₹${availableCredit.toLocaleString()}`}
/>

</Card>

);

}

function Row({

title,

value,

}:any){

return(

<View style={styles.row}>

<Text style={styles.title}>
{title}
</Text>

<Text style={styles.value}>
{value}
</Text>

</View>

);

}

const styles=StyleSheet.create({

heading:{
fontSize:20,
fontWeight:"700",
marginBottom:18
},

row:{
flexDirection:"row",
justifyContent:"space-between",
paddingVertical:8
},

title:{
color:"#64748B",
fontSize:15
},

value:{
fontSize:16,
fontWeight:"700",
color:"#0F172A"
}

});