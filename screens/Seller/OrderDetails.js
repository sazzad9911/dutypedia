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
  RefreshControl,
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
  getDutyFee,
} from "../../Class/service";
import Barcode from "./../../components/Barcode";
import { convertServerFacilities, serverToLocal } from "../../Class/dataConverter";
import Toast from "react-native-root-toast";
import { TouchableOpacity } from "react-native-gesture-handler";
import { socket } from "../../Class/socket";
import IconButton from "../../components/IconButton";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityLoader from "../../components/ActivityLoader";
import {
  localTimeToServerDate,
  serverTimeToLocalDate,
  wait,
} from "../../action";
import InfoCart from "./OrderScript/InfoCart";
import OrderInfo from "./OrderScript/OrderInfo";
import StatusCart from "./OrderScript/StatusCart";
import { createConversation } from "../../Class/message";
import { useIsFocused } from "@react-navigation/native";
import AmarPay from "./OrderScript/AmarPay";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import ReceiptSkeleton from "../../components/ReceiptSkeleton";

const OrderDetails = ({ navigation, route }) => {
  const orderId = route?.params?.orderId;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
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
  const [data, setData] = React.useState();
  const [Loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();
  const type = route?.params?.type;
  const sOrder =
    route.params && route.params.subsOrder ? route.params.subsOrder : null;
  const index = route.params && route.params.index ? route.params.index : 0;
  const [subsOrder, setSubsOrder] = useState(sOrder);
  const [installmentOrder, setInstallmentOrder] = useState(sOrder);
  const installmentData = data?.installmentData;
  const isFocused = useIsFocused();
  const [amarpay, setAmarPay] = useState(false);
  const [dutyFee, setDutyFee] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    
    wait(1000).then(() => setRefreshing(false));
  }, []);
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
  useEffect(() => {
    if (orderId&&isFocused) {
      setLoader(false);
      dataLoader(orderId);
    }else{
      setLoader(false);
    }
  }, [orderId,refreshing,isFocused]);
  React.useEffect(() => {
    //console.log(data.selectedServices);
    //console.warn(subsOrder)
    if (data) {
      
     setListData(data.selectedServices)
    }
    if (
      data &&
      data.facilites &&
      Array.isArray(data.facilites.selectedOptions)
    ) {
      setFacilities(convertServerFacilities(data.facilites));
    } else if (data && Array.isArray(data.facilites)) {
      setFacilities(data.facilites);
    }
    if (data && data.type == "PACKAGE") {
      setFacilities(data.selectedPackage?.features);
    }
    //console.log(data.selectedPackage)
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
  const dataLoader = async (id) => {
    try {
      const res = await getSubsOrderById(user.token, id);
      setData(res.data.order);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.error(err.message);
    }
  };
  React.useEffect(() => {
    socket.on("updateOrder", (e) => {
      if(orderId){
        dataLoader(orderId);
      }
    });
    return () => {
      socket?.off("updateOrder");
    };
  }, []);
  useEffect(() => {
    if (data?.id && isFocused) {
      //console.log(data.id)
      // dataLoader()
      dataLoader(data?.id);
    }
  }, [isFocused]);

  const callPayment = () => {
    // navigation.navigate("PaymentStatus",{type:true})
    // return
    setLoader(true);
    payRequest(user.token, data?.id)
      .then((res) => {
        setLoader(false);
        setAmarPay(res.data.url);
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
  //console.log(data?.cancelledBy)
  const confirmDelivery = () => {
    navigation.navigate("ClintFeedBack", { order: data });
  };

  if (Loader || !data) {
    return <ReceiptSkeleton />;
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              //setPageChange(true);
              setLoader(true);
              onRefresh();
            }}
          />
        }
        showsVerticalScrollIndicator={false}>
        <InfoCart
          onClick={() => {
            navigation.navigate("OtherProfile", {
              serviceId: data ? data.service.id : null,
              data: data,
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
          name={`${data.service.providerInfo.name}`}
          position={data?.service?.providerInfo?.position}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {initialState.filter((d) => d.type.match(data.type))[0].title}{" "}
            {data?.type=="PACKAGE"?`- ${data?.selectedPackage?.name}`:"service"}
          </Text>
        </View>
        <OrderInfo
          title={data?.gigTitle}
          facilities={Facilities}
          services={ListData}
          orderId={data?.id}
          date={data?.createdAt}
          type={data?.type}
        />
        <StatusCart
          onPress={() => {
            navigation.navigate("ImportantNotice", {
              name: `${data?.user?.name}`,
            });
          }}
          price={data?.offerPrice ? data?.offerPrice : data?.amount}
          paid={data?.paid}
          status={data?.status}
          onMore={() => {
            navigation.navigate("ImportantNotice", {
              name: `${data?.user?.name}`,
              type: "FAILED",
            });
          }}
          onDelivered={() => {
            navigation.navigate("ImportantNotice", {
              name: `${data?.user?.name}`,
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
          type={data?.type}
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
                name: `${data?.user?.name}`,
              });
            }}
            style={styles.button}
            title={"Cancel order"}
          />
        )}
        {data?.status == "DELIVERED" && (
          <View>
            <Text
              style={[styles.text, { marginBottom: 12, marginHorizontal: 20 }]}>
              Click 'Recived' or Auto-Receive in 72 Hours
            </Text>
            <IconButton
              onPress={confirmDelivery}
              active={true}
              style={[styles.button]}
              title={"Received"}
            />
          </View>
        )}
        {data?.cancelledBy ? (
          <Text style={styles.font}>
            {data.cancelledBy == "USER"
              ? "You cancelled the order"
              : "Seller cancelled the order"}
          </Text>
        ) : !data.cancelledBy && exporters(data?.status).title == "Failed" ? (
          <Text style={styles.font}>Delivery date has expired</Text>
        ) : (
          <></>
        )}
        {data?.status == "COMPLETED" && (
          <Text style={[styles.font, { color: "#4ADE80" }]}>
            Order Completed
          </Text>
        )}
      </ScrollView>
      <Modal animationType="slide" visible={Boolean(amarpay)}>
        <AmarPay
          onClose={() => setAmarPay()}
          order={data}
          url={amarpay}
          navigation={navigation}
        />
      </Modal>
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
  font: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 32,
    color: "#EC2700",
  },
});
