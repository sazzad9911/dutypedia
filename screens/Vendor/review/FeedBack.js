import React from 'react'
import { ScrollView,View } from 'react-native'
import { Cart } from '../../../Cart/ReviewCart'
import IconButton from '../../../components/IconButton'
import TextArea from '../../../components/TextArea'

export default function FeedBack() {
  return (
   <ScrollView>
    <View style={{
        paddingHorizontal:28,
    }}>
        <Cart noReplay={true}/>
        <View style={{height:28}}/>
        <TextArea style={{
            width:"100%"
        }} placeholderTextColor={"#767676"} placeholder={"type your reply...."}/>
        <View style={{height:28}}/>
        <IconButton style={{
            height:40,
            color:"#A3A3A3"
        }} title={"Done"}/>
    </View>
   </ScrollView>
  )
}
