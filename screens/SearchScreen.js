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
import ProfileOption from "./../components/ProfileOption";
import { AntDesign } from "@expo/vector-icons";
import { AllData } from "../Data/AllData";
import { SvgXml } from "react-native-svg";
import { Color } from "../assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = (props) => {
  const params = props.route.params;
  const [search, setSearch] = React.useState(params ? params.search : "");
  const dispatch = useDispatch();
  const [Visible, setVisible] = React.useState(false);
  const navigation = props.navigation;
  const [Data, setData] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();

  React.useEffect(() => {}, [search]);

  return (
    <SafeAreaView style={{
      flex:1
    }}>
      <View
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <SearchHeader
          search={search}
          autoFocus={Visible ? true : false}
          onChange={(val) => {
            setSearch(val);
          }}
          onPress={() => {
            if (Visible) {
              setVisible(false);
            } else {
              navigation.goBack();
            }
          }}
          onEndEditing={() => {
            setVisible(true);
          }}
          navigation={props.navigation}
        />
        <View style={{ height: 0 }} />
        {Visible ? (
          <Searches />
        ) : (
          <Animated.ScrollView
            entering={SlideInLeft}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 20,
                marginHorizontal: 20,
                marginVertical: 20,
                color: textColor,
              }}
            >
              Top Searches
            </Text>
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
                  setSearch("Lower");
                  setVisible(true);
                }}
                name="Lower"
              />
              <Options
                action={true}
                onPress={() => {
                  setSearch("Electric Service");
                  setVisible(true);
                }}
                name="Electric Service"
              />
              <Options
                action={true}
                onPress={() => {
                  setSearch("Cleaning Service");
                  setVisible(true);
                }}
                name="Cleaning Service"
              />
            </View>
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 20,
                marginHorizontal: 20,
                marginVertical: 20,
                color: textColor,
              }}
            >
              Browse Categories
            </Text>
            {AllData &&
              AllData.map((doc, i) => (
                <ProfileOption
                  action={true}
                  style={{
                    marginBottom: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("CategoryList", {
                      title: doc ? doc.title : null,
                    });
                  }}
                  key={i}
                  title={doc.title}
                  Icon={() => <SvgXml xml={doc.icon} height="20" width="20" />}
                />
              ))}
          </Animated.ScrollView>
        )}
      </View>
    </SafeAreaView>
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
const Searches = () => {
  return (
    <Animated.ScrollView
      entering={SlideInRight}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      style={{
        paddingHorizontal: 20,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Poppins-SemiBold",
          marginVertical: 10,
        }}
      >
        Recent Visit
      </Text>
     <Text style={{
      fontSize:18,
      marginVertical:5
     }}>No Result Found!</Text>
      {/* <SearchItem /> */}
    </Animated.ScrollView>
  );
};
