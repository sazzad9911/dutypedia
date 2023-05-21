import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import customStyle from "../assets/stylesheet";
import ServiceHeader from "../components/LandingPage/ServiceHeader";
import { TopSellerCard } from "../components/LandingPage/TopSeller";
const { width, height } = Dimensions.get("window");

export default function ServiceScreen({ onMore, navigation, route }) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 200);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200],
  });
  const data = route?.params?.data;
  //const inset=useSafeAreaInsets()

  return (
    <ScrollView
      style={{ flexGrow: 1 }}
      scrollEventThrottle={16}
      onScroll={(e) => {
        scrollY.setValue(e.nativeEvent.contentOffset.y);
        //scroll;
      }}
      stickyHeaderHiddenOnScroll={true}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}>
      <Animated.View
        style={[
          {
            transform: [{ translateY: translateY }],
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            zIndex: 500,
            overflow: "hidden",
          },
        ]}>
        <ServiceHeader navigation={navigation} />
      </Animated.View>
      <View
        style={[
          customStyle.flexBox,
          { marginTop: 0, marginBottom: 18, marginHorizontal: 20 },
        ]}>
        <Text style={customStyle.landingHeadLine}>Top Seller</Text>
        {/* <TouchableOpacity onPress={onMore}>
          <Text style={customStyle.landingButtonText}>See all</Text>
        </TouchableOpacity> */}
      </View>
      {data && (
        <View
          style={{
            marginHorizontal: 14,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent:  "flex-start",
            marginBottom: 22,
          }}>
          {data.map((doc, i) => (
            <TopSellerCard onPress={()=>{
              navigation?.navigate("OtherProfile",{data:doc,serviceId:doc?.service?.id})
            }}
              key={i}
              height={130}
              data={doc}
              style={styles.card}
              width={width / 2 - 26}
            />
          ))}
        </View>
      )}
      {!data&&(
        <View style={{
          height:200,
          justifyContent:"center",
          alignItems:"center"
        }}>
          <Text style={customStyle.mediumText}>No Seller!</Text>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  card: {
    marginVertical: 14,
  },
});
