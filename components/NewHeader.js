import React from "react";
import { View, Text } from "react-native";
import { Color } from "./../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

export default function NewHeader({ navigation, route, title }) {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const textColor = colors.getTextColor();
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const assentColor=colors.getAssentColor()

  return (
    <View style={{
        flexDirection:"row",
        paddingHorizontal:20,
        paddingVertical:10,
        paddingTop:25
    }}>
      <AntDesign onPress={()=>{
        navigation.goBack()
      }} name="left" size={22} color={assentColor} />
      <Text
        style={{
          color: textColor,
          fontSize: 16,
          marginLeft:10
        }}
      >
        {title}
      </Text>
    </View>
  );
}
