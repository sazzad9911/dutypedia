import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor, secondaryColor, textColor } from "./../assets/colors";

const SearchHeader = (props) => {
    const navigation = props.navigation
  return (
    <View style={styles.box}>
      <TouchableOpacity onPress={() =>{
        navigation.goBack()
      }} style={styles.icon}>
        <Ionicons name="ios-chevron-back" size={24} color={textColor} />
      </TouchableOpacity>
      <TextInput value={props.search} onChangeText={val=>props.onChange(val)} 
      autoFocus={true} style={styles.input} placeholder="Search here..." />
      <TouchableOpacity onPress={()=>{
        props.setIndex(1);
      }} style={[styles.icon,{
        alignItems: 'flex-end',
      }]}>
        <Ionicons name="md-filter-outline" size={24} color={textColor} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchHeader;
const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        paddingHorizontal:20,
        marginTop:33,
        paddingVertical:10,
        alignItems: 'center',
        backgroundColor:secondaryColor,
    },
    icon: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    input: {
        flex:8,
        backgroundColor:primaryColor,
        height:40,
        borderRadius:5,
        paddingHorizontal:5
    }
});
