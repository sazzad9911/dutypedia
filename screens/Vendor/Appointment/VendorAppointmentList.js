import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  Pressable,
  Image
} from "react-native";
import Svg, { SvgXml } from "react-native-svg";
const { width, height } = Dimensions.get("window");
import { ActivityIndicator, FAB } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  getAppointment,
  getVendorAppointment,
} from "../../../Class/appointment";
import { Color } from "../../../assets/colors";
import { changeTime, dateDifference, serverTimeToLocalDate, timeConverter } from "../../../action";
import Avatar from "../../../components/Avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Animated, { FadeIn } from "react-native-reanimated";
import RequestAppointmentList from "./RequestAppointmentList";
import moment from 'moment';
const Tab = createMaterialTopTabNavigator();
const status = [
  {
    title: "Incomplete",
    color: "#1A1A1A",
  },
  {
    title: "Completed",
    color: "#1A1A1A",
  },
  {
    title: "Cancelled",
    color: "#1A1A1A",
  },
  {
    title: "Pending",
    color: "#1A1A1A",
  },
  {
    title: "Approved",
    color: "#1A1A1A",
  },
  {
    title: "Rejected",
    color: "#1A1A1A",
  },
];


export default function VendorAppointmentList({ navigation, route }) {
  const [Active, setActive] = React.useState("Upcoming");

  const data = route.params && route.params.data ? route.params.data : null;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const backgroundColor = colors.getBackgroundColor();

  const [Upcoming, setUpcoming] = React.useState();
  const [Previous, setPrevious] = React.useState();
  const list = ["Upcoming", "Previous"];

  //console.log(data.service.serviceCenterName)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#767676",
            height: 2,
          },
          tabBarStyle:{
            //marginHorizontal:20
          }
        }}>
        {list.map((doc, i) => (
          <Tab.Screen
            key={i}
            initialParams={{
              backgroundColor: backgroundColor,
            }}
            name={doc}
            component={Screen}
          />
        ))}
      </Tab.Navigator>
      <FAB
        color="#FFFFFF"
        icon="plus"
        style={{
          position: "absolute",
          borderRadius: 30,
          backgroundColor: "#4ADE80",
          bottom: 20,
          right: 20,
          width: 50,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          navigation.navigate("CreateVendorAppointment", { data: data });
        }}
      />
    </SafeAreaView>
  );
}
const Screen = ({ navigation, route }) => {
  const name = route.name;
  const [Loader, setLoader] = useState(false);
  const [Data, setData] = useState();
  const backgroundColor = route.params.backgroundColor;
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  // console.log(name)
  const isFocused = useIsFocused();
  useEffect(() => {
    
    if (isFocused && name == "All") {
      
      (async () => {
        
        let arr = [];
        const res = await getVendorAppointment(
          user.token,
          "upcoming",
          vendor.service.id
        );
        res.data.appointments.forEach((e) => {
          arr.push(e);
        });
        const ress = await getVendorAppointment(
          user.token,
          "previous",
          vendor.service.id
        );
        ress.data.appointments.forEach((e) => {
          arr.push(e);
        });
        setData(arr);
      })();
    } else if (isFocused && name!="Request") {
      (async () => {
        const res = await getVendorAppointment(
          user.token,
          name.toLowerCase(),
          vendor.service.id
        );
        setData(res.data.appointments);
      })();
    }
  }, [isFocused]);
  if(isFocused&&name=="Request"){
    return <RequestAppointmentList navigation={navigation}/>
  }
  if (!Data) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <ActivityIndicator size={"small"} color={backgroundColor} />
      </View>
    );
  }
  if(Data&&Data.length==0){
    return <NoAppointment />
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        
    {Data.map((doc, i) => (
      <Cart
        key={i}
        onPress={() => {
          navigation.navigate("VendorAppointmentListDetails", {
            data: doc,
          });
        }}
        status={
          status.filter((s) => s.title.toUpperCase().match(doc.status))[0]
        }
        title={doc.title}
        date={doc.date}
        startTime={doc?.startTime}
        endTime={doc?.endTime}
        name={`${doc.user.name}`}
        image={doc.user.profilePhoto}
        username={doc.user.username}
        type={name?.toUpperCase()}
        data={doc}
        navigation={navigation}
      />
    ))}
    <View style={{ height: 80 }} />
  </ScrollView>
  );
};
export const Cart = ({
  date,
  status,
  title,
  onPress,
  image,
  name,
  username,
  startTime,
  endTime,
  type,
  data,
  navigation
}) => {
  //console.log(status)
  
  const diff= dateDifference(new Date(),date);
  //console.log(`${date}==${diff}`)
  return (
    <Pressable style={{
      flexDirection:"row",
      justifyContent:"space-between",
      paddingHorizontal:20,
      marginVertical:8,
      paddingVertical:4,
      alignItems:"center",
      
    }} onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems:"center"
        }}>
        <Avatar onPress={()=>{
          if(data?.user){
            navigation.navigate("UserProfile", { user: data });
          }
          else if(data?.service){
            navigation.navigate("OtherProfile", { data: data,serviceId:data?.service?.id });
          }
          
          
        }}
          style={{
            width: 48,
            height: 48,
            borderColor:"#e5e5e5"
          }}
          source={{ uri: image }}
        />
        <View
          style={{
            marginLeft: 12,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
            }}
            numberOfLines={1}>
            {name ? name : "Easin Arafat"}
          </Text>
          <Text style={{
            marginTop:4,
            fontSize:12,
            fontWeight:"400",
            color:"#767676"
          }}>
            {}
          {diff<2?moment(new Date(`${date}`)).calendar().split(" at")[0]:serverTimeToLocalDate(date)}
          {"  "}
           {changeTime(startTime)}
          {" - "}
          {changeTime(endTime)}
          </Text>
        </View>
      </View>
      
    </Pressable>
  );
 
};

const Chip = ({ title, active, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          padding: 8,
          backgroundColor: active ? "#6366F1" : "transparent",
          borderRadius: 20,
          paddingHorizontal: 15,
          borderWidth: active ? 0 : 1,
          borderColor: "#E2E2E2",
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}>
      <Text
        style={{
          color: active ? "white" : "black",
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
import appointment from "../../../assets/appointment.jpeg"
const NoAppointment = () => {
  return (
    <Animated.View entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Image source={appointment} style={{
        height:200,
        width:200,
        borderWidth:1,
        borderRadius:100,
        borderColor:"#EFEFEF"
      }} />
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Poppins-Medium",
          marginTop: 24,
        }}>
        No Appointment Found
      </Text>
    </Animated.View>
  );
};
