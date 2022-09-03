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
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import SearchItem from "./../Cart/SearchItem";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { primaryColor, secondaryColor } from "./../assets/colors";
import SearchFilter from "./../components/SearchFilter";
import BottomBar from "./../components/BottomBar";
import Animated, { SlideInRight, SlideInLeft } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { setBottomSheet } from "./../action";
import Options from "./../Cart/Options";

const SearchScreen = (props) => {
  const params = props.route.params;
  const [search, setSearch] = React.useState(params ? params.search : "");
  const dispatch = useDispatch();
  const [Visible, setVisible] = React.useState(false);

  return (
    <View
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
          onSearchPress={() => {
            setVisible(true);
          }}
          navigation={props.navigation}
        />
        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-SemiBold',
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
      <Modal animationType="fade"
       visible={Visible} onRequestClose={() => setVisible(!Visible)}>
        <View
          style={{
            flex: 1,
            backgroundColor: secondaryColor,
          }}
        >
          <SearchHeader
            search={search}
            autoFocus={true}
            onChange={(val) => {
              setSearch(val);
            }}
            onPress={() => {
              setVisible(false);
            }}
            onEndEditing={() => {
              setVisible(false);
            }}
            navigation={props.navigation}
          />
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                flexWrap: "wrap",
                paddingHorizontal: 20,
              }}
            >
              <Options
                action={true}
                onPress={() => {
                  setSearch('Lower')
                  setVisible(false)
                }}
                name="Lower"
              />
              <Options
                action={true}
                onPress={() => {
                  setSearch('Electric Service')
                  setVisible(false)
                }}
                name="Electric Service"
              />
              <Options
                action={true}
                onPress={() => {
                  setSearch('Cleaning Service')
                  setVisible(false)
                }}
                name="Cleaning Service"
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
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
