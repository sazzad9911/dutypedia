import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'

export default function AccountHeader({navigation}) {
  return (
    <SafeAreaView style={{
      flexDirection:"row",
      justifyContent:'center',
      paddingHorizontal:20,
      paddingVertical:10,
    }}>
      <SvgXml style={{
        position:"absolute",
        left:20,
        top:30,
      }} onPress={()=>{
        navigation.goBack()
      }} xml={backIcon}/>
      <Text style={{
        fontSize:16
      }}>Account Balance</Text>
      {/* <SvgXml xml={menuIcon}/> */}
    </SafeAreaView>
  )
}

const menuIcon=`<svg width="27" height="17" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="14" y1="0.5" x2="27" y2="0.5" stroke="black"/>
<line y1="8.5" x2="27" y2="8.5" stroke="black"/>
<line x1="7" y1="16.5" x2="27" y2="16.5" stroke="black"/>
</svg>
`
const backIcon=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.25 12H3.75" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 5.25L3.75 12L10.5 18.75" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`