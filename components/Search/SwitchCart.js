import React from "react";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";

export default function SwitchCart({style, title, value, onChange }) {
  return (
    <View
      style={[{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },style]}>
      <Text
        style={{
          fontSize: 16,
          lineHeight: 18,
          fontWeight: "400",
        }}>
        {title}
      </Text>
      <Switch
          value={value}
          onChange={onChange}
          style={[{
            backgroundColor: "#B0BEC5",
             marginRight:-7
          },Platform.OS=="ios"?styles.trans:null]}
          ios_backgroundColor={"#B0BEC5"}
        /> 
    </View>
  );
}
const styles=StyleSheet.create({
    trans:{
        transform: [{ scaleX: .7 }, { scaleY: .7 }]
    }
})