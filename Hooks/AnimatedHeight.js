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

function AnimatedHeight({ text, button, id, onChange,title,fontStyle,numberOfLines }) {
  const [newHeight, setNewHeight] = useState(100);
  const [Lines, setLines] = React.useState(3);
  const [textHeight, setTextHeight] = React.useState(100);
  const [maxHeight, setMaxHeight] = React.useState(0);
  const [animation, setAnimation] = React.useState(
    new Animated.Value(textHeight)
  );
  const [detailsText, setDetailsText] = React.useState("");
  const [size, setSize] = React.useState(125);
  const [minHeight, setMinHeight] = React.useState(100);

  React.useEffect(() => {
    
    if (width < 400 && Platform.OS == "android") {
      setSize(113);
      setNewHeight(85);
      setMinHeight(85);
    } else {
      setNewHeight(100);
      setMinHeight(100);
    }
    if(width < 350 && Platform.OS == "android"){
      setSize(100);
    }
    if (width > 400) {
      setNewHeight(85);
      setMinHeight(85);
    }
    if (width < 400 && Platform.OS == "ios") {
      setSize(100);
    }
  }, []);

  React.useEffect(() => {
    //console.log(`height: ${width}`)

    if (text) {
      let totalText = "";
      let arr = text.split("");
      arr.map((doc, i) => {
        if (newHeight == minHeight) {
          totalText = totalText + `${i < size ? doc : ""}`;
        } else {
          totalText = totalText + doc;
        }
      });
      //setDetailsText(text);
      //console.log(totalText)
      //console.log(arr.l)
      if (newHeight == minHeight && arr.length > size - 2) {
        setTimeout(() => {
          setDetailsText(totalText + `${"..."}`);
        }, 200);
        return;
      } else {
        setTimeout(() => {
          setDetailsText(`${text}`);
        }, 10);
      }
    }
  }, [newHeight + size]);
  React.useEffect(() => {
    setTimeout(() => {
      if (onChange) {
        onChange(textHeight);
      }
    }, 300);
  }, [textHeight]);
  //console.log(size)

  return (
    <MotiView
      transition={{ type: "timing" }}
      animate={{
        height:
          newHeight < minHeight
            ? textHeight
            : detailsText.split("").length < size
            ? textHeight + (Platform.OS == "ios" ? 10 : 25)
            : newHeight,
        marginBottom: newHeight != minHeight ? 10 : 0,
      }}
      style={{
        overflow: "hidden",
        width: "100%",
        height: "auto",
       
      }}
    >
      <Pressable
        disabled={detailsText.split("").length < size ? true : false}
        onPress={() => {
          // setHeight(calculateHeight(Data?.service.about));
          if (newHeight === minHeight) {
            if (onChange) {
              //onChange(textHeight)
            }
            setNewHeight(
              countTextHeight(text, Platform.OS == "ios" ? 0.6 : 0.7)
            );
            //toggleAbout(aboutHeight)
            //setLines(100);
          } else {
            if (onChange) {
              //onChange(minHeight)
            }
            setNewHeight(minHeight);
            //toggleAbout(aboutHeight)
            //setLines(3);
          }
        }}
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          height: "auto",
        }}
      >
        <Animated.Text
          numberOfLines={newHeight == minHeight ? (numberOfLines?numberOfLines:3) : 200}
          onLayout={(e) => {
            setTextHeight(e.nativeEvent.layout.height);
          }}
          style={[{
            fontSize: Platform.OS == "ios" ? 16.5 : 15,
            textAlign: "justify",
            fontFamily: "Poppins-Medium",
            lineHeight: Platform.OS == "ios" ? 30 : 25,
            width: "100%",
          },fontStyle]}
        >
          {detailsText}
          {button &&
            newHeight == minHeight &&
            detailsText.split("").length > (size-2)  && (
              <Text
                style={[{
                  fontSize: Platform.OS == "ios" ? 16.5 : 15,
                  textAlign: "justify",
                  fontFamily: "Poppins-Medium",
                  lineHeight: Platform.OS == "ios" ? 30 : 25,
                  color: "#4ADE80",
                },fontStyle]}
              >
                {title?title:"More"}
              </Text>
            )}
            
        </Animated.Text>
      </Pressable>
    </MotiView>
  );
}
export default AnimatedHeight;

const countTextHeight = (text, size) => {
  let arr = text.split("");
  let length = arr.length;
  return length / width;
};
