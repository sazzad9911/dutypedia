import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { primaryColor, secondaryColor } from "./../assets/colors";
import { AntDesign } from "@expo/vector-icons";

const SubHeader = (props) => {
  const navigation = props.navigation;

  return (
    <View
      style={{
        backgroundColor: primaryColor,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS == "ios" ? 28 : 35,
        paddingBottom: 10,
      }}
    >
      <AntDesign
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          flex: 1,
          marginLeft: 20,
        }}
        name="left"
        size={25}
        color="black"
      />
      <Text
        style={{
          flex: 2,
          fontSize: 18,
        }}
      >
        {props.title}
      </Text>
    </View>
  );
};

export default SubHeader;
