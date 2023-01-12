import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { serverTimeToLocalDate } from "../../action";
import IconButton from "../../components/IconButton";
import FixedBackHeader from "./components/FixedBackHeader";

export const SubscriptionDates = ({ navigation, route }) => {
  const [Offset, setOffset] = React.useState(0);
  const params = route.params;
  const subsData = params.subsData;
  const date = params.date;
  const name=params.name?params.name:null
  const [totalDuration, setTotalDuration] = React.useState();
  const [amount, setAmount] = React.useState(0);
  const [subscriptionType, setSubscriptionType] = React.useState();
  const [counter,setCounter]=useState(10)

  React.useEffect(() => {
    //console.log(subsData)
    if (subsData&&!subsData.payAsYouGo) {
      let arr = [];
      for (let i = 0; i < subsData.totalDuration; i++) {
        arr.push(i);
      }
      setTotalDuration(arr);
      setSubscriptionType(subsData.subscriptionType);
      setAmount(subsData.amount);
    }else{
      let arr = [];
      for (let i = 0; i < counter; i++) {
        arr.push(i);
      }
      setTotalDuration(arr);
      setSubscriptionType(subsData.subscriptionType);
      setAmount(subsData.amount);
    }
  }, [subsData,counter]);
  //console.log(subsData)
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => {
          const currentOffset = e.nativeEvent.contentOffset.y;
          setOffset(currentOffset);
        }}
      >
        <View style={{ height: 75 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            backgroundColor: "#F8F8F8",
            paddingVertical: 10,
          }}
        >
          <Text style={[styles.text,{flex:1}]}>Sl</Text>
          <Text style={[styles.text,{flex:4}]}>{name?name:"Delivery Date"}</Text>
          <Text style={[styles.text,{flex:2}]}>Amount</Text>
        </View>
        {totalDuration &&
          totalDuration.map((doc, i) => (
            <Cart
              date={date}
              amount={amount}
              type={subscriptionType}
              index={i}
              key={i}
            />
          ))}
           {subsData && subsData.payAsYouGo && (
          <IconButton
            style={{
              marginHorizontal: 20,
              height: 40,
              borderRadius: 10,
              backgroundColor: "#4ADE80",
              marginTop: 20,
            }}
            title={"Load More"}
            onPress={() => {
              setCounter((val) => (val + 10));
            }}
          />
        )}
          <View style={{height:20}}/>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          top: 0,
          zIndex: 100,
        }}
      >
        <FixedBackHeader style={{
          height:70,
          backgroundColor:"white",
          paddingTop:20
        }}
          color={"black"}
          navigation={navigation}
          Yoffset={Offset}
          title={subscriptionType}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    textAlign:"center"
  },
  cartText: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
  },
});
const Cart = ({ index, amount, type, date }) => {
  const [startingDate, setStartingDate] = React.useState();
  const [endingDate, setEndingDate] = React.useState();

  React.useEffect(() => {
    if (index == 0 && type == "Monthly") {
      setStartingDate(serverTimeToLocalDate(date));
      setEndingDate(serverTimeToLocalDate(date, 30));
    }else if(type=="Monthly"){
      setStartingDate(serverTimeToLocalDate(date,30*index))
      setEndingDate(serverTimeToLocalDate(date,(30*(index+1))))
    }
    if (index == 0 && type == "Yearly") {
      setStartingDate(serverTimeToLocalDate(date));
      setEndingDate(serverTimeToLocalDate(date, 365));
    }else if(type=="Yearly"){
      setStartingDate(serverTimeToLocalDate(date,365*index))
      setEndingDate(serverTimeToLocalDate(date,(365*(index+1))))
    }
    if (index == 0 && type == "Weekly") {
      setStartingDate(serverTimeToLocalDate(date));
      setEndingDate(serverTimeToLocalDate(date, 7));
    }else if(type=="Weekly"){
      setStartingDate(serverTimeToLocalDate(date,7*index))
      setEndingDate(serverTimeToLocalDate(date,(7*(index+1))))
    }
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 15,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: "#F8F8F8",
      }}
    >
      <Text style={[styles.cartText,{flex:1,textAlign:"center"}]}>{index + 1}</Text>
      <Text style={[styles.cartText,{flex:4,textAlign:"center"}]}>
        {startingDate} to {endingDate}
      </Text>
      <Text style={[styles.cartText,{flex:2,textAlign:"center"}]}>{amount}৳</Text>
    </View>
  );
};
