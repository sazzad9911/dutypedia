import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View,Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Cart } from "../../../Cart/ReviewCart";
import { getReviews } from "../../../Class/service";
import RatingView from "../../../components/RatingView";
import stylesheet from "../../../assets/stylesheet";
import ActivityLoader from "../../../components/ActivityLoader";
import AllReviewHeader from "../../../components/AllReviewHeader";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";
import customStyle from "../../../assets/stylesheet";

export default function ReviewScreen({ navigation }) {
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const [overall, setOverAll] = useState();
  const [reviews, setReviews] = useState();
  const isFocused = useIsFocused();
  const dispatch=useDispatch()

  React.useEffect(() => {
    if (isFocused) {
      dispatch(setHideBottomBar(true));
    } else {
      dispatch(setHideBottomBar(false));
    }
  }, [isFocused]);
  useEffect(() => {
    if (user && vendor) {
      getReviews(user.token, vendor.service.id)
        .then((res) => {
          //console.log(res.data);
          setOverAll(res.data.aggregate.individualRating);
          setReviews(res.data.reviews);
        })
        .catch((err) => {
          console.error(err.response.data.msg);
        });
    }
  }, [isFocused]);
  return (
    <View style={{ flex: 1 }}>
      <AllReviewHeader title={`${reviews?reviews.length:"0"} Review`} navigation={navigation} />
      <ScrollView style={{flex:1}}>
        <View
          style={{
            marginTop: 8,
            marginHorizontal: 28,
            marginBottom: 32,
          }}>
          <RatingView
            style={{
              backgroundColor: "#ffffff",
              marginVertical: 8,
            }}
            title="Communication"
            rate={overall?.communicationRating?overall?.communicationRating:0}
          />
          <RatingView
            style={{
              backgroundColor: "#ffffff",
              marginVertical: 8,
            }}
            title="Service as Describe"
            rate={overall?.describeRating?overall?.describeRating:0}
          />
          <RatingView
            style={{
              backgroundColor: "#ffffff",
              marginVertical: 8,
            }}
            title="Service quality"
            rate={overall?.qualityRating?overall?.qualityRating:0}
          />
          {reviews && reviews.length == 0 && (
            <View style={[customStyle.fullBox]}>
              <Text style={[customStyle.mediumText,{marginTop:40}]}>No Reviews</Text>
            </View>
          )}
          {!reviews && (
            <View style={stylesheet.fullBox}>
              <ActivityLoader />
            </View>
          )}
          {reviews &&
            reviews.map((doc, i) => (
              <Cart
                data={doc}
                key={i}
                onReplay={() => {
                  navigation.navigate("FeedBack",{data:doc});
                }}
                service={vendor?.service}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
