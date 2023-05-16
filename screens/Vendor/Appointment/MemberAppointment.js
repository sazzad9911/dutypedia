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
import MemberRequestAppointment from "./MemberRequestAppointment";
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

export default function MemberAppointment({ navigation, route }) {
  const [Active, setActive] = React.useState("Upcoming");

  const data = route.params && route.params.data ? route.params.data : null;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const backgroundColor = colors.getBackgroundColor();

  const [Upcoming, setUpcoming] = React.useState();
  const [Previous, setPrevious] = React.useState();
  const list = ["Upcoming", "Previous",];
  const user=route.params.user;
  const offline=route.params.offline;
  //console.log(offline)

  //console.log(data.service.serviceCenterName)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#767676",
            height: 2,
          },
          
        }}>
        {list.map((doc, i) => (
          <Tab.Screen
            key={i}
            initialParams={{
              backgroundColor: backgroundColor,
              offline:offline,
              user:user
            }}
            name={doc}
            component={Screen}
          />
        ))}
      </Tab.Navigator>
      
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
  const User=route.params.user;
  const offline=route.params.offline;
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
            if(e.user.id==User.id){
                arr.push(e);
            }
        });
        const ress = await getVendorAppointment(
          user.token,
          "previous",
          vendor.service.id
        );
        ress.data.appointments.forEach((e) => {
            if(e.user.id==User.id){
                arr.push(e);
            }
          
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
        
        setData(res.data.appointments.filter(e=>e.user.id==User.id));
      })();
    }
  }, [isFocused]);
  if(isFocused&&name=="Request"){
    return <MemberRequestAppointment navigation={navigation} newUser={User}  offline={offline}/>
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
         <View style={{height:8}}/>
    {Data.map((doc, i) => (
      <Cart
        key={i}
        onPress={() => {
          //console.log(doc)
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
        type={name?.toUpperCase()}
        name={`${doc.user.name}`}
        image={doc.user.profilePhoto}
        username={doc.user.username}

      />
    ))}
     <View style={{height:8}}/>
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
  type
}) => {
  //console.log(status)
  const diff= dateDifference(new Date(),date);
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
        <Avatar
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
          {diff==0?"Today":diff==1&&type=="UPCOMING"?"Tomorrow":diff==-1&&type=="PREVIOUS"?"Yesterday":serverTimeToLocalDate(date)}

          {"  "}
          {changeTime(startTime)}{" - "}
          {changeTime(endTime)}
          </Text>
        </View>
      </View>
      
    </Pressable>
  );
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        width: width,
        marginHorizontal: 0,
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 5,
      }}>
      <Avatar
        style={{
          width: 40,
          height: 40,
        }}
        source={{ uri: image }}
      />
      <View
        style={{
          width: 10,
        }}
      />
      <View
        style={{
          flex: 0.5,
        }}>
        <Text
          style={{
            fontSize: 12,
          }}
          numberOfLines={1}>
          {name ? name : "Easin Arafat"}
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
          numberOfLines={1}>
          @{username ? username : "easinarafat"}
        </Text>
      </View>
      <View
        style={{
          width: 1,
          height: 30,
          backgroundColor: "#E2E2E2",
          marginHorizontal: 5,
        }}
      />
      <View
        style={{
          flex: 1.5,
          marginLeft: 5,
        }}>
        <View
          style={{
            flexDirection: "row",
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
            }}>
            {date}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: status ? status.color : "red",
              fontSize: 12,
              marginLeft: 10,
            }}>{`(${status ? status.title : "Invalid"})`}</Text>
        </View>
        <Text
          style={{
            fontSize: 14,
          }}
          numberOfLines={1}>
          {title ? title : "Invalid"}
        </Text>
      </View>
      <View
        style={{
          width: 20,
        }}
      />
      <AntDesign name="right" size={24} color="#666666" />
    </TouchableOpacity>
  );
};
const calender = `<svg xmlns="http://www.w3.org/2000/svg" width="21.988" height="21.89" viewBox="0 0 21.988 21.89">
<g id="Group_10006" data-name="Group 10006" transform="translate(-29.237 -142.571)">
  <rect id="Rectangle_7218" data-name="Rectangle 7218" width="21" height="18" rx="4" transform="translate(30 145.672)" fill="#666"/>
  <path id="Path_19748" data-name="Path 19748" d="M12.56,7.153a.772.772,0,0,1,1.421.066,10.177,10.177,0,0,1,.04,1.461q3.278,0,6.559,0a10.289,10.289,0,0,1,.038-1.449.768.768,0,0,1,1.429-.055,9.077,9.077,0,0,1,.047,1.5c.908.021,1.817-.042,2.723.034a3.827,3.827,0,0,1,3.3,3.156,27.779,27.779,0,0,1,.032,3.786c-.006,3.024.013,6.048-.008,9.073A3.8,3.8,0,0,1,24.3,28.4q-7,.006-14.006,0a3.828,3.828,0,0,1-3.845-4.023c.008-2.844,0-5.688.006-8.534,0-1.272-.121-2.547,0-3.817a3.8,3.8,0,0,1,2.4-3.077,11.439,11.439,0,0,1,3.648-.271,8.4,8.4,0,0,1,.053-1.527M8.632,10.958c-.774.729-.628,1.853-.623,2.812H26.591c.008-.961.146-2.085-.626-2.814-1-1.052-2.587-.564-3.87-.677a5.67,5.67,0,0,1-.089,1.563.761.761,0,0,1-1.37-.055,7.7,7.7,0,0,1-.057-1.506q-3.278,0-6.559,0a7.573,7.573,0,0,1-.059,1.508.766.766,0,0,1-1.372.059,5.951,5.951,0,0,1-.085-1.569c-1.283.115-2.871-.377-3.873.679m2.284,6.655a1.007,1.007,0,1,0,1.291,1.251,1.013,1.013,0,0,0-1.291-1.251m3.978.023a1.008,1.008,0,1,0,1.391,1.05,1.014,1.014,0,0,0-1.391-1.05m3.993.017a1.007,1.007,0,1,0,1.434.848,1.018,1.018,0,0,0-1.434-.848m4.136-.038a1.006,1.006,0,1,0,1.292,1.255,1.012,1.012,0,0,0-1.292-1.255M10.956,21.636a1.006,1.006,0,1,0,1.262,1.222,1.013,1.013,0,0,0-1.262-1.222m12.109,0a1.006,1.006,0,1,0,1.266,1.217,1.011,1.011,0,0,0-1.266-1.217m-8.337.125a1.006,1.006,0,1,0,1.552.71,1.013,1.013,0,0,0-1.552-.71m4.118-.049a1.006,1.006,0,1,0,1.472.77A1.013,1.013,0,0,0,18.845,21.714Z" transform="translate(22.93 135.957)" fill="#fff" stroke="#707070" stroke-width="0.2"/>
</g>
</svg>
`;
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
    <View 
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Image source={appointment} style={{
        height:200,
        width:200
      }} />
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Poppins-Medium",
          marginTop: 24,
        }}>
        No Appointment Found
      </Text>
    </View>
  );
};