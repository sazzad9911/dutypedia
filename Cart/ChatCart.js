import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Color } from "./../assets/colors";
const { width, height } = Dimensions.get("window");
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../components/Avatar";
import { dateDifference, serverTimeToLocal, timeConverter } from "../action";
import {  socket } from "../Class/socket";
import logo from "./../assets/logo.png";
import { getMessageUnReadCount } from "../Class/message";

const ChatCart = ({ navigation, active, data, number, readOnly }) => {
  const [Active, setActive] = React.useState(active);
  //const navigation = props.navigation;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  //const data = props.data;
  const user = useSelector((state) => state.user);
  const [UserInfo, setUserInfo] = React.useState();
  const [LastMessage, setLastMessage] = React.useState();
  const vendor = useSelector((state) => state.vendor);
  const [count, setCount] = useState(0);
  //console.log(data.serviceId)
  const styles = StyleSheet.create({
    outBox: {
      marginLeft: 20,
      marginVertical: 0,
      width: width - 20,
      paddingVertical: 0,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 12,
    },
    box: {
      marginLeft: 20,
      justifyContent: "flex-end",
    },
    image: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginRight: 10,
      borderColor: "#e5e5e5",
    },
    head: {
      fontSize: 16,
      fontWeight: "700",
    },
    text: {
      fontSize: 12,
      fontWeight: "400",
      
      color: "#767676",
    },
    date: {
      fontSize: 10,
      textAlign: "right",
      color: textColor,
      fontFamily: "Poppins-Light",
    },
    active: {
      backgroundColor: "green",
      height: 10,
      width: 10,
      borderRadius: 5,
      position: "absolute",
      top: 55,
      left: 48,
      borderWidth: 1,
      borderColor: "white",
    },
  });
  React.useEffect(() => {
    if (data) {
      //console.log(data)
      getCount(data.id)
      data.users.map((doc) => {
        if (doc.user.id != user.user.id) {
          setUserInfo(doc.user);
        }
      });
      setLastMessage(data.messages[data.messages.length - 1]);
    }
  }, [data]);
  useEffect(() => {
    if (UserInfo) {
      //const socket = getSocket(UserInfo.id);
      socket.on("getUsers", (users) => {
        if (Array.isArray(users)) {
          let arr = users.filter((d) => d.userId == UserInfo.id);
          if (arr.length > 0) {
            setActive(true);
          }
        }
      });
    }
  }, [UserInfo]);

  const getCount = async (id) => {
    try {
      const res = await getMessageUnReadCount(user?.token, id);
      //console.log(res.data.count)
      setCount(res.data.count);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!UserInfo) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ChatScreen", {
          data: data,
          username: UserInfo.username,
          serviceId: data?.serviceId,
        })
      }
      style={[styles.outBox, {}]}>
      <View style={styles.image}>
        {readOnly ? (
          <Image source={logo} style={styles.image} />
        ) : (
          <Avatar
            style={styles.image}
            source={
              vendor
                ? {
                    uri: UserInfo.profilePhoto ? UserInfo.profilePhoto : null,
                  }
                : {
                    uri: data?.service?.profilePhoto
                      ? data.service.profilePhoto
                      : null,
                  }
            }
          />
        )}
        {Active && (
          <View
            style={{
              backgroundColor: "#4ADE80",
              width: 10,
              height: 10,
              borderRadius: 5,
              position: "absolute",
              bottom: 5,
              right: 1,
              borderWidth: 1.5,
              borderColor: "#ffffff",
              zIndex: 100,
            }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#E6E6E6",
          flex: 1,
          height: "100%",
          justifyContent: "space-between",
          paddingVertical: 12,
        }}>
        <View style={{ flex: 1 }}>
          {vendor && !data?.readOnly ? (
            <Text style={styles.head}>
              {UserInfo ? `${UserInfo.name}` : "------"}
            </Text>
          ) : data?.readOnly ? (
            <Text style={styles.head}>Duty</Text>
          ) : (
            <Text numberOfLines={1} style={[styles.head, { flex: 1 }]}>
              {data.service
                ? `${data.service.serviceCenterName}`
                : "------"}
            </Text>
          )}
          {LastMessage && (
            <Text
              numberOfLines={1}
              style={[styles.text, { marginTop: 4, maxWidth: "60%" }]}>
              {LastMessage ? LastMessage.text : null}
            </Text>
          )}
        </View>
        <View
          style={[
            styles.box,
            {
              alignItems: "flex-end",
              paddingRight: 20,
              flex: 1,
            },
          ]}>
          {count > 0 && (
            <View
              style={{
                backgroundColor: "#4ADE80",
                width: 16,
                height: 16,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: "#ffffff",
                  fontWeight: "700",
                }}>
                {count}
              </Text>
            </View>
          )}
          <Text style={styles.text}>
            {LastMessage
              ? `${
                  dateDifference(new Date(), LastMessage.updatedAt) == 0
                    ? timeConverter(LastMessage.updatedAt)
                    : dateDifference(new Date(), LastMessage.updatedAt) == 1
                    ? "Yesterday"
                    : serverTimeToLocal(LastMessage.updatedAt)
                }`
              : "Jul 21 2:30 Pm"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCart;
