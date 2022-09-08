import React from "react";
import { View, TextInput } from "react-native";
import { primaryColor } from "./../assets/colors";
import Animated,{StretchInY} from "react-native-reanimated";

const Input = ({onChange,value,style,placeholder,keyboardType}) => {
  const [Focus,setFocus]= React.useState(false)
  return (
    <Animated.View entering={StretchInY}>
      <TextInput keyboardType={keyboardType} value={value} onChangeText={(val)=>{
        if(onChange){
            onChange(val);
        }
      }}
      onFocus={()=>{
        setFocus(!Focus);
      }}
      onEndEditing={()=>{
        setFocus(!Focus);
      }}
        placeholder={placeholder?placeholder:"Type here"}
        style={[{
          borderBottomWidth: 1,
          marginHorizontal: 20,
          borderBottomColor: !Focus?'#e5e5e5':'#DA1E37',
          marginVertical: 5,
          backgroundColor: primaryColor,
          borderRadius: 5,
          height: 45,
          paddingHorizontal: 10,
          fontFamily: "Poppins-Light",
        },style,{borderColor:!Focus?'#e5e5e5':'#DA1E37'}]}
      />
    </Animated.View>
  );
};

export default Input;
