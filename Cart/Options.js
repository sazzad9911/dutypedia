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
        setSelect(!Select)
        if(props.onPress){
          props.onPress()
        }
        }}
      style={{
        minWidth: width / 3,
        paddingHorizontal: 30,
        height: 45,
        shadowOffset: {
          height: 1,
          width: 1,
        },
        shadowColor: "rgba(0, 0, 0, 0.636)",
        shadowRadius: 1,
        elevation: 1,
        shadowOpacity: 0.2,
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
        }}
      >
        {props.name ? props.name : "Lawyer"}
      </Text>
    </TouchableOpacity>
  );
}

export default Options;
