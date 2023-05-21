import React from 'react'
import { Dimensions, ScrollView, View ,Text, Pressable} from 'react-native'
import { SvgXml } from 'react-native-svg'
import { AllData } from '../../Data/AllData'
import { CATEGORY_LIST } from '../../Data/newIcon'
const {width,height}=Dimensions.get("window")

export default function ServiceListCart({navigation}) {
  return (
    <View style={{
        marginVertical:20
    }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View style={{width:12}}/>
            {CATEGORY_LIST.map((doc,i)=>(
                <Cart onPress={()=>{
                    navigation?.navigate("SearchSecond", { key: doc?.title?.split(" ")[0],mainCategory:doc?.title?.split(" ")[0] });
                  }} key={i} data={doc}/>
            ))}
            <View style={{width:12}}/>
        </ScrollView>
    </View>
  )
}
const Cart=({data,onPress})=>{
    return(
        <Pressable onPress={onPress} style={{
            height:width/4-5,
            backgroundColor:data.color,
            marginHorizontal:6,
            borderRadius:20,
            justifyContent:"center",
            alignItems:"center",
            paddingHorizontal:28,
            paddingVertical:16,
            borderWidth:1,
            borderColor:"#E6E6E6"
        }}>
            <SvgXml width={"30"} height={"30"} xml={data.icon}/>
            <Text style={{
                fontSize:12,
                fontWeight:"700",
                marginTop:10,
                color:data?.title=="Painter"?"#484848":"white"
            }}>{data?.title}</Text>
        </Pressable>
    )
}
