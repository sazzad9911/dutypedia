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
} from "react-native";
import {
  textColor,
  primaryColor,
  secondaryColor,
  Color,
} from "./../assets/colors";
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
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  StickyHeaderScrollView,
  useStickyHeaderScrollProps,
} from "react-native-sticky-parallax-header";
import { colors, screenStyles } from "../components/constants";
import { EvilIcons } from "@expo/vector-icons";
import SellerCart2 from "./../Cart/SellerCart2";
import ReviewCart from "./../Cart/ReviewCart";
import RelatedService from "./../Cart/RelatedService";
import SellerCart3 from './../Cart/SellerCart3';

const PARALLAX_HEIGHT = 50;
const HEADER_BAR_HEIGHT = 10;
const SNAP_START_THRESHOLD = 5;
const SNAP_STOP_THRESHOLD = 50;

const { width, height } = Dimensions.get("window");

const Home_Next = (props) => {
  const navigation = props.navigation;
  const [trans, setTrans] = React.useState(1);
  const colorScheme = useColorScheme();
  const colors = new Color(false);
  const TextColor = colors.getTextColor();

  const scrollY = new Animated.Value(0);
  const {
    onMomentumScrollEnd,
    onScroll,
    onScrollEndDrag,
    scrollHeight,
    scrollValue,
    scrollViewRef,
  } = useStickyHeaderScrollProps({
    parallaxHeight: PARALLAX_HEIGHT,
    snapStartThreshold: SNAP_START_THRESHOLD,
    snapStopThreshold: SNAP_STOP_THRESHOLD,
    snapToEdge: true,
  });
  const foregroundWrapperAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, 5, 10, 15, 30],
        [1, 0.8, 0.5, 0.2, 0],
        Extrapolate.CLAMP
      ),
    };
  });
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0, 100],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });
  const user = useSelector((state) => state.user);
  const [SomeSuggest, setSomeSuggest] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);

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

  return (
    <View style={screenStyles.screenContainer}>
      <View style={screenStyles.stretchContainer}>
        <StickyHeaderScrollView
          ref={scrollViewRef}
          containerStyle={screenStyles.stretchContainer}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderHeader={() => {
            return (
              <View
                pointerEvents="box-none"
                style={{
                  height: scrollHeight,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                  marginTop: 35,
                  marginBottom: -20,
                }}
              >
                {/* <Foreground scrollValue={scrollValue} /> */}
                <Animated.View
                  style={[
                    foregroundWrapperAnimatedStyle,
                    {
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Poppins-SemiBold",
                      color: textColor,
                    }}
                  >
                    Dutypedia
                  </Text>
                </Animated.View>
              </View>
            );
          }}
          renderTabs={() => (
            <View style={{ marginTop: 35 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SearchScreen");
                }}
                style={[styles.input]}
              >
                <EvilIcons
                  style={{
                    marginRight: 10,
                  }}
                  name="search"
                  size={24}
                  color={textColor}
                />
                <Text
                  style={{
                    color: textColor,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {"Search On Dutypedia"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          style={screenStyles.stretch}
        >
          <SafeAreaView
            edges={["left", "right", "bottom"]}
            style={[styles.content, { marginTop: 0 }]}
          >
            <View>
              <Text
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
              </Text>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <View style={{ width: 15 }} />
              <Cart />
              <Cart />
              <Cart />
              <Cart />
              <View style={{ width: 15 }} />
            </ScrollView>
            <SellerCart2
              onPress={() => {
                navigation.navigate("Category");
              }}
            />
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
                  fontSize: 14,
                  paddingLeft: 15,
                  paddingRight: 15,
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

            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                marginVertical: 10,
                marginLeft: 5,
                paddingLeft: 15,
                paddingRight: 15,
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
              <RelatedService />
              <RelatedService />
              <RelatedService />
              <RelatedService />
              <RelatedService />
              <RelatedService />
              <RelatedService />
              <View style={{ width: 10 }} />
            </ScrollView>
            <SellerCart3/>
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                marginVertical: 10,
                marginLeft: 5,
                paddingLeft: 15,
                paddingRight: 15,
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
              <Cart />
              <Cart />
              <Cart />
              <Cart />
              <View style={{ width: 15 }} />
            </ScrollView>
            
            <View style={{ height: 10 }} />
          </SafeAreaView>
        </StickyHeaderScrollView>
      </View>
    </View>
  );
};

export default Home_Next;
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
    height: HEADER_BAR_HEIGHT,
    flex: 1,
    overflow: "hidden",
    zIndex: 3,
  },
  tabContainer: {
    paddingTop: HEADER_BAR_HEIGHT,
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
