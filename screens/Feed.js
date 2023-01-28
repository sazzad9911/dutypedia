import React from "react";
import {
  View,
  ScrollView,
  Animated,
  Text,
  RefreshControl,
  TouchableOpacity,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Color } from "../assets/colors";
import Cart from "./../Cart/Cart";
import SellerCart2 from "./../Cart/SellerCart2";
import SellerCart4 from "./../Cart/SellerCart4";
import Cart2 from "./../Cart/Cart2";
import SellerCart from "../Cart/SellerCart";
import { useSelector, useDispatch } from "react-redux";
import { AllData } from "./../Data/AllData";
import CustomAppStatusBar from "../Hooks/AppBar";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Feed = ({ navigation, route }) => {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 200);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200],
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    wait(1000).then(() => setRefreshing(false));
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ width: 15 }} />
          {AllData && AllData.map((item, i) => <Cart key={i} data={item} />)}
          <View style={{ width: 15 }} />
        </ScrollView>
        <View style={{ height: 20 }} />
        <SellerCart4
          onPress={() => {
            //navigation.navigate("Category");
          }}
        />
        <View style={{ height: 30 }} />
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Poppins-SemiBold",
            marginHorizontal: 20,
            color: textColor,
          }}
        >
          Most Trending
        </Text>
        <View style={{ height: 10 }} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ width: 15 }} />
          <Cart2 navigation={navigation} />
          <Cart2 navigation={navigation} />
          <Cart2 navigation={navigation} />
          <Cart2 navigation={navigation} />
          <Cart2 navigation={navigation} />
          <Cart2 navigation={navigation} />
          <View style={{ width: 15 }} />
        </ScrollView>
        <View style={{ height: 10 }} />
        <View style={{ marginHorizontal: 20 }}>
          <SellerCart
            onPress={() => {
              navigation.navigate("LogIn");
            }}
            title="Create An Account"
            buttonTitle="SignUp"
          />
        </View>
        <View style={{ height: 15 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;
