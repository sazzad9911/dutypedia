import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Animated,
  Platform,
} from "react-native";
import { Color } from "./../assets/colors";
import Cart from "../Cart/Cart";
import Cart1 from "../Cart/Cart1";
import Cart2 from "../Cart/Cart2";
import Options from "../Cart/Options";
import Seller from "../Cart/Seller";
import SellerCart from "./../Cart/SellerCart";
import CombineCart from "./../Cart/CombineCart";
import { useColorScheme } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getServiceGigs } from "./../Class/service";
import Header from "./../components/Header";
import { colors, screenStyles } from "../components/constants";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AllData } from "./../Data/AllData";
import { setFavoriteCategories, getFavoriteCategories } from "../Class/auth";
import CustomAppStatusBar from "../Hooks/AppBar";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const Home = (props) => {
  const navigation = props.navigation;
  const [trans, setTrans] = React.useState(1);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 300);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const [Temporary, setTemporary] = React.useState([]);
  const [PageChange, setPageChange] = React.useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const styles = StyleSheet.create({
    content: {
      alignSelf: "stretch",
    },
    headerBarContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      alignItems: "center",
      backgroundColor: colors.transparent,
      flex: 1,
      overflow: "hidden",
      zIndex: 3,
    },
    tabContainer: {},
    input: {
      margin: 20,
      backgroundColor: primaryColor,
      height: 40,
      width: "90%",
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,
    },
  });
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Home" });
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const [SomeSuggest, setSomeSuggest] = React.useState(null);

  React.useEffect(() => {
    setSomeSuggest(null);
    if (user) {
      getServiceGigs(user.token)
        .then((res) => {
          if (res.data) {
            return setSomeSuggest(res.data.gigs);
          }
        })
        .catch((err) => {
          console.warn(err.response.data);
        });
    }
  }, [Refresh]);
  React.useEffect(() => {
    //console.log(AllData.length);
    let arr = [];
    for (let i = 0; i < AllData.length; i = i + 3) {
      if (i + 1 < AllData.length && i + 2 < AllData.length) {
        arr.push({
          index: i,
          num: 3,
        });
      } else if (i + 1 < AllData.length) {
        arr.push({
          index: i,
          num: 2,
        });
      } else {
        arr.push({
          index: i,
          num: 1,
        });
      }
    }
    setTemporary(arr);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        translucent={false}
        style="dark"
        backgroundColor={primaryColor}
      />

      <ScrollView
        style={{ flexGrow: 1 }}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        stickyHeaderHiddenOnScroll={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              //setPageChange(true);
              onRefresh();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
          //scroll;
        }}
      >
        <Animated.View
          style={[
            {
              transform: [{ translateY: translateY }],
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: primaryColor,
              zIndex: 500,
            },
          ]}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop:Platform.OS=="ios"?0:10
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Poppins-SemiBold",
                color: textColor,
              }}
            >
              Dutypedia
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SearchScreen");
              }}
              style={{
                backgroundColor: "#e5e5e5",
                width: 35,
                height: 35,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View>
          {/* <Text
            style={{
              fontSize: 20,
              color: TextColor,
              marginLeft: 5,
              paddingLeft: 15,
              paddingRight: 15,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            Category
          </Text> */}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ width: 15 }} />
          {AllData &&
            AllData.map((item, i) => (
              <Cart navigation={navigation} key={i} data={item} />
            ))}
          <View style={{ width: 15 }} />
        </ScrollView>
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            marginVertical: 15,
            marginLeft: 5,
            paddingLeft: 15,
            paddingRight: 15,
            fontSize: 18,
            color: textColor,
          }}
        >
          What is Your Best Interested Category
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ width: 15 }} />
          {Temporary.map((item, i) =>
            item.num == 3 ? (
              <CombineCart
                key={i}
                num={[
                  AllData[item.index],
                  AllData[item.index + 1],
                  AllData[item.index + 2],
                ]}
                Component={(props) => <Cart1 {...props} />}
              />
            ) : item.num == 2 ? (
              <CombineCart
                key={i}
                num={[AllData[item.index], AllData[item.index + 1]]}
                Component={(props) => <Cart1 {...props} />}
              />
            ) : (
              <CombineCart
                key={i}
                num={[AllData[item.index]]}
                Component={() => <Cart1 {...props} />}
              />
            )
          )}
          <View style={{ width: 15 }} />
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              marginVertical: 15,
              flex: 5,
              marginLeft: 5,
              fontSize: 14,
              paddingLeft: 15,
              paddingRight: 15,
              fontSize: 18,
              color: textColor,
            }}
          >
            Some Suggest
          </Text>
          <TouchableOpacity
            style={{
              marginVertical: 10,
              flex: 2,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                textDecorationLine: "underline",
                marginRight: 20,
                fontSize: 14,
                textAlign: "right",
                color: textColor,
              }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ width: 15 }} />
          {!SomeSuggest && (
            <View
              style={{
                height: 270,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Loading...</Text>
            </View>
          )}
          {SomeSuggest &&
            SomeSuggest.map((doc, i) => (
              <Cart2 key={i} data={doc} navigation={props.navigation} />
            ))}
          <View style={{ width: 15 }} />
        </ScrollView>
        <View style={{ height: 19 }} />
        <View style={{ marginHorizontal: 20 }}>
          <SellerCart {...props} />
        </View>
        <View style={{ height: 10 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
