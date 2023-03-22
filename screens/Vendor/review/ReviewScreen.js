import React from "react";
import { ScrollView,View } from "react-native";
import { Cart } from "../../../Cart/ReviewCart";
import RatingView from "../../../components/RatingView";

export default function ReviewScreen({navigation}) {
  return (
    <ScrollView>
      <View style={{
        marginTop:8,
        marginHorizontal:28
      }}>
        <RatingView
          style={{
            backgroundColor: "#ffffff",
            marginVertical:8
          }}
          title="Communication"
          rate={3.5}
        />
        <RatingView
          style={{
            backgroundColor: "#ffffff",
            marginVertical:8
          }}
          title="Service as Describe"
          rate={3.5}
        />
        <RatingView
          style={{
            backgroundColor: "#ffffff",
            marginVertical:8
          }}
          title="Service quality"
          rate={4.5}
        />
        <Cart onReplay={()=>{
            navigation.navigate("FeedBack")
        }}/>
      </View>
    </ScrollView>
  );
}
