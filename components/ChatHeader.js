import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import {Color} from '../assets/colors'
import {useDispatch,useSelector} from 'react-redux'

const ChatHeader = () => {
  const isDark=useSelector((state) => state.isDark);
  const colors = new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const textColor=colors.getTextColor();
  const assentColor=colors.getAssentColor();
  const backgroundColor=colors.getBackgroundColor();
  const styles = StyleSheet.create({
    box: {
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: textColor,
      fontSize: 20,
      fontWeight: "bold",
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
    <View style={styles.box}>
      <TouchableOpacity style={styles.input}>
        <EvilIcons
          style={{
            marginRight: 10,
          }}
          name="search"
          size={24}
          color={assentColor}
        />
        <Text style={{
          color:textColor,
          fontFamily: "Poppins-Medium"
        }}>Search Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;
