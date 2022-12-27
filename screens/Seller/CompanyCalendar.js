import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity,Alert,StatusBar as Bar } from "react-native";
import { Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  primaryColor,
  textColor,
  backgroundColor,
  assentColor,
} from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import { calenderVector } from "../../assets/icon";
import { SvgXml } from "react-native-svg";
import { Button, Menu } from "react-native-paper";
import { CheckBox, Days } from "./Pricing";
import Animated, { SlideInRight, SlideInLeft } from "react-native-reanimated";
import IconButton from "../../components/IconButton";
import { updateData } from "../../Class/update";
import { vendorLogin } from "../../Class/auth";
import { StatusBar } from "expo-status-bar";
import ActivityLoader from "../../components/ActivityLoader";

const CompanyCalendar = (props) => {
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const vendor = props.route.params.vendor;
  const navigation = props.navigation;
  const [Times, setTimes] = React.useState(false);
  const [Days, setDays] = React.useState();
  const newVendor = useSelector((state) => state.vendor);
  const [Visible, setVisible] = React.useState(false);
  const [Edit, setEdit] = React.useState(false);
  const [Loader,setLoader]=React.useState(false)

  React.useEffect(() => {
    if (vendor && vendor.service && vendor.service.workingTime.length == 0) {
      setTimes(true);
    }
    //console.log(vendor.service.workingTime)
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
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={"white"} />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 5,
          shadowOffset: {
            height: 1,
            width: 1,
          },
          shadowColor: "black",
          shadowOpacity: 0.01,
          shadowRadius: 2,
          elevation: 1,
          backgroundColor: primaryColor,
          flexDirection: "row",
          alignItems: "center",
          paddingTop:32
        }}
      >
        <AntDesign name="left" size={24} color={assentColor} />
        <Text
          style={{
            fontSize: 16,
            color: textColor,
            marginLeft: 10,
          }}
        >
          Company Calender
        </Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        {newVendor && !Edit && (
          <View
            style={{
              alignItems: "flex-end",
              marginHorizontal: 20,
            }}
          >
            <Menu
              contentStyle={{ backgroundColor: primaryColor }}
              onDismiss={() => {
                setVisible((val) => !val);
              }}
              visible={Visible}
              anchor={
                <Entypo
                  onPress={() => {
                    setVisible((val) => !val);
                  }}
                  style={{}}
                  name="dots-three-vertical"
                  size={20}
                  color={assentColor}
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  setEdit((val) => !val);
                  setVisible(false);
                }}
                title="Edit"
              />
            </Menu>
          </View>
        )}
        <SvgXml
          style={{
            marginLeft: "10%",
            marginVertical: 10,
          }}
          xml={calenderVector}
          width="80%"
        />
        {Edit ? (
          <ViewBox navigation={navigation} setEdit={setEdit} times={vendor.service.workingTime} />
        ) : (
          <Animated.View
            entering={SlideInLeft}
            style={{
              borderColor: "#F1EFEF",
              borderWidth: .5,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginHorizontal: 20,
              backgroundColor: primaryColor,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                borderColor: "#F1EFEF",
                borderBottomWidth: .5,
                height: 30,
              }}
            >
              <Text style={styles.text}>Day</Text>
              <Text style={styles.text}>Working Time</Text>
            </View>

            {/* {vendor &&
            vendor.service.workingTime.map((doc, i) => (
              <Cart key={i} value={doc} />
            ))} */}
            {days.map((times, i) => (
              <Cart times={vendor.service.workingTime} key={i} day={times} />
            ))}
          </Animated.View>
        )}
        <View style={{height:20}}/>
      </ScrollView>
    </View>
  );
};

export default CompanyCalendar;
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    margin: 0,
  },
  view: {
    flex: 1,
  },
});
const ViewBox = ({ setEdit, times,navigation }) => {
  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const [AllDay, setAllDay] = React.useState(false);
  const [Times, setTimes] = React.useState(times);
  const user = useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();
  const vendor=useSelector(state=>state.vendor)

  React.useEffect(() => {
    try {
      if (times.length == 0) {
        setAllDay(true);
      }
    } catch (e) {
      console.warn(e.message);
    }
  }, []);
  const update = () => {
    setLoader(true);
    if(AllDay){
      setTimes([])
    }
    updateData(user.token, {
      workingTime: Times,
      serviceId:vendor.service.id
    }).then((res) => {
      vendorLogin(user.token, vendor.service.id).then((res) => {
        if (res) {
          setLoader(false);
          dispatch({ type: "SET_VENDOR", playload: res });
          //navigation.navigate("Profile");
          navigation.goBack();
        } else {
          setLoader(false);
          Alert.alert("Problem in log into dashboard");
        }
      });
    }).catch(err=>{
      setLoader(false)
      Alert.alert("Opp!",err.response.data)
    })
  };
  if(Loader){
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityLoader/>
      </View>
    )
  }
  return (
    <Animated.View
      style={{
        paddingHorizontal: 20,
      }}
      entering={SlideInRight}
    >
      <View
        style={{
          position: "absolute",
          right: 0,
          width: 145,
          zIndex: 100,
        }}
      >
        <CheckBox
          value={AllDay}
          onChange={() => {
            setAllDay((val) => !val);
          }}
          title={"24/7 Open"}
        />
      </View>
      {days.map((doc, i) => (
        <Days allDay={AllDay}
          onChange={(e) => {
            let arr = Times.filter(
              (d) => d.day.toUpperCase() != e.title.toUpperCase()
            );
            arr.push({
              day: e.title,
              open: toTime(e.openingTime),
              close: toTime(e.closingTime),
            });
            setTimes(arr);
          }}
          values={times}
          key={i}
          open={true}
          title={doc}
        />
      ))}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginVertical: 10,
        }}
      >
        <IconButton
          onPress={update}
          style={{
            backgroundColor: "#4ADE80",
            height: 35,
            color: "white",
            width: 120,
          }}
          title={"Save"}
        />
        <IconButton
          onPress={() => {
            setEdit(false);
          }}
          style={{
            borderColor: "red",
            borderWidth: 1,
            width: 120,
            height: 35,
            marginLeft: 10,
          }}
          title={"Cancel"}
        />
      </View>
      <View style={{ height: 10 }} />
    </Animated.View>
  );
};
const Cart = ({ value, day, times }) => {
  //const text=times.length==0?"24/7 day":null;
  const [Time, setTime] = React.useState();
  React.useEffect(() => {
    try {
      if (times.length == 0) {
        setTime("24/7 days");
      } else {
        let arr = times.filter((d) =>
          d.day.toUpperCase().match(day.toUpperCase())
        );
        if (arr.length == 0) {
          setTime("Close");
        } else {
          setTime(convertTime(arr[0].open) + " - " + convertTime(arr[0].close));
        }
      }
    } catch (err) {
      console.warn(err.message);
    }
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
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
        <SvgXml xml={calender} height="30" />
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-Light",
            marginLeft: 10,
          }}
        >
          {value ? value.day : day}
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
        <SvgXml xml={clock} height="30" />
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-Light",
            marginLeft: 10,
          }}
        >
          {Time}
        </Text>
      </View>
    </View>
  );
};
const convertTime = (time) => {
  let newTime = time.split(":");
  if (newTime[0] > 12) {
    let t = parseInt(newTime[0]) - 12;
    return `${t < 10 ? "0" + t : t}:${
      newTime[1] < 10 ? "0" + parseInt(newTime[1]) : newTime[1]
    } Pm`;
  }
  return `${newTime[0] < 10 ? "0" + parseInt(newTime[0]) : newTime[0]}:${
    newTime[1] < 10 ? "0" + parseInt(newTime[1]) : newTime[1]
  } Am`;
};
const calender = `<svg xmlns="http://www.w3.org/2000/svg" width="14.272" height="14.201" viewBox="0 0 14.272 14.201">
<g id="Group_10026" data-name="Group 10026" transform="translate(-38.517 -294.9)">
  <g id="Group_10018" data-name="Group 10018" transform="translate(38.613 295)">
    <rect id="Rectangle_7218" data-name="Rectangle 7218" width="13.428" height="10.995" rx="1" transform="translate(0.545 2.036)" fill="#666"/>
    <path id="Path_19748" data-name="Path 19748" d="M10.379,7a.5.5,0,0,1,.918.043,6.565,6.565,0,0,1,.026.943q2.117,0,4.236,0a6.639,6.639,0,0,1,.024-.936.5.5,0,0,1,.923-.035,5.855,5.855,0,0,1,.031.971c.587.013,1.173-.027,1.759.022a2.471,2.471,0,0,1,2.131,2.037,17.921,17.921,0,0,1,.021,2.444c0,1.952.009,3.9,0,5.857a2.454,2.454,0,0,1-2.481,2.37q-4.522,0-9.046,0a2.472,2.472,0,0,1-2.483-2.6c0-1.836,0-3.672,0-5.509,0-.821-.078-1.644,0-2.464A2.455,2.455,0,0,1,7.989,8.158a7.391,7.391,0,0,1,2.356-.175A5.418,5.418,0,0,1,10.379,7M7.842,9.454c-.5.47-.406,1.2-.4,1.815h12c0-.62.094-1.346-.4-1.816-.648-.679-1.671-.364-2.5-.437a3.658,3.658,0,0,1-.057,1.009.491.491,0,0,1-.885-.035,4.966,4.966,0,0,1-.037-.972q-2.117,0-4.236,0a4.886,4.886,0,0,1-.038.973.5.5,0,0,1-.886.038,3.839,3.839,0,0,1-.055-1.013c-.829.075-1.854-.243-2.5.438m1.475,4.3a.65.65,0,1,0,.833.807.654.654,0,0,0-.833-.807m2.569.015a.651.651,0,1,0,.9.678.654.654,0,0,0-.9-.678m2.579.011a.65.65,0,1,0,.926.547.657.657,0,0,0-.926-.547m2.671-.024a.65.65,0,1,0,.835.81.653.653,0,0,0-.835-.81m-7.793,2.6a.65.65,0,1,0,.815.789.654.654,0,0,0-.815-.789m7.82,0a.649.649,0,1,0,.818.785.653.653,0,0,0-.818-.785m-5.385.081a.649.649,0,1,0,1,.458.654.654,0,0,0-1-.458m2.659-.032a.649.649,0,1,0,.951.5A.654.654,0,0,0,14.438,16.4Z" transform="translate(-6.401 -6.715)" fill="#fff" stroke="#707070" stroke-width="0.2"/>
  </g>
</g>
</svg>
`;
const clock = `<svg xmlns="http://www.w3.org/2000/svg" width="14.3" height="14.3" viewBox="0 0 14.3 14.3">
<g id="Group_10010" data-name="Group 10010" transform="translate(-307.286 -87.286)">
  <circle id="Ellipse_2156" data-name="Ellipse 2156" cx="5.02" cy="5.02" r="5.02" transform="translate(309.416 89.416)" fill="#2e2e2e"/>
  <path id="Path_19965" data-name="Path 19965" d="M6.794,0h.385A7.009,7.009,0,0,1,14,6.795V7.2a7,7,0,0,1-2.643,5.273,6.953,6.953,0,0,1-2.55,1.287A7.206,7.206,0,0,1,7.18,14H6.822A7.016,7.016,0,0,1,0,7.206V6.8A7.01,7.01,0,0,1,6.794,0M6.753,2.566a.5.5,0,0,0-.253.443Q6.5,5,6.5,7a.508.508,0,0,0,.2.4q1.239.99,2.478,1.981a.5.5,0,0,0,.765-.606A.85.85,0,0,0,9.68,8.5C8.953,7.923,8.23,7.34,7.5,6.764c-.005-1.252,0-2.5,0-3.755a.5.5,0,0,0-.747-.444Z" transform="translate(307.436 87.436)" fill="#fff" stroke="#2e2e2e" stroke-width="0.3"/>
</g>
</svg>
`;
const toTime = (timestamp) => {
  let date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes;
  return strTime;
};
