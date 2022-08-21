import React from "react";
import { View, Text, TextInput } from "react-native";
import SearchHeader from "./../components/SearchHeader";
import { ScrollView } from "react-native";
import SearchItem from './../Cart/SearchItem';

const SearchScreen = (props) => {
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <SearchHeader navigation={props.navigation} />
      <ScrollView
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          Recent Visit
        </Text>
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
