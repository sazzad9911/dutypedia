import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Button,
} from "react-native";
import SearchHeader from "./../components/SearchHeader";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import SearchItem from "./../Cart/SearchItem";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { primaryColor, secondaryColor } from "./../assets/colors";
import SearchFilter from "./../components/SearchFilter";
import BottomBar from './../components/BottomBar';
import Animated,{SlideInRight,SlideInLeft} from 'react-native-reanimated'
import { useDispatch,useSelector } from 'react-redux';
import { setBottomSheet } from './../action';

const SearchScreen = (props) => {
  const params = props.route.params;
  const [search, setSearch] = React.useState(params ? params.search : "");
  const dispatch=useDispatch()
 
 
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <SearchHeader
          search={search}
          onChange={setSearch}
          navigation={props.navigation}
        />
        <ScrollView
          
          onScroll={() => {
            //handleClosePress();
            dispatch(setBottomSheet(-1))
            Keyboard.dismiss();
          }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
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
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    height: 220,
    alignItems: "center",
  },
});
