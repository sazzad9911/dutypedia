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

function AnimatedHeight({ text, button,id }) {
  const [newHeight, setNewHeight] = useState(100);
  const [Lines, setLines] = React.useState(3);
  const [textHeight, setTextHeight] = React.useState(100);
  const [maxHeight, setMaxHeight] = React.useState(0);
  const [animation, setAnimation] = React.useState(
    new Animated.Value(textHeight)
  );
  const [detailsText, setDetailsText] = React.useState("");
  const [size,setSize]=React.useState(125)

  React.useEffect(() => {
    //console.log(`height: ${width}`)
    if(width<400){
      setSize(90)
    }
    if (text) {
      
      let totalText = "";
      let arr = text.split("");
      arr.map((doc, i) => {
        if (newHeight == 100) {
          totalText = totalText + `${i < size ? doc : ""}`;
        } else {
          totalText = totalText + doc;
        }
      });
    

      //setDetailsText(text);
      //console.log(totalText)
      if (newHeight == 100&&arr.length>(size-2)) {
        setTimeout(() => {
          setDetailsText(totalText + `${"..."}`);
        }, 300);
        return;
      }else{
        setTimeout(()=>{
          setDetailsText(`${text}`);
        },150)
      }
    }
  }, [newHeight+size]);

  
  return (
    <MotiView
      transition={{ type: "timing" }}
      animate={{
        height: newHeight < 100 ? textHeight:detailsText.split("").length<size?textHeight+(Platform.OS=="ios"?10:25) :newHeight,
        marginBottom:newHeight!=100?10: (Platform.OS=="android"?-15:0),
      }}
      style={{
        overflow: "hidden",
        width:"100%",
        height:"auto"
      }}
    >
      <Pressable disabled={detailsText.split("").length<size?true:false}
        onPress={() => {
          // setHeight(calculateHeight(Data?.service.about));
          if (newHeight === 100) {
            setNewHeight(countTextHeight(text,Platform.OS=="ios"?.6:.7));
            //toggleAbout(aboutHeight)
            //setLines(100);
          } else {
            setNewHeight(100);
            //toggleAbout(aboutHeight)
            //setLines(3);
          }
        }}
        style={{
          flexDirection:"row",
          flexWrap:"wrap",
          justifyContent:"center",
          width:"100%",
          height:"auto"
        }}
        
      >
        <Animated.Text numberOfLines={newHeight==100?3:200}
          onLayout={(e) => {
            setTextHeight(e.nativeEvent.layout.height);
            
            //setNewHeight(e.nativeEvent.layout.height)
          }}
          style={{
            fontSize: Platform.OS == "ios" ? 16.5 : 15,
            textAlign: "justify",
            fontFamily: "Poppins-Medium",
            lineHeight: Platform.OS == "ios" ? 30 : 25,
            width:"100%",
            
          }}
        >
          {detailsText}
          {button && newHeight == 100&&detailsText.split("").length>(size-2) && (
            <Text
              style={{
                fontSize: Platform.OS == "ios" ? 16.5 : 15,
                textAlign: "justify",
                fontFamily: "Poppins-Medium",
                lineHeight: Platform.OS == "ios" ? 30 : 25,
                color: "#4ADE80",
            
              }}
            >
              More
            </Text>
          )}
        </Animated.Text>
      </Pressable>
    </MotiView>
  );
}
export default AnimatedHeight;

const countTextHeight=(text,size)=>{
  let arr=text.split("");
  let length=arr.length;
  return length/width;
}
