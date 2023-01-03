import React from "react";
import { Dimensions, TouchableOpacity, View,Text } from "react-native";
import Avatar from "../components/Avatar";
import { Zocial } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");


export default function AudioCallScreen({ user,onAccept,onCancel }) {
  //console.log(user)
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        style={{
          width: 80,
          height: 80,
        }}
        source={{ uri: user ? user.profilePhoto : null }}
      />
      <View style={{ height: height - 300 }}>
        <Text style={{
            fontSize:16,
            fontFamily:"Poppins-Medium",
            marginVertical:20
        }}>Incoming Call</Text>
      </View>
      <View style={{
        flexDirection:"row"
      }}>
        <CallButton onPress={()=>{
          if(onAccept){
            onAccept()
          }
        }} color={"green"}/>
        <View style={{width:50}}/>
        <CallButton onPress={()=>{
          if(onCancel){
            onCancel()
          }
        }} color={"red"}/>
      </View>
    </View>
  );
}

const CallButton = ({color,onPress}) => {
  return (
    <TouchableOpacity onPress={()=>{
        if(onPress){
            onPress()
        }
    }} style={{
        width:40,
        height:40,
        backgroundColor:color,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center"
    }}>
      <Zocial name="call" size={24} color="white" />
    </TouchableOpacity>
  );
};
