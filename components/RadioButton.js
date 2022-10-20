import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Color } from "../assets/colors";
import { useSelector, useDispatch } from "react-redux";

const RadioButton = ({ value, title, onChange, style }) => {
  const [Check, setCheck] = React.useState(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const primaryColor = colors.getPrimaryColor();

  React.useEffect(() => {
    setCheck(value);
  }, [value]);
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 3,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setCheck((val) => !val);
          if (onChange) {
            onChange();
          }
        }}
        style={[
          {
            width: 30,
            height: 30,
            borderRadius: 30,
            borderColor: "#e5e5e5",
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
          },
          style,
        ]}
      >
        {Check && (
          <View
            style={{
              backgroundColor: backgroundColor,
              height: 20,
              width: 20,
              borderRadius: 10,
            }}
          ></View>
        )}
      </TouchableOpacity>
      {title && (
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            color: textColor,
            marginLeft: 10,
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
};
export default RadioButton;
