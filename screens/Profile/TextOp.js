import React from "react";
import { View, Text } from "react-native";

export default function TextOp({ number, text,style,view }) {
  return (
    <View
      style={[{
        flexDirection: "row",
        flexWrap:"wrap",
        
      },style]}>
      {number&&!view?(
        <Text
        style={{
          marginRight:3,
          fontSize: 16,
          
          fontWeight: "400",
          color: "#1A1A1A",
        }}>
        {number}
      </Text>
      ):view&&number?(
        <View style={{
          width:20,
          height:20,
          borderRadius:10,
          backgroundColor:"#4ADE80",
          justifyContent:"center",
          alignItems:"center",
          marginRight:12
        }}>
          <Text style={{
            color:"white"
          }}>{number}</Text>
        </View>
      ):(
        <View style={{
            backgroundColor:"#1A1A1A",
            height:5,
            width:5,
            borderRadius:2.5,
            marginRight:10,
            marginTop:10
        }}/>
      )}
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          lineHeight:24,
          fontWeight: "400",
          color: "#1A1A1A",
        }}>
        {text}
      </Text>
    </View>
  );
}
