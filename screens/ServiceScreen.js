import React from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated
} from "react-native";
import customStyle from "../assets/stylesheet";
import ServiceHeader from "../components/LandingPage/ServiceHeader";
import { TopSellerCard } from "../components/LandingPage/TopSeller";
const { width, height } = Dimensions.get("window");

export default function ServiceScreen({ onMore, navigation }) {
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 200);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200],
  });
  
  return (
    <ScrollView style={{ flexGrow: 1 }} scrollEventThrottle={16} onScroll={(e) => {
      scrollY.setValue(e.nativeEvent.contentOffset.y);
      //scroll;
    }} stickyHeaderHiddenOnScroll={true} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <Animated.View style={[
            {
              transform: [{ translateY: translateY }],
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              zIndex: 500,
              overflow:"hidden",
            },
          ]}>
        <ServiceHeader navigation={navigation} />
      </Animated.View>
      <View
        style={[
          customStyle.flexBox,
          { marginTop: 0, marginBottom: 18, marginHorizontal: 28 },
        ]}>
        <Text style={customStyle.landingHeadLine}>Top Seller</Text>
        <TouchableOpacity onPress={onMore}>
          <Text style={customStyle.landingButtonText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: 22,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 22,
        }}>
        <TopSellerCard
          height={130}
          style={styles.card}
          width={width / 2 - 34}
        />
        <TopSellerCard
          height={130}
          style={styles.card}
          width={width / 2 - 34}
        />
        <TopSellerCard
          height={130}
          style={styles.card}
          width={width / 2 - 34}
        />
        <TopSellerCard
          height={130}
          style={styles.card}
          width={width / 2 - 34}
        />
        <TopSellerCard
          height={130}
          style={styles.card}
          width={width / 2 - 34}
        />
        <TopSellerCard
          height={130}
          style={styles.card}
          width={width / 2 - 34}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  card: {
    marginVertical: 14,
  },
});
