import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { textColor, primaryColor } from "./../assets/colors";
import { Foundation } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

function Options(props) {
  const [Select, setSelect] = React.useState(false);
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
        shadowColor: "#d5d5d5",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 2,
        backgroundColor: Select ? "#117A65" : primaryColor,
        margin: 10,
        marginLeft: 5,
        borderRadius: 25,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
