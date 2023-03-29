import React from "react";
import { View, Text } from "react-native";

export default function TextOp({ number, text,style }) {
  return (
    <View
      style={[{
        flexDirection: "row",
        flexWrap:"wrap",
        
      },style]}>
      {number?(
        <Text
        style={{
          marginRight:3,
          fontSize: 16,
          lineHeight: 24,
          fontWeight: "400",
          color: "#1A1A1A",
        }}>
        {number}
      </Text>
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
          lineHeight: 24,
          fontWeight: "400",
          color: "#1A1A1A",
        }}>
        {text}
      </Text>
    </View>
  );
}
