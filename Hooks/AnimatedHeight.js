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

function AnimatedHeight({ text,button }) {
  const [newHeight, setNewHeight] = useState(100);
  const [Lines, setLines] = React.useState(3);
  const [textHeight, setTextHeight] = React.useState(100);
  const [maxHeight,setMaxHeight]=React.useState(0)
  const [animation, setAnimation] = React.useState(
    new Animated.Value(textHeight)
  );
  const [detailsText, setDetailsText] = React.useState("");

  React.useEffect(() => {
    
    if (text) {
      let totalText = "";
      let arr = text.split("");
      arr.map((doc, i) => {
        if (newHeight == 100) {
          totalText = totalText + `${i < 125 ? doc : ""}`;
        } else {
          totalText = totalText + doc;
        }
      });
      //setDetailsText(text);
      //console.log(totalText)
      if(newHeight==100){
        setTimeout(()=>{
          setDetailsText(totalText+`${"..."}`)
        },400)
        return
      }
     setDetailsText(`${text}`);
    }
  }, [newHeight]);

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: newHeight,
      delay: 300,
      useNativeDriver: false,
      easing: Easing.back(),
    });
  }, [newHeight]);


  return (
    <MotiView
      transition={{ type: "timing" }}
      animate={{ height: newHeight<100?textHeight:newHeight,marginBottom:newHeight!=100?10:(Platform.OS=="ios"?0:-15) }}
      style={{ overflow: "hidden" }}
    >

      <Pressable
        onPress={() => {
          // setHeight(calculateHeight(Data?.service.about));
          if (newHeight === 100) {

            setNewHeight(textHeight + 5);
            //toggleAbout(aboutHeight)
            //setLines(100);
          } else {
            setNewHeight(100);
            //toggleAbout(aboutHeight)
            //setLines(3);
          }
        }}
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
          <Animated.Text
            onLayout={(e) => {
              setTextHeight(e.nativeEvent.layout.height);
              //setNewHeight(e.nativeEvent.layout.height)
            }}
            style={{
              fontSize: Platform.OS == "ios" ? 16.5 : 15,
              textAlign: "justify",
              fontFamily: "Poppins-Medium",
              lineHeight: Platform.OS == "ios" ? 30 : 25,
            }}
          >
              {detailsText}
              {button&&newHeight==100&&(
                <Text style={{
                  fontSize: Platform.OS == "ios" ? 16.5 : 15,
                  textAlign: "justify",
                  fontFamily: "Poppins-Medium",
                  lineHeight: Platform.OS == "ios" ? 30 : 25,
                  color:"#4ADE80"
                }}>More</Text>
              )}
          </Animated.Text>
      </Pressable>
    </MotiView>
  );
}
export default AnimatedHeight;
