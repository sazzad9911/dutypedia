import React from "react";
import {
  View,
  ScrollView,
  Animated,
  Text,
  RefreshControl,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
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
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { dutyIcon } from "../assets/icon";
import JoinCart from "../components/LandingPage/JoinCart";
import ServiceListCart from "../components/LandingPage/ServiceListCart";
import PopularCategory from "../components/LandingPage/PopularCategory";
import TopSeller from "../components/LandingPage/TopSeller";
import Trending from "../components/LandingPage/Trending";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../Reducers/hideBottomBar";

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
  const user=useSelector(state=>state.user)

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const insets=useSafeAreaInsets()
  const isFocused=useIsFocused()
  const dispatch=useDispatch()

  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(false));
      setTimeout(() => {
        dispatch(setHideBottomBar(false));
      }, 50);
    } else {
      //console.log("seen")
      dispatch(setHideBottomBar(true));
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={false}
        style="dark"
        backgroundColor={primaryColor}
      />
      <View style={{height:insets?.top}}/>
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
              paddingTop: 28,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop:Platform.OS=="ios"?0:10,
              alignItems:"center",
              paddingHorizontal:20,
              paddingBottom:20
            }}
          >
            <SvgXml xml={dutyIcon}/>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Search");
              }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml xml={search}/>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <JoinCart onClick={()=>{
          if (Array.isArray(user)) {
            navigation.navigate("LogIn");
            return;
          }
          navigation.navigate("InitialServiceCreate")
        }}/>
        <ServiceListCart navigation={navigation}/>
        <PopularCategory refresh={refreshing} navigation={navigation} onMore={(data)=>{
          navigation.navigate("ServiceScreen",{data:data})
        }}/>
        <TopSeller refresh={refreshing} navigation={navigation} onMore={(data)=>{
          navigation.navigate("ServiceScreen",{data:data})
        }}/>
        <Trending refresh={refreshing} navigation={navigation} onMore={(data)=>{
          navigation.navigate("ServiceScreen",{data:data})
        }}/>
        <JoinCart onClick={()=>{
          if (Array.isArray(user)) {
            navigation.navigate("LogIn");
            return;
          }
          navigation.navigate("InitialServiceCreate")
          }} colors={["#5C258D","#4389A2"]}/>
        <TopSeller refresh={refreshing} navigation={navigation} title={"Some Suggest"} onMore={(data)=>{
          navigation.navigate("ServiceScreen",{data:data})
        }}/>
        <View>
        <Text style={styles.text}>Category</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{width:14}}/>
          {AllData && AllData.map((item, i) => <Cart onPress={()=>{
            navigation.navigate("SearchSecond", { key: item?.title?.split(" ")[0],mainCategory:item?.title?.split(" ")[0] });
          }} key={i} data={item} />)}
          <View style={{width:14}}/>
        </ScrollView>
        </View>
        <View style={{ height: 20}} />
      </ScrollView>
    </View>
  );
};

export default Feed;
const search=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.6154 2.00098C6.30714 2.00098 2.00391 6.20917 2.00391 11.4002C2.00391 16.5913 6.30714 20.7995 11.6154 20.7995C13.8868 20.7995 15.9742 20.029 17.6191 18.7407L20.7463 21.7909L20.8294 21.8609C21.1195 22.0708 21.5307 22.0469 21.7932 21.7896C22.0819 21.5065 22.0812 21.0482 21.7918 20.7659L18.701 17.7512C20.2696 16.0785 21.227 13.8487 21.227 11.4002C21.227 6.20917 16.9238 2.00098 11.6154 2.00098ZM11.6116 3.44824C16.1023 3.44824 19.7427 7.00826 19.7427 11.3998C19.7427 15.7913 16.1023 19.3513 11.6116 19.3513C7.12089 19.3513 3.48047 15.7913 3.48047 11.3998C3.48047 7.00826 7.12089 3.44824 11.6116 3.44824Z" fill="#767676"/>
</svg>
`
const styles=StyleSheet.create({
  text:{
    fontSize:24,
    fontWeight:"700",
    marginHorizontal:20,
    color:"#484848",
    marginTop:20,
    marginBottom:18
  }
})