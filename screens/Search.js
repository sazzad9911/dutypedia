import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Options from "../Cart/Options";
import Animated, { SlideInRight, SlideInLeft } from "react-native-reanimated";
import HidableHeaderLayout from "../Hooks/HidableHeaderLayout";
import SearchBar from "../components/Search/SearchBar";
import CategoryCard from "../components/Search/CategoryCard";
import { CATEGORY_LIST } from "../Data/newIcon";

const Search = ({navigation}) => {
  
  return (
   <HidableHeaderLayout header={<SearchBar style={styles.header}/>} component={<ITEM/>}/>
  );
};

export default Search;
const ITEM=()=>{
  return(
    <View>
      {CATEGORY_LIST.sort((a,b)=>a.title>b.title).map((doc,i)=>(
        <CategoryCard key={i} data={doc} />
      ))}
      <View style={{height:36}}/>
    </View>
  )
}
const styles=StyleSheet.create({
  header:{
    marginHorizontal:28,
    marginTop:36,
    backgroundColor:"white"
  }
})