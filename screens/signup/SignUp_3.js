import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Input from "../../components/Input";
import InputButton from "../Vendor/account/InputButton";
const { width, height } = Dimensions.get("window");
import { Menu } from "react-native-paper";
import { CheckBox } from "../Seller/Pricing";
import IconButton from "../../components/IconButton";
import { registerUser, userLogin } from "../../Class/auth";
import { useDispatch } from "react-redux";
import ActivityLoader from "../../components/ActivityLoader";

export default function SignUp_3({ navigation, route }) {
  const [visible, setVisible] = React.useState(false);
  const [gender, setGender] = useState();
  const token = route?.params?.token;
  const [name, setName] = useState();
  const [nameError, setNameError] = useState();
  const [genderError, setGenderError] = useState();
  const [age, setAge] = useState();
  const [ageError, setAgeError] = useState();
  const [userName, setUserName] = useState();
  const [userNameError, setUserNameError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [RePassword, setRePassword] = useState();
  const [RePasswordError, setRePasswordError] = useState();
  const [check,setCheck]=useState(false)
  const dispatch=useDispatch()
  const [loader,setLoader]=useState(false)
  var regName = /^[a-zA-Z ]+$/
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const verify = async() => {
    setNameError()
    setUserNameError()
    setPasswordError()
    setRePasswordError()
    if (!regName.test(name)) {
      setNameError("Invalid name");
      return;
    }
    if (name.split("")?.length < 4) {
      setNameError("Name is too small");
      return;
    }
    if (name.split("")?.length > 20) {
      setNameError("Name is too large");
      return;
    }
    if (!regName.test(userName)) {
      setUserNameError("Invalid name");
      return;
    }
    if (userName.split("")?.length < 4) {
      setUserNameError("Name is too small");
      return;
    }
    if (userName.split("")?.length > 20) {
      setUserNameError("Name is too large");
      return;
    }
    if(password.split("")?.length<8){
      setPasswordError("Minimum 8 character")
      return
    }
    if(password!==RePassword){
      setRePasswordError("Password not matched")
      return
    }
    setLoader(true)
   try{
    await registerUser(token,name,userName,password,age,gender).catch(err=>{
      //console.log()
      setUserNameError(err.response.data.msg)
    }).then(res=>{
      userLogin(userName, password)
      .then((res) => {
        setLoader(false)
        //console.log(res);
        if (res) {
          dispatch({ type: "SET_USER", playload: res });
          navigation.navigate("Feed");
        }
      })
      .catch((err) => {
        setLoader(false)
        Alert.alert(err.response.data.msg)
      });
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
        <View style={[styles.mt37, { paddingHorizontal: 20 }]}>
          <Text style={styles.label}>Your name</Text>
          <Input
            onChange={(e) => {
              setName(e);
            }}
            value={name}
            placeholder={"Type your name"}
            style={[styles.input, styles.mt8]}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <Text
              style={{
                color: "red",
              }}>
              {nameError}
            </Text>
            <Text>min 4 max 20 character</Text>
          </View>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
              },
              styles.mt20,
            ]}>
            <View
              style={{
                width: width / 2 - 36,
              }}>
              <Text style={styles.label}>Gender</Text>
              <Menu
                contentStyle={{
                  backgroundColor: "white",
                }}
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <InputButton
                    error={genderError}
                    onPress={openMenu}
                    style={[styles.input, styles.mt8]}
                    placeholder={"Select"}
                    value={gender}
                  />
                }>
                <Menu.Item
                  onPress={() => {
                    setGender("Male");
                    closeMenu();
                  }}
                  title="Male"
                />
                <Menu.Item
                  onPress={() => {
                    setGender("Female");
                    closeMenu();
                  }}
                  title="Female"
                />
                <Menu.Item
                  onPress={() => {
                    setGender("Other");
                    closeMenu();
                  }}
                  title="Other"
                />
              </Menu>
            </View>
            <View
              style={{
                width: width / 2 - 36,
              }}>
              <Text style={styles.label}>Age</Text>
              <Input
                value={age}
                onChange={setAge}
                error={ageError}
                keyboardType={"number-pad"}
                style={[styles.input, styles.mt8]}
                placeholder={"12"}
              />
            </View>
          </View>
          <Text style={[styles.label, styles.mt20]}>Create a username</Text>
          <Input
          autoCapitalize={"none"}
            value={userName}
            onChange={setUserName}
            placeholder={"Type your username"}
            style={[styles.input, styles.mt8]}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <Text
              style={{
                color: "red",
              }}>
              {userNameError}
            </Text>
            <Text>min 4 max 20 character</Text>
          </View>
          <Text style={[styles.label, styles.mt20]}>Password</Text>
          <Input
            error={passwordError}
            value={password}
            onChange={setPassword}
            secureTextEntry={true}
            style={[styles.input, styles.mt8]}
            placeholder={"Type password"}
          />
          <Text style={[styles.label, styles.mt20]}>Retype</Text>
          <Input
            error={RePasswordError}
            value={RePassword}
            onChange={setRePassword}
            //secureTextEntry={true}
            style={[styles.input, styles.mt8]}
            placeholder={"Retype password"}
          />
        </View>
      </ScrollView>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}>
          <CheckBox value={check} onChange={()=>{
            setCheck(v=>(!v))
          }} />
          <Text
            style={{
              flex: 1,
              fontWeight: "500",
              
              fontSize: 14,
            }}>
            I agree with all of Duty's{" "}
            <Text style={{ color: "#7566FF", fontWeight: "400" }}>
              Terms of Service
            </Text>
            ,{" "}
            <Text style={{ color: "#7566FF", fontWeight: "400" }}>
              Privacy Policy
            </Text>
            , and{" "}
            <Text style={{ color: "#7566FF", fontWeight: "400" }}>
              Refund Policy
            </Text>
          </Text>
        </View>
      </View>
      <IconButton
        onPress={verify}
        disabled={
          name && gender && age && userName && password && RePassword&&check
            ? false
            : true
        }
        active={
          name && gender && age && userName && password && RePassword&&check
            ? true
            : false
        }
        style={{
          marginHorizontal: 20,
          marginTop: 12,
          
        }}
        title={"Confirm"}
      />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "400",
  },
  mt37: {
    marginTop: 37,
  },
  mt8: {
    marginTop: 8,
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#F1F1F1",
    borderRadius: 4,
    borderBottomWidth: 0,
    marginHorizontal: 0,
  },
});
