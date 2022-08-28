import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor } from "./../assets/colors";

const OtherProfileHeader = ({navigation}) => {
  return (
    <View
      style={{
        marginTop: 26,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 5,
        backgroundColor: primaryColor,
      }}
    >
      <TouchableOpacity onPress={()=>{
        navigation.goBack()
      }}>
        <Ionicons name="md-chevron-back-sharp" size={25} color="black" />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity>
          <Ionicons name="ios-heart-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 20,
          }}
        >
          <Ionicons name="md-share-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtherProfileHeader;
