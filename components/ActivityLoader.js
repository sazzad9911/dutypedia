import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Color } from "./../assets/colors";

const ActivityLoader = ({}) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const backgroundColor = colors.getBackgroundColor();
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  return (
    <View
      style={{
        borderRadius: 50,
        padding: 4,
        backgroundColor: primaryColor,
        alignSelf: "center",
        shadowOffset: {
          height: 1,
          width: 1,
        },
        shadowColor: "#d5d5d5",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
      }}
    >
      <ActivityIndicator size="large" color={backgroundColor} />
    </View>
  );
};
export default ActivityLoader;
