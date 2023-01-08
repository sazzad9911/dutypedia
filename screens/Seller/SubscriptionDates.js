import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { serverTimeToLocalDate } from "../../action";
import FixedBackHeader from "./components/FixedBackHeader";

export const SubscriptionDates = ({ navigation, route }) => {
  const [Offset, setOffset] = React.useState(0);
  const params = route.params;
  const subsData = params.subsData;
  const date=params.date;
  const [totalDuration, setTotalDuration] = React.useState();
  const [amount, setAmount] = React.useState(0);
  const [subscriptionType, setSubscriptionType] = React.useState();

  React.useEffect(() => {
    if (subsData) {
      let arr = [];
      for (let i = 0; i < subsData.totalDuration; i++) {
        arr.push(i);
      }
      setTotalDuration(arr);
      setSubscriptionType(subsData.subscriptionType);
      setAmount(subsData.amount);
    }
  }, [subsData]);
  //console.log(subsData)
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      
      <ScrollView
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
          <Text style={styles.text}>Sl</Text>
          <Text style={styles.text}>Delivery Date</Text>
          <Text style={styles.text}>Amount</Text>
        </View>
        {totalDuration&&totalDuration.map((doc,i)=>(
            <Cart date={date} amount={amount} type={subscriptionType} index={i} key={i}/>
        ))}
        
      </ScrollView>
      <View style={{
        position:"absolute",
        top:0,
        zIndex:100,
        
      }}>
        <FixedBackHeader
        color={"black"}
        navigation={navigation}
        Yoffset={Offset}
      />
      <Text></Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  cartText: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
  },
});
const Cart = ({ index,amount,type,date }) => {
    const [startingDate,setStartingDate]=React.useState()
    const [endingDate,setEndingDate]=React.useState()

    React.useEffect(()=>{
        if(index==0&&type=="Monthly"){
            setStartingDate(serverTimeToLocalDate(date))
            setEndingDate(serverTimeToLocalDate(date,30))
        }
        if(type=="Monthly"){

        }
    },[])
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
      <Text style={styles.cartText}>{index+1}</Text>
      <Text style={styles.cartText}>{startingDate} to {endingDate}</Text>
      <Text style={styles.cartText}>Monthly 500</Text>
    </View>
  );
};
