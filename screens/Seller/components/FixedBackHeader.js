import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Animated as Animation, 
  StatusBar, Dimensions,TouchableOpacity,Text } from "react-native";
const {width,height}=Dimensions.get("window")

export default function FixedBackHeader({ Yoffset, navigation,style,scrollSize,color,title }) {
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
    //console.log(scrollEnabled)
    scrollY.setValue(Yoffset);
  }, [Yoffset]);
  return (
    <View style={[{
       width:width,
       height:100,
       position:"absolute",
       top:0,
       justifyContent:"center",
       alignItems:"center",
       zIndex:100 ,
      
    },style]}>
      <StatusBar
        hidden={false}
        backgroundColor={scrollEnabled ? "white" : "transparent"}
      />
      {title&&(
        <Text style={{
          fontSize:18
        }}>{title}</Text>
      )}
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
          zIndex:100
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
          <AntDesign style={{
            shadowOffset:{
              height:1,width:1
            },
            shadowColor:"black",
            shadowOpacity:.2,
            shadowRadius:5,
            elevation:5
          }}
            name="arrowleft"
            size={24}
            color={scrollEnabled ? "black" : color?color:primaryColor}
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
