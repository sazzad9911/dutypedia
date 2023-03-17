import React from 'react'
import { Dimensions, ScrollView, View ,Text} from 'react-native'
import { SvgXml } from 'react-native-svg'
import { AllData } from '../../Data/AllData'
import { CATEGORY_LIST } from '../../Data/newIcon'
const {width,height}=Dimensions.get("window")

export default function ServiceListCart() {
  return (
    <View style={{
        marginVertical:20
    }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View style={{width:20}}/>
            {CATEGORY_LIST.map((doc,i)=>(
                <Cart key={i} data={doc}/>
            ))}
            <View style={{width:20}}/>
        </ScrollView>
    </View>
  )
}
const Cart=({data})=>{
    return(
        <View style={{
            height:width/4-5,
            backgroundColor:data.color,
            marginHorizontal:6,
            borderRadius:20,
            justifyContent:"center",
            alignItems:"center",
            paddingHorizontal:28,
            paddingVertical:16
        }}>
            <SvgXml width={"30"} height={"30"} xml={data.icon}/>
            <Text style={{
                fontSize:12,
                fontWeight:"700",
                marginTop:10,
                color:"white"
            }}>{data?.title}</Text>
        </View>
    )
}
