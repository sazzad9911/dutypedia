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
import ActivityLoader from "../../components/ActivityLoader";
import { resetUserPassword } from "../../Class/auth";

export default function Reset({navigation,route}) {
  
  const [password,setPassword]=useState()
  const [rePassword,setRePassword]=useState()
  const [passwordError,setPasswordError]=useState()
  const [rePasswordError,setRePasswordError]=useState()
  const username=route?.params?.username;
  const token=route?.params?.token;
  const [loader,setLoader]=useState(false)


  const verify = async() => {
    setPasswordError()
    setRePasswordError()

    if(password.split("")?.length<8){
      setPasswordError("Minimum 8 character")
      return
    }
    if(password!==rePassword){
      setRePasswordError("Password not matched")
      return
    }
    setLoader(true)
   try{
    await resetUserPassword(token,password).catch(err=>{
      //console.log()
      setPasswordError(err.response.data.msg)
    }).then(res=>{
      navigation.navigate("LogIn")
    })
    
   }catch(err){
    setLoader(false)
    console.log(err.message)
   }

  };
  if(loader){
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityLoader/>
      </View>
    )
  }
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
          <Text style={[signUpStyle.text,signUpStyle.mt44]}>Your Username</Text>
          <Text style={{
            fontSize:16,
            fontWeight:"600",
            marginTop:20,
            color:"#4ADE80"
          }}>{username}</Text>
          <Text style={[signUpStyle.text,{marginTop:32}]}>Create new password</Text>
          <Input error={passwordError} value={password} onChange={setPassword} secureTextEntry={true} style={[signUpStyle.input,signUpStyle.mt8]} placeholder={"Type password"}/>
          <Text style={[signUpStyle.text,{marginTop:20}]}>Retype password</Text>
          <Input error={rePasswordError} value={rePassword} onChange={setRePassword} secureTextEntry={true} style={[signUpStyle.input,signUpStyle.mt8]} placeholder={"Retype password"}/>
        </View>
      </ScrollView>
      <IconButton active={password&&rePassword?true:false} disabled={password&&rePassword?false:true} onPress={()=>{
       // navigation.navigate("SignUp_2",{number:number,name:"Reset"})
       verify()
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
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  button:{
    marginHorizontal:20,
    marginVertical:20
  }
});
