import React from "react";
import { TouchableOpacity, View, Text,Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor,textColor } from "./../assets/colors";

const AllReviewHeader = (props) => {
  //console.log(props.navigation)
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: primaryColor,
        paddingTop:Platform.OS=='ios'?28:35
      }}
    >
      <TouchableOpacity style={{
        flex: 1,
      }} onPress={() => {
        //console.log('ok')
          props.navigation.goBack();
        }}
      >
        <Ionicons name="md-chevron-back-sharp" size={25} color="black" />
      </TouchableOpacity>
      <Text style={{
        textAlign: 'center',
        flex:12,
        marginLeft:-24,
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize:15,
        color:textColor
      }}>23 Review</Text>
    </View>
  );
};

export default AllReviewHeader;
