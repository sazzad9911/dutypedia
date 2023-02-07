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
  ActivityIndicator,
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
import { useSelector } from "react-redux";
import { getServiceGigs } from "./../Class/service";
import Header from "./../components/Header";
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  StickyHeaderScrollView,
  useStickyHeaderScrollProps,
} from "react-native-sticky-parallax-header";
import { colors, screenStyles } from "../components/constants";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import SellerCart2 from "./../Cart/SellerCart2";
import ReviewCart from "./../Cart/ReviewCart";
import RelatedService from "./../Cart/RelatedService";
import SellerCart3 from "./../Cart/SellerCart3";
import { AllData } from "../Data/AllData";
import { getTopServices, getPopularCategories } from "../Class/service";
import ActivityLoader from "./../components/ActivityLoader";
import CustomAppStatusBar from "../Hooks/AppBar";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const Home_Next = (props) => {
  const navigation = props.navigation;
  const [trans, setTrans] = React.useState(1);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const TextColor = colors.getTextColor();
  const user = useSelector((state) => state.user);
  const [SomeSuggest, setSomeSuggest] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 300);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
  const [SomeSuggestion, setSomeSuggestion] = React.useState(null);
  const [PopularCategory, setPopularCategory] = React.useState(null);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
    if (user) {
      setSomeSuggestion(null);
      setPopularCategory(null);
      getTopServices(user.token)
        .then((res) => {
          if (res.data) {
            setSomeSuggestion(res.data.gigs);
          }
        })
        .catch((err) => {
          console.warn(err.response);
        });
      getPopularCategories(user.token)
        .then((res) => {
          if (res.data) {
            let arr = [];
            res.data.gigs.forEach((gig) => {
              //console.log(gig.service.category)
              let data = AllData.filter((d) =>
                d.title.toUpperCase().match(gig.service.category)
              );
              if (data && data.length > 0) {
                arr.push(data[0]);
              }
            });
            //console.log(arr.length)
            setPopularCategory(arr);
          }
        })
        .catch((err) => {
          console.warn(err.response);
        });
    }
  }, [user]);
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

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar translucent={false} style="dark"  backgroundColor={primaryColor}/>
      <ScrollView
      style={{ flexGrow: 1,flex:1 }}
      stickyHeaderIndices={[0]}
      scrollEventThrottle={16}
      stickyHeaderHiddenOnScroll={true}
      refreshControl={
        <RefreshControl
          refreshing={false}
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
            marginTop:Platform.OS=='ios'?0:10 
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
        {AllData &&
          AllData.map((item, i) => (
            <Cart navigation={navigation} key={i} data={item} />
          ))}
        <View style={{ width: 15 }} />
      </ScrollView>
      <View style={{ height: 10 }} />
      <SellerCart2
        onPress={() => {
          navigation.navigate("Category");
        }}
      />
      <View style={{ height: 10 }} />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            marginVertical: 10,
            flex: 5,
            marginLeft: 5,
            fontSize: 20,
            paddingLeft: 15,
            paddingRight: 15,
            color: textColor,
          }}
        >
          Recent Visit
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
              width: width - 15,
            }}
          >
            <ActivityLoader />
          </View>
        )}
        {SomeSuggest &&
          SomeSuggest.map((doc, i) => (
            <Cart2 key={i} data={doc} onPress={data=>{
              navigation.navigate("OtherProfile",{serviceId:data?data.service.id:null,data:data})
            }} navigation={props.navigation} />
          ))}
        <View style={{ width: 15 }} />
      </ScrollView> 

      <Text
        style={{
          fontFamily: "Poppins-SemiBold",
          marginVertical: 10,
          marginLeft: 5,
          paddingLeft: 15,
          paddingRight: 15,
          fontSize: 20,
          color: textColor,
        }}
      >
        Some Suggest For You
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View style={{ width: 10 }} />
        {SomeSuggestion &&
          SomeSuggestion.map((doc, i) => (
            <RelatedService data={doc} key={i} navigation={navigation} />
          ))}
        {!SomeSuggestion && (
          <View
            style={{
              height: 280,
              justifyContent: "center",
              alignItems: "center",
              width: width - 15,
            }}
          >
            <ActivityLoader />
          </View>
        )}
        <View style={{ width: 10 }} />
      </ScrollView>
      <View style={{ height: 10 }} />
      <SellerCart3
        onPress={() => {
          navigation.navigate("Category");
        }}
      />
      <View style={{ height: 10 }} />
      <Text
        style={{
          fontFamily: "Poppins-SemiBold",
          marginVertical: 10,
          marginLeft: 5,
          paddingLeft: 15,
          paddingRight: 15,
          fontSize: 20,
          color: textColor,
        }}
      >
        Popular Category
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View style={{ width: 15 }} />
        {PopularCategory &&
          PopularCategory.map((doc, i) => (
            <Cart onPress={(title)=>{
              navigation.navigate('CategoryList',{title:title })
            }} data={doc} key={i} navigation={navigation} />
          ))}
        {!PopularCategory && (
          <View
            style={{
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              width: width - 15,
            }}
          >
            <ActivityLoader />
          </View>
        )}
        <View style={{ width: 15 }} />
      </ScrollView>

      <View style={{ height: 10 }} />
    </ScrollView>
    </SafeAreaView>
  );
};

export default Home_Next;
