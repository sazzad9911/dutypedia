import React from "react";
import { View, Text, TouchableOpacity,Dimensions } from "react-native";
import IconButton from './../components/IconButton';
import { AntDesign } from '@expo/vector-icons';
const { width, height}= Dimensions.get("window");

const SellerCart3 = () => {
  return (
    <View style={{
        backgroundColor:'#1C4802',
        width:width-40,
        marginLeft:20,
        height:120,
        borderRadius:7,
        padding:10
    }}>
      <Text style={{
        fontSize:16,
        fontFamily: "Poppins-SemiBold",
        color: '#ffffff'
      }}>Create An Business Account</Text>
      <Text style={{
        fontSize:18,
        fontFamily: "Poppins-SemiBold",
        color: '#ffffff',
        marginTop:10,
        marginLeft:50
      }}>Its Free</Text>
      <IconButton style={{
        backgroundColor:'transparent',
        color: '#ffff',
        width:150,
        borderWidth:0,
      }} title="SignUp Now" Icon={()=>(
        <AntDesign name="right" size={20} color="white" />
      )}/>
    </View>
  );
};

export default SellerCart3;
