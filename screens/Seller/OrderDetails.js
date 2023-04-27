import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
  Pressable,
  Modal,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
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
  makePaymentInstallment,
  makeAdvancedPaymentInstallment,
  paymentRequestViaAmarPay,
  payRequest,
  cancelOrderByUser,
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
import InfoCart from "./OrderScript/InfoCart";
import OrderInfo from "./OrderScript/OrderInfo";
import StatusCart from "./OrderScript/StatusCart";
import { createConversation } from "../../Class/message";
import { useIsFocused } from "@react-navigation/native";
import AmarPay from "./OrderScript/AmarPay";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";

const OrderDetails = ({ navigation, route, onRefresh }) => {
  const oldData = route.params && route.params.data ? route.params.data : null;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
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
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
  ];
  const user = useSelector((state) => state.user);

  const [ListData, setListData] = React.useState([]);
  const [Facilities, setFacilities] = React.useState([]);
  const [data, setData] = React.useState(oldData);
  const [Loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();
  const type = oldData.type;
  const sOrder =
    route.params && route.params.subsOrder ? route.params.subsOrder : null;
  const index = route.params && route.params.index ? route.params.index : 0;
  const [subsOrder, setSubsOrder] = useState(sOrder);
  const [installmentOrder, setInstallmentOrder] = useState(sOrder);
  const installmentData = data.installmentData ? data.installmentData : null;
  const isFocused = useIsFocused();
  const [amarpay,setAmarPay]=useState(false)
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(false));
      setTimeout(() => {
        dispatch(setHideBottomBar(false));
      }, 50);
    } else {
      //console.log("seen")
      //dispatch(setHideBottomBar(true));
    }
  }, [isFocused]);
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
        order: order,
      });
      socket.emit("notificationSend", {
        receiverId: receiverId,
      });
      //route.params.onRefresh();
      setLoader(false);
    } catch (e) {
      console.warn(e.message);
    }
  };
  const loadDataSubs = async (receiverId, order) => {
    //setLoader(false);
    if (index == null) {
      setLoader(false);
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
      socket.emit("notificationSend", {
        receiverId: receiverId,
      });
      setData(res.data.order);
      setSubsOrder(res.data.order.subsOrders[index]);
      //route.params.onRefresh();
      navigation.goBack();
      setLoader(false);
    } catch (e) {
      console.warn(e.message);
    }
  };
  const loadDataInstallment = async (receiverId, order) => {
    //setLoader(false);
    if (index == null) {
      setLoader(false);
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
      socket.emit("notificationSend", {
        receiverId: receiverId,
      });
      setData(res.data.order);
      //console.log(res.data.order.installmentOrders[index])
      setInstallmentOrder(res.data.order.installmentOrders[index]);
      //route.params.onRefresh();
      setLoader(false);
      navigation.goBack();
    } catch (e) {
      console.warn(e.message);
    }
  };
  const dataLoader = async (id) => {
    try {
      const res = await getSubsOrderById(user.token, id);
      setData(res.data.order);
    } catch (err) {
      console.error(err.message);
    }
  };
  React.useEffect(() => {
    socket.on("updateOrder", (e) => {
      dataLoader(data?.id);
    });
  }, []);
  useEffect(() => {
    if (data?.id&&isFocused) {
      //console.log(data.id)
      // dataLoader()
      dataLoader(data?.id)
    }
  }, [isFocused]);

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

  const callPayment = () => {
    // navigation.navigate("PaymentStatus",{type:true})
    // return
    setLoader(true);
    payRequest(user.token, data?.id)
      .then((res) => {
        setLoader(false);
        setAmarPay(res.data.url)
        // navigation.navigate("AmarPay", {
        //   url: res.data.url,
        //   orderId: data?.id,
        //   sellerId: data?.service?.user?.id,
        //   buyerId: data?.user?.id,
        //   order: data,
        // });
      })
      .catch((err) => {
        setLoader(false);
        Alert.alert(err.response.data.msg);
        //console.error(err.response.data.msg)
      });
  };
  //console.log(data.attachment)
  const timeRequest = (accepted) => {
    setLoader(true);
    acceptTimeRequest(user.token, data.id, data.requestedDeliveryDate, accepted)
      .then((res) => {
        if (res) {
          Toast.show(`Request ${accepted ? "accepted" : "cancelled"}`, {
            duration: Toast.durations.LONG,
          });
          loadData(res.data.receiverId, res.data.order);
          socket.emit("updateOrder", {
            receiverId: user.user.id,
            order: res.data.order,
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
  };
  
  const confirmDelivery=()=>{
   
    navigation.navigate("ClintFeedBack",{order:data})
  }

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
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InfoCart
          onClick={() => {
            navigation.navigate("OtherProfile", {
              serviceId: data ? data.service.id : null,
              data:data
            });
          }}
          onMessage={() => {
            let newUser = {
              userId: data.service.user.id,
              user: data.service.user,
            };
            //createConversation()
            navigation.navigate("ChatScreen", {
              data: {
                users: [newUser],
              },
              username: data.service.user.username,
            });
          }}
          uri={data?.service?.profilePhoto}
          title={data?.service?.serviceCenterName}
          name={`${data?.service?.providerInfo.title} ${data.service.providerInfo.name}`}
          position={data?.service?.providerInfo?.position}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {initialState.filter((d) => d.type.match(data.type))[0].title}{" "}
            service
          </Text>
        </View>
        <OrderInfo
          title={data?.gigTitle}
          facilities={Facilities}
          services={ListData}
          orderId={data?.id}
          date={data?.createdAt}
        />
        <StatusCart
          onPress={() => {
            navigation.navigate("ImportantNotice", {
              name: `${data?.user?.firstName} ${data?.user?.lastName}`,
            });
          }}
          price={data?.offerPrice ? data?.offerPrice : data?.amount}
          paid={data?.paid}
          status={data?.status}
          onMore={() => {
            navigation.navigate("ImportantNotice", {
              name: `${data?.user?.firstName} ${data?.user?.lastName}`,
              type: "FAILED",
            });
          }}
          onDelivered={()=>{
            navigation.navigate("ImportantNotice", {
              name: `${data?.user?.firstName} ${data?.user?.lastName}`,
              type: "DELIVERED",
            });
          }}
          requestDate={data?.requestedDeliveryDate}
          instruction={data?.description}
          attachment={data?.attachment}
          startDate={data?.deliveryDateFrom}
          endDate={data?.deliveryDateTo}
          onAcceptTime={() => timeRequest(true)}
          onRejectTime={() => timeRequest(false)}
          deliveryText={data?.proofText}
          deliveryImage={data?.proofImage}
        />
        {data?.status == "ACCEPTED" && data?.paid == false && (
          <IconButton
            onPress={callPayment}
            active={true}
            style={[styles.button, { marginBottom: 12 }]}
            title={"Pay now"}
          />
        )}
        {data?.paid == false && exporters(data?.status).title != "Failed" && (
          <IconButton
            onPress={() => {
              navigation.navigate("CancelOrderConfirmation", {
                order: data,
                name: `${data?.user?.firstName} ${data?.user?.lastName}`,
              });
            }}
            style={styles.button}
            title={"Cancel order"}
          />
        )}
        {data?.status == "DELIVERED" && (
          <View>
            <Text style={[styles.text,{marginBottom:12,marginHorizontal:20}]}>Click 'Recived' or Auto-Receive in 72 Hours</Text>
            <IconButton
              onPress={confirmDelivery}
              active={true}
              style={[styles.button]}
              title={"Received"}
            />
          </View>
        )}
        {data?.cancelledBy?(
          <Text style={styles.font}>{data.cancelledBy=="USER"?"Order cancelled":"Seller has cancelled the order"}</Text>
        ):!data.cancelledBy&&exporters(data?.status).title == "Failed"?(
          <Text style={styles.font}>Delivery date has expired</Text>
        ):(<></>)}
        {data?.status=="COMPLETED"&&(
          <Text style={[styles.font,{color:"#4ADE80"}]}>Order Completed</Text>
        )}
      </ScrollView>
      <Modal animationType="slide" visible={Boolean(amarpay)}>
        <AmarPay onClose={()=>setAmarPay()} order={data} url={amarpay} navigation={navigation}/>
      </Modal>
    </SafeAreaView>
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
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
            }}>
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
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: width < 350 ? 18 : 20,
                fontFamily: "Poppins-Medium",
                color: textColor,
                marginBottom: 2,
              }}>
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
              }}>
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
              }}>
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
            ]}>
            {data && (
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 10,
                  fontFamily: "Poppins-Medium",
                  fontSize: width < 350 ? 14 : 16,
                  marginTop: 0,
                  marginTop: 20,
                }}>
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
          }}>
          <View
            style={{
              alignItems: "flex-start",
            }}>
            <Text
              style={{
                fontSize: width < 350 ? 14 : 16,
                fontFamily: "Poppins-Medium",
                color: textColor,
              }}>
              Order Id: {data ? data.id : "Unknown Id"}
            </Text>
            <Text
              style={{
                fontSize: width < 350 ? 13 : 14,
                fontFamily: "Poppins-Medium",
                color: textColor,
                textAlign: "center",
                marginTop: 2,
              }}>
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
            }}>
            <View
              style={{
                width: width / 3,
                height: 50,
                overflow: "hidden",
              }}>
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
              }}>
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
          }}>
          <Text
            style={{
              fontSize: width < 350 ? 16 : 18,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}>
            Service/ Item Name
          </Text>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
            {ListData && ListData.length > 0 ? (
              <Text
                style={{
                  fontSize: width < 350 ? 14 : 16,
                }}>
                {ListData.map((doc, i) => {
                  return `${i == 0 ? "" : ", "}${doc.data.title}`;
                })}
              </Text>
            ) : (
              <Text
                style={{
                  color: "#505050",
                }}>
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
          }}>
          <Text
            style={{
              fontSize: width < 350 ? 18 : 20,
              color: textColor,
              fontFamily: "Poppins-Medium",
            }}>
            Facilities
          </Text>
          {/* <View style={{ marginTop: 10 }}>
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
          </View> */}
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
            {Facilities && Facilities.length > 0 ? (
              <Text
                style={{
                  fontSize: width < 350 ? 14 : 16,
                }}>
                {Facilities.map((doc, i) => {
                  return `${i == 0 ? "" : ", "}${doc.title}`;
                })}
              </Text>
            ) : (
              <Text
                style={{
                  color: "#505050",
                }}>
                N/A
              </Text>
            )}
          </View>
        </View>
        {type != "SUBS" && type != "INSTALLMENT" && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#C0FFD7",
              paddingVertical: 20,
              marginHorizontal: 20,
              marginTop: 20,
            }}>
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
        {type == "INSTALLMENT" && (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#C0FFD7",
              paddingVertical: 20,
              marginVertical: 15,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Pressable
              style={{
                alignItems: "flex-end",
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}>
                <Text
                  style={[styles.text, { fontSize: width < 350 ? 18 : 20 }]}>
                  {installmentData
                    ? installmentData.installmentType.replace(/ly/g, "")
                    : ""}
                  {" 12 x"}
                </Text>

                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: width < 350 ? 18 : 20,
                      width: 90,
                      textAlign: "right",
                    },
                  ]}>
                  {installmentData
                    ? (
                        installmentData.totalAmount /
                        installmentData.installmentCount
                      ).toFixed(2) + "৳"
                    : "Pice is empty"}
                </Text>
              </View>
              {installmentData?.advancedPayment && (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#666666",
                      marginVertical: 5,
                    }}>
                    Advanced Payment
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#666666",
                      marginVertical: 5,
                      textAlign: "right",
                      width: 90,
                    }}>
                    {installmentData?.advancedPaymentAmount}৳
                  </Text>
                </View>
              )}

              <View
                style={{
                  width: 150,
                  height: 1,
                  backgroundColor: "#F1EFEF",
                  marginVertical: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}>
                <Text style={styles.newText}>Total</Text>

                <Text
                  style={[
                    styles.newText,
                    {
                      width: 90,
                      textAlign: "right",
                    },
                  ]}>
                  {installmentData?.totalAmount}৳
                </Text>
              </View>
              <View
                style={{
                  height: 10,
                }}
              />
            </Pressable>
          </View>
        )}
        {type == "SUBS" && (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#C0FFD7",
              paddingVertical: 20,
              marginVertical: 15,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Pressable
              style={{
                alignItems: "flex-end",
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}>
                <Text
                  style={[styles.text, { fontSize: width < 350 ? 18 : 20 }]}>
                  {data ? data.subsData.subscriptionType : ""}
                </Text>

                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: width < 350 ? 18 : 20,
                      width: 80,
                      textAlign: "right",
                    },
                  ]}>
                  {data ? data.subsData.amount + "৳" : "Pice is empty"}
                </Text>
              </View>
              {data.subsData.otherChargeName ? (
                <>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#666666",
                        marginVertical: 5,
                      }}>
                      {data.subsData.otherChargeName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#666666",
                        marginVertical: 5,
                        textAlign: "right",
                        width: 80,
                      }}>
                      {data.subsData.otherChargeAmount}৳
                    </Text>
                  </View>

                  <View
                    style={{
                      width: 150,
                      height: 1,
                      backgroundColor: "#F1EFEF",
                      marginVertical: 10,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}>
                    <Text style={styles.newText}>Total</Text>

                    <Text
                      style={[
                        styles.newText,
                        {
                          width: 80,
                          textAlign: "right",
                        },
                      ]}>
                      {data.subsData.amount +
                        parseInt(
                          data.subsData.otherChargeAmount
                            ? data.subsData.otherChargeAmount
                            : 0
                        )}
                      ৳
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 10,
                    }}
                  />
                </>
              ) : null}
            </Pressable>
          </View>
        )}

        {type == "INSTALLMENT" && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#C0FFD7",
              paddingVertical: 0,
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            <Text
              style={[
                styles.text,
                { fontSize: width < 350 ? 18 : 20, marginBottom: 10 },
              ]}>
              Total Installment
            </Text>
            <Text style={[styles.newText, { marginBottom: 20 }]}>
              {installmentData?.installmentCount}{" "}
              {installmentData.installmentType.replace(/ly/g, "")}
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
              paddingVertical: 0,
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            <Text
              style={[
                styles.text,
                { fontSize: width < 350 ? 18 : 20, marginBottom: 10 },
              ]}>
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
          }}>
          <Text style={[styles.text, { fontSize: width < 350 ? 18 : 20 }]}>
            Delivery Date
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              paddingHorizontal: 20,
            }}>
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
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SubscriptionDates", {
                    subsData: data.subsData,
                    date: data.deliveryDateFrom,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 10,
                    textDecorationLine: "underline",
                  }}>
                  View all delivery date
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {type == "SUBS" && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#C0FFD7",
              paddingVertical: 20,
              marginHorizontal: 20,
            }}>
            <Text style={[styles.text, { fontSize: width < 350 ? 18 : 20 }]}>
              Payment Date
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                paddingHorizontal: 20,
              }}>
              <Text style={[styles.smallText, { flex: 0 }]}>
                {data
                  ? serverTimeToLocalDate(data.deliveryDateFrom)
                  : "Unavailable Date"}{" "}
              </Text>
              <Text
                style={[styles.smallText, { flex: 0, marginHorizontal: 10 }]}>
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
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SubscriptionDates", {
                    subsData: data.subsData,
                    date: data.deliveryDateFrom,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 10,
                    textDecorationLine: "underline",
                  }}>
                  View all payment date
                </Text>
              </TouchableOpacity>
            </View>
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
          }}>
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
              }}>
              <Text
                style={{
                  color: "white",
                  fontSize: width < 350 ? 14 : 15,
                  fontFamily: "Poppins-Medium",
                }}>
                {subsOrder && subsOrder.paid && subsOrder.status != "REFUNDED"
                  ? "Paid"
                  : subsOrder &&
                    subsOrder.paid &&
                    subsOrder.status == "REFUNDED"
                  ? "Refunded"
                  : "Due"}
              </Text>
            </View>
          ) : type == "INSTALLMENT" && installmentOrder ? (
            <View
              style={{
                padding: 3,
                backgroundColor:
                  installmentOrder &&
                  installmentOrder.paid &&
                  installmentOrder.status != "REFUNDED"
                    ? "green"
                    : installmentOrder &&
                      installmentOrder.paid &&
                      installmentOrder.status == "REFUNDED"
                    ? "#FA1ABA"
                    : installmentOrder && !installmentOrder.paid
                    ? "red"
                    : backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                paddingHorizontal: 15,
                marginVertical: 10,
              }}>
              <Text
                style={{
                  color: "white",
                  fontSize: width < 350 ? 14 : 15,
                  fontFamily: "Poppins-Medium",
                }}>
                {installmentOrder &&
                installmentOrder.paid &&
                installmentOrder.status != "REFUNDED"
                  ? "Paid"
                  : installmentOrder &&
                    installmentOrder.paid &&
                    installmentOrder.status == "REFUNDED"
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
              }}>
              <Text
                style={{
                  color: "white",
                  fontSize: width < 350 ? 14 : 15,
                  fontFamily: "Poppins-Medium",
                }}>
                {data && data.paid && data.status != "REFUNDED"
                  ? "Paid"
                  : data && data.paid && data.status == "REFUNDED"
                  ? "Refunded"
                  : "Due"}
              </Text>
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
          }}>
          <Text style={[styles.text, { fontSize: width < 350 ? 16 : 18 }]}>
            Service Status
          </Text>
          {type == "SUBS" && subsOrder ? (
            <Text style={[styles.smallText, { marginTop: 5 }]}>
              {subsOrder ? exporters(subsOrder.status) : "Unknown"}
            </Text>
          ) : type == "INSTALLMENT" && installmentOrder ? (
            <Text style={[styles.smallText, { marginTop: 5 }]}>
              {installmentOrder
                ? exporters(installmentOrder.status)
                : "Unknown"}
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
          }}>
          <Text style={[styles.text, { fontSize: width < 350 ? 20 : 22 }]}>
            Introduction
          </Text>
          <Text style={[styles.smallText, { marginTop: 5, marginBottom: 5 }]}>
            {data && data.description ? data.description : "No details found!"}
          </Text>
          {data && data.attachment && (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(data.attachment);
              }}
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
              }}>
              <AntDesign style={{}} name="file1" size={20} color="black" />
              <Text
                style={{
                  fontSize: 16,
                  color: "#4ADE80",
                  marginRight: 20,
                  marginVertical: 5,
                  marginLeft: 10,
                }}>
                {data.attachment.substring(
                  data.attachment.lastIndexOf("/") + 1
                )}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {type == "SUBS" && subsOrder ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}>
              {subsOrder &&
                (subsOrder.status == "ACCEPTED" ||
                  subsOrder.status == "WAITING_FOR_PAYMENT") && (
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
                              userCancelSubs(user.token, subsOrder.id)
                                .then((res) => {
                                  Toast.show("Successfully request send", {
                                    duration: Toast.durations.LONG,
                                  });
                                  loadDataSubs(
                                    res.data.receiverId,
                                    res.data.order
                                  );
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
                      subsOrder && subsOrder.paid
                        ? "Cancel & Refund"
                        : "Cancel Order"
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
                  }}>
                  <Text
                    style={{
                      fontSize: width < 350 ? 14 : 16,
                      fontFamily: "Poppins-Medium",
                      color: textColor,
                      textAlign: "center",
                      marginTop: 20,
                    }}>
                    If you Received then Click
                  </Text>
                  <IconButton
                    onPress={() => {
                      setLoader(true);
                      receiveSubs(user.token, subsOrder.id)
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
                }}>
                Order Completed
              </Text>
            )}
            {subsOrder.refundRequestByUser && (
              <Text
                style={{
                  color: backgroundColor,
                  textAlign: "center",
                  marginVertical: 20,
                }}>
                You requested for refund
              </Text>
            )}
          </>
        ) : type == "INSTALLMENT" && installmentOrder ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}>
              {installmentOrder &&
                (installmentOrder.status == "ACCEPTED" ||
                  installmentOrder.status == "WAITING_FOR_PAYMENT") && (
                  <IconButton
                    onPress={() => {
                      setLoader(true);
                      //console.log(installmentData)
                      if (index == 0 && installmentData.advancedPayment) {
                        makeAdvancedPaymentInstallment(user.token, data.id)
                          .then((res) => {
                            if (res) {
                              Toast.show("Payment success", {
                                duration: Toast.durations.LONG,
                              });
                              //console.log(res.data)
                              loadDataInstallment(
                                res.data.receiverId,
                                res.data.order
                              );
                            }
                          })
                          .catch((err) => {
                            Toast.show(err.response.data.msg, {
                              duration: Toast.durations.LONG,
                            });
                            setLoader(false);
                          });
                        return;
                      }
                      makePaymentInstallment(
                        user.token,
                        data.id,
                        data.installmentData.installmentType,
                        installmentOrder.dateFrom,
                        installmentOrder.dateTo
                      )
                        .then((res) => {
                          if (res) {
                            Toast.show("Payment success", {
                              duration: Toast.durations.LONG,
                            });
                            //console.log(res.data)
                            loadDataInstallment(
                              res.data.receiverId,
                              res.data.order
                            );
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
              {installmentData &&
                installmentData.status != "REFUNDED" &&
                installmentOrder.status != "CANCELLED" &&
                installmentOrder.status != "DELIVERED" &&
                installmentOrder.status != "COMPLETED" &&
                !installmentOrder.refundRequestByUser && (
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
                              userCancelSubs(user.token, data.id)
                                .then((res) => {
                                  Toast.show("Successfully request send", {
                                    duration: Toast.durations.LONG,
                                  });
                                  loadDataSubs(
                                    res.data.receiverId,
                                    res.data.order
                                  );
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
                      installmentData && installmentData.paid
                        ? "Cancel & Refund"
                        : "Cancel Order"
                    }
                  />
                )}
            </View>

            {installmentOrder && installmentOrder.status == "COMPLETED" && (
              <Text
                style={{
                  color: "green",
                  fontSize: width < 350 ? 14 : 16,
                  fontFamily: "Poppins-Medium",
                  textAlign: "center",
                  marginVertical: 20,
                }}>
                Order Completed
              </Text>
            )}
            {installmentOrder.refundRequestByUser && (
              <Text
                style={{
                  color: backgroundColor,
                  textAlign: "center",
                  marginVertical: 20,
                }}>
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
                  }}>
                  <Text
                    style={{
                      fontSize: width < 350 ? 14 : 16,
                      color: textColor,
                      fontFamily: "Poppins-Medium",
                    }}>
                    Vendor Request Delivery Date
                  </Text>
                  <Text
                    style={{
                      fontSize: width < 350 ? 14 : 16,
                      color: textColor,
                      fontFamily: "Poppins-Medium",
                    }}>
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
              }}>
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
                }}>
                <Text
                  style={{
                    fontSize: width < 350 ? 14 : 16,
                    fontFamily: "Poppins-Medium",
                    color: textColor,
                    textAlign: "center",
                    marginTop: 20,
                  }}>
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
                }}>
                Order Completed
              </Text>
            )}
            {data.refundRequestByUser && (
              <Text
                style={{
                  color: backgroundColor,
                  textAlign: "center",
                  marginVertical: 20,
                }}>
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
      return {
        title: "Request pending",
        color: "#7566FF",
      };
    case "ACCEPTED":
      return {
        title: "Order Accepted",
        color: "#4ADE80",
      };
    case "WAITING_FOR_PAYMENT":
      return {
        title: "Order Accepted",
        color: "#4ADE80",
      };
    case "PROCESSING":
      return {
        title: "Processing",
        color: "#4ADE80",
      };
    case "DELIVERED":
      return {
        title: "Delivered",
        color: "#4ADE80",
      };
    case "REFUNDED":
      return {
        title: "Failed",
        color: "#EC2700",
      };
    case "CANCELLED":
      return {
        title: "Failed",
        color: "#EC2700",
      };
    case "COMPLETED":
      return {
        title: "Delivered",
        color: "#4ADE80",
      };
    default:
      return {
        title: "Unknown",
        color: "#000000",
      };
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  textContainer: {
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#FAFAFA",
  },
  button: {
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 4,
    height: 40,
    marginHorizontal: 20,
    marginBottom: 32,
  },
  font:{
    fontSize:16,
    fontWeight:"500",
    textAlign:"center",
    marginBottom:32,
    color:"#EC2700"
  }
});
