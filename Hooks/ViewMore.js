import React, { ComponentProps, useReducer, useState } from "react";
import { MotiView } from "moti";
import {
  Button,
  View,
  Platform,
  Dimensions,
  Text,
  Pressable,
  Animated,
  Easing,
} from "react-native";
const { width, height } = Dimensions.get("window");

function ViewMore({
  fontStyle,
  style,
  component,
  height,
  lowHeight,
  largeText,
  smallText,
  width,
  position
}) {
  const [newHeight, setNewHeight] = useState(lowHeight ? lowHeight : 78);

  React.useEffect(() => {
    //console.log(`height: ${width}`)
  }, [newHeight]);

  return (
    <MotiView
      transition={{ type: "timing" }}
      animate={{
        height: newHeight,
      }}
      style={[
        {
          overflow: "hidden",
          width: "100%",
          height: "auto",
        },
        style,
      ]}>
      <Pressable
        onPress={() => {
          // setHeight(calculateHeight(Data?.service.about));
          setNewHeight((d) => (d == 78 ? height : 78));
        }}
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          overflow:"hidden"
        }}>
        {component}
        {newHeight != height && (
          <View
            style={[{
              position: "absolute",
              right:0,
              backgroundColor: "white",
              width:width?width:Platform.OS=="android"?138: 140,
              flexDirection: "row",
              alignItems: "baseline",
              bottom:Platform.OS=="android"?5:0,
              height:24
            },position]}>
            {newHeight == 78 && <Text>...</Text>}
            <Text
              style={[
                {
                  fontSize: Platform.OS == "ios" ? 16.5 : 15,
                  textAlign: "justify",
                  fontWeight: "500",
                  lineHeight: Platform.OS == "ios" ? 30 : 25,
                  color: "#4ADE80",
                  fontWeight: "700",
                  lineHeight: 24,
                  fontSize: 16,
                },
                fontStyle,
              ]}>
              {newHeight == height
                ? largeText
                  ? largeText
                  : "See Less"
                : smallText
                ? smallText
                : "See More..."}
            </Text>
          </View>
        )}
      </Pressable>
      
    </MotiView>
  );
}
export default ViewMore;
