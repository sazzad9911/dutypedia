import React, { useState } from "react";
import { Text, View, Easing, Pressable, StyleSheet } from "react-native";
import Animated, { FlipInXDown, PinwheelIn, PinwheelOut, RotateInUpLeft, SlideInDown } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";

export default function DropDownRight({ style, title, data }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 32,
      }}>
      <Pressable
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => setExpanded((t) => !t)}>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 23,
            fontWeight: "400",
          }}>
          {title}
        </Text>
        {expanded?(
            <Animated.View entering={PinwheelOut}
            style={{
              transform: [{ rotate: "180deg" }],
              margin: 2,
            }}>
            <SvgXml xml={icon} />
          </Animated.View>
        ):(
            <Animated.View entering={PinwheelIn}
          style={{
            transform: [{ rotate: "0deg" }],
            margin: 2,
          }}>
          <SvgXml xml={icon} />
        </Animated.View>
        )}
      </Pressable>
      {expanded && (
        <Animated.View entering={SlideInDown}>
          {data &&
            data.map((doc, i) => (
              <Pressable style={styles.view} key={i}>
                <Text style={styles.text}>{doc}</Text>
              </Pressable>
            ))}
        </Animated.View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    borderBottomColor:"#F1EFEF",
    borderBottomWidth:1,
    paddingBottom:8,
    marginTop:12
  },
  text:{
    fontSize:14,
    fontWeight:"400",
    lineHeight:16
  }
});
const icon = `<svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4375 1.125L7.5 7.0625L1.5625 1.125" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
