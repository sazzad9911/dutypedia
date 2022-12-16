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
} from "react-native";
import { Bear } from "./../assets/icon";
import { SvgXml } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import SearchItem from "./../Cart/SearchItem";
import {
  StickyHeaderScrollView,
  useStickyHeaderScrollProps,
} from "react-native-sticky-parallax-header";
import { primaryColor, secondaryColor } from "./../assets/colors";
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

const PARALLAX_HEIGHT = 330;
const HEADER_BAR_HEIGHT = 92;
const SNAP_START_THRESHOLD = 50;
const SNAP_STOP_THRESHOLD = 330;

const SaveList = ({ navigation }) => {
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
        [0, 5,10,15, 30],
        [1,.8,.5, .2, 0],
        Extrapolate.CLAMP
      ),
    };
  });
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollValue.value,
        [0,100 ],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });
  return (
    <View style={screenStyles.screenContainer}>
      <View
        style={[
          styles.headerBarContainer,
          {
            width: width,
            backgroundColor: "#48496D",
            height: 50,
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
            alignSelf: "flex-start",
            marginLeft: 10,
            marginTop:11
          }}
          name="left"
          size={24}
          color="#f5f5f5"
        />
        <Animated.View style={headerAnimatedStyle}>
          <Text
            style={{
              color: primaryColor,
              fontSize: 15,
              marginLeft: 20,
              fontFamily: 'Poppins-Light'
            }}
          >
            Created By Easin Arafat
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
                  backgroundColor: "#48496D",
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
                  <SvgXml
                    style={{
                      marginTop: 40,
                    }}
                    xml={Bear}
                    height="100"
                    width="100"
                  />
                  <Text
                    style={{
                      color: "white",
                      marginTop: 15,
                      fontFamily: 'Poppins-Medium',
                      fontSize: 16,
                    }}
                  >
                    Created By Easin Arafat
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
            <Text
              style={{
                marginTop: 30,
                marginBottom: 10,
                marginLeft: 5,
                fontFamily: 'Poppins-Medium',
                fontSize: 18,
              }}
            >
              Save List
            </Text>
            <SearchItem testID={simsScreenTestIDs.contentTestID} />
            <SearchItem testID={simsScreenTestIDs.contentTestID} />
            <SearchItem testID={simsScreenTestIDs.contentTestID} />
            <SearchItem testID={simsScreenTestIDs.contentTestID} />
            <SearchItem testID={simsScreenTestIDs.contentTestID} />
            <SearchItem testID={simsScreenTestIDs.contentTestID} />
            <SearchItem testID={simsScreenTestIDs.contentTestID} />
          </SafeAreaView>
        </StickyHeaderScrollView>
      </View>
    </View>
  );
};

export default SaveList;
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

{
  /* <View
        style={{
          backgroundColor: "#48496D",
          height: 230,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            position: "absolute",
            top: 30,
            left: 20,
          }}
          name="left"
          size={24}
          color="#f5f5f5"
        />
        <SvgXml
          style={{
            marginTop: 30,
          }}
          xml={Bear}
          height="100"
          width="100"
        />
        <Text
          style={{
            color: "white",
            marginTop: 15,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Created By Easin Arafat
        </Text>
      </View> */
}

{
  /* <DetailsHeaderFlatList
      containerStyle={{
        backgroundColor: secondaryColor,
      }}
      parallaxHeight={50}
      leftTopIcon={() => (
        <AntDesign
          onPress={() => {
            navigation.goBack();
          }}
          name="left"
          size={24}
          color="#f5f5f5"
        />
      )}
      onHeaderLayout={() => (
        <SvgXml
          style={{
            marginTop: 30,
          }}
          xml={Bear}
          height="100"
          width="100"
        />
      )}
      title="Hello"
      backgroundColor={"#48496D"}
      data={[
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
      ]}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => <SearchItem />}
    >
      <SvgXml
        style={{
          marginTop: 30,
        }}
        xml={Bear}
        height="100"
        width="100"
      />
    </DetailsHeaderFlatList> */
}
