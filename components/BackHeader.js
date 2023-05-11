import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { secondaryColor, primaryColor, textColor } from "../assets/colors";
import { StatusBar } from "expo-status-bar";

const BackHeader = (props) => {
  const navigation = props.navigation;
  const ref= React.useRef();
  return (
    <View>
      <StatusBar/>
      <View style={styles.box}>
      <View
        style={{
          flexDirection: "row",
          width:'100%'
        }}
      >
        <AntDesign
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            marginLeft: 20,
            zIndex:500
          }}
          name="left"
          size={22}
          color="black"
        />
        <Text style={styles.text}>{props.title?props.title:'Duty'}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          //navigation.navigate("SearchScreen");
          if(ref){
            ref.current.focus();
          }
        }}
        style={styles.input}
      >
        <EvilIcons
          style={{
            marginRight: 10,
          }}
          name="search"
          size={24}
          color={textColor}
        />
        <TextInput ref={ref}
          value={props.value}
          onChangeText={props.onChange}
          placeholder={
            props.placeholder ? props.placeholder : "Search On Duty"
          }
          style={{
            color: textColor,
            width:props.inputWidth? props.inputWidth:120
          }}
        ></TextInput>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default BackHeader;
export const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: secondaryColor,
    paddingTop:5
  },
  text: {
    color: textColor,
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    flex:1,
    textAlign: "center",
    marginLeft:-44
  },
  input: {
    margin: 20,
    backgroundColor: primaryColor,
    height: 40,
    width: "90%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    
  },
});
