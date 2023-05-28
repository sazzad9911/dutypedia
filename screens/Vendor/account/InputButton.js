import React from "react";
import { Pressable, Text, View } from "react-native";

export default function InputButton({ style, value, onPress, placeholder,error,Icon }) {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={[
          {
            borderBottomWidth: 1,
            marginHorizontal: 20,
            marginVertical: 5,
            borderRadius: 5,
            height: 45,
            paddingHorizontal: 10,
            alignItems: "center",
            flexDirection:"row",
            justifyContent:"space-between"
          },

          { borderColor: "#e5e5e5" },
          style,
        ]}>
        <Text numberOfLines={1}
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 15,
          }}>
          {value ? value : placeholder}
        </Text>
        {Icon&&(<Icon/>)}
      </Pressable>
      {error&&(<Text style={{color:"red",marginTop:5}}>{error}</Text>)}
    </View>
  );
}
