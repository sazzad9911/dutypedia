import React, { useEffect, useState } from "react";
import { View, Image, Text, ScrollView, Alert,Pressable, BackHandler } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../../../components/IconButton";
import { SvgXml } from "react-native-svg";
import { changeAppointment, deleteAppointment, getAppointmentById } from "../../../Class/appointment";
import { useSelector } from "react-redux";
import { Color } from "../../../assets/colors";
import { ActivityIndicator } from "react-native-paper";
import { changeTime } from "../../../action";
import { SafeAreaView } from "moti";

export default function UserAppointmentDetails({ navigation, route }) {
  const [image, setImage] = React.useState();
  const d = route.params && route.params.data ? route.params.data : null;
  const appointment =
    route.params && route.params.appointment ? route.params.appointment : null;
  const user = useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const backgroundColor = colors.getBackgroundColor();
  const [data,setData]=useState(d)
  //console.log(data)
  const deleteAppo = async () => {
    try {
      setLoader(true);
      await deleteAppointment(user.token, data.id);
      setLoader(false);
      navigation.goBack();
    } catch (err) {
      console.error(err.message);
    } 
  };
  useEffect(()=>{
    if(route?.params?.appointmentId&&!data){
      getAppointmentById(user.token,route?.params?.appointmentId).then(res=>{
        setData(res.data.appointment)
      })
    }
  },[route?.params?.appointmentId])
  
 
  if (Loader||!data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} color={backgroundColor} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
      <Pressable onPress={()=>{
          navigation.goBack()
        }}
          style={{
            position: "absolute",
            top: 12,
            zIndex:100,
            left:20
          }}>
          <SvgXml xml={back} />
        </Pressable>
        <Pressable onPress={()=>{
          //navigation.goBack()
          deleteAppo()
        }}
          style={{
            position: "absolute",
            top: 12,
            zIndex:100,
            right:20
          }}>
          <SvgXml xml={deleteIcon} />
      </Pressable>
        <View
          style={{
            paddingHorizontal: 20,
            alignItems:"center",
            marginTop:12
          }}>
          <Pressable onPress={()=>{
            navigation.navigate("OtherProfile", { data: data,serviceId:data?.service?.id });
          }}
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
            {data && data?.service?.profilePhoto ? (
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
          </Pressable>
          <View
            style={{
              marginTop:20,
              alignItems:"center"
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
              fontWeight:"400",
              color:"#767676",
              textAlign:"center",
              marginTop:12
            }}>
            {data ? data.date : "Invalid"}
            {"    "}
            {data ? changeTime(data.startTime) : "Invalid"}
            {" - "}
            {data ? changeTime(data.endTime) : "Invalid"}
          </Text>
          <Text numberOfLines={2}
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginTop: 24,
            }}>
            {data ? data.title : "Invalid"}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 24,
              textAlign: "justify",
              lineHeight:24
            }}>
            {data && data.description ? data.description : "N/A"}
          </Text>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
const back = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const deleteIcon=`<svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 6.8H24M4.44444 6.8V23.6C4.44444 24.9255 5.53886 26 6.88889 26H19.1111C20.4612 26 21.5556 24.9255 21.5556 23.6V6.8M8.11111 6.8V4.4C8.11111 3.07452 9.20553 2 10.5556 2H15.4444C16.7945 2 17.8889 3.07452 17.8889 4.4V6.8" stroke="#A3A3A3" stroke-width="2.56667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.4445 12.8V20" stroke="#A3A3A3" stroke-width="2.56667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5555 12.8V20" stroke="#A3A3A3" stroke-width="2.56667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`