import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

export default function CommonHeader({navigation,title}) {
  return (
    <View style={{
        paddingHorizontal:20,
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:12,
        justifyContent:"center"
    }}>
        <Pressable onPress={()=>{
            navigation.goBack()
        }} style={{
            position:"absolute",
            left:20,
            zIndex:2
        }}>
            <SvgXml xml={backIcon}/>
        </Pressable>
        <Text style={{
            color:"#1A1A1A",
            fontSize:24,
            fontWeight:"500"
        }}>{title}</Text>
    </View>
  )
}
const backIcon=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`