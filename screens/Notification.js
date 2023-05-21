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
import { useDispatch, useSelector } from "react-redux";
import {
  getNotification,
  getUnreadCount,
  getUnreadNotification,
  getVendorNotification,
  getVendorNotificationCount,
  getVendorUnreadNotification,
} from "../Class/notification";
import ActivityLoader from "../components/ActivityLoader";
import { useIsFocused } from "@react-navigation/native";
import {
  acceptRefundRequest,
  newOrder,
  refundRequestOrder,
  rejectRefundRequest,
} from "../assets/icon";
import { dateConverter, timeConverter } from "../action";
import { socket } from "../Class/socket";
import { storeNotificationCount } from "../Reducers/unReadNotification";
import { setHideBottomBar } from "../Reducers/hideBottomBar";
import notificationData from "../Data/notificationData";
const { width, height } = Dimensions.get("window");
import { WebView } from "react-native-webview";
import { getSubsOrderById } from "../Class/service";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderDetails from "./Vendor/OrderDetails";
import UserOrderDetails from "./Seller/UserOrderDetails";
import NotificationHeader from "../components/NotificationHeader";
import ReviewScreen from "./Vendor/review/ReviewScreen";
import VendorOrderDetails from "./Vendor/VendorOrderDetails";
import AccountBalance from "./Vendor/account/AccountBalance";
import AllTransactions from "./Vendor/account/AllTransactions";
import { AllWithdraws } from "./Vendor/account/AllWithdraws";

const Stack = createNativeStackNavigator();
const formatOrderNotificationMessage = (item) => {
  switch (item.notificationType) {
    case "PAYMENT_ORDER":
      return `<b>${item.userFrom.name}</b> has completed the payment - you can now begin processing the service.`;

    case "PAYMENT_ORDER_USER":
      return `Payment Received - <b>${item.userFrom.name}</b> starting processing your service`;

    default:
      return `${item.message}`;
  }
};
const NotificationScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state.user);
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadNotification, setUnreadNotification] = useState();
  const [readNotification, setReadNotification] = useState();
  const vendor = useSelector((state) => state.vendor);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (vendor) {
      getVendorNotificationCount(user.token, vendor.service.id)
        .then((res) => {
          setUnreadCount(res.data.count);
          dispatch(storeNotificationCount(res.data.count));
        })
        .catch((err) => {
          console.error(err.response.data.msg);
        });
      // getVendorUnreadNotification(user.token,vendor.service.id).then(res=>{
      //   setUnreadNotification(res.data.notifications)
      // })
      getVendorNotification(user.token, vendor.service.id).then((res) => {
        setReadNotification(res.data.notifications);
      });
    } else if(user) {
      getUnreadCount(user.token)
        .then((res) => {
          setUnreadCount(res.data.count);
          dispatch(storeNotificationCount(res.data.count));
        })
        .catch((err) => {
          console.error(err.response.data.msg);
        });
      getUnreadNotification(user.token).then((res) => {
        setUnreadNotification(res.data.notifications);
      });
      getNotification(user.token).then((res) => {
        setReadNotification(res.data.notifications);
      });
    }
  }, [isFocused, user, vendor]);
  useEffect(() => {
    socket.on("notificationReceived", (e) => {
      if (vendor) {
        getVendorNotificationCount(user.token, vendor.service.id)
          .then((res) => {
            setUnreadCount(res.data.count);
            dispatch(storeNotificationCount(res.data.count));
          })
          .catch((err) => {
            console.error(err.response.data.msg);
          });
      } else {
        getUnreadCount(user.token)
          .then((res) => {
            setUnreadCount(res.data.count);
            dispatch(storeNotificationCount(res.data.count));
          })
          .catch((err) => {
            console.error(err.response.data.msg);
          });
      }
    });
    return () => {
      socket?.off("notificationReceived");
    };
  }, []);
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(false));
      setTimeout(() => {
        dispatch(setHideBottomBar(false));
      }, 150);
    } else {
      //console.log("seen")
      //dispatch(setHideBottomBar(true));
    }
  }, [isFocused]);
  //console.log(user)
  if (!readNotification) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* {unreadNotification &&
        unreadNotification.map((doc, i) => (
          <NotificationCart
            start={
              types.filter((d) => d.type == doc.notificationType)?.[0]?.start
            }
            end={types.filter((d) => d.type == doc.notificationType)?.[0]?.end}
            middle={
              types.filter((d) => d.type == doc.notificationType)?.[0]?.middle
            }
            active={true}
            orderId={
              doc.notificationType.split("_")[1] == "APPOINTMENT"
                ? undefined
                : doc.entityId
            }
            navigation={navigation}
            data={doc}
            key={i}
            icon={
              notificationData.filter((d) => d.key == doc.notificationType)?.[0]
                ?.icon
            }
          />
        ))} */}
      {readNotification &&
        readNotification.map((doc, i) => (
          <NotificationCart
            start={
              types.filter((d) => d.type == doc.notificationType)?.[0]?.start
            }
            end={types.filter((d) => d.type == doc.notificationType)?.[0]?.end}
            middle={
              types.filter((d) => d.type == doc.notificationType)?.[0]?.middle
            }
            verify={
              notificationData.filter((d) => d.key == doc.notificationType)?.[0]
                ?.verified
            }
            navigation={navigation}
            active={false}
            orderId={undefined}
            identity={
              doc.notificationType.split("_")[1] == "APPOINTMENT"
                ? doc.service.providerInfo.name
                : doc.entityId
            }
            data={doc}
            key={i}
            type={doc.notificationType}
            icon={
              notificationData.filter((d) => d.key == doc.notificationType)?.[0]
                ?.icon
            }
          />
        ))}
      {readNotification && readNotification.length == 0 && (
        <Text
          style={{
            marginVertical: 10,
            textAlign: "center",
          }}>
          No Notification Found!
        </Text>
      )}
    </ScrollView>
  );
};
const Notification = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ header: (props) => <NotificationHeader {...props} /> }}
        name="NotificationHome"
        component={NotificationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VendorOrderDetails_1"
        component={VendorOrderDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OrderDetails_1"
        component={UserOrderDetails}
      />
      <Stack.Screen
        name="CustomerReview"
        options={{
          headerShown: false,
        }}
        component={ReviewScreen}
      />
      <Stack.Screen
        name="VendorAccountBalance"
        options={{
          // header: (props) => (
          //   <AccountHeader title="Account Balance" {...props} />
          // ),
          headerShown: false,
        }}
        component={AccountBalance}
      />
      <Stack.Screen
        name="AllTransactions"
        options={{
          // header: (props) => (
          //   <AccountHeader title="All transaction" {...props} />
          // ),
          headerShown: false,
        }}
        component={AllTransactions}
      />
      <Stack.Screen
        name="AllWithdraws"
        options={{
          // header: (props) => (
          //   <AccountHeader title="All withdraw" {...props} />
          // ),
          headerShown: false,
        }}
        component={AllWithdraws}
      />
    </Stack.Navigator>
  );
};

export default Notification;

const NotificationCart = ({
  data,
  active,
  type,
  icon,
  onPress,
  identity,
  orderId,
  start,
  end,
  middle,
  navigation,
  verify,
}) => {
  //console.log(data)
  const vendor = useSelector((state) => state.vendor);
  const user = useSelector((state) => state.user);
  const arr = data.notificationType.split("_");
  const actionType = arr[arr.length - 1];
  let msg = formatOrderNotificationMessage(data).replace("<b>", "/");
  msg = msg.replace("</b>", "/");
  msg = msg.split("/");
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  useEffect(() => {
    if (msg?.length > 0) {
      setFirst(msg[0]);
      setSecond(msg[1]);
      if(msg.length>1){
        setThird(msg[2]);
      }
    } else {
      setFirst(msg[0]);
    }
  }, [data, user, vendor, icon]);
  const [order, setOrder] = useState();
  

  return (
    <Pressable
      onPress={() => {
        if(data.notificationType=="VERIFICATION_REJECTED"||data.notificationType=="VERIFICATION_ACCEPTED"){
          navigation.navigate("VendorAccountBalance");
          return;
        }
        if(data.notificationType=="NEW_APPOINTMENT"){
          navigation.navigate(vendor?"VendorAppointmentListDetails":"UserAppointmentDetails",{appointmentId:data?.entityId});
          return;
        }
        if (data.notificationType == "REVIEW_ORDER") {
          navigation.navigate("CustomerReview");
          return;
        }
        if (data.notificationType.includes("ORDER") && vendor) {
          navigation.navigate("VendorOrderDetails_1", { orderId: data?.entityId });
        }
        if (data.notificationType.includes("ORDER") && !vendor) {
          navigation.navigate("OrderDetails_1", { orderId: data?.entityId });
        }
        return;
        if (actionType == "APPOINTMENT" && vendor) {
          navigation.navigate("Search");
        } else if (actionType == "APPOINTMENT" && !vendor) {
          navigation.navigate("UserAppointmentList");
        }
        if (actionType == "ORDER" && vendor) {
          navigation.navigate("Feed");
        } else if (actionType == "ORDER" && !vendor) {
          navigation.navigate("ManageOrder");
        }
      }}
      style={[styles.cart_container, !data.opened ? styles.active : null]}>
      {icon ? (
        <SvgXml xml={icon} width={"62"} height={"62"} />
      ) : (
        <SvgXml xml={types[0].icon} width={"62"} height={"62"} />
      )}
      <View
        style={{
          flex: 1,
          marginLeft: 12,
        }}>
        <Text style={styles.text}>
          {dateConverter(data.createdAt)} {timeConverter(data.createdAt)}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
          }}>
          {/* <WebView
            style={{
              width:120,
            }}
            originWhitelist={["*"]}
            source={{ html: `<p>${data.message}</p> ${verify?verified:""}` }}
          /> */}
          <Text style={styles.descriptionText}>
            {first}
            <Text
              style={{
                fontWeight: "700",
              }}>
              {second}
            </Text>
            {third}
            {verify && (
              <SvgXml
                style={{
                  marginBottom: -5,
                  marginLeft: 5,
                }}
                xml={verified}
                height={"18"}
                width={"18"}
              />
            )}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const types = [
  {
    type: "CANCELLED_APPOINTMENT",
    icon: cancel_ap,
    start: "Your Appoinment with ",
    end: " has been Cancel",
    verified: false,
    navigation: "Appointment",
  },
  {
    type: "COMPLETED_APPOINTMENT",
    icon: complete_ap,
    start: "Your Appoinment with ",
    end: " has been completed",
    verified: true,
    navigation: "Appointment",
  },
  {
    type: "APPROVED_APPOINTMENT",
    icon: accept_ap,
    start: "Your Appoinment with ",
    end: " has been Accepted",
    verified: false,
    navigation: "Appointment",
  },
  {
    type: "REJECTED_APPOINTMENT",
    icon: reject_ap,
    start: "Your Appoinment with ",
    end: " has been Rejected",
    verified: false,
    navigation: "Appointment",
  },
  {
    type: "NEW_APPOINTMENT",
    icon: request_ap,
    start: "Your Appoinment with ",
    end: " has been Requested",
    verified: false,
    navigation: "Appointment",
  },
  {
    type: "ACCEPTED_ORDER",
    icon: accept_or,
    start: "Your Order with ",
    end: " has been Accepted",
    verified: false,
    navigation: "ManageOrder",
  },
  {
    type: "AUTOMATIC_ORDER",
    icon: automatic_or,
    start: "Your Order ",
    middle: " will be completed automatically within ",
    end: " from now",
    verified: false,
  },
  {
    type: "CANCELLED_ORDER",
    icon: cancel_or,
    start: "Your Order ",
    end: " has been Cancel",
    verified: false,
  },
  {
    type: "COMPLETED_ORDER",
    icon: complete_or,
    start: "Your Order ",
    end: " has been completed Automatically",
    verified: true,
  },
  {
    type: "DELIVERED_ORDER",
    icon: delivered_or,
    start: "Your Order ",
    end: " has been delivered",
    verified: false,
  },

  {
    type: "REQUEST_DATE_ORDER",
    icon: date_or,
    start: "Your Order ",
    end: " has been requested for a new delivery date",
    verified: false,
  },
  {
    type: "ACCEPT_DATE_ORDER",
    icon: date_or,
    start: "Your Order ",
    end: " has accepted new date request",
    verified: false,
  },
  {
    type: "REJECT_DATE_ORDER",
    icon: date_or,
    start: "Your Order ",
    end: " has rejected new date request",
    verified: false,
  },
  {
    type: "ACCEPT_REFUND_ORDER",
    icon: acceptRefundRequest,
    start: "Your Order ",
    end: " has accepted Refund request",
    verified: false,
  },
  {
    type: "REJECT_REFUND_ORDER",
    icon: rejectRefundRequest,
    start: "Your Order ",
    end: " has rejected Refund request",
    verified: false,
  },
  {
    type: "NEW_ORDER",
    icon: newOrder,
    start: "Your have new order ",
    end: " . Please make payment",
    verified: false,
  },
  {
    type: "PAYMENT_ORDER",
    icon: payment_or,
    start: "Your Order ",
    end: " has rejected Refund",
    verified: false,
  },
  {
    type: "REFUND_REQUEST_ORDER",
    icon: refundRequestOrder,
    start: "Your Order ",
    end: " has rejected Refund",
    verified: false,
  },
];
const styles = StyleSheet.create({
  cart_container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#E1E1E1",
    flexDirection: "row",
    alignItems: "center",
  },
  active_cart: {
    backgroundColor: "#F6F6F6",
  },
  text: {
    color: "#4D4E4F",
    fontSize: 16,
    
  },
  descriptionText: {
    fontSize: 16,
    
  },
  bold: {
    fontWeight: "600",
  },
  active: {
    backgroundColor: "#f5f5f5",
  },
});
const verified = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.99653 2.64222C10.0026 1.31534 11.9974 1.31534 13.0035 2.64222L13.0579 2.71405C13.6069 3.43804 14.5038 3.80953 15.4039 3.68577L15.4932 3.67349C17.1428 3.44667 18.5533 4.85716 18.3265 6.50682L18.3142 6.59613C18.1905 7.49624 18.562 8.3931 19.286 8.94207L19.3578 8.99654C20.6847 10.0026 20.6847 11.9974 19.3578 13.0035L19.2859 13.0579C18.562 13.6069 18.1905 14.5038 18.3142 15.4039L18.3265 15.4932C18.5533 17.1428 17.1428 18.5533 15.4932 18.3265L15.4039 18.3142C14.5038 18.1905 13.6069 18.562 13.0579 19.286L13.0035 19.3578C11.9974 20.6847 10.0026 20.6847 8.99654 19.3578L8.94207 19.2859C8.3931 18.562 7.49624 18.1905 6.59613 18.3142L6.50682 18.3265C4.85716 18.5533 3.44667 17.1428 3.67349 15.4932L3.68577 15.4039C3.80953 14.5038 3.43804 13.6069 2.71405 13.0579L2.64222 13.0035C1.31534 11.9974 1.31534 10.0026 2.64222 8.99653L2.71405 8.94207C3.43804 8.3931 3.80953 7.49624 3.68577 6.59613L3.67349 6.50682C3.44667 4.85716 4.85716 3.44667 6.50682 3.67349L6.59613 3.68577C7.49624 3.80953 8.3931 3.43804 8.94207 2.71405L8.99653 2.64222Z" fill="#4ADE80"/>
<path d="M9.97937 12.2703L7.63328 10.0141L6.37 11.2289L9.97937 14.7L15.995 8.91489L14.7317 7.70001L9.97937 12.2703Z" fill="white"/>
</svg>
`;
