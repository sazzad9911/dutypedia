import React from "react";
import { View, Image, Text, ScrollView, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../../../components/IconButton";
import { SvgXml } from "react-native-svg";
import { changeAppointment } from "../../../Class/appointment";
import { useSelector } from "react-redux";
import { Color } from "../../../assets/colors";
import { ActivityIndicator } from "react-native-paper";
import { changeTime } from "../../../action";

export default function VendorAppointmentListDetails({ navigation, route }) {
  const [image, setImage] = React.useState();
  const data = route.params && route.params.data ? route.params.data : null;
  const appointment =
    route.params && route.params.appointment ? route.params.appointment : null;
  const user = useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(false);
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const backgroundColor = colors.getBackgroundColor();
  const params=route.params
  //console.log(data)

  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"small"} color={backgroundColor} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
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
            {data &&data.user && data.user.profilePhoto ? (
              <Image
                style={{
                  height: 60,
                  width: 60,
                }}
                source={{ uri: data.user.profilePhoto }}
              />
            ):data&&data.profilePhoto?(
                <Image
                style={{
                  height: 60,
                  width: 60,
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
              justifyContent:"center"
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-SemiBold",
                lineHeight: 18,
              }}
            >
              {data?`${data.user.firstName} ${data.user.lastName}`:"Invalid"}
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}
            >
              @{data&&data.user?data.user.username:""}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Medium",
            }}
          >
            {data ? data.date : "Invalid"}
            {"    "}
            {data ? changeTime(data.startTime) : "Invalid"}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-SemiBold",
              marginTop: 20,
            }}
          >
            {data ? data.title : "Invalid"}
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 15,
              textAlign: "justify",
            }}
          >
            {data && data.description
              ? data.description
              : "N/A"}
          </Text>
        </View>
        {data && data.status == "CANCELLED" && (
          <Text
            style={{
              color: "#DA1E37",
              textAlign: "center",
              marginVertical: 40,
            }}
          >
            Cancelled
          </Text>
        )}
        {data && data.status == "COMPLETED" && (
          <Text
            style={{
              color: "#4ADE80",
              textAlign: "center",
              marginVertical: 40,
            }}
          >
            Completed
          </Text>
        )}
        {data && data.status == "REJECTED" && (
          <Text
            style={{
              color: "red",
              textAlign: "center",
              marginVertical: 40,
            }}
          >
            Rejected
          </Text>
        )}
      </ScrollView>

      {data &&
        data.status != "CANCELLED" &&
        data.status != "COMPLETED" &&
        data.status != "REJECTED" && (
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data && data.status == "APPROVED" && (
              <IconButton
                onPress={() => {
                  if (!data) {
                    Alert.alert("Opps", "Something went wrong");
                    return;
                  }
                  setLoader(true);
                  changeAppointment(user.token, data.id, "COMPLETED")
                    .then((res) => {
                      setLoader(false);
                      navigation.goBack();
                    })
                    .catch((err) => {
                      setLoader(false);

                      Alert.alert("Error", err.response.data.msg);
                    });
                }}
                style={{
                  color: "#4BAE4F",
                  height: 40,
                }}
                LeftIcon={() => (
                  <SvgXml xml={accept} width="20" height={"20"} />
                )}
                title="Complete Appointment"
              />
            )}
            {params.active && (
              <IconButton
                onPress={() => {
                  if (!data) {
                    Alert.alert("Opps", "Something went wrong");
                    return;
                  }
                  setLoader(true);
                  changeAppointment(user.token, data.id, "APPROVED")
                    .then((res) => {
                      setLoader(false);
                      navigation.goBack();
                    })
                    .catch((err) => {
                      setLoader(false);

                      Alert.alert("Error", err.response.data.msg);
                    });
                }}
                style={{
                  color: "#4BAE4F",
                  height: 40,
                }}
                LeftIcon={() => (
                  <SvgXml xml={accept} width="20" height={"20"} />
                )}
                title="Accept Appointment"
              />
            )}
            {data && data.status == "PENDING"&&!params.active && (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                  color: "#6366F1",
                }}
              >
                Request Pending
              </Text>
            )}
            <View style={{ width: 20 }} />
            <IconButton
              onPress={() => {
                if (!data) {
                  Alert.alert("Opps", "Something went wrong");
                  return;
                }
                setLoader(true);
                changeAppointment(user.token, data.id, "CANCELLED")
                  .then((res) => {
                    setLoader(false);
                    navigation.goBack();
                  })
                  .catch((err) => {
                    setLoader(false);

                    Alert.alert("Error", err.response.data.msg);
                  });
              }}
              style={{
                color: "#DA1E37",
                height: 40,
              }}
              LeftIcon={() => <SvgXml xml={cancel} width="20" height={"20"} />}
              title="Cancel Appointment"
            />
          </View>
        )}
    </View>
  );
}
const cancel = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14" viewBox="0 0 14 14">
<image id="NoPath_-_Copy_17_" data-name="NoPath - Copy (17)" width="14" height="14" xlink:href="data:image/png;base64,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"/>
</svg>
`;

const accept = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13" height="13" viewBox="0 0 13 13">
<image id="NoPath_-_Copy_16_" data-name="NoPath - Copy (16)" width="13" height="13" xlink:href="data:image/png;base64,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"/>
</svg>
`;
