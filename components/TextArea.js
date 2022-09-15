import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import { primaryColor, backgroundColor, textColor } from "../assets/colors";
import Animated,{ FadeIn} from 'react-native-reanimated';

const TextArea = ({
  placeholder,
  style,
  rows,
  error,
  onChange,
  level,
  returnKeyType,
  onSubmitEditing,
  innerRef
}) => {
  const [Focus, setFocus] = React.useState(false);
  const ref = React.useRef();
  const { width, height } = Dimensions.get("window");
 
  return (
    <Animated.View entering={FadeIn}>
      <TouchableOpacity
        style={[
          {
            width: width - 40,
            borderWidth: 1,
            borderColor: Focus ? backgroundColor : "#e5e5e5",
            borderRadius: 5,
            minHeight: 100,
            marginVertical: 5,
            paddingHorizontal: 10,
            paddingVertical: 5,
          },
          style,
        ]}
        onPress={() => {
          if(innerRef){
            innerRef.current.focus();
          }else{
            ref.current.focus();
          }
        }}
      >
        <TextInput ref={innerRef?innerRef:ref}
          returnKeyType={returnKeyType}
          onSubmitEditing={() => {
            if (onSubmitEditing) {
              onSubmitEditing();
            }
          }}
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 14,
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onEndEditing={() => {
            setFocus(false);
          }}
          rows={rows ? rows : 4}
          placeholder={placeholder}
          onChangeText={(value) => {
            if (onChange) {
              onChange(value);
            }
          }}
        />
      </TouchableOpacity>
      {error && (
        <Text
          style={{
            marginLeft: 2,
            fontSize: 12,
            fontFamily: "Poppins-Light",
            color: "red",
          }}
        >
          {error}
        </Text>
      )}
      {level && (
        <Text
          style={{
            position: "absolute",
            top: -5,
            right: 20,
            backgroundColor: primaryColor,
            fontFamily: "Poppins-Light",
            color: textColor,
            fontSize: 13,
          }}
        >
          {level}
        </Text>
      )}
    </Animated.View>
  );
};

export default TextArea;
