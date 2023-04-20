import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Color } from "../assets/colors";
import { useSelector, useDispatch } from "react-redux";

const RadioButton = ({ value, title, onChange, style,dark,selectStyle,margin }) => {
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
      style={[{
        flexDirection: "row",
        margin: 3,
        alignItems: "center",
      },{
        margin:margin==0?0:margin?margin:3
      }]}
    >
      <TouchableOpacity
        onPress={() => {
          //setCheck((val) => !val);
          if (onChange) {
            onChange();
          }
        }}
        style={[
          {
            width: 25,
            height: 25,
            borderRadius: 20,
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
            style={[{
              backgroundColor:dark?"#484848": backgroundColor,
              height: dark?20:16,
              width: dark?20:16,
              borderRadius:dark?12: 8,
            },selectStyle]}
          ></View>
        )}
      </TouchableOpacity>
      {title && (
        <Text
          style={{
            fontSize: 16,
            marginLeft: 12,
            fontWeight:Check?"500":"400"
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
};
export default RadioButton;
