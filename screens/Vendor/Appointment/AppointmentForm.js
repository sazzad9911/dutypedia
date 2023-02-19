import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
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
  dateDifference,
} from "../../../action";
import {
  createAppointment,
  createOfflineAppointment,
  createOnlineAppointment,
} from "../../../Class/appointment";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { Color } from "../../../assets/colors";
import { socket } from "../../../Class/socket";

export default function AppointmentForm({ navigation, route }) {
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
  const data = route.params && route.params.data ? route.params.data : null;
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const [Loader, setLoader] = React.useState(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const backgroundColor = colors.getBackgroundColor();

  const validate = () => {
    setDateError("");
    setFromTimeError("");
    setTitleError("");
    if (!date) {
      setDateError("Date is required");
      return;
    }
    if (!FromTime || !ToTime) {
      setFromTimeError("Time is required");
      return;
    }
    if (!Title) {
      setTitleError("Title is required");
      return;
    }
    if (!user || !data || !vendor) {
      Alert.alert("Opps!", "Invalid Authentication");
      return;
    }
    

    if (data.user) {
      setLoader(true);
      createOnlineAppointment(
        user.token,
        vendor.service.id,
        date,
        FromTime,
        ToTime,
        Title,
        Description,
        data.userId
      )
        .then((res) => {
          console.warn("Appointment created");
          setLoader(false);
          socket.emit("notificationSend",{
            receiverId:res.data?.receiverId
          })
          navigation.navigate("VendorAppointmentList")
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response.data.msg);
        });
      return;
    }
    setLoader(true)
    createOfflineAppointment(user.token,vendor.service.id,
      date,FromTime,ToTime,Title,Description,data.id).then(res=>{
        console.warn("Appointment created")
        setLoader(false)
        navigation.navigate("VendorAppointmentList")
      }).catch(err=>{
        setLoader(false)
        console.warn(err.response.data.msg)
      })
  };
  if (Loader) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"small"} color={backgroundColor} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              borderWidth: 0.5,
              borderColor: "#707070",
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {data && data.user && data.user.profilePhoto ? (
              <Image
                style={{
                  width: 60,
                  height: 60,
                }}
                source={{ uri: data.user.profilePhoto }}
              />
            ) : data && data.profilePhoto ? (
              <Image
                style={{
                  width: 60,
                  height: 60,
                }}
                source={{ uri: data.profilePhoto }}
              />
            ) : (
              <FontAwesome name="user" size={45} color="black" />
            )}
          </View>
          <View
            style={{
              marginLeft: 20,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Medium",
                lineHeight: 18,
              }}
            >
              {data && data.user
                ? `${data.user.firstName} ${data.user.lastName}`
                : data.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              {data && data.user
                ? `@${data.user.firstName.toLowerCase()}`
                : `${data.name.toLowerCase()}`}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Medium",
            }}
          >
            Select date
          </Text>
          <IconButton
            onPress={() => {
              setDateVisible(!DateVisible);
            }}
            style={{
              width: 150,
              marginVertical: 10,
            }}
            title={date ? date : "YYYY-MM-DD"}
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
              setDate(convertDate(e));
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
              }}
            >
              {DateError}
            </Text>
          )}
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Medium",
              marginVertical: 10,
            }}
          >
            Select time
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <IconButton
              onPress={() => {
                setFromTimeVisible(!FromTimeVisible);
              }}
              style={{
                width: 150,
                justifyContent: "space-between",
              }}
              title={FromTime ? changeTime(FromTime) : "--:-- --"}
              Icon={() => <SvgXml xml={calender} height="20" width="20" />}
            />
            <DateTimePickerModal
              date={new Date()}
              isVisible={FromTimeVisible}
              mode="time"
              onConfirm={(e) => {
                setFromTimeError("");
                let newTime = allTimeConverter(e);
                if (
                  newTime.split(":")[0] <
                  allTimeConverter(newDate).split(":")[0]
                ) {
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
                fontSize: 14,
                fontFamily: "Poppins-Medium",
                marginHorizontal: 20,
              }}
            >
              To
            </Text>
            <IconButton
              onPress={() => {
                setToTimeVisible(!ToTimeVisible);
              }}
              style={{
                width: 150,
                justifyContent: "space-between",
              }}
              title={ToTime ? changeTime(ToTime) : "--:-- --"}
              Icon={() => <SvgXml xml={calender} height="20" width="20" />}
            />
            <DateTimePickerModal
              date={new Date()}
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
                if (FromTime.split(":")[0] > time.split(":")[0]) {
                  setFromTimeError(
                    "Please select upcoming time from start time."
                  );
                  return;
                }
                if (
                  FromTime.split(":")[0] == time.split(":")[0] &&
                  parseInt(FromTime.split(":")[1]) >
                    parseInt(time.split(":")[1])
                ) {
                  setFromTimeError(
                    "Please select upcoming time from start time."
                  );
                  return;
                }
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
              }}
            >
              {FromTimeError}
            </Text>
          )}
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Medium",
              marginVertical: 10,
              marginTop: 20,
            }}
          >
            Title
          </Text>
          <Input
            value={Title}
            onChange={(e) => {
              setTitle(e);
            }}
            style={{
              marginHorizontal: 0,
              borderWidth: 1,
            }}
            placeholder={""}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Medium",
              marginVertical: 10,
              marginTop: 20,
            }}
          >
            Describe
          </Text>
          <TextArea
            value={Description}
            onChange={(e) => {
              setDescription(e);
            }}
            placeholder={""}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginVertical: 30,
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            onPress={validate}
            style={{
              backgroundColor: "#4ADE80",
              color: "white",
            }}
            title={"Send Appointment Request"}
          />
          <View style={{ width: 20 }} />
          <IconButton
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              width: 120,
              borderColor: "#E22424",
              color: "#E22424",
              borderWidth: 1,
            }}
            title={"Cancel"}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const calender = `<svg xmlns="http://www.w3.org/2000/svg" width="18.129" height="18.036" viewBox="0 0 18.129 18.036">
<g id="_000000ff" data-name="#000000ff" transform="translate(-6.401 -6.715)">
  <path id="Path_19748" data-name="Path 19748" d="M11.523,7.079a.642.642,0,0,1,1.182.055,8.463,8.463,0,0,1,.033,1.215q2.726,0,5.454,0a8.556,8.556,0,0,1,.031-1.205A.639.639,0,0,1,19.411,7.1a7.548,7.548,0,0,1,.039,1.251c.755.017,1.511-.035,2.264.028A3.182,3.182,0,0,1,24.459,11a23.1,23.1,0,0,1,.027,3.149c0,2.515.011,5.029-.006,7.545a3.161,3.161,0,0,1-3.194,3.053q-5.823,0-11.648,0a3.183,3.183,0,0,1-3.2-3.345c.006-2.365,0-4.73,0-7.1,0-1.057-.1-2.118,0-3.174a3.162,3.162,0,0,1,2-2.559,9.512,9.512,0,0,1,3.034-.225,6.984,6.984,0,0,1,.044-1.27M8.256,10.244c-.644.606-.522,1.541-.518,2.338H23.191c.006-.8.121-1.734-.521-2.34-.834-.875-2.151-.469-3.218-.563a4.715,4.715,0,0,1-.074,1.3.633.633,0,0,1-1.139-.046,6.4,6.4,0,0,1-.047-1.253q-2.726,0-5.454,0a6.3,6.3,0,0,1-.049,1.254.637.637,0,0,1-1.141.049,4.949,4.949,0,0,1-.071-1.3c-1.067.1-2.387-.313-3.221.565m1.9,5.534a.837.837,0,1,0,1.073,1.04.843.843,0,0,0-1.073-1.04m3.308.019a.838.838,0,1,0,1.157.873.843.843,0,0,0-1.157-.873m3.32.014a.837.837,0,1,0,1.193.7.846.846,0,0,0-1.193-.7m3.44-.031A.837.837,0,1,0,21.3,16.823a.842.842,0,0,0-1.075-1.043M10.189,19.123a.837.837,0,1,0,1.05,1.017.843.843,0,0,0-1.05-1.017m10.069,0a.836.836,0,1,0,1.053,1.012.841.841,0,0,0-1.053-1.012m-6.933.1a.836.836,0,1,0,1.29.59.843.843,0,0,0-1.29-.59m3.424-.041a.836.836,0,1,0,1.224.64A.843.843,0,0,0,16.749,19.188Z" transform="translate(0)" fill="#666"/>
</g>
</svg>
`;
const clock = `<svg id="_000000ff" data-name="#000000ff" xmlns="http://www.w3.org/2000/svg" width="18.129" height="18.129" viewBox="0 0 18.129 18.129">
<path id="Path_19965" data-name="Path 19965" d="M8.8,0h.5a9.077,9.077,0,0,1,8.833,8.8v.529a9.065,9.065,0,0,1-3.422,6.828,9,9,0,0,1-3.3,1.667,9.33,9.33,0,0,1-2.107.306H8.834A9.085,9.085,0,0,1,0,9.331V8.8A9.077,9.077,0,0,1,8.8,0M8.745,3.322a.652.652,0,0,0-.328.574q0,2.584,0,5.168a.658.658,0,0,0,.264.523q1.605,1.282,3.209,2.566a.646.646,0,0,0,.991-.785,1.1,1.1,0,0,0-.347-.358c-.94-.75-1.877-1.5-2.82-2.252-.007-1.621,0-3.241,0-4.862a.648.648,0,0,0-.967-.574Z" fill="#666"/>
</svg>
`;
