import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Platform } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import {Color} from '../assets/colors'
import {useDispatch,useSelector} from 'react-redux'

const Header = (props) => {
  const navigation = props.navigation
  const isDark=useSelector((state) => state.isDark);
  const colors = new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const secondaryColor =colors.getSecondaryColor();
  const textColor=colors.getTextColor();
  const assentColor=colors.getAssentColor();

  const style = StyleSheet.create({
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
  return (
    <View style={style.box}>
      <Text style={style.text}>Dutypedia</Text>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('SearchScreen')
      }} style={style.input}>
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

    paddingTop:Platform.OS =='ios'?28:35,
  },
  text: {

    fontSize: 20,
    fontFamily: 'Poppins-SemiBold'
  },
  input: {
    margin: 20,

    height: 40,
    width: "90%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  
});

