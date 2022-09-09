import React from "react";
import { View, ScrollView, Text,Dimensions } from "react-native";
import { SvgXml } from "react-native-svg";
import { headerSvg } from "../../assets/icon";
import { primaryColor,backgroundColor } from "./../../assets/colors";
import Input from "./../../components/Input";
import DropDown from "./../../components/DropDown";
import TextArea from './../../components/TextArea';
import Button from './../../components/Button';
const { width, height } = Dimensions.get("window");
const Address = () => {
  const DATA = ["Dhaka", "Borishal", "Slyhet"];
  return (
    <ScrollView>
      <View style={{ backgroundColor: primaryColor,flex:1 }}>
        <SvgXml
          style={{
            position: "absolute",
            top: -50,
            left: -2,
          }}
          xml={headerSvg}
          width="100%"
        />
        <Text
          style={{
            fontSize: 37,
            fontFamily: "Poppins-Light",
            color: "white",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          One More
        </Text>
        <Text
          style={{
            fontSize: 37,
            fontFamily: "Poppins-Light",
            color: "white",
            marginTop: 20,
            marginLeft: 80,
          }}
        >
          Step to Go
        </Text>
        <DropDown
          style={{
            marginTop: 140,
            marginHorizontal: 20,
          }}
          DATA={DATA}
          placeholder="Division"
        />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <DropDown
            style={{
              marginTop: 20,
              marginHorizontal: 20,
              width:width/2-40
            }}
            DATA={DATA}
            placeholder="District"
          />
          <DropDown
            style={{
              marginTop: 20,
              marginHorizontal: 20,
              width:width/2-40,
            }}
            DATA={DATA}
            placeholder="Area"
          />
        </View>
        <TextArea style={{
            marginTop:20,
            marginHorizontal:20
        }} placeholder="Address"/>
        <Button style={{
            marginTop:50,
            marginBottom:20,
            borderRadius:5,
            backgroundColor:backgroundColor,
            color:'white',
            marginHorizontal:20,
            borderWidth:0
        }} title='Continue'/>
      </View>
    </ScrollView>
  );
};

export default Address;
