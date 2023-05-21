import React, { useEffect } from "react";
import { View, Image, Text, ScrollView, Alert, Pressable, BackHandler } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../../../components/IconButton";
import { SvgXml } from "react-native-svg";
import {
  changeAppointment,
  deleteAppointment,
} from "../../../Class/appointment";
import { useSelector } from "react-redux";
import { Color } from "../../../assets/colors";
import { ActivityIndicator } from "react-native-paper";
import { changeTime } from "../../../action";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";

export default function AppointmentDetails({ navigation, route }) {
  const [image, setImage] = React.useState();
  const data = route.params && route.params.data ? route.params.data : null;
  const appointment =
    route.params && route.params.appointment ? route.params.appointment : null;
  const user = useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const backgroundColor = colors.getBackgroundColor();
  const inset = useSafeAreaInsets();
  const backer=route?.params?.back;
  const isFocused=useIsFocused()

  const deleteAppo = async () => {
    try {
      setLoader(true);
      await deleteAppointment(user.token, appointment.id);
      setLoader(false);
      navigation.goBack();
    } catch (err) {
      console.error(err.message);
    }
  };
  
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} color={backgroundColor} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, paddingTop: inset?.top }}>
      <ScrollView>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            position: "absolute",
            top: 12,
            zIndex: 100,
            left: 20,
          }}>
          <SvgXml xml={back} />
        </Pressable>
        <Pressable
          onPress={() => {
            deleteAppo()
            console.log("dgf")
            //navigation.goBack()
          }}
          style={{
            position: "absolute",
            top: 12,
            zIndex: 100,
            right: 20,
          }}>
          <SvgXml xml={deleteIcon} />
        </Pressable>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 12,
            alignItems: "center",
          }}>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: "#707070",
              width: 100,
              height: 100,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}>
            {data && data.service.profilePhoto ? (
              <Image
                style={{
                  height: 100,
                  width: 100,
                }}
                source={{ uri: data.service.profilePhoto }}
              />
            ) : (
              <FontAwesome name="user" size={80} color="black" />
            )}
          </View>
          <View
            style={{
              marginTop: 20,
              alignItems: "center",
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "400",
              }}>
              {data && data?.service?.serviceCenterName
                ? data.service.serviceCenterName
                : "Invalid"}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#767676",
                marginTop: 10,
              }}>
              {` (${
                data && data?.service?.providerInfo?.gender
                  ? data.service.providerInfo.gender.toUpperCase()
                  : "Invalid"
              })`}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "#767676",
              textAlign: "center",
              marginTop: 12,
            }}>
            {appointment ? appointment.date : "Invalid"}
            {"    "}
            {appointment ? changeTime(appointment.startTime) : "Invalid"}
            {" - "}
            {appointment ? changeTime(appointment.endTime) : "Invalid"}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginTop: 24,
            }}>
            {appointment ? appointment.title : "Invalid"}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 24,
              textAlign: "justify",
              
            }}>
            {appointment && appointment.description
              ? appointment.description
              : "N/A"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const back = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const deleteIcon = `<svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 6.8H24M4.44444 6.8V23.6C4.44444 24.9255 5.53886 26 6.88889 26H19.1111C20.4612 26 21.5556 24.9255 21.5556 23.6V6.8M8.11111 6.8V4.4C8.11111 3.07452 9.20553 2 10.5556 2H15.4444C16.7945 2 17.8889 3.07452 17.8889 4.4V6.8" stroke="#A3A3A3" stroke-width="2.56667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.4445 12.8V20" stroke="#A3A3A3" stroke-width="2.56667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5555 12.8V20" stroke="#A3A3A3" stroke-width="2.56667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
