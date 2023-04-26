import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,Text,Image
} from "react-native";
import { SvgXml } from "react-native-svg";
import IconButton from "../../components/IconButton";
import Input from "../../components/Input";
import pic from "../../assets/Images/pic.jpeg"

export default function Reset({navigation,route}) {
  const [number,setNumber]=useState("dfd")
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          paddingHorizontal:20
        }}>
          <Image width={"100%"} style={[signUpStyle.mt28,{
            height:253,
            width:"100%"
          }]} source={pic}   />
          <Text style={[signUpStyle.text,signUpStyle.mt44,{lineHeight:14}]}>Your Username</Text>
          <Text style={{
            fontSize:16,
            fontWeight:"600",
            marginTop:20,
            color:"#4ADE80"
          }}>Eaxinarafat</Text>
          <Text style={[signUpStyle.text,{marginTop:32,lineHeight:14}]}>Create new password</Text>
          <Input secureTextEntry={true} style={[signUpStyle.input,signUpStyle.mt8]} placeholder={"Type password"}/>
          <Text style={[signUpStyle.text,{marginTop:20,lineHeight:14}]}>Retype password</Text>
          <Input secureTextEntry={true} style={[signUpStyle.input,signUpStyle.mt8]} placeholder={"Retype password"}/>
        </View>
      </ScrollView>
      <IconButton active={number?true:false} disabled={number?false:true} onPress={()=>{
       // navigation.navigate("SignUp_2",{number:number,name:"Reset"})
      }} style={signUpStyle.button} title={"Confirm"}/>
    </KeyboardAvoidingView>
  );
}

const signUpStyle = StyleSheet.create({
  mt28: {
    marginTop: 28,
  },
  mt8: {
    marginTop: 8,
  },
  mt44: {
    marginTop: 44,
  },
  mt18: {
    marginTop: 18,
  },
  input: {
    backgroundColor: "#F1F1F1",
    borderRadius: 4,
    borderBottomWidth: 0,
    marginHorizontal:0
  },
  headLine: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 24,
  },
  button:{
    marginHorizontal:20,
    marginVertical:20
  }
});
