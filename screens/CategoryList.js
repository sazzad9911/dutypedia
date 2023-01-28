import React from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  StatusBar,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Bear } from "./../assets/icon";
import { SvgXml } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import SearchItem from "./../Cart/SearchItem";
import {
  StickyHeaderScrollView,
  useStickyHeaderScrollProps,
} from "react-native-sticky-parallax-header";
import {
  primaryColor,
  secondaryColor,
  textColor,
  backgroundColor,
} from "./../assets/colors";
import { colors, screenStyles } from "../components/constants";
//import HeaderBar from './../components/Appointment/HeaderBar';
const { width, height } = Dimensions.get("window");
import { text } from "../components/Appointment/data.ts";
import { simsScreenTestIDs } from "../components/Appointment/testIDs.ts";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { AllData } from "../Data/AllData";
import { serverToLocal } from "../Class/dataConverter";
import { getAllGigs } from "../Class/service";
import { useSelector, useDispatch } from "react-redux";

const PARALLAX_HEIGHT = 330;
const HEADER_BAR_HEIGHT = 92;
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const CategoryList = ({ navigation, route }) => {
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
  const title = route.params && route.params.title ? route.params.title : null;
  const [SubCategories, setSubCategories] = React.useState([]);
  const [Data, setData] = React.useState([]);
  const [Datas, setDatas] = React.useState([]);
  const [SelectSubCategory, setSelectSubCategory] = React.useState();
  const user = useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(true);

  React.useEffect(() => {
    setSubCategories([]);
    if (title) {
      AllData.filter((d) => {
        if (d.data && d.title == title) {
          setSubCategories(d.data);
        }
      });
    }
  }, [title]);
  React.useEffect(() => {
    if (title) {
      getAllGigs(user.token)
        .then((res) => {
          if (res.data) {
            //console.log(res.data);
            let arr = [];
            res.data.gigs.forEach((gig) => {
              if (gig.services.category) {
                //console.log(gig.service.dashboard)
                let listData = serverToLocal(
                  gig.services.options,
                  gig.services.category
                );
                if (listData[0].mainTitle == title) {
                  arr.push(gig);
                }
              } else {
                //console.log(gig.service.dashboard)
                let listData = serverToLocal(
                  gig.services,
                  gig.service.dashboard
                );
                if (listData[0].mainTitle == title) {
                  arr.push(gig);
                }
              }
            });
            //console.log(arr);
            setDatas(arr);
            setData(arr);
            setLoader(false);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err);
        });
    }
  }, [title]);
  React.useEffect(() => {
    if (SelectSubCategory && Datas.length > 0) {
      //console.log(res.data);
      let arr = [];
      Datas.forEach((gig) => {
        if (gig.services.category) {
          //console.log(gig.service.dashboard)
          let listData = serverToLocal(
            gig.services.options,
            gig.services.category
          );
          let checked = listData.filter((s) => s.title == SelectSubCategory);
          if (checked && checked.length > 0) {
            arr.push(gig);
          }
        } else {
          //console.log(gig.service.dashboard)
          let listData = serverToLocal(gig.services, gig.service.dashboard);
          let checked = listData.filter((s) => s.title == SelectSubCategory);
          if (checked && checked.length > 0) {
            arr.push(gig);
          }
        }
      });
      //console.log(arr);
      setData(arr);
    } else {
      setData(Datas);
    }
  }, [SelectSubCategory]);
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={screenStyles.screenContainer}>
      <View
        style={[
          styles.headerBarContainer,
          {
            width: width,
            backgroundColor: primaryColor,
            height: 70,
            zIndex: 6,
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <AntDesign
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            marginTop: 40,
            alignSelf: "flex-start",
            marginLeft: 10,
          }}
          name="left"
          size={24}
          color={textColor}
        />
        <Animated.View style={headerAnimatedStyle}>
          <Text
            style={{
              color: textColor,
              fontSize: 18,
              marginTop: 30,
              marginLeft: 20,
              fontFamily: "Poppins-Medium",
            }}
          >
            {title}
          </Text>
        </Animated.View>
      </View>
      <View style={screenStyles.stretchContainer}>
        <StickyHeaderScrollView
          ref={scrollViewRef}
          containerStyle={screenStyles.stretchContainer}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          renderHeader={() => {
            return (
              <View
                pointerEvents="box-none"
                style={{
                  height: scrollHeight,
                  backgroundColor: primaryColor,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 240,
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
                      color: textColor,
                      marginTop: 15,
                      fontFamily: "Poppins-SemiBold",
                      fontSize: 18,
                    }}
                  >
                    {title}
                  </Text>
                </Animated.View>
              </View>
            );
          }}
          renderTabs={() => <View>{/* <Tabs /> */}</View>}
          showsVerticalScrollIndicator={false}
          style={screenStyles.stretch}
        >
          <SafeAreaView
            edges={["left", "right", "bottom"]}
            style={[styles.content, { marginTop: -20 }]}
          >
            {SubCategories.length > 0 && (
              <View>
                <Text
                  style={{
                    marginTop: 30,
                    marginBottom: 10,
                    marginLeft: 5,
                    fontFamily: "Poppins-Medium",
                    fontSize: 18,
                  }}
                >
                  Sub Categories
                </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {SubCategories.map((doc, i) => (
                    <Cart active={doc.title==SelectSubCategory?true: false}
                      onPress={() => {
                        setSelectSubCategory(doc.title);
                      }}
                      key={i}
                      title={doc.title}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
            {SubCategories.length === 0 && <View style={{ height: 30 }} />}
            {Data &&
              Data.map((doc, i) => (
                <SearchItem onPress={()=>{
                  navigation.navigate("OtherProfile",{serviceId:doc?doc.service.id:null,data:doc})
                }}
                  key={i}
                  data={doc} navigation={navigation}
                  testID={simsScreenTestIDs.contentTestID}
                /> 
              ))}
            {Data && Data.length == 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: backgroundColor,
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    marginTop: 20,
                  }}
                >
                  No data found!
                </Text>
              </View>
            )}
          </SafeAreaView>
        </StickyHeaderScrollView>
      </View>
    </View>
  );
};

export default CategoryList;
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
});

const Cart = ({ title, onPress,active }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
    >
      <View
        style={{
          width: 120,
          height: 80,
          backgroundColor: !active? primaryColor:'green',
          margin: 5,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowRadius: 2,
          shadowOpacity: 0.01,
          shadowColor: "black",
          elevation: 2,
        }}
      >
        <Text
          style={{
            color:active?'white': textColor,
            fontFamily: "Poppins-Medium",
            fontSize: 16,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
