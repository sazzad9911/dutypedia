import React from 'react'
import { View ,Text,Pressable} from 'react-native'
import { SvgXml } from 'react-native-svg'

export default function SquireCart({style,icon,title,onPress}) {
  return (
    <Pressable onPress={onPress} style={[{
        alignItems:"center"
    },style]}>
        <SvgXml xml={icon}/>
        <Text style={{
            marginTop:8,
            fontSize:12,
            color:"#000000",
        }}>{title}</Text>
    </Pressable>
  )
}
