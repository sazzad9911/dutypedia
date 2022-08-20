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
        shadowOffset: {
          height: 1,
          width: 1,
        },
        shadowColor: "rgba(0, 0, 0, 0.636)",
        shadowRadius: 1,
        elevation: 1,
        shadowOpacity: 0.2,
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
          color="black"
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
          }}
        >
          Builder Service
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setSelect(!Select)}
        style={{
          margin: 10,
          borderColor: "black",
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
