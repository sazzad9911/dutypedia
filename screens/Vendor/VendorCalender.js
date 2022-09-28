import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { primaryColor, textColor, backgroundColor } from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";

const VendorCalender = () => {
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const vendor = useSelector(state=>state.vendor);
  const [Times, setTimes] = React.useState(false);
  React.useEffect(() => {
    if (
      vendor &&
      vendor.service &&
      vendor.service.workingTime.length == 0
    ) {
      setTimes(true);
    }
  }, [vendor]);
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingBottom: 10,
          backgroundColor: primaryColor,
        }}
      >
        <View style={styles.view}>
          <Text style={styles.text}>Day</Text>
        </View>
        <View
          style={[
            styles.view,
            {
              alignItems: "flex-end",
            },
          ]}
        >
          <Text style={styles.text}>Working Time</Text>
        </View>
      </View>
      <View
        style={{ height: 1, backgroundColor: "#e5e5e5", marginHorizontal: 20 }}
      />
      {vendor &&
        vendor.service.workingTime.map((doc, i) => (
          <Cart key={i} value={doc} />
        ))}
      {Times && days.map((times, i) => <Cart key={i} day={times} />)}
    </ScrollView>
  );
};

export default VendorCalender;
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  view: {
    flex: 1,
  },
});
const Cart = ({ value,day }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 15,
        height: 40,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AntDesign name="calendar" size={24} color={backgroundColor} />
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-Light",
            marginLeft: 5,
          }}
        >
          {value?value.day:day}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Entypo name="clock" size={24} color={backgroundColor} />
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-Light",
            marginLeft: 5,
          }}
        >
          {value?`${convertTime(value.open)} - ${convertTime(value.close)}`:'24/7 open'}
        </Text>
      </View>
    </View>
  );
};
const convertTime=(time) => {
    let newTime=time.split(':')
    if(newTime[0]>12){
      return `${parseInt(newTime[0])-12}:${newTime[1]} PM`
    }
    return `${newTime[0]}:${newTime[1]} AM`
}