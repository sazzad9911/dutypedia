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

const SearchScreen = (props) => {
  const params = props.route.params;
  const [search, setSearch] = React.useState(params ? params.search : "");
  const [index, setIndex] = React.useState(-1);

  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ["10%", "60%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    setIndex(index);
  }, []);
  const handleClosePress = () => bottomSheetRef.current.close();
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
          setIndex={setIndex}
          search={search}
          onChange={setSearch}
          navigation={props.navigation}
        />
        <ScrollView
          scrollEventThrottle={() => {
            handleClosePress();
            Keyboard.dismiss();
          }}
          onScroll={() => {
            handleClosePress();
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
        <BottomSheet
          ref={bottomSheetRef}
          index={index}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backgroundStyle={{
            backgroundColor: primaryColor,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 30,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Filter
            </Text>
          </View>
          <BottomSheetScrollView>
            <SearchFilter />
          </BottomSheetScrollView>
        </BottomSheet>
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
