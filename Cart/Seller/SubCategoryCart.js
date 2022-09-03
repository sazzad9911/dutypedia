import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor,textColor } from "./../../assets/colors";

const SubCategoryCart = ({ title }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        marginVertical: 5,
        marginHorizontal: 20,
        backgroundColor: primaryColor,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: "space-between",
        borderRadius: 5,
        shadowColor: "#d5d5d5",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 4,
      }}
    >
      <Text style={{
        color:textColor,
        fontSize:16,
        fontFamily: 'Poppins-Medium'
      }}>{title}</Text>
      <AntDesign name="right" size={24} color={textColor} />
    </TouchableOpacity>
  );
};

export default SubCategoryCart;
