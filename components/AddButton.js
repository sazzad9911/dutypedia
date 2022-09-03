import React from "react";
import { SvgXml } from "react-native-svg";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { add } from "../assets/icon";
import { primaryColor } from "./../assets/colors";
const { width, height } = Dimensions.get("window");
import styles_all from "../assets/styles_all";

const AddButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={() =>{
        if(onPress){
          onPress()
        }
    }}
      style={[
        {
          width: width - 40,
          height: 45,
          borderRadius: 5,
          backgroundColor: primaryColor,
          marginLeft: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        styles_all.shadow,
      ]}
    >
      <View style={[styles_all.shadow,{
        backgroundColor:primaryColor,
        flexDirection: "row",
      }]}>
        <SvgXml xml={add} height="25" width="25" />
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            fontSize: 16,
            marginLeft: 20,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddButton;
