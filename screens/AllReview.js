import React from "react";
import { View, ScrollView } from "react-native";
import { secondaryColor, primaryColor } from "../assets/colors";
import RatingView from "./../components/RatingView";
import { Cart } from "../Cart/ReviewCart";

const AllReview = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: secondaryColor,
      }}
    >
      <View style={{ backgroundColor: primaryColor, height: 20 }} />
      <RatingView
        style={{
          backgroundColor: primaryColor,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
        title="Seller Communication"
        rate={3.5}
      />
      <RatingView
        style={{
          backgroundColor: primaryColor,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
        title="Service as Describe"
        rate={4.5}
      />
      <RatingView
        style={{
          backgroundColor: primaryColor,
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}
        title="Service Quality"
        rate={5}
      />
      <View style={{ backgroundColor: primaryColor, height: 20 }} />
      <View style={{
        paddingHorizontal:10,
        backgroundColor:primaryColor,
      }}>
        <Cart id={true} />
        <Cart id={true} />
        <View
          style={{ height: 1, width: "100%", backgroundColor: secondaryColor }}
        />
        <Cart id={true}/>
        <View
          style={{ height: 1, width: "100%", backgroundColor: secondaryColor }}
        />
        <Cart id={true}/>
        <View
          style={{ height: 1, width: "100%", backgroundColor: secondaryColor }}
        />
      </View>
    </ScrollView>
  );
};

export default AllReview;
