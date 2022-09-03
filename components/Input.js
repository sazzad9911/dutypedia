import React from "react";
import { View, TextInput } from "react-native";
import { primaryColor } from "./../assets/colors";
import Animated,{StretchInY} from "react-native-reanimated";

const Input = ({onChange}) => {
  return (
    <Animated.View entering={StretchInY}>
      <TextInput onChangeText={(val)=>{
        if(onChange){
            onChange(val);
        }
      }}
        placeholder="Type here"
        style={{
          borderBottomWidth: 1,
          marginHorizontal: 20,
          borderBottomColor: "#e5e5e5",
          marginVertical: 5,
          backgroundColor: primaryColor,
          borderRadius: 5,
          height: 45,
          paddingHorizontal: 10,
          fontFamily: "Poppins-Light",
        }}
      />
    </Animated.View>
  );
};

export default Input;
