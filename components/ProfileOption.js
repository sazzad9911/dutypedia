import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {useSelector, useDispatch} from 'react-redux';
import { Badge } from "react-native-paper";
import {Color } from '../assets/colors'

const ProfileOption = (props) => {
  const isDark=useSelector((state) => state.isDark);
  const colors = new Color(isDark)
  const primaryColor =colors.getPrimaryColor();
  const textColor=colors.getTextColor();
  const assentColor=colors.getAssentColor();
  const backgroundColor=colors.getBackgroundColor();


  const styles = StyleSheet.create({
    box: {
      padding: 10,
      flexDirection: "row",
      paddingHorizontal: 20,
      backgroundColor: primaryColor,
      marginVertical: 0,
      alignItems: "center",
      paddingVertical:5,
    },
    icon: {
      flex: 1,
    },
    text: {
      flex: 10,
      fontSize: 15,
      fontFamily: "Poppins-SemiBold",
      color:textColor
    },
  });
  
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        }
      }}
      style={[styles.box, props.style]}
    >
      <props.Icon style={styles.icon} />
      <View style={{
        flexDirection: "row",
        borderBottomWidth:props.action?0:1,
        borderBottomColor:'#e5e5e5',
        flex:1,
        paddingBottom:3,
        marginLeft:10,
        alignItems: "center",
      }}>
        <Text style={styles.text}>{props.title}</Text>
        {props.Text && <props.Text />}
        {props.badge ? <Badge style={{}}>2</Badge> : <></>}
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color="black"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileOption;
