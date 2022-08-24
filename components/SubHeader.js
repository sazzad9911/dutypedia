import React from "react";
import { View, Text,TouchableOpacity } from "react-native";
import { primaryColor,secondaryColor} from './../assets/colors';
import { AntDesign } from '@expo/vector-icons';

const SubHeader = (props) => {
    const navigation = props.navigation

  return (
    <TouchableOpacity onPress={()=>{
        navigation.goBack()
    }}
      style={{
        height: 35,
        backgroundColor: primaryColor,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop:33
      }}
    >
      <AntDesign
        style={{
          flex: 1,
          marginLeft: 10,
        }}
        name="left"
        size={25}
        color="black"
      />
      <Text
        style={{
          flex: 2,
        }}
      >
        Manage Order
      </Text>
    </TouchableOpacity>
  );
};

export default SubHeader;
