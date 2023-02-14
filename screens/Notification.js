import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { getNotification, getUnreadCount, getUnreadNotification } from "../Class/notification";
const { width, height } = Dimensions.get("window");

const Notification = ({ notification, route }) => {
  const user=useSelector(state=>state.user)
  const [unreadCount,setUnreadCount]=useState(0)
  const [unreadNotification,setUnreadNotification]=useState()
  const [readNotification,setReadNotification]=useState()

  useEffect(()=>{
    getUnreadCount(user.token).then(res=>{
      setUnreadCount(res.data.count)
    }).catch(err=>{
      console.error(err.response.data.msg)
    })
    getUnreadNotification(user.token).then(res=>{
      //console.log(res.data)
      setUnreadNotification(res.data.notifications)
    })
    getNotification(user.token).then(res=>{
      setReadNotification(res.data.notifications)
    })
  },[])
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {readNotification&&readNotification.map((doc,i)=>(
        <NotificationCart active={false} identity={"234324"} data={doc} key={i} icon={doc.icon} />
      ))}
      
    </ScrollView>
  );
};

export default Notification;

const NotificationCart = ({ data,active, type, icon,onPress,identity,orderId,date }) => {
  return (
    <Pressable 
      style={[styles.cart_container,active?styles.active:null]}>
      <SvgXml xml={icon} width={"50"} height={"50"} />
      <View style={{
        flex:1,
        marginLeft:10
      }}>
        <Text style={styles.text}>02-07-2023  08:00 PM</Text>
        <Text style={styles.descriptionText}>{data.start}{orderId&&` ${orderId}`}{data.middle}<Text style={styles.bold}>{identity}</Text>{data.end}{" "}
       {data.verified&&( <SvgXml xml={verified} height={"16"} width={"16"}/>)}
        </Text>
      </View>
    </Pressable>
  );
};

const types = [
  {
    type: "CANCEL_APPOINTMENT",
    icon: cancel_ap,
    start:"Your Appoinment with ",
    end:" has been Cancel",
    verified:false,
  },
  {
    type: "COMPLETE_APPOINTMENT",
    icon: complete_ap,
    start:"Your Appoinment with ",
    end:" has been completed",
    verified:true,
  },
  {
    type: "ACCEPT_APPOINTMENT",
    icon: accept_ap,
    start:"Your Appoinment with ",
    end:" has been Accepted",
    verified:false,
  },
  {
    type: "REJECT_APPOINTMENT",
    icon: reject_ap,
    start:"Your Appoinment with ",
    end:" has been Rejected",
    verified:false,
  },
  {
    type: "REQUEST_APPOINTMENT",
    icon: request_ap,
    start:"Your Appoinment with ",
    end:" has been Requested",
    verified:false,
  },
  {
    type: "ACCEPT_ORDER",
    icon: accept_or,
    start:"Your Order with ",
    end:" has been Accepted",
    verified:false,
  },
  {
    type: "AUTOMATIC_ORDER",
    icon: automatic_or,
    start:"Your Order ",
    middle:" will be completed automatically within ",
    end:" from now",
    verified:false,
  },
  {
    type: "CANCEL_ORDER",
    icon: cancel_or,
    start:"Your Order ",
    end:" has been Cancel",
    verified:false,
  },
  {
    type: "COMPLETE_ORDER",
    icon: complete_or,
    start:"Your Order ",
    end:" has been completed Automatically",
    verified:true,
  },
  {
    type: "DELIVER_ORDER",
    icon: delivered_or,
    start:"Your Order ",
    end:" has been delivered",
    verified:false,
  },
  {
    type: "PAYMENT_ORDER",
    icon: payment_or,
    start:"You have a new order. Please ",
    verified:false,
  },
  {
    type: "DATE_ORDER",
    icon: date_or,
    start:"Your Order ",
    end:" has been requested for a new delivery date",
    verified:false,
  },
];
const styles=StyleSheet.create({
  cart_container:{
    paddingHorizontal:20,
    paddingVertical:15,
    backgroundColor:"white",
    borderBottomWidth:1,
    borderColor:"#E1E1E1",
    flexDirection:"row",
    alignItems:"center"
  },
  active_cart:{
    backgroundColor:"#F6F6F6"
  },
  text:{
    color:"#808080",
    fontSize:16
  },
  descriptionText:{
    fontSize:16,
    lineHeight:20,
  },
  bold:{
    fontWeight:"600"
  },
  active:{
    backgroundColor:"#f5f5f5"
  }

})
const verified=`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.99653 2.64222C10.0026 1.31534 11.9974 1.31534 13.0035 2.64222L13.0579 2.71405C13.6069 3.43804 14.5038 3.80953 15.4039 3.68577L15.4932 3.67349C17.1428 3.44667 18.5533 4.85716 18.3265 6.50682L18.3142 6.59613C18.1905 7.49624 18.562 8.3931 19.286 8.94207L19.3578 8.99654C20.6847 10.0026 20.6847 11.9974 19.3578 13.0035L19.2859 13.0579C18.562 13.6069 18.1905 14.5038 18.3142 15.4039L18.3265 15.4932C18.5533 17.1428 17.1428 18.5533 15.4932 18.3265L15.4039 18.3142C14.5038 18.1905 13.6069 18.562 13.0579 19.286L13.0035 19.3578C11.9974 20.6847 10.0026 20.6847 8.99654 19.3578L8.94207 19.2859C8.3931 18.562 7.49624 18.1905 6.59613 18.3142L6.50682 18.3265C4.85716 18.5533 3.44667 17.1428 3.67349 15.4932L3.68577 15.4039C3.80953 14.5038 3.43804 13.6069 2.71405 13.0579L2.64222 13.0035C1.31534 11.9974 1.31534 10.0026 2.64222 8.99653L2.71405 8.94207C3.43804 8.3931 3.80953 7.49624 3.68577 6.59613L3.67349 6.50682C3.44667 4.85716 4.85716 3.44667 6.50682 3.67349L6.59613 3.68577C7.49624 3.80953 8.3931 3.43804 8.94207 2.71405L8.99653 2.64222Z" fill="#4ADE80"/>
<path d="M9.97937 12.2703L7.63328 10.0141L6.37 11.2289L9.97937 14.7L15.995 8.91489L14.7317 7.70001L9.97937 12.2703Z" fill="white"/>
</svg>
`