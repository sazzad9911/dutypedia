import React from "react";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";

export default function SwitchCart({ style, title, value, onChange }) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        style,
      ]}>
      <Text
        style={{
          fontSize: 16,
          
          fontWeight: "400",
        }}>
        {title}
      </Text>
      <Switch
        value={value}
        onChange={onChange}
        style={[
          {
            marginRight: -7,
          },
          Platform.OS == "ios" ? styles.trans : null,
        ]}
        ios_backgroundColor={"#B0BEC5"}
        trackColor={{ false: "#B0BEC5", true:Platform.OS=="ios"? "#4ADE80":"#B0BEC5" }}
        thumbColor={ value&&Platform.OS=="android"?"#4ADE80":"#ffffff"}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  trans: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
});
