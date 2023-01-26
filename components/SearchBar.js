import React from "react";
import { View, Animated, Text, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function SearchBar({translateY,onChange}) {
  return (
    
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          borderRadius: 20,
          height: 40,
          alignItems: "center",
          backgroundColor: "white",
          paddingHorizontal: 15,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: "#e5e5e5",
        }}
      >
        <AntDesign name="search1" size={24} color="black" />
        <TextInput onChangeText={onChange}
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontFamily: "Poppins-Medium",
          }}
          placeholder="Search here.."
        />
      </View>
   
  );
}
