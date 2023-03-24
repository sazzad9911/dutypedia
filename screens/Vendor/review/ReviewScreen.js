import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Cart } from "../../../Cart/ReviewCart";
import { getReviews } from "../../../Class/service";
import RatingView from "../../../components/RatingView";
import stylesheet from "../../../assets/stylesheet";
import ActivityLoader from "../../../components/ActivityLoader";
import AllReviewHeader from "../../../components/AllReviewHeader";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";

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
      <ScrollView>
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
            rate={overall?.communicationRating}
          />
          <RatingView
            style={{
              backgroundColor: "#ffffff",
              marginVertical: 8,
            }}
            title="Service as Describe"
            rate={overall?.describeRating}
          />
          <RatingView
            style={{
              backgroundColor: "#ffffff",
              marginVertical: 8,
            }}
            title="Service quality"
            rate={overall?.qualityRating}
          />
          {reviews && reviews.length == 0 && (
            <View style={stylesheet.fullBox}>
              <Text style={stylesheet.mediumText}>No Reviews</Text>
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
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
