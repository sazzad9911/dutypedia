import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Color } from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import Button from "./../../components/Button";
const { width, height } = Dimensions.get("window");
import {
  cancelOrder,
  getOrders,
  makePayment,
  orderRefound,
  acceptTimeRequest,
  completeOrder,
  makePaymentSubscription,
  getSubsOrderById,
  userCancelSubs,
  receiveSubs,
} from "../../Class/service";
import Barcode from "./../../components/Barcode";
import { serverToLocal } from "../../Class/dataConverter";
import Toast from "react-native-root-toast";
import { TouchableOpacity } from "react-native-gesture-handler";
import { socket } from "../../Class/socket";
import IconButton from "../../components/IconButton";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityLoader from "../../components/ActivityLoader";
import { localTimeToServerDate, serverTimeToLocalDate } from "../../action";

const OrderDetails = ({ navigation, route, onRefresh }) => {
  const oldData = route.params && route.params.data ? route.params.data : null;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const initialState = [
    {
      title: "Bargaining",
      value: true,
      type: "STARTING",
    },
    {
      title: "Fixed",
      value: false,
      type: "ONETIME",
    },
    {
      title: "Installment",
      value: false,
      type: "INSTALLMENT",
    },
    {
      title: "Subscription",
      value: false,
      type: "SUBS",
    },
    {
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
  ];
  const user = useSelector((state) => state.user);
  const styles = StyleSheet.create({
    view: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: "#C0FFD7",
      justifyContent: "center",
      borderTopWidth: 0,
    },
    text: {
      fontSize: width < 350 ? 14 : 16,
      fontFamily: "Poppins-Medium",
      color: textColor,
    },
    smallText: {
      fontSize: width < 350 ? 13 : 14,
      fontFamily: "Poppins-Medium",
      color: textColor,
    },
    newText: {
      fontSize: 16,
      color: "#666666",
    },
  });
  const [ListData, setListData] = React.useState([]);
  const [Facilities, setFacilities] = React.useState([]);
  const [data, setData] = React.useState(oldData);
  const [Loader, setLoader] = React.useState(false);
  const orderSocket = useSelector((state) => state.orderSocket);
  const userOrders = useSelector((state) => state.userOrders);
  const dispatch = useDispatch();
  const [Refresh, setRefresh] = React.useState(false);
  const [Timer, setTimer] = React.useState(true);
  const type = oldData.type;
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const sOrder =
    route.params && route.params.subsOrder ? route.params.subsOrder : null;
  const index = route.params && route.params.index ? route.params.index : 0;
  const [subsOrder, setSubsOrder] = useState(sOrder);
  //console.log(subsOrder)

  React.useEffect(() => {
    //console.log(data.serviceId);
    //console.log(subsOrder)
    //console.log(data.selectedServices);

    try {
      if (data && data.selectedServices && data.selectedServices.category) {
        setListData(
          serverToLocal(
            data.selectedServices.options,
            data.selectedServices.category
          )
        );
      } else if (Array.isArray(data.selectedServices)) {
        let arr = [];
        data.selectedServices.map((doc, i) => {
          arr.push({
            title: "dfsfds",
            tableName: "sdad",
            mainTitle: "asad",
            data: doc,
          });
        });
        setListData(arr);
      } else if (data && data.selectedServices) {
        setListData(
          serverToLocal(data.selectedServices, data.service.category)
        );
      }
    } catch (e) {
      console.warn(e.message);
    }
    if (data && data.facilites && Array.isArray(data.facilites)) {
      setFacilities(data.facilites);
    }
  }, [data]);
  const loadData = async (receiverId, order) => {
    //setLoader(false);
    try {
      //const res = await getOrders(user.token, "vendor", serviceId);
      //dispatch({ type: "USER_ORDERS", playload: res.data.orders });
      // let arr = res.data.orders.filter((order) => order.id == data.id);
      socket.emit("updateOrder", {
        receiverId: receiverId,
        order: {
          type: "vendor",
          data: order,
        },
      });
      //route.params.onRefresh();
      setLoader(false);
    } catch (e) {
      console.warn(e.message);
    }
  };
  const loadDataSubs = async (receiverId, order) => {
    //setLoader(false);
    if (!index) {
      Alert.alert("Some thing went wrong");
      return;
    }
    try {
      //const vendorRes = await getOrders(user.token, "vendor", order.service.id);
      //const userRes = await getOrders(user.token, "user");
      const res = await getSubsOrderById(user.token, data.id);
      //dispatch({ type: "USER_ORDERS", playload: res.data.orders });
      //let userArr = userRes.data.orders.filter((o) => o.id == order.id);
      //let vendorArr = vendorRes.data.orders.filter((o) => o.id == order.id);
      socket.emit("updateOrder", {
        receiverId: receiverId,
        order: {
          type: "vendor",
          data: res.data.order,
        },
      });
      socket.emit("updateOrder", {
        receiverId: user.user.id,
        order: {
          type: "user",
          data: res.data.order,
        },
      });
      setData(res.data.order);
      setSubsOrder(res.data.order.subsOrders[index]);
      //route.params.onRefresh();
      setLoader(false);
    } catch (e) {
      console.warn(e.message);
    }
  };
  React.useEffect(() => {
    socket.on("updateOrder", (e) => {
      e = e.order;
      if (e.type === "user" && e.data.id == data.id) {
        setData(e.data);
      }
    });
  }, []);

  const stringDate = (d) => {
    const Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = new Date(d);
    // console.log(date.getDate());
    return `${date.getDate()}th ${
      Months[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("OtherProfile", {
                serviceId: data ? data.service.id : null,
              });
            }}
            style={{
              height: 70,
              width: 70,
              borderWidth: 1,
              borderRadius: 35,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#e5e5e5",
              overflow: "hidden",
            }}
          >
            {data && data.service.profilePhoto ? (
              <Image
                style={{
                  width: 70,
                  height: 70,
                }}
                source={{ uri: data.service.profilePhoto }}
              />
            ) : (
              <FontAwesome name="user" size={50} color={assentColor} />
            )}
          </TouchableOpacity>
          <View
            style={{
              marginLeft: 15,
              flex: 1,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: width < 350 ? 18 : 20,
                fontFamily: "Poppins-Medium",
                color: textColor,
                marginBottom: 2,
              }}
            >
              {data
                ? data.service.serviceCenterName
                : "Unknown Service Center Name"}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: width < 350 ? 14 : 16,
                fontFamily: "Poppins-Medium",
                color: textColor,
                marginTop: 0,
              }}
            >
              {data ? data.service.providerInfo.title : "--"}{" "}
              {data ? data.service.providerInfo.name : "--"}{" "}
              {data ? `(${data.service.providerInfo.gender})` : "(-)"}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: width < 350 ? 14 : 16,
                fontFamily: "Poppins-Medium",
                color: textColor,
              }}
            >
              {data ? data.service.providerInfo.position : "-"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
          <View style={styles.view}></View>
          <View
            style={[
              styles.view,
              { borderBottomColor: backgroundColor, flex: 2 },
            ]}
          >
            {data && (
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 10,
                  fontFamily: "Poppins-Medium",
                  fontSize: width < 350 ? 14 : 16,
                  marginTop: 0,
                  marginTop: 20,
                }}
              >
                {initialState.filter((d) => d.type.match(data.type))[0].title}{" "}
                Service
              </Text>
            )}
          </View>
          <View style={styles.view}></View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginVertical: 20,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: width < 350 ? 14 : 16,
                fontFamily: "Poppins-Medium",
                color: textColor,
              }}
            >
              Order Id: {data ? data.id : "Unknown Id"}
            </Text>
            <Text
              style={{
                fontSize: width < 350 ? 13 : 14,
                fontFamily: "Poppins-Medium",
                color: textColor,
                textAlign: "center",
                marginTop: 2,
              }}
            >
              Date:{" "}
              {data && data.createdAt
                ? stringDate(data.createdAt)
                : "Unavailable Date"}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: width / 3,
                height: 50,
                overflow: "hidden",
              }}
            >
              <Barcode
                height="50"
                width="120"
                value={data ? data.id : "dsfff"}
                options={{ format: "CODE128", background: primaryColor }}
                rotation={0}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                fontFamily: "Poppins-Medium",
                color: textColor,
                width: width / 3,
                marginLeft: 5,
              }}
            >
              {data
                ? data.id.split("").map((doc, i) => {
                    return `${doc}`;
                  })
                : "Unknown"}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0,
            borderBottomColor: "#C0FFD7",
            paddingVertical: 20,
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: width < 350 ? 16 : 18,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            Service/ Item Name
          </Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}
          >
            {ListData && ListData.length > 0 ? (
              ListData.map((doc, i) => (
                <Text
                  style={{
                    fontSize: width < 350 ? 14 : 16,
                  }}
                  key={i}
                >
                  {i == 0 ? "" : ", "}
                  {doc.data.title}
                </Text>
              ))
            ) : (
              <Text
                style={{
                  color: "#505050",
                }}
              >
                N/A
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#C0FFD7",
            paddingVertical: 20,
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: width < 350 ? 18 : 20,
              color: textColor,
              fontFamily: "Poppins-Medium",
            }}
          >
            Facilities
          </Text>
          <View style={{ marginTop: 10 }}>
            {Facilities && Facilities.length > 0 ? (
              Facilities.map((doc, i) => (
                <Text
                  style={{
                    fontSize: width < 350 ? 14 : 16,
                  }}
                  key={i}
                >
                  {i + 1 + ". "}
                  {doc.title}
                </Text>
              ))
            ) : (
              <Text
                style={{
                  color: "#505050",
                }}
              >
                N/A
              </Text>
            )}
          </View>
        </View>
        {type != "SUBS" && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#C0FFD7",
              paddingVertical: 20,
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            <Text style={[styles.text, { fontSize: width < 350 ? 18 : 20 }]}>
              Price
            </Text>
            <Text style={styles.text}>
              Basic Price :{" "}
              {data
                ? (data.offerPrice ? data.offerPrice : data.amount) + "৳"
                : "Pice is empty"}
            </Text>
          </View>
        )}
        {type == "SUBS" && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#C0FFD7",
              paddingVertical: 20,
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            <Text style={[styles.text, { fontSize: width < 350 ? 18 : 20 }]}>
              {data ? data.subsData.subscriptionType : ""}{" "}
              {data ? data.subsData.amount + "৳" : "Pice is empty"}
            </Text>
            {data.subsData.otherChargeName ? (
              <Text
                style={{
                  fontSize: 16,
                  color: "#666666",
                  marginVertical: 5,
                }}
              >
                {data.subsData.otherChargeName}{" "}
                {data.subsData.otherChargeAmount}৳
              </Text>
            ) : null}
            <View
              style={{
                width: "60%",
                height: 1,
                backgroundColor: "#F1EFEF",
                marginVertical: 10,
              }}
            />
            <View
              style={{
                width: "60%",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={styles.newText}>Total</Text>
              <Text style={styles.newText}>
                {data.subsData.amount +
                  parseInt(
                    data.subsData.otherChargeAmount
                      ? data.subsData.otherChargeAmount
                      : 0
                  )}
                ৳
              </Text>
            </View>
          </View>
        )}
        {type == "SUBS" && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#C0FFD7",
              paddingVertical: 0,
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            <Text
              style={[
                styles.text,
                { fontSize: width < 350 ? 18 : 20, marginBottom: 10 },
              ]}
            >
              Duration
            </Text>
            <Text style={[styles.newText, { marginBottom: 20 }]}>
              {data.subsData.payAsYouGo
                ? "Pay As Go"
                : `${data.subsData.totalDuration} ${
                    data.subsData.subscriptionType == "Monthly"
                      ? "Months"
                      : data.subsData.subscriptionType == "Yearly"
                      ? "Years"
                      : "Days"
                  }`}
            </Text>
          </View>
        )}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#C0FFD7",
            paddingVertical: 20,
            marginHorizontal: 20,
          }}
        >
          <Text style={[styles.text, { fontSize: width < 350 ? 18 : 20 }]}>
            Delivery Date
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text style={[styles.smallText, { flex: 0 }]}>
              {data
                ? serverTimeToLocalDate(data.deliveryDateFrom)
                : "Unavailable Date"}{" "}
            </Text>
            <Text style={[styles.smallText, { flex: 0, marginHorizontal: 10 }]}>
              To
            </Text>
            {data && data.subsData ? (
              <Text style={[styles.smallText, { flex: 0 }]}>
                {data
                  ? serverTimeToLocalDate(
                      data.deliveryDateFrom,
                      data.subsData.totalDuration
                        ? data.subsData.totalDuration *
                            (data.subsData.subscriptionType == "Monthly"
                              ? 30
                              : data.subsData.subscriptionType == "Yearly"
                              ? 365
                              : 7)
                        : 0
                    )
                  : "Unavailable Date"}
              </Text>
            ) : (
              <Text style={[styles.smallText, { flex: 0 }]}>
                {data
                  ? serverTimeToLocalDate(data.deliveryDateTo)
                  : "Unavailable Date"}
              </Text>
            )}
          </View>
          {type == "SUBS" && (
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SubscriptionDates", {
                    subsData: data.subsData,
                    date: data.deliveryDateFrom,
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 10,
                    textDecorationLine: "underline",
                  }}
                >
                  View all delivery date
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#C0FFD7",
            paddingVertical: 20,
            marginHorizontal: 20,
          }}
        >
          <Text style={[styles.text, { fontSize: width < 350 ? 18 : 20 }]}>
            Payment Status
          </Text>
          {type == "SUBS" && subsOrder ? (
            <View
              style={{
                padding: 3,
                backgroundColor:
                  subsOrder && subsOrder.paid && subsOrder.status != "REFUNDED"
                    ? "green"
                    : subsOrder &&
                      subsOrder.paid &&
                      subsOrder.status == "REFUNDED"
                    ? "#FA1ABA"
                    : subsOrder && !subsOrder.paid
                    ? "red"
                    : backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                paddingHorizontal: 15,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: width < 350 ? 14 : 15,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {subsOrder && subsOrder.paid && subsOrder.status != "REFUNDED"
                  ? "Paid"
                  : subsOrder &&
                    subsOrder.paid &&
                    subsOrder.status == "REFUNDED"
                  ? "Refunded"
                  : "Due"}
              </Text>
            </View>
          ) : (
            <View
              style={{
                padding: 3,
                backgroundColor:
                  data && data.paid && data.status != "REFUNDED"
                    ? "green"
                    : data && data.paid && data.status == "REFUNDED"
                    ? "#FA1ABA"
                    : data && !data.paid
                    ? "red"
                    : backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                paddingHorizontal: 15,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: width < 350 ? 14 : 15,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {data && data.paid && data.status != "REFUNDED"
                  ? "Paid"
                  : data && data.paid && data.status == "REFUNDED"
                  ? "Refunded"
                  : "Due"}
              </Text>
            </View>
          )}
          {type == "SUBS" && (
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SubscriptionDates", {
                    subsData: data.subsData,
                    date: data.deliveryDateFrom,
                    name: "Payment Date",
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 10,
                    textDecorationLine: "underline",
                  }}
                >
                  View all delivery date
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#C0FFD7",
            paddingVertical: 20,
            marginHorizontal: 20,
          }}
        >
          <Text style={[styles.text, { fontSize: width < 350 ? 16 : 18 }]}>
            Service Status
          </Text>
          {type == "SUBS" && subsOrder ? (
            <Text style={[styles.smallText, { marginTop: 5 }]}>
              {subsOrder ? exporters(subsOrder.status) : "Unknown"}
            </Text>
          ) : (
            <Text style={[styles.smallText, { marginTop: 5 }]}>
              {data ? exporters(data.status) : "Unknown"}
            </Text>
          )}
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#C0FFD7",
            paddingVertical: 20,
            marginHorizontal: 20,
          }}
        >
          <Text style={[styles.text, { fontSize: width < 350 ? 20 : 22 }]}>
            Introduction
          </Text>
          <Text style={[styles.smallText, { marginTop: 5, marginBottom: 5 }]}>
            {data && data.description ? data.description : "No details found!"}
          </Text>
        </View>
        {type == "SUBS" && subsOrder ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {subsOrder && (subsOrder.status == "ACCEPTED"||
              subsOrder.status=="WAITING_FOR_PAYMENT") && (
                <IconButton
                  onPress={() => {
                    setLoader(true);
                    makePaymentSubscription(
                      user.token,
                      data.id,
                      data.subsData.subscriptionType,
                      subsOrder.dateFrom,
                      subsOrder.dateTo
                    )
                      .then((res) => {
                        if (res) {
                          Toast.show("Payment success", {
                            duration: Toast.durations.LONG,
                          });
                          //console.log(res.data)
                          loadDataSubs(res.data.receiverId, res.data.order);
                        }
                      })
                      .catch((err) => {
                        Toast.show(err.response.data.msg, {
                          duration: Toast.durations.LONG,
                        });
                        setLoader(false);
                      });
                  }}
                  style={{
                    backgroundColor: "#4ADE80",
                    borderRadius: 5,
                    alignSelf: "flex-end",
                    marginVertical: 20,
                    borderWidth: 0,
                    marginRight: 0,
                    width: 120,
                    height: 40,
                  }}
                  title="Make Payment"
                />
              )}
              {subsOrder &&
                subsOrder.status != "REFUNDED" &&
                subsOrder.status != "CANCELLED" &&
                subsOrder.status != "DELIVERED" &&
                subsOrder.status != "COMPLETED" &&
                !subsOrder.refundRequestByUser && (
                  <IconButton
                    onPress={() => {
                      Alert.alert(
                        "Hey!",
                        "Are you want to cancel this order?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => {
                              setLoader(true);
                              userCancelSubs(user.token,subsOrder.id)
                                .then((res) => {
                                  Toast.show("Successfully request send", {
                                    duration: Toast.durations.LONG,
                                  });
                                  loadDataSubs(res.data.receiverId, res.data.order);      
                                })
                                .catch((err) => {
                                  setLoader(false);
                                  console.warn(err.response.data);
                                });
                            },
                          },
                        ]
                      );
                    }}
                    style={{
                      borderColor: backgroundColor,
                      borderRadius: 5,
                      alignSelf: "flex-end",
                      marginVertical: 20,
                      borderWidth: 0,
                      marginHorizontal: 20,
                      borderWidth: 1,
                      color: textColor,
                      width: 130,
                      height: 40,
                    }}
                    title={
                      subsOrder && subsOrder.paid ? "Cancel & Refund" : "Cancel Order"
                    }
                  />
                )}
            </View>
            {subsOrder &&
              subsOrder.delivered &&
              subsOrder.status != "COMPLETED" && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: width < 350 ? 14 : 16,
                      fontFamily: "Poppins-Medium",
                      color: textColor,
                      textAlign: "center",
                      marginTop: 20,
                    }}
                  >
                    If you Received then Click
                  </Text>
                  <IconButton
                    onPress={() => {
                      setLoader(true);
                      receiveSubs(user.token,subsOrder.id)
                        .then((res) => {
                          if (res) {
                            Toast.show("Successful", {
                              duration: Toast.durations.LONG,
                            });
                            loadDataSubs(res.data.receiverId, res.data.order);
                          }
                        })
                        .catch((err) => {
                          Toast.show(err.response.data.msg, {
                            duration: Toast.durations.LONG,
                          });
                          setLoader(false);
                        });
                    }}
                    style={{
                      backgroundColor: "#4ADE80",
                      borderRadius: 5,
                      marginVertical: 20,
                      borderWidth: 0,
                      width: 120,
                      marginBottom: 20,
                      height: 40,
                    }}
                    title="Yes I Received"
                  />
                </View>
              )}
            {subsOrder && subsOrder.status == "COMPLETED" && (
              <Text
                style={{
                  color: "green",
                  fontSize: width < 350 ? 14 : 16,
                  fontFamily: "Poppins-Medium",
                  textAlign: "center",
                  marginVertical: 20,
                }}
              >
                Order Completed
              </Text>
            )}
            {subsOrder.refundRequestByUser && (
              <Text
                style={{
                  color: backgroundColor,
                  textAlign: "center",
                  marginVertical: 20,
                }}
              >
                You requested for refund
              </Text>
            )}
          </>
        ) : (
          <>
            {data.requestedDeliveryDate &&
              data.status != "CANCELLED" &&
              data.status != "DELIVERED" &&
              data.status != "COMPLETED" &&
              data.status != "REFUNDED" && (
                <View
                  style={{
                    marginHorizontal: 20,
                    marginVertical: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: width < 350 ? 14 : 16,
                      color: textColor,
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    Vendor Request Delivery Date
                  </Text>
                  <Text
                    style={{
                      fontSize: width < 350 ? 14 : 16,
                      color: textColor,
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    Requested Delivery Date: {data.requestedDeliveryDate}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <IconButton
                      onPress={() => {
                        setLoader(true);
                        acceptTimeRequest(
                          user.token,
                          data.id,
                          data.requestedDeliveryDate,
                          true
                        )
                          .then((res) => {
                            if (res) {
                              Toast.show("Request Accepted", {
                                duration: Toast.durations.LONG,
                              });
                              loadData(res.data.receiverId, res.data.order);
                              socket.emit("updateOrder", {
                                receiverId: user.user.id,
                                order: {
                                  type: "user",
                                  data: res.data.order,
                                },
                              });
                              setData(res.data.order);
                            }
                          })
                          .catch((err) => {
                            Toast.show(err.response.data.msg, {
                              duration: Toast.durations.LONG,
                            });
                            setLoader(false);
                          });
                      }}
                      style={{
                        backgroundColor: "#4ADE80",
                        borderRadius: 5,
                        alignSelf: "flex-end",
                        marginVertical: 20,
                        borderWidth: 0,
                        marginRight: 20,
                        width: 100,
                        height: 40,
                      }}
                      title="Accept"
                    />
                    <IconButton
                      onPress={() => {
                        setLoader(true);
                        acceptTimeRequest(
                          user.token,
                          data.id,
                          data.requestedDeliveryDate,
                          false
                        )
                          .then((res) => {
                            if (res) {
                              Toast.show("Request CANCELLED", {
                                duration: Toast.durations.LONG,
                              });
                              loadData(res.data.receiverId, res.data.order);
                              socket.emit("updateOrder", {
                                receiverId: user.user.id,
                                order: {
                                  type: "user",
                                  data: res.data.order,
                                },
                              });
                              setData(res.data.order);
                            }
                          })
                          .catch((err) => {
                            Toast.show(err.response.data.msg, {
                              duration: Toast.durations.LONG,
                            });
                            setLoader(false);
                          });
                      }}
                      style={{
                        borderColor: backgroundColor,
                        borderRadius: 5,
                        alignSelf: "flex-end",
                        marginVertical: 20,
                        borderWidth: 0,
                        marginRight: 20,
                        borderWidth: 1,
                        color: textColor,
                        width: 100,
                        height: 40,
                      }}
                      title="Cancel"
                    />
                  </View>
                </View>
              )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {data && data.status == "ACCEPTED" && (
                <IconButton
                  onPress={() => {
                    setLoader(true);
                    makePayment(user.token, data.id)
                      .then((res) => {
                        if (res) {
                          Toast.show("Payment success", {
                            duration: Toast.durations.LONG,
                          });
                          loadData(res.data.receiverId, res.data.order);
                          socket.emit("updateOrder", {
                            receiverId: user.user.id,
                            order: {
                              type: "user",
                              data: res.data.order,
                            },
                          });
                          setData(res.data.order);
                        }
                      })
                      .catch((err) => {
                        Toast.show(err.response.data.msg, {
                          duration: Toast.durations.LONG,
                        });
                        setLoader(false);
                      });
                  }}
                  style={{
                    backgroundColor: "#4ADE80",
                    borderRadius: 5,
                    alignSelf: "flex-end",
                    marginVertical: 20,
                    borderWidth: 0,
                    marginRight: 0,
                    width: 120,
                    height: 40,
                  }}
                  title="Make Payment"
                />
              )}
              {data &&
                data.status != "REFUNDED" &&
                data.status != "CANCELLED" &&
                data.status != "DELIVERED" &&
                data.status != "COMPLETED" &&
                !data.refundRequestByUser && (
                  <IconButton
                    onPress={() => {
                      Alert.alert(
                        "Hey!",
                        "Are you want to cancel this order?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => {
                              setLoader(true);
                              cancelOrder(
                                user.token,
                                data.id,
                                "CANCELLED",
                                "user"
                              )
                                .then((res) => {
                                  Toast.show("Successfully request send", {
                                    duration: Toast.durations.LONG,
                                  });
                                  loadData(res.data.receiverId, res.data.order);
                                  socket.emit("updateOrder", {
                                    receiverId: user.user.id,
                                    order: {
                                      type: "user",
                                      data: res.data.order,
                                    },
                                  });
                                  setData(res.data.order);
                                })
                                .catch((err) => {
                                  setLoader(false);
                                  console.warn(err.response.data);
                                });
                            },
                          },
                        ]
                      );
                    }}
                    style={{
                      borderColor: backgroundColor,
                      borderRadius: 5,
                      alignSelf: "flex-end",
                      marginVertical: 20,
                      borderWidth: 0,
                      marginHorizontal: 20,
                      borderWidth: 1,
                      color: textColor,
                      width: 130,
                      height: 40,
                    }}
                    title={
                      data && data.paid ? "Cancel & Refund" : "Cancel Order"
                    }
                  />
                )}
            </View>
            {data && data.delivered && data.status != "COMPLETED" && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: width < 350 ? 14 : 16,
                    fontFamily: "Poppins-Medium",
                    color: textColor,
                    textAlign: "center",
                    marginTop: 20,
                  }}
                >
                  If you Received then Click
                </Text>
                <IconButton
                  onPress={() => {
                    setLoader(true);
                    completeOrder(user.token, data.id)
                      .then((res) => {
                        if (res) {
                          Toast.show("Successful", {
                            duration: Toast.durations.LONG,
                          });
                          loadData(res.data.receiverId, res.data.order);
                          socket.emit("updateOrder", {
                            receiverId: user.user.id,
                            order: {
                              type: "user",
                              data: res.data.order,
                            },
                          });
                          setData(res.data.order);
                        }
                      })
                      .catch((err) => {
                        Toast.show(err.response.data.msg, {
                          duration: Toast.durations.LONG,
                        });
                        setLoader(false);
                      });
                  }}
                  style={{
                    backgroundColor: "#4ADE80",
                    borderRadius: 5,
                    marginVertical: 20,
                    borderWidth: 0,
                    width: 120,
                    marginBottom: 20,
                    height: 40,
                  }}
                  title="Yes I Received"
                />
              </View>
            )}
            {data && data.status == "COMPLETED" && (
              <Text
                style={{
                  color: "green",
                  fontSize: width < 350 ? 14 : 16,
                  fontFamily: "Poppins-Medium",
                  textAlign: "center",
                  marginVertical: 20,
                }}
              >
                Order Completed
              </Text>
            )}
            {data.refundRequestByUser && (
              <Text
                style={{
                  color: backgroundColor,
                  textAlign: "center",
                  marginVertical: 20,
                }}
              >
                You requested for refund
              </Text>
            )}
          </>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default OrderDetails;
const exporters = (key) => {
  switch (key) {
    case "WAITING_FOR_ACCEPT":
      return "Wait for accept order";
    case "ACCEPTED":
      return "Waiting for payment";
    case "WAITING_FOR_PAYMENT":
      return "Waiting for payment";
    case "PROCESSING":
      return "Processing";
    case "DELIVERED":
      return "Delivered";
    case "REFUNDED":
      return "Refunded";
    case "CANCELLED":
      return "Cancelled";
    case "COMPLETED":
      return "Completed";
    default:
      return "Unknown";
  }
};
