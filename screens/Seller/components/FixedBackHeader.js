import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Animated as Animation, StatusBar, Dimensions,TouchableOpacity } from "react-native";
const {width,height}=Dimensions.get("window")

export default function FixedBackHeader({ Yoffset, navigation }) {
  const primaryColor = "white";
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const scrollY = new Animation.Value(0);
  const diffClamp = Animation.diffClamp(scrollY, 0, 250);
  const translateY = diffClamp.interpolate({
    inputRange: [200, 250],
    outputRange: [0, 1],
  });
  React.useEffect(() => {
    if (Yoffset > 200) {
      // console.log("white");
      setScrollEnabled(true);
    } else {
      //console.log("transparent");
      setScrollEnabled(false);
    }

    scrollY.setValue(Yoffset);
  }, [Yoffset]);
  return (
    <View style={{
       width:width,
       height:100,
       position:"absolute",
       top:0
        
    }}>
      <StatusBar
        hidden={false}
        backgroundColor={scrollEnabled ? "white" : "transparent"}
      />
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.325)",
          width: width,
          height: 25,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 200,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 25,
          paddingHorizontal: 0,
          flexDirection: "row",
          zIndex: 2,
          left: 0,
          width: width,
          backgroundColor: "transparent",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            //dispatch(setHideBottomBar(false))
          }}
          style={{
            marginVertical: 10,
            marginHorizontal: 20,
          }}
        >
          <AntDesign
            name="arrowleft"
            size={24}
            color={scrollEnabled ? "black" : primaryColor}
          />
        </TouchableOpacity>
      </View>
      <Animation.View
        style={[
          {
            top: 0,
            left: 0,
            backgroundColor: primaryColor,
            zIndex: 1,
            width: width,
            position: "absolute",
            height: 70,
            opacity: translateY,
          },
        ]}
      ></Animation.View>
    </View>
  );
}
