import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity,Platform } from "react-native";
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
        shadowColor: Platform.OS =="ios"?"#ebebeb":"#DDDDDD",
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
        backgroundColor: primaryColor,
        margin: 10,
        marginLeft: 5,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
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
          flex: 2,
        }}
      >
        <Text numberOfLines={1}
          style={{
            color: textColor,
            fontSize:13,
            fontFamily: 'Poppins-SemiBold'
          }}
        >
          Builder Service
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setSelect(!Select)}
        style={{
          borderColor: textColor,
          borderRadius: 15,
          height: 32,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          width:60,
          marginLeft:10,
          marginRight:10
        }}
      >
        <Text
          style={{
            color: Select ? "green" : "red",
            fontSize:12,
            fontFamily: 'Poppins-Medium',
            margin:5
          }}
        >
          {Select ? "done" : "+add"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Cart1;
