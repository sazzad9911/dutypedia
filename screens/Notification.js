import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  accept_ap,
  accept_or,
  automatic_or,
  cancel_ap,
  cancel_or,
  complete_ap,
  complete_or,
  date_or,
  delivered_or,
  payment_or,
  reject_ap,
  request_ap,
} from "./../assets/notification";
import { SvgXml } from "react-native-svg";
const { width, height } = Dimensions.get("window");

const Notification = ({ notification, route }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {types.map((doc, i) => (
        <NotificationCart key={i} icon={doc.icon} />
      ))}
    </ScrollView>
  );
};

export default Notification;

const NotificationCart = ({ active, type, icon,onPress,title,date }) => {
  return (
    <Pressable 
      style={styles.cart_container}>
      <SvgXml xml={icon} width={"30"} height={"30"} />
      
    </Pressable>
  );
};

const types = [
  {
    type: "CANCEL_APPOINTMENT",
    icon: cancel_ap,
  },
  {
    type: "COMPLETE_APPOINTMENT",
    icon: complete_ap,
  },
  {
    type: "ACCEPT_APPOINTMENT",
    icon: accept_ap,
  },
  {
    type: "REJECT_APPOINTMENT",
    icon: reject_ap,
  },
  {
    type: "REQUEST_APPOINTMENT",
    icon: request_ap,
  },
  {
    type: "ACCEPT_ORDER",
    icon: accept_or,
  },
  {
    type: "AUTOMATIC_ORDER",
    icon: automatic_or,
  },
  {
    type: "CANCEL_ORDER",
    icon: cancel_or,
  },
  {
    type: "COMPLETE_ORDER",
    icon: complete_or,
  },
  {
    type: "DELIVER_ORDER",
    icon: delivered_or,
  },
  {
    type: "PAYMENT_ORDER",
    icon: payment_or,
  },
  {
    type: "DATE_ORDER",
    icon: date_or,
  },
];
const styles=StyleSheet.create({
  cart_container:{
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:"white",
    borderBottomWidth:1,
    borderColor:"#E1E1E1"
  },
  active_cart:{
    backgroundColor:"#F6F6F6"
  }
})