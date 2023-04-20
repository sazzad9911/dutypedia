import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import { primaryColor, backgroundColor, textColor, Color } from "../assets/colors";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSelector } from "react-redux";

const TextArea = ({
  placeholder,
  style,
  rows,
  error,
  onChange,
  level,
  returnKeyType,
  onSubmitEditing,
  innerRef,
  value,
  placeholderTextColor,
  fontStyle
}) => {
  const [Focus, setFocus] = React.useState(false);
  const ref = React.useRef();
  const { width, height } = Dimensions.get("window");
  const [Data, setData] = React.useState();
  const isDark=useSelector(state=>state.isDark)
  const colors=new Color(isDark)
  const assentColor=colors.getAssentColor()

  React.useEffect(() => {
    setData(value);
  }, [value]);
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
          if (innerRef) {
            innerRef.current.focus();
          } else {
            ref.current.focus();
          }
        }}
      >
        <TextInput enablesReturnKeyAutomatically={true}
          value={Data}
          multiline={true}
          ref={innerRef ? innerRef : ref}
          returnKeyType={returnKeyType}
          placeholderTextColor={assentColor}
          onSubmitEditing={() => {
            if (onSubmitEditing) {
              onSubmitEditing();
            }
          }}
          style={[{
            fontFamily: "Poppins-Light",
            fontSize: 16,
          },fontStyle]}
          onFocus={() => {
            setFocus(true);
          }}
          onEndEditing={() => {
            setFocus(false);
          }}
          rows={rows ? rows : 4}
          placeholder={placeholder}
          onChangeText={(value) => {
            setData(value);
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
