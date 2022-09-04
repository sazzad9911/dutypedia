import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor } from "./../../assets/colors";

const MainCategoryCart = ({ icon, title, color,navigation,onPress }) => {
  return (
    <TouchableOpacity onPress={() =>{
        if(onPress){
          onPress()
        }
    }}
      style={{
        flexDirection: "row",
        marginVertical: 5,
        marginHorizontal: 20,
        backgroundColor: primaryColor,
        borderRadius: 7,
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: "center",
        shadowColor: "#d5d5d5",
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: 60,
          height: 60,
        }}
      >
        <View
          style={{
            backgroundColor: color,
            width: 60,
            height: 60,
            borderRadius: 30,
            opacity: 0.1,
            position: "absolute",
          }}
        ></View>
        <SvgXml
          style={{
            backgroundColor: "transparent",
          }}
          xml={icon}
          height="35"
          width="35"
        />
      </View>
      <Text
        style={{
          flex: 3,
          marginLeft: 20,
          fontFamily: 'Poppins-Medium'
        }}
      >
        {title}
      </Text>
      <View style={{ justifySelf: "flex-end" }}>
        <AntDesign name="right" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default MainCategoryCart;
