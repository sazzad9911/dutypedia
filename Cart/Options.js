import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity ,Platform} from "react-native";
import { Color } from "./../assets/colors";
import { Foundation } from "@expo/vector-icons";
import {useSelector} from 'react-redux'

const { width, height } = Dimensions.get("window");

function Options(props) {
  const [Select, setSelect] = React.useState(false);
  const isDark= useSelector((state) => state.isDark);
  const colors=new Color(isDark);
  const primaryColor=colors.getPrimaryColor();
  const textColor=colors.getTextColor();

  return (
    <TouchableOpacity
      onPress={() => {
        if (!props.action) {
          setSelect(!Select);
        }
        if (props.onPress) {
          props.onPress();
        }
      }}
      style={{
        minWidth: width / 3,
        paddingHorizontal: 30,
        height: 45,
        backgroundColor: Select ? "#117A65" : primaryColor,
        margin: 10,
        marginLeft: 5,
        borderRadius: 25,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth:props.action?1:0,
        borderColor:'#e5e5e5'
      }}
    >
      <Text
        style={{
          justifyContent: "center",
          alignItems: "center",
          color: Select ? "white" : textColor,
          fontFamily: 'Poppins-SemiBold',
          fontSize:13
        }}
      >
        {props.name ? props.name : "Lawyer"}
      </Text>
    </TouchableOpacity>
  );
}

export default Options;
