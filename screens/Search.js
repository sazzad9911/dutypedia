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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OtherProfile from "./OtherProfile";
import { useDispatch } from "react-redux";
import { setHideBottomBar } from "../Reducers/hideBottomBar";
import FixedService from "./FixedService";
import PackageService from "./PackageService";
import UserNotice from "./UserNotice";
import CompanyCalendar from "./Seller/CompanyCalendar";
import AllReview from "./AllReview";
import ServiceOrder from "./order/ServiceOrder";
import ChooseDateOrder from "./order/ChooseDateOrder";
import InstructionOrder from "./order/InstructionOrder";
import SubHeader from "../components/SubHeader";
import customStyle from "../assets/stylesheet";
import OrderDetails from "./Seller/OrderDetails";
const Stack = createNativeStackNavigator();

export const SearchSecond = ({ navigation, route }) => {
  const sheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["25%", "50%", "90%"], []);
  const [index, setIndex] = useState(-1);
  // callbacks
  const handleSheetChange = React.useCallback((index) => {
    setIndex(index);
  }, []);
  const [filter, setFilter] = useState();
  const params = route?.params;
  const key = params?.key;
  const mainCategory=params?.mainCategory;
  const [searchKey, setSearchKey] = useState(key);
  const [data, setData] = useState();
  const [category, setCategory] = useState("All");
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [subCategory,setSubCategory]=useState()
  const [selectedSub,setSelectedSub]=useState()
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(false));
      setTimeout(() => {
        dispatch(setHideBottomBar(false));
      }, 100);
    } else {
      //console.log("seen")
      //dispatch(setHideBottomBar(true));
    }
  }, [isFocused]);
  useEffect(() => {
    //console.log(category)
    setLoader(true);
    search(null, {
      q:!mainCategory? searchKey:undefined,
      min: filter?.min ? parseInt(filter?.min) : null,
      max: filter?.max ? parseInt(filter?.max) : null,
      division: filter ? filter.division : "",
      district: filter?.district,
      verified: filter?.verified,
      online: filter?.online,
      sort: filter?.orderBy,
      category: category=="All"?mainCategory:category,
      subCategory: category,
    })
      .then((res) => {
        setData(res.data.gigs);
        setLoader(false);
        //console.log(res.data.gigs);
      })
      .catch((err) => {
        setLoader(false);
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
          subData={subCategory}
          onSelectCategory={(e,title)=>{
            navigation.navigate("SearchThird", { key: title,subData:e });
          }}
          onSubCategory={setSelectedSub}
          selectedSub={selectedSub}
        />
      }
      component={<SCREEN loader={loader} navigation={navigation} data={data} />}
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
                  console.log(e);
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
export const SearchThird = ({ navigation, route }) => {
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
  const subData=params?.subData;
  const [searchKey, setSearchKey] = useState(key);
  const [data, setData] = useState();
  const [category, setCategory] = useState("All");
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [subCategory,setSubCategory]=useState()
  const [selectedSub,setSelectedSub]=useState("All")
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(false));
      setTimeout(() => {
        dispatch(setHideBottomBar(false));
      }, 100);
    } else {
      //console.log("seen")
      //dispatch(setHideBottomBar(true));
    }
  }, [isFocused]);
  useEffect(() => {
    setLoader(true);
    search(null, {
      q: searchKey || "",
      min: filter?.min ? parseInt(filter?.min) : null,
      max: filter?.max ? parseInt(filter?.max) : null,
      division: filter ? filter.division : "",
      district: filter?.district,
      verified: filter?.verified,
      online: filter?.online,
      sort: filter?.orderBy,
      category: key,
      subCategory: category,
    },selectedSub=="All"?undefined:selectedSub)
      .then((res) => {
        setData(res.data.gigs);
        setLoader(false);
        //console.log(res.data.gigs);
      })
      .catch((err) => {
        setLoader(false);
        console.warn(err.response.data.msg);
      });
  }, [searchKey, filter, category,selectedSub]);

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
          subData={subData}
          onSelectCategory={e=>{
            //setSubCategory(e)
            //navigation.navigate("SearchSecond", { key: category });
          }}
          onSubCategory={setSelectedSub}
          selectedSub={selectedSub}
        />
      }
      component={<SCREEN loader={loader} navigation={navigation} data={data} />}
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
                  console.log(e);
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
export const SearchFirst = ({ navigation, route }) => {
  const [searchKey, setSearchKey] = useState();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      //dispatch(setHideBottomBar(false));
      dispatch(setHideBottomBar(false));
    } else {
      //console.log("seen")
      //dispatch(setHideBottomBar(true));
    }
  }, [isFocused]);
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
      component={
        <ITEM
          onSelect={(e) => {
            navigation.navigate("SearchSecond", { key: e?.split(" ")[0],mainCategory:e?.split(" ")[0] });
          }}
        />
      }
    />
  );
};
const Search = () => {
  const inset = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: inset?.top }} />
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
        <Stack.Screen
          options={{ headerShown: false }}
          name="SearchThird"
          component={SearchThird}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "green",
            },
            headerShown: false,
          }}
          name="OtherProfile"
          component={OtherProfile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="FixedService"
          component={FixedService}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="PackageService"
          component={PackageService}
        />
        <Stack.Screen
          name="UserNotice"
          options={{
            headerShown: false,
          }}
          component={UserNotice}
        />
        <Stack.Screen
          name="Company Calender"
          options={{
            header: (props) => <SubHeader {...props} title={"Working Time"} />,
          }}
          component={CompanyCalendar}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="OrderDetails"
          component={OrderDetails}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AllReview"
          component={AllReview}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ServiceOrder"
          component={ServiceOrder}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ChooseDateOrder"
          component={ChooseDateOrder}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="InstructionOrder"
          component={InstructionOrder}
        />
      </Stack.Navigator>
    </View>
  );
};

export default Search;
const ITEM = ({ onSelect }) => {
  return (
    <View>
      {CATEGORY_LIST.sort((a, b) => a.title > b.title).map((doc, i) => (
        <CategoryCard onPress={() => onSelect(doc.title)} key={i} data={doc} />
      ))}
      <View style={{ height: 36 }} />
    </View>
  );
};
const SCREEN = ({ data, navigation, loader }) => {
  // 2 next 12; after calculating 12 if there odd number then print flat cart
  if (loader) {
    return (
      <View style={[customStyle.fullBox, { height: 200 }]}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
        flex: 1,
        flexWrap: "wrap",
      }}>
      {!data && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}>
          <ActivityLoader />
        </View>
      )}
      {data && data.length == 0 && <NoResult />}
      {data &&
        data.map((doc, i) =>
          (data.length > 1 && i == 0) || i == 1 ? (
            <TopSellerCard
              onPress={() => {
                navigation.navigate("OtherProfile", {
                  serviceId: doc.service.id,
                  data: doc,
                });
              }}
              key={i}
              data={doc}
              height={130}
              style={styles.cart}
            />
          ) : i % 14 == 0 && data.length > i + 1 ? (
            <TopSellerCard
              onPress={() => {
                navigation.navigate("OtherProfile", {
                  serviceId: doc.service.id,
                  data: doc,
                });
              }}
              key={i}
              data={doc}
              height={130}
              style={styles.cart}
            />
          ) : i % 15 == 0 ? (
            <TopSellerCard
              onPress={() => {
                navigation.navigate("OtherProfile", {
                  serviceId: doc.service.id,
                  data: doc,
                });
              }}
              key={i}
              data={doc}
              height={130}
              style={styles.cart}
            />
          ) : i + 1 == data.length ? (
            <View key={i} style={{ width: "100%" }}>
              <Card
                onPress={() => {
                  navigation.navigate("OtherProfile", {
                    serviceId: doc.service.id,
                    data: doc,
                  });
                }}
                style={{
                  borderBottomWidth: 0,
                  paddingBottom: 0,
                }}
                data={doc}
              />
            </View>
          ) : (
            <View key={i} style={{ width: "100%" }}>
              <Card
                onPress={() => {
                  navigation.navigate("OtherProfile", {
                    serviceId: doc.service.id,
                    data: doc,
                  });
                }}
                data={doc}
              />
            </View>
          )
        )}

      <View style={{ height: 36, width: "100%" }} />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    marginHorizontal: 20,
    marginTop: 36,
    backgroundColor: "white",
  },
  cart: {
    width: width / 2 - 32,
  },
});
