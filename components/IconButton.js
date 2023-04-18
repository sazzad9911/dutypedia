import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Color } from "../assets/colors";

const IconButton = ({
  Icon,
  style,
  onPress,
  title,
  disabled,
  active,
  LeftIcon,
}) => {
  const isDark=useSelector(state=>state.isDark)
  const colors=new Color(isDark)
  const backgroundColor=colors.getBackgroundColor()
  const textColor=colors.getTextColor()
  const primaryColor=colors.getPrimaryColor()
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      style={[
        {
          paddingHorizontal: 10,
          backgroundColor: active ? backgroundColor : primaryColor,
          flexDirection: "row",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          height: 45,
          
          borderWidth: active ? 0 : 1,
          borderColor: "#e5e5e5",
        },
        style,
      ]}
    >
    {LeftIcon && (
        <View>
          <LeftIcon />
        </View>
      )}
      {LeftIcon &&title&&(<View style={{width:10}}/>)}
      {title && (
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize:style&&style.fontSize?style.fontSize: 14,
            color: active? "white": style&&style.color?style.color:textColor,
            opacity: disabled ? 0.4 : 1,
          }}
        >
          {title}
        </Text>
      )}
      {Icon &&title&&(<View style={{width:10}}/>)}
      {Icon && (
        <View style={{ marginLeft: 0 }}>
          <Icon />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
