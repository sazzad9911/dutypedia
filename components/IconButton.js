import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { backgroundColor,primaryColor,textColor } from "../assets/colors";

const IconButton = ({ Icon, style, onPress, title,disabled,active }) => {
  return (
    <TouchableOpacity disabled={disabled}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      style={[
        {
          paddingHorizontal: 10,
          backgroundColor: active?backgroundColor:primaryColor,
          flexDirection: "row",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          height: 45,
          opacity:disabled?.4:1,
          borderWidth:active?0:1,
          borderColor:'#e5e5e5'
        },
        style,
      ]}
    >
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 14,
          color:active?style && style.color ? style.color : "white":textColor
        }}
      >
        {title}
      </Text>

      {Icon ? (
        <View style={{marginLeft:10}}>
          <Icon />
        </View>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
