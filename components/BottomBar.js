import React from "react";
import { View, StyleSheet, TouchableOpacity,Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { primaryColor, secondaryColor } from "./../assets/colors";

const BottomBar = (props) => {
  const navigation = props.navigation;
  const [route,setRoute] = React.useState(props.state.index)
  
  return (
    <View style={styles.box}>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('Home')
        setRoute(0)
      }} style={styles.button}>
       {route==0?( <Ionicons name="home" size={24} color="#808080" />):( <Ionicons name="home-outline" size={24} color="#808080" />)}
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('Search')
        setRoute(1)
      }} style={styles.button}>
        {route==1?( <Ionicons name="search-sharp" size={24} color="#808080" />):( <Ionicons name="search-outline" size={24} color="#808080" />)}
        <Text style={styles.text}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('Message')
        setRoute(2)
      }} style={styles.button}>
        {route==2?( <Ionicons name="paper-plane-sharp" size={24} color="#808080" />):( <Ionicons name="paper-plane-outline" size={24} color="#808080" />)}
        <Text style={styles.text}>Message</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('Notification')
        setRoute(3)
      }} style={styles.button}>
        {route==3?( <Ionicons name="notifications-sharp" size={24} color="#808080" />):( <Ionicons name="notifications-outline" size={24} color="#808080" />)}
        <Text style={styles.text}>Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('Profile')
        setRoute(4)
      }} style={styles.button}>
       {route==4?( <Ionicons name="person-circle-sharp" size={24} color="#808080" />):( <Ionicons name="person-circle-outline" size={24} color="#808080" />)}
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
const styles = StyleSheet.create({
  box: {
    backgroundColor: primaryColor,
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal:20,
    paddingVertical:5,
    shadowOffset: {
        height:1,width:1
    },
    shadowOpacity:.1,
    shadowRadius:1,
    elevation:1
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize:13,
    color: '#808080'
  }
});
