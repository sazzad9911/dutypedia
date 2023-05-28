import React from "react";
import { Text, View } from "react-native";

export default function PageChip({ text, currentPage, totalPage, style }) {
  return (
    <View style={{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <View
        style={[
          {
            height: 22,
            paddingHorizontal: 10,
            paddingVertical: 4,
            backgroundColor:"#E6E6E6",
            borderRadius:27
          },
          style,
        ]}>
        <Text style={{
          fontSize:12,
          color:"#A3A3A3"
        }}>
          {text ? text : "Page"} {currentPage}-{totalPage}
        </Text>
      </View>
    </View>
  );
}
