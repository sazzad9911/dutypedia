import React from 'react'
import { View,Text } from 'react-native'

export default function UserProfile({navigation,route}) {
  return (
    <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }}>
        <Text style={{
            fontSize:20,
        }}>Normal User Name : {route.params.name}</Text>
    </View>
  )
}
