import React, { useEffect } from "react";
import { ScrollView,View } from "react-native";
import { useSelector } from "react-redux";
import { Cart } from "../../../Cart/ReviewCart";
import { getReviews } from "../../../Class/service";
import RatingView from "../../../components/RatingView";

export default function ReviewScreen({navigation}) {
    const user=useSelector(state=>state.user)
    const vendor=useSelector(state=>state.vendor)

    useEffect(()=>{
        if(user&&vendor){
            getReviews(user.token,vendor.service.id).then(res=>{
                console.log(res.data)
            })
        }
    },[])
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
