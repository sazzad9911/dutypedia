import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
  Dimensions,
} from "react-native";
import { SvgXml } from "react-native-svg";
import IconButton from "../../../components/IconButton";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  allTimeConverter,
  changeTime,
  convertDate,
  dateConverter,
  dateDifference,
} from "../../../action";
import { createAppointment } from "../../../Class/appointment";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { Color } from "../../../assets/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

export default function CreateAppointment({ navigation, route }) {
  const [image, setImage] = React.useState();
  const [date, setDate] = React.useState();
  const [DateError, setDateError] = React.useState();
  const [DateVisible, setDateVisible] = React.useState();
  const [FromTime, setFromTime] = React.useState();
  const [FromTimeError, setFromTimeError] = React.useState();
  const [FromTimeVisible, setFromTimeVisible] = React.useState();
  const [ToTime, setToTime] = React.useState();
  const [ToTimeError, setToTimeError] = React.useState();
  const [ToTimeVisible, setToTimeVisible] = React.useState();
  const newDate = new Date();
  const [selectDate, setSelectDate] = React.useState();
  const [Title, setTitle] = React.useState();
  const [Description, setDescription] = React.useState();
  const [TitleError, setTitleError] = React.useState();
  const [DescriptionError, setDescriptionError] = useState();
  const data = route.params && route.params.data ? route.params.data : null;
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const [Loader, setLoader] = React.useState(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const backgroundColor = colors.getBackgroundColor();
  const inset = useSafeAreaInsets();
  const [updateDate,setUpdateDate]=useState()

  const validate = () => {
    setDateError("");
    setFromTimeError("");
    setTitleError("");
    if (!date) {
      setDateError("Date is required");
      return;
    }
    if (!FromTime || !ToTime || !updateDate) {
      setFromTimeError("Time is required");
      return;
    }
    if (!Title) {
      setTitleError("Title is required");
      return;
    }
    if (!user || !data) {
      Alert.alert("Opps!", "Invalid Authentication");
      return;
    }
    if (Title?.split("")?.length > 50) {
      setTitleError("Max character 50");
      return;
    }
    if (Description?.split("")?.length > 1000) {
      setDescriptionError("Max character 50");
      return;
    }
    setLoader(true);
    createAppointment(
      user.token,
      data.service.id,
      date,
      FromTime,
      ToTime,
      Title,
      Description,
      updateDate
    )
      .then((res) => {
        console.warn("Appointment created");
        setLoader(false);
        navigation.goBack()
        setTimeout(()=>{
          navigation.navigate("AppointmentDetails",{
            data:data,
            appointment:res.data.appointment,
            back:true,
          });
        },10)
      })
      .catch((err) => {
        setLoader(false);
        console.warn(err.response.data.msg);
      });
  };
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
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: inset?.top }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
                  width: 100,
                  height: 100,
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
              numberOfLines={1}
              style={{
                fontSize: 24,
                fontWeight: "400",
              }}>
              {data && data.service.serviceCenterName
                ? data.service.serviceCenterName
                : "Invalid"}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "#767676",
                marginTop: 12,
              }}>
              {data && data.service.providerInfo.name
                ? data.service.providerInfo.name
                : "Invalid"}
            </Text>
            <Text
              style={{
                ontSize: 16,
                fontWeight: "400",
                color: "#767676",
                marginTop: 12,
              }}>
              {data && data.service.providerInfo.position
                ? data.service.providerInfo.position
                : "Invalid"}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 36,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
            }}>
            Select date
          </Text>
          <IconButton
            onPress={() => {
              setDateVisible(!DateVisible);
            }}
            style={{
              marginTop: 12,
              color: "#767676",
            }}
            title={date ? date : "yyyy-mm-dd"}
            Icon={() => <SvgXml xml={calender} height="20" width="20" />}
          />
          <DateTimePickerModal
            date={new Date()}
            isVisible={DateVisible}
            mode="date"
            onConfirm={(e) => {
              setDateError("");
              if (dateDifference(newDate, e) < 0) {
                setDateError("Please select upcoming date");
                return;
              }
              setDate(dateConverter(e));
              //console.log(convertDate(e))
              setDateVisible(!DateVisible);
            }}
            onCancel={() => {
              setDateVisible(!DateVisible);
            }}
          />
          {DateError && (
            <Text
              style={{
                color: "red",
              }}>
              {DateError}
            </Text>
          )}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              marginTop: 24,
            }}>
            Select time
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: 12,
            }}>
            <IconButton
              onPress={() => {
                if(!date){
                  Alert.alert("Select date first")
                  return
                }
                setFromTimeVisible(!FromTimeVisible);
              }}
              style={{
                width: width / 2 - 42,
                justifyContent: "flex-start",
              }}
              title={FromTime ? changeTime(FromTime) : "--:-- --"}
              LeftIcon={() => <SvgXml xml={clock} height="20" width="20" />}
            />
            <DateTimePickerModal
              date={new Date(date)}
              isVisible={FromTimeVisible}
              mode="time"
              onConfirm={(e) => {
                setFromTimeError("");
                let newTime = allTimeConverter(e);
                if(e<new Date()){
                  setFromTimeError("Please select upcoming time");
                  return;
                }
                
                
                setFromTime(allTimeConverter(e));
                setFromTimeVisible(!FromTimeVisible);
              }}
              onCancel={() => {
                setFromTimeVisible(!FromTimeVisible);
              }}
            />

            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                marginHorizontal: 12,
                width: 20,
              }}>
              To
            </Text>
            <IconButton
              onPress={() => {
                if(!date){
                  Alert.alert("Select date first")
                  return
                }
                setToTimeVisible(!ToTimeVisible);
              }}
              style={{
                width: width / 2 - 42,
                justifyContent: "flex-start",
              }}
              title={ToTime ? changeTime(ToTime) : "--:-- --"}
              LeftIcon={() => <SvgXml xml={clock} height="20" width="20" />}
            />
            <DateTimePickerModal
              date={new Date(date)}
              isVisible={ToTimeVisible}
              mode="time"
              onConfirm={(e) => {
                let time = allTimeConverter(e);
                setFromTimeError("");
                //console.log(newTime.split(":")[1])
                if (!FromTime) {
                  setFromTimeError(
                    "Please select upcoming time from start time."
                  );
                  return;
                }
                if (parseInt(FromTime.split(":")[0]) > parseInt(time.split(":")[0])) {
                  setFromTimeError(
                    "Please select upcoming time from start time."
                  );
                  return;
                }
                if (
                  parseInt(FromTime.split(":")[0]) == parseInt(time.split(":")[0]) &&
                  parseInt(FromTime.split(":")[1]) >
                    parseInt(time.split(":")[1])
                ) {
                  setFromTimeError(
                    "Please select upcoming time from start time."
                  );
                  return;
                }
                if (
                  parseInt(FromTime.split(":")[0]) == parseInt(time.split(":")[0]) &&
                  parseInt(FromTime.split(":")[1]) ==
                    parseInt(time.split(":")[1])
                ) {
                  setFromTimeError(
                    "Please select upcoming time from start time."
                  );
                  return;
                }
                
                setUpdateDate(e)
                setToTime(allTimeConverter(e));
                setToTimeVisible(!ToTimeVisible);
              }}
              onCancel={() => {
                setToTimeVisible(!ToTimeVisible);
              }}
            />
          </View>
          {FromTimeError && (
            <Text
              style={{
                color: "red",
                marginTop: 5,
              }}>
              {FromTimeError}
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 24,
              alignItems: "center",
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
              }}>
              Subject
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "#767676",
              }}>
              Max 50 character
            </Text>
          </View>
          <Input
            value={Title}
            onChange={(e) => {
              setTitle(e);
            }}
            style={{
              marginHorizontal: 0,
              borderWidth: 1,
              marginTop: 12,
            }}
            placeholder={"Subject"}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 24,
              alignItems: "center",
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
              }}>
              Describe
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "#767676",
              }}>
              Max 1000 character
            </Text>
          </View>
          <TextArea
            value={Description}
            onChange={(e) => {
              setDescription(e);
            }}
            style={{
              marginTop: 12,
            }}
            placeholder={""}
          />
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 22,
            marginBottom: 32,
          }}>
          <IconButton
            onPress={validate}
            style={{
              backgroundColor: "#4ADE80",
              color: "white",
            }}
            title={"Create Now"}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const calender = `<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.41667 1V2.75M12.5833 1V2.75M1.5 13.25V4.5C1.5 4.03587 1.68437 3.59075 2.01256 3.26256C2.34075 2.93437 2.78587 2.75 3.25 2.75H13.75C14.2141 2.75 14.6592 2.93437 14.9874 3.26256C15.3156 3.59075 15.5 4.03587 15.5 4.5V13.25M1.5 13.25C1.5 13.7141 1.68437 14.1592 2.01256 14.4874C2.34075 14.8156 2.78587 15 3.25 15H13.75C14.2141 15 14.6592 14.8156 14.9874 14.4874C15.3156 14.1592 15.5 13.7141 15.5 13.25M1.5 13.25V7.41667C1.5 6.95254 1.68437 6.50742 2.01256 6.17923C2.34075 5.85104 2.78587 5.66667 3.25 5.66667H13.75C14.2141 5.66667 14.6592 5.85104 14.9874 6.17923C15.3156 6.50742 15.5 6.95254 15.5 7.41667V13.25M8.5 8.58333H8.50622V8.58956H8.5V8.58333ZM8.5 10.3333H8.50622V10.3396H8.5V10.3333ZM8.5 12.0833H8.50622V12.0896H8.5V12.0833ZM6.75 10.3333H6.75622V10.3396H6.75V10.3333ZM6.75 12.0833H6.75622V12.0896H6.75V12.0833ZM5 10.3333H5.00622V10.3396H5V10.3333ZM5 12.0833H5.00622V12.0896H5V12.0833ZM10.25 8.58333H10.2562V8.58956H10.25V8.58333ZM10.25 10.3333H10.2562V10.3396H10.25V10.3333ZM10.25 12.0833H10.2562V12.0896H10.25V12.0833ZM12 8.58333H12.0062V8.58956H12V8.58333ZM12 10.3333H12.0062V10.3396H12V10.3333Z" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const clock = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_6706_46385)">
<path d="M14.6667 8.00004C14.6667 11.68 11.68 14.6667 8.00001 14.6667C4.32001 14.6667 1.33334 11.68 1.33334 8.00004C1.33334 4.32004 4.32001 1.33337 8.00001 1.33337C11.68 1.33337 14.6667 4.32004 14.6667 8.00004Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.4733 10.12L8.40666 8.88671C8.04666 8.67338 7.75333 8.16005 7.75333 7.74005V5.00671" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_6706_46385">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
`;
const back = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 19.5L7.5 12L15 4.5" stroke="#191C1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
