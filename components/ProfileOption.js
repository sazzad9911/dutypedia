import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { primaryColor } from './../assets/colors';

const ProfileOption = (props) => {
  return (
    <TouchableOpacity onPress={() =>{
      if(props.onPress){
        props.onPress()
      }
    }} style={[styles.box,props.style]}>
      <props.Icon  style={styles.icon} />
      <Text style={styles.text}>{props.title}</Text>
      <MaterialIcons style={styles.icon} name="keyboard-arrow-right" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ProfileOption;
const styles = StyleSheet.create({
  box: {
    padding: 10,
    flexDirection: "row",
    paddingHorizontal:20,
    backgroundColor:primaryColor,
    marginVertical:0,
    marginTop:5
},
icon: {
    flex:1
},
text: {
    flex:10,
    marginLeft:10,
    fontSize:16
}
});
