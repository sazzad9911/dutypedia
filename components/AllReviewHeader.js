import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor, textColor } from "./../assets/colors";
import { SvgXml } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AllReviewHeader = (props) => {
  //console.log(props.navigation)
  const inset=useSafeAreaInsets()
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: primaryColor,
        paddingVertical: 12,
        marginTop:Platform.OS=="android"? StatusBar.currentHeight:inset.top,
      }}>
      <TouchableOpacity
        style={{
          left: 28,
          width: 25,
          position: "absolute",
          top: "60%",
          zIndex: 100,
        }}
        onPress={() => {
          // console.log('ok')
          props.navigation.goBack();
        }}>
        <SvgXml xml={icon} />
      </TouchableOpacity>
      <Text
        style={{
          fontWeight: "500",
          fontSize: 20,
          color: "#000000",
          
          flex: 1,
          textAlign: "center",
        }}>
        {props.title}
      </Text>
    </View>
  );
};

export default AllReviewHeader;
const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
