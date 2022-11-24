import React from "react";
import { View,Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function AppointmentHeader({ title,navigation }) {
  return (
    <View style={{
        flexDirection:"row",
        borderBottomColor:"#E2E2E2",
        borderBottomWidth:1,
        paddingHorizontal:20,
        alignItems:"center",
        height:45
    }}>
      <AntDesign onPress={()=>{
        navigation.goBack()
      }} name="left" size={24} color="#666666" />
      <Text style={{
        fontSize:16,
        fontFamily:"Poppins-Medium",
        marginLeft:10,
        color:"#333333"
      }}>{title}</Text>
    </View>
  );
}
