import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import Svg, { SvgXml } from "react-native-svg";
const { width, height } = Dimensions.get("window");
import { ActivityIndicator, FAB } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getAppointment } from "../../../Class/appointment";
import { Color } from "../../../assets/colors";
import { changeTime, timeConverter } from "../../../action";
import Animated, { FadeIn, SlideInRight } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
const status = [
  {
    title: "Incomplete",
    color: "#E2B529",
  },
  {
    title: "Completed",
    color: "#4ADE80",
  },
  {
    title: "Cancelled",
    color: "#DA1E37",
  },
  {
    title: "Pending",
    color: "#6366F1",
  },
  {
    title: "Approved",
    color: "#6366F1",
  },
];

export default function AppointmentList({ navigation, route }) {
  const [Active, setActive] = React.useState("Upcoming");
  const user = useSelector((state) => state.user);
  const data = route.params && route.params.data ? route.params.data : null;
  const [Loader, setLoader] = React.useState(false);
  const [Data, setData] = React.useState([]);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const backgroundColor = colors.getBackgroundColor();
  const name = "Upcoming";

  const isFocused = useIsFocused();
  React.useLayoutEffect(() => {
    if (user && data && Active) {
      setLoader(true);
      getAppointment(user.token, Active, data.service.id)
        .then((res) => {
          setLoader(false);
          //console.log(res.data)
          setData(res.data.appointments);
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response);
        });
    }
  }, [isFocused + Active]);
  //console.log(data.service.serviceCenterName)
  if (Loader) {
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
  return (
    <Animated.View style={{ flex: 1, justifyContent: "center" }}>
      <StatusBar />

      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <Chip
            onPress={() => {
              setActive("Upcoming");
            }}
            title={"Upcoming"}
            active={Active == "Upcoming" ? true : false}
          />
          <View
            style={{
              width: 10,
            }}
          />
          <Chip
            onPress={() => {
              setActive("Previous");
            }}
            title={"Previous"}
            active={Active == "Previous" ? true : false}
          />
        </View>
        {Data.length == 0 ? <NoAppointment /> : null}
        {Data.map((doc, i) => (
          <Cart
            key={i}
            onPress={() => {
              navigation.navigate("AppointmentDetails", {
                data: data,
                appointment: doc,
              });
            }}
            status={
              status.filter((s) => s.title.toUpperCase().match(doc.status))[0]
            }
            title={doc.title}
            date={doc?.date}
            startTime={doc?.startTime}
            endTime={doc?.endTime}
            type={name?.toUpperCase()}
          />
        ))}
      </ScrollView>

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
          navigation.navigate("CreateAppointment", { data: data });
        }}
      />
    </Animated.View>
  );
}

const Chip = ({ title, active, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 8,
        backgroundColor: active ? "#4ADE80" : "transparent",
        borderRadius: 20,
        paddingHorizontal: 15,
        borderWidth: active ? 0 : 1,
        borderColor: "#E2E2E2",
      }}>
      <Text
        style={{
          color: active ? "white" : "black",
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
import appointment from "../../../assets/appointment.jpeg";
import { Cart } from "../../Vendor/Appointment/VendorAppointmentList";
const NoAppointment = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height:height-200,
        
      }}>
      <Image
        source={appointment}
        style={{
          height: 200,
          width: 200,
        }}
      />
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
