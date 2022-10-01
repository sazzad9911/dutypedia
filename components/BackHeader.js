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

const BackHeader = (props) => {
  const navigation = props.navigation;
  const ref= React.useRef();
  return (
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
          size={25}
          color="black"
        />
        <Text style={styles.text}>{props.title?props.title:'Dutypedia'}</Text>
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
            props.placeholder ? props.placeholder : "Search On Dutypedia"
          }
          style={{
            color: textColor,
            fontFamily: "Poppins-Medium",
            width:props.inputWidth? props.inputWidth:180
          }}
        ></TextInput>
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;
export const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: secondaryColor,
    paddingTop: Platform.OS == "ios" ? 28 : 35,
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
