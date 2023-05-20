import React from 'react'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SvgXml } from 'react-native-svg'

export default function ServiceHeader({navigation,route}) {
  
    return (
    <View style={{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:20,
        paddingVertical:32,
        justifyContent:"space-between",
        
    }}>
        <Pressable onPress={()=>{
            navigation.goBack()
        }}>
            <SvgXml xml={back}/>
        </Pressable>
        <Pressable onPress={()=>{
            navigation.navigate("Search")
        }}>
            <SvgXml xml={search}/>
        </Pressable>
    </View>
  )
}
const back=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
const search=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.6154 2.00098C6.30714 2.00098 2.00391 6.20917 2.00391 11.4002C2.00391 16.5913 6.30714 20.7995 11.6154 20.7995C13.8868 20.7995 15.9742 20.029 17.6191 18.7407L20.7463 21.7909L20.8294 21.8609C21.1195 22.0708 21.5307 22.0469 21.7932 21.7896C22.0819 21.5065 22.0812 21.0482 21.7918 20.7659L18.701 17.7512C20.2696 16.0785 21.227 13.8487 21.227 11.4002C21.227 6.20917 16.9238 2.00098 11.6154 2.00098ZM11.6116 3.44824C16.1023 3.44824 19.7427 7.00826 19.7427 11.3998C19.7427 15.7913 16.1023 19.3513 11.6116 19.3513C7.12089 19.3513 3.48047 15.7913 3.48047 11.3998C3.48047 7.00826 7.12089 3.44824 11.6116 3.44824Z" fill="#767676"/>
</svg>
`