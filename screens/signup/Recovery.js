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
import photo from "../../assets/Images/photo.jpeg"

export default function Recovery({navigation,route}) {
  const [number,setNumber]=useState()
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
          }]} source={photo}   />
          <Text style={[signUpStyle.headLine,signUpStyle.mt44]}>Enter Your Phone Number</Text>
          <Text style={[signUpStyle.mt8,signUpStyle.text]}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat </Text>
          <Input keyboardType={"number-pad"} value={number} onChange={setNumber} style={[signUpStyle.input,signUpStyle.mt18]} placeholder={" "}/>
          
        </View>
      </ScrollView>
      <IconButton active={number?true:false} disabled={number?false:true} onPress={()=>{
        navigation.navigate("SignUp_2",{number:number,name:"Reset"})
      }} style={signUpStyle.button} title={"Continue"}/>
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
