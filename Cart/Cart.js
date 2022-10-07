import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity,Platform } from "react-native";
import { textColor, primaryColor } from "./../assets/colors";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
function Cart(props) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableOpacity
        style={{
          width: width / 3 - 15,
          height: 150,
          shadowColor: Platform.OS == "ios" ? "#ebebeb" : "#DDDDDD",
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 1,
          shadowRadius: 6,
          elevation: 5,
          backgroundColor: primaryColor,
          margin: 10,
          marginLeft: 5,
          borderRadius: 5,
        }}
      >
        <Image
          style={{
            height: 80,
            width: "100%",
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
          }}
          source={{
            uri: "https://www.ouc.com/images/business/3-4.jpg?sfvrsn=3294c0f0_2",
          }}
        />

        <Text
          numberOfLines={2}
          style={{
            color: textColor,
            margin: 10,
            marginTop: 17,
            fontFamily: "Poppins-SemiBold",
            fontSize: 13,
          }}
        >
          Builder Service
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default Cart;
