import React, { useEffect, useState } from "react";
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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { search } from "../Class/service";
import ActivityLoader from "../components/ActivityLoader";
const Stack = createNativeStackNavigator();

const SearchSecond = ({ navigation, route }) => {
  const sheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["25%", "50%", "90%"], []);
  const [index, setIndex] = useState(-1);
  // callbacks
  const handleSheetChange = React.useCallback((index) => {
    setIndex(index);
  }, []);
  const handleSnapPress = React.useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = React.useCallback(() => {
    sheetRef.current?.close();
  }, []);
  const [filter, setFilter] = useState();
  const params = route?.params;
  const key = params?.key;
  const [searchKey, setSearchKey] = useState(key);
  const [data, setData] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    search(null, {
      q: searchKey || "",
      min: filter?.min,
      max: filter?.max,
      division: filter ? filter.division : "",
      district: filter?.district,
      verified: filter?.verified,
      online: filter?.online,
      sort: filter?.orderBy,
      category: category ? category : "",
    })
      .then((res) => {
        setData(res.data.gigs);
        console.log(res.data.gigs);
      })
      .catch((err) => {
        console.warn(err.response.data.msg);
      });
  }, [searchKey, filter, category]);

  return (
    <HidableHeaderLayout
      header={
        <SearchBar
          onSort={() => setIndex(2)}
          onChange={(e) => {
            setSearchKey(e);
          }}
          style={styles.header}
          value={searchKey}
          active={true}
          category={category}
          onCategory={setCategory}
        />
      }
      component={<SCREEN data={data} />}
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
              borderRadius: 30,
            }}>
            <BottomSheetScrollView
              contentContainerStyle={{
                backgroundColor: "white",
              }}>
              <FilterCard
                onSelect={(e) => {
                  setFilter(e);
                  //console.log(e)
                  sheetRef.current.close();
                }}
              />
            </BottomSheetScrollView>
          </BottomSheet>
        </>
      }
    />
  );
};
const SearchFirst = ({ navigation, route }) => {
  const [searchKey, setSearchKey] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    setSearchKey();
  }, [isFocused]);

  return (
    <HidableHeaderLayout
      header={
        <SearchBar
          onSort={() => setIndex(2)}
          onChange={(e) => {
            navigation.navigate("SearchSecond", { key: e });
          }}
          style={styles.header}
          value={searchKey}
        />
      }
      component={<ITEM />}
    />
  );
};
const Search = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="SearchInitial"
        component={SearchFirst}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SearchSecond"
        component={SearchSecond}
      />
    </Stack.Navigator>
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
const SCREEN = ({ data }) => {
  // 2 next 12; after calculating 12 if there odd number then print flat cart
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 28,
        flex: 1,
        flexWrap: "wrap",
      }}>
      {!data && (
        <View style={{
          justifyContent:"center",
          alignItems:"center",
          width:"100%",
          height:"100%"
        }}>
          <ActivityLoader />
        </View>
      )}
      {data&&data.length==0&&(
        <NoResult/>
      )}
      {data &&
        data.map((doc, i) =>
          (data.length > 1 && i == 0) || i == 1 ? (
            <TopSellerCard
              key={i}
              data={doc}
              height={130}
              style={styles.cart}
            />
          ) : i % 14 == 0 && data.length > i + 1 ? (
            <TopSellerCard
              key={i}
              data={doc}
              height={130}
              style={styles.cart}
            />
          ) : i % 15 == 0 ? (
            <TopSellerCard
              key={i}
              data={doc}
              height={130}
              style={styles.cart}
            />
          ) : i + 1 == data.length ? (
            <View key={i} style={{ width: "100%" }}>
              <Card
                style={{
                  borderBottomWidth: 0,
                  paddingBottom: 0,
                }}
                data={doc}
              />
            </View>
          ) : (
            <View key={i} style={{ width: "100%" }}>
              <Card data={doc} />
            </View>
          )
        )}

      <View style={{ height: 36, width: "100%" }} />
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
