import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { textColor, primaryColor } from "./../assets/colors";
import { Foundation } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
function Cart1(props) {
  const [Select, setSelect] = React.useState(false);
  return (
    <View
      style={{
        width: 250,
        height: 50,
        shadowColor: "#d5d5d5",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
        backgroundColor: primaryColor,
        margin: 10,
        marginLeft: 5,
        borderRadius: 5,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Foundation
          style={{
            margin: 10,
          }}
          name="music"
          size={24}
          color={textColor}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            margin: 10,
            color: textColor,
          }}
        >
          Builder Service
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setSelect(!Select)}
        style={{
          margin: 10,
          borderColor: textColor,
          borderRadius: 15,
          height: 30,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text
          style={{
            color: Select ? "green" : "red",
          }}
        >
          {Select ? "done" : "+add"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Cart1;
