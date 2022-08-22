import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, TextInput,StyleSheet,Keyboard } from "react-native";
import SearchHeader from "./../components/SearchHeader";
import { ScrollView } from "react-native";
import SearchItem from './../Cart/SearchItem';


const SearchScreen = (props) => {
    const params = props.route.params
    const [search,setSearch] = React.useState(params?params.search:'')
    

  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <SearchHeader search={search} onChange={setSearch} 
      navigation={props.navigation} />
      <ScrollView onScroll={Keyboard.dismiss}
      contentContainerStyle={{flexGrow: 1}}
  keyboardShouldPersistTaps='handled'
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
        <SearchItem />
        <SearchItem />
        <SearchItem />
        <SearchItem />
      </ScrollView>
      
    </View>
  );
};

export default SearchScreen;

