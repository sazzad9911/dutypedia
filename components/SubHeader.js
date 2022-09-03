import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { primaryColor, secondaryColor } from "./../assets/colors";
import { AntDesign } from "@expo/vector-icons";

const SubHeader = (props) => {
  const navigation = props.navigation;
  const params=props.route.params;

  return (
    <View
      style={{
        backgroundColor: primaryColor,
        flexDirection: "row",
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
          marginLeft: 20,
        }}
        name="left"
        size={25}
        color="black"
      />
      <Text
        style={{
          fontSize: 18,
          fontFamily:'Poppins-Medium',
          flex:1,
          textAlign:"center",
          marginLeft:-50,
          zIndex:-1
        }}
      >
        {props.title? props.title:params.title?params.title:''}
      </Text>
    </View>
  );
};

export default SubHeader;
