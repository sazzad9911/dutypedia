import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { textColor, primaryColor } from "./../assets/colors";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
function Cart(props) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableOpacity
        style={{
          width: width / 3,
          height: 140,
          shadowOffset: {
            height: 2,
            width: 2,
          },
          shadowColor: "rgba(0, 0, 0, 0.636)",
          shadowRadius: 1,
          elevation: 1,
          shadowOpacity: 0.2,
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
          style={{
            color: textColor,
            margin: 10,
          }}
        >
          Builder Service
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default Cart;
