import React from "react";
import { View, Text } from "react-native";
import Options from "../Cart/Options";

const Search = (props) => {
  const navigation = props.navigation
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 15,
      }}
    >
      <Options action={true} onPress={()=>{
        navigation.navigate('SearchScreen',{search:'Lower'})
      }} name="Lower" />
      <Options action={true} onPress={()=>{
        navigation.navigate('SearchScreen',{search:'Electric Service'})
      }} name="Electric Service" />
      <Options action={true} onPress={()=>{
        navigation.navigate('SearchScreen',{search:'Cleaning Service'})
      }} name="Cleaning Service" />
    </View>
  );
};

export default Search;
