import React from "react";
import { View, TextInput, Text } from "react-native";
import { Color } from "./../assets/colors";
import Animated, { StretchInY } from "react-native-reanimated";
import {useSelector, useDispatch} from 'react-redux'

const Input = ({
  onChange,
  value,
  style,
  placeholder,
  keyboardType,
  error,
  returnKeyType,
  onSubmitEditing,
  onFocus,
  innerRef,
  level,
  rightIcon
}) => {
  const [Focus, setFocus] = React.useState(false);
  const [Error, setError] = React.useState();
  React.useEffect(() => {
    setError(error);
  }, [error]);
  const isDark= useSelector((state) => state.isDark);
  const colors = new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor =colors.getBackgroundColor();
  const assentColor=colors.getAssentColor();
  return (
    <Animated.View entering={StretchInY}>
      <TextInput placeholderTextColor={assentColor}
        ref={innerRef}
        returnKeyType={returnKeyType}
        onSubmitEditing={() => {
          if (onSubmitEditing) {
            onSubmitEditing();
          }
        }}
        keyboardType={keyboardType}
        value={value}
        onChangeText={(val) => {
          if (onChange) {
            onChange(val);
          }
        }}
        onFocus={() => {
          setFocus(!Focus);
          if (onFocus) {
            onFocus();
          }
        }}
        onEndEditing={() => {
          setFocus(!Focus);
        }}
        placeholder={placeholder ? placeholder : "Type here"}
        style={[
          {
            borderBottomWidth: 1,
            marginHorizontal: 20,
            borderBottomColor: !Focus ? "#e5e5e5" : "#DA1E37",
            marginVertical: 5,
            backgroundColor: primaryColor,
            borderRadius: 5,
            height: 45,
            paddingHorizontal: 10,
            fontFamily: "Poppins-Light",
            fontSize: 15,
          },
          style,
          { borderColor: !Focus ? "#e5e5e5" : "#DA1E37" },
        ]}
      />
      {Error && (
        <Text
          style={[
            {
              fontSize: 12,
              color: "red",
              fontFamily: "Poppins-Light",
              borderWidth: 0,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: style.marginLeft,
            },
          ]}
        >
          {Error}
        </Text>
      )}
      {level && (
        <Text
          style={{
            position: "absolute",
            top: -3,
            left: 30,
            backgroundColor: primaryColor,
            fontFamily: "Poppins-Light",
            color: textColor,
            fontSize: 13,
          }}
        >
         {level}
        </Text>
      )}
      {rightIcon}
    </Animated.View>
  );
};

export default Input;
