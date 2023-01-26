import React, { useEffect } from "react";
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
import { serverTimeToLocal } from "../action";
import { getSocket } from "../Class/socket";

const ChatCart = (props) => {
  const [Active, setActive] = React.useState(props.active);
  const navigation = props.navigation;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const data = props.data;
  const user = useSelector((state) => state.user);
  const [UserInfo, setUserInfo] = React.useState();
  const [LastMessage, setLastMessage] = React.useState();

  const styles = StyleSheet.create({
    outBox: {
      marginHorizontal: 20,
      marginVertical: 0,
      width: width - 40,
      minHeight: 50,
      padding: 10,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    box: {
      flex: 4,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e5e5",
      paddingVertical: 10,
    },
    image: {
      width: 45,
      height: 45,
      borderRadius: 25,
      marginRight: 10,
    },
    head: {
      fontSize: 14,
      fontFamily: "Poppins-Medium",
      color: textColor,
    },
    text: {
      fontSize: 13,
      fontFamily: "Poppins-Light",
      color: textColor,
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
      data.users.map((doc) => {
        if (doc.user.id != user.user.id) {
          setUserInfo(doc.user);
        }
      });
      setLastMessage(data.messages[data.messages.length - 1]);
    }
  }, [data]);
  useEffect(()=>{
    if(UserInfo){
      const socket=getSocket(UserInfo.id)
    socket.on("getUsers",users=>{
      if(Array.isArray(users)){
        let arr=users.filter(d=>d.userId==UserInfo.id)
        if(arr.length>0){
          setActive(true)
        }
      }
    })
    }
  },[UserInfo])

  if (!UserInfo) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ChatScreen", {
          data: data,
          username: UserInfo.username,
        })
      }
      style={styles.outBox}>
      <View style={styles.image}>
        <Avatar
          style={styles.image}
          source={{
            uri: UserInfo.profilePhoto ? UserInfo.profilePhoto : null,
          }}
        />
        <View
          style={{
            backgroundColor: Active ? "#4ADE80" : "#F0EFEF",
            width: 10,
            height: 10,
            borderRadius: 5,
            position: "absolute",
            top: 5,
            right: 0,
            borderWidth: 1,
            borderColor: "#e5e5e5",
            zIndex: 100,
          }}
        />
      </View>
      <View style={styles.box}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Text style={styles.head}>
            {UserInfo
              ? `${UserInfo.firstName} ${UserInfo.lastName}`
              : "Sefa Khandakar"}
          </Text>
          <Text style={styles.date}>
            {LastMessage
              ? `${serverTimeToLocal(LastMessage.updatedAt)}`
              : "Jul 21 2:30 Pm"}
          </Text>
        </View>
        <Text style={styles.text}>{LastMessage ? LastMessage.text : null}</Text>
      </View>
      {props.active ? <View style={styles.active} /> : <></>}
    </TouchableOpacity>
  );
};

export default ChatCart;
