import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Platform } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import {secondaryColor, primaryColor,textColor} from '../assets/colors'

const Header = (props) => {
  const navigation = props.navigation
  return (
    <View style={styles.box}>
      <Text style={styles.text}>Dutypedia</Text>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('SearchScreen')
      }} style={styles.input}>
        <EvilIcons
          style={{
            marginRight: 10,
          }}
          name="search"
          size={24}
          color={textColor}
        />
        <Text style={{
          color: textColor,
          fontFamily: 'Poppins-Medium'
        }}>{props.placeholder?props.placeholder:'Search On Dutypedia'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
export const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: secondaryColor,
    paddingTop:Platform.OS =='ios'?28:35,
  },
  text: {
    color: textColor,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold'
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
