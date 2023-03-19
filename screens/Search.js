import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ViewBase,
  Dimensions,
} from "react-native";
import Options from "../Cart/Options";
import Animated, { SlideInRight, SlideInLeft } from "react-native-reanimated";
import HidableHeaderLayout from "../Hooks/HidableHeaderLayout";
import SearchBar from "../components/Search/SearchBar";
import CategoryCard from "../components/Search/CategoryCard";
import { CATEGORY_LIST } from "../Data/newIcon";
import { TopSellerCard } from "../components/LandingPage/TopSeller";
import FlatServiceCart from "../components/Search/FlatServiceCart";
import { Card } from "../components/LandingPage/PopularCategory";
import NoResult from "../components/Search/NoResult";
const { width, height } = Dimensions.get("window");
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import FilterCard from "../components/Search/FilterCard";

const Search = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState();
  const sheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["25%", "50%", "90%"], []);
  const [index, setIndex] = useState(-1);
  // callbacks
  const handleSheetChange = React.useCallback((index) => {
    setIndex(index)
  }, []);
  const handleSnapPress = React.useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = React.useCallback(() => {
    sheetRef.current?.close();
  }, []);
  return (
    <HidableHeaderLayout
      header={
        <SearchBar
          onSort={() => setIndex(2)}
          onChange={setSearchKey}
          style={styles.header}
        />
      }
      component={searchKey?.split("").length > 0 ? <SCREEN /> : <ITEM />}
      bottom={
        <>
          {index != -1 && (
            <View
              style={{
                backgroundColor: "#00000010",
                position: "absolute",
                width: width,
                height: height,
                top: -100,
              }}
            />
          )}
          <BottomSheet
            ref={sheetRef}
            index={index}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            enablePanDownToClose={true}
            style={{
              backgroundColor: "white",
              borderRadius:30
            }}>
            <BottomSheetScrollView
              contentContainerStyle={{
                backgroundColor: "white",
              }}>
              <FilterCard />
            </BottomSheetScrollView>
          </BottomSheet>
        </>
      }
    />
  );
};

export default Search;
const ITEM = () => {
  return (
    <View>
      {CATEGORY_LIST.sort((a, b) => a.title > b.title).map((doc, i) => (
        <CategoryCard key={i} data={doc} />
      ))}
      <View style={{ height: 36 }} />
    </View>
  );
};
const SCREEN = ({}) => {
  // 2 next 12; after calculating 12 if there odd number then print flat cart
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 28,
        flex: 1,
        flexWrap: "wrap",
      }}>
      <TopSellerCard height={130} style={styles.cart} />
      <TopSellerCard height={130} style={styles.cart} />
      <View
        style={{
          width: "100%",
        }}>
        <Card />
        <Card />
        <Card />
        <Card
          style={{
            borderBottomWidth: 0,
            paddingBottom: 0,
          }}
        />
        <View style={{ height: 36 }} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    marginHorizontal: 28,
    marginTop: 36,
    backgroundColor: "white",
  },
  cart: {
    width: width / 2 - 40,
  },
});
