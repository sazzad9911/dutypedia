import React from "react";
import { View, ScrollView, StyleSheet, Dimensions, Text } from "react-native";
import { secondaryColor, primaryColor } from "../assets/colors";
import RatingView from "./../components/RatingView";
import { Cart, CartView } from "../Cart/ReviewCart";
import customStyle from "../assets/stylesheet";
const { width, height } = Dimensions.get("window");

const AllReview = ({ navigation, route }) => {
  const data = route?.params?.data;
  const individualRating = route?.params?.individualRating;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: secondaryColor,
      }}>
      <View style={{ backgroundColor: primaryColor, height: 20 }} />
      <RatingView
        style={{
          backgroundColor: primaryColor,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
        title="Seller Communication"
        rate={individualRating?.communicationRating}
      />
      <RatingView
        style={{
          backgroundColor: primaryColor,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
        title="Service as Describe"
        rate={individualRating?.describeRating}
      />
      <RatingView
        style={{
          backgroundColor: primaryColor,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
        title="Service Quality"
        rate={individualRating?.qualityRating}
      />
      <View style={{ backgroundColor: primaryColor, height: 20 }} />
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: primaryColor,
        }}>
        {data &&
          data.map((doc, i) => (
            <CartView
              noReplay={true}
              data={doc}
              key={i}
              style={{
                width: width - 40,
              }}
            />
          ))}
        {data && data.length == 0 && (
          <View style={customStyle.fullBox}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                marginVertical: 50,
              }}>
              No Rating
            </Text>
          </View>
        )}
        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
};

export default AllReview;
const styles = StyleSheet.create({
  cart: {
    height: 200,
  },
});
