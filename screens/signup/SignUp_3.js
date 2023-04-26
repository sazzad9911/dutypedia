import React, { useState } from "react";
import { Dimensions, Platform, ScrollView, StyleSheet, Text, View,KeyboardAvoidingView } from "react-native";
import Input from "../../components/Input";
import InputButton from "../Vendor/account/InputButton";
const { width, height } = Dimensions.get("window");
import { Menu } from "react-native-paper";
import { CheckBox } from "../Seller/Pricing";
import IconButton from "../../components/IconButton";

export default function SignUp_3({ navigation, route }) {
  const [visible, setVisible] = React.useState(false);
  const [gender,setGender]=useState()

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.mt37, { paddingHorizontal: 20 }]}>
        <Text style={styles.label}>Your name</Text>
        <Input
          placeholder={"Type your name"}
          style={[styles.input, styles.mt8]}
        />
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
            <Menu contentStyle={{
              backgroundColor:"white"
            }}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <InputButton
                  onPress={openMenu}
                  style={[styles.input, styles.mt8]}
                  placeholder={"Select"}
                  value={gender}
                />
              }>
              <Menu.Item onPress={() => {
                setGender("Male")
                closeMenu()
            }} title="Male" />
              <Menu.Item onPress={() => {
                setGender("Female")
                closeMenu()
                }} title="Female" />
              <Menu.Item onPress={() => {
                setGender("Other")
                closeMenu()
                }} title="Other" />
            </Menu>
          </View>
          <View
            style={{
              width: width / 2 - 36,
            }}>
            <Text style={styles.label}>Age</Text>
            <Input
              keyboardType={"number-pad"}
              style={[styles.input, styles.mt8]}
              placeholder={"12"}
            />
          </View>
        </View>
        <Text style={[styles.label,styles.mt20]}>Create a user name</Text>
        <Input placeholder={"Type your name"} style={[styles.input,styles.mt8]}/>
        <Text style={[styles.label,styles.mt20]}>Password</Text>
        <Input secureTextEntry={true} style={[styles.input,styles.mt8]} placeholder={"Type password"}/>
        <Text style={[styles.label,styles.mt20]}>Retype</Text>
        <Input secureTextEntry={true} style={[styles.input,styles.mt8]} placeholder={"Retype password"}/>
      </View>
    </ScrollView>
    <View style={{
      paddingVertical:20,
      paddingHorizontal:20,
      
    }}>
      <View style={{
        flexDirection:"row",
        flexWrap:"wrap"
      }}>
        <CheckBox/>
        <Text style={{
          flex:1,
          fontWeight:"500",
          lineHeight:24,
          fontSize:14
        }}>I agree with all of Duty's <Text style={{color:"#7566FF",fontWeight:"400"}}>Terms of Service</Text>, <Text style={{color:"#7566FF",fontWeight:"400"}}>Privacy Policy</Text>, and <Text style={{color:"#7566FF",fontWeight:"400"}}>Refund Policy</Text></Text>
      </View>
    
    </View>
    <IconButton active={true} style={{
      marginHorizontal:20,
      marginTop:12
    }} title={"Confirm"}/>
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
