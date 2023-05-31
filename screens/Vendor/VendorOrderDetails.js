import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Alert,
  TouchableOpacity,
  Platform,
  Linking,
  Pressable,
  RefreshControl,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Color } from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import Button from "./../../components/Button";
const { width, height } = Dimensions.get("window");
import {
  cancelOrder,
  completeOrderDelivery,
  getOrders,
  requestForTime,
  orderRefound,
  getMemberId,
  deliverySubs,
  refoundSubs,
  vendorCancelSubs,
  getSubsOrderById,
  acceptRefoundSubs,
  rejectRefoundSubs,
  vendorCancelInstallment,
  rejectRefoundInstallment,
  refoundInstallment,
  cancelRequestDate,
} from "../../Class/service";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Barcode from "./../../components/Barcode";
import IconButton from "./../../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { convertServerFacilities, serverToLocal } from "../../Class/dataConverter";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { CheckBox } from "../Seller/Pricing";
import {
  convertDate,
  dateConverter,
  dateDifference,
  serverTimeToLocalDate,
  wait,
} from "../../action";
import { socket } from "../../Class/socket";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import ActivityLoader from "../../components/ActivityLoader";
import InfoCart from "../Seller/OrderScript/InfoCart";
import OrderInfo from "../Seller/OrderScript/OrderInfo";
import StatusCart from "../Seller/OrderScript/StatusCart";
import ReceiptSkeleton from "../../components/ReceiptSkeleton";

const OrderDetails = ({ navigation, route }) => {
  const orderId = route?.params?.orderId;
  const isDark = useSelector((state) => state.isDark);
  const dispatch = useDispatch();
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
  const [ListData, setListData] = React.useState([]);
  const [Facilities, setFacilities] = React.useState([]);
  const ListSelection = useSelector((state) => state.ListSelection);
  const [ServiceError, setServiceError] = React.useState();
  const [FacilitiesError, setFacilitiesError] = React.useState();
  const ref = React.useRef();
  const [Loader, setLoader] = React.useState(false);
  const vendor = useSelector((state) => state.vendor);
  const [data, setData] = React.useState();
  //console.log(data.type);
  const orderSocket = useSelector((state) => state.orderSocket);
  const type = route?.params?.type;
  const sOrder =
    route.params && route.params.subsOrder ? route.params.subsOrder : null;
  const [refreshing,setRefreshing]=useState(false)
  const [MemberId, setMemberId] = React.useState();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if(!data||!data?.selectedServices){
      setListData([])
      dispatch({type:"SET_LIST_SELECTION",playload:[]})
    }
    if(!data?.facilites){
      setFacilities([])
    }
    wait(1000).then(() => setRefreshing(false));
  }, []);  
  const isFocused=useIsFocused()
  useFocusEffect(
    React.useCallback(() => {
      return setListData(ListSelection);
    }, [ListSelection])
  );
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
  const validate = () => {
    setServiceError(null);
    setFacilitiesError(null);
    if (data.type == "ONETIME") {
      navigation.navigate("AcceptOrder", {
        facilities: Facilities,
        id: data.id,
        data: data,
      });
      return;
    }
    // if (ListSelection.length == 0) {
    //   Alert.alert("*There at list one service required");

    //   return;
    // }
    if (ListData.length == 0) {
      setServiceError("*There at list one service required");
      ref?.current?.scrollTo({ y: 200 });
      return;
    }
    navigation.navigate("AcceptOrder", {
      facilities: Facilities,
      id: data.id,
      data: data,
    });
  };
  React.useState(() => {
    //console.log("------")
    //console.warn(data.user.id)
    //console.log(vendor.service.id)
    if (data) {
      getMemberId(user.token, vendor.service.id, data.user.id)
        .then((res) => {
          setMemberId(res.data.member);
          //console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    }
  }, [orderSocket, data]);

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
  const addService = () => {
    const gigs = data.service.gigs.filter((d) => d.type == "STARTING");
    dispatch({
      type: "SET_NEW_LIST_DATA",
      playload: serverToLocal(
        gigs[0].services.options,
        gigs[0].services.category
      ),
    });
    navigation.navigate("AddServiceList", {
      NewDataList: serverToLocal(
        gigs[0].services.options,
        gigs[0].services.category
      ),
      facilites: gigs[0].facilites.selectedOptions,
      setListData: setListData,
      name: "VendorOrderDetails",
      data: data,
      setFacilities: setFacilities,
      facilities: true,
    });
  };
  const cancelRequest = async () => {
    //const res=
    setLoader(true);
    try {
      await cancelRequestDate(user.token, data.id);
      setLoader(false);
      socket.emit("updateOrder", {
        receiverId: data.user.id,
        order: data,
      });
      socket.emit("updateOrder", {
        receiverId: user.user.id,
        order: data,
      });
    } catch (err) {
      setLoader(false);
      Alert.alert(err.message);
    }
  };

  if (Loader || !data) {
    return <ReceiptSkeleton />;
  }
  //console.log(data?.orderedBy)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              //setPageChange(true);
              setLoader(true)
              onRefresh();
            }}
          />
        } ref={ref} showsVerticalScrollIndicator={false}>
        <InfoCart
          vendor={true}
          onClick={() => {
            navigation.navigate("UserProfile", {
              user: {
                user: data.user,
                userId: data.user.id,
              },
            });
          }}
          onMessage={() => {
            let newUser = {
              userId: data.user.id,
              user: data.user,
            };
            //createConversation()
            navigation.navigate("ChatScreen", {
              data: {
                users: [newUser],
              },
              username: data.user.username,
              serviceId: data?.service?.id,
            });
          }}
          onAgreement={() => {
            navigation.navigate("ServiceAgreement", { data: data?.agreement });
          }}
          paid={data?.paid}
          username={data?.user.username}
          uri={data?.user?.profilePhoto}
          name={`${data?.user?.name}`}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {initialState.filter((d) => d.type.match(data.type))[0].title}{" "}
            {data?.type=="PACKAGE"?`- ${data?.selectedPackage?.name}`:"service"}
          </Text>
        </View>
        <OrderInfo
          vendor={true}
          title={data?.gigTitle}
          facilities={Facilities}
          services={ListData}
          orderId={data?.id}
          date={data?.createdAt}
          onAddService={addService}
          status={data?.status}
          serviceError={ServiceError}
          type={data?.type}
        />
        <StatusCart
          vendor={true}
          onPress={() => {
            navigation.navigate("ImportantNotice", {
              name: `${user?.user?.name}`,
            });
          }}
          price={data?.offerPrice ? data?.offerPrice : data?.amount}
          paid={data?.paid}
          status={data?.status}
          onMore={() => {
            navigation.navigate("ImportantNotice", {
              name: `${user?.user?.name}`,
              type: "FAILED",
            });
          }}
          onDelivered={() => {
            navigation.navigate("ImportantNotice", {
              name: `${user?.user?.name}`,
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
          onCancel={cancelRequest}
          type={data?.type}
          orderedBy={data?.orderedBy}
        />
        {data?.status == "ACCEPTED" && (
          <Text style={[styles.font, { marginBottom: 8, color: "#4ADE80" }]}>
            Order accepted
          </Text>
        )}
        {data?.status == "DELIVERED" ||
          (data?.status == "COMPLETED" && (
            <Text style={[styles.font, { marginBottom: 32, color: "#4ADE80" }]}>
              Completed
            </Text>
          ))}
        {data?.cancelledBy ? (
          <Text style={styles.font}>
            {data.cancelledBy == "USER"
              ? "Buyer canceled this order"
              : "You cancelled the order"}
          </Text>
        ) : !data.cancelledBy && exporters(data?.status).title == "Failed" ? (
          <Text style={styles.font}>Delivery date has expired</Text>
        ) : (
          <></>
        )}
        {data?.status == "WAITING_FOR_ACCEPT" && (
          <IconButton
            onPress={validate}
            active={true}
            style={[styles.button, { marginBottom: 0 }]}
            title={"Accept order"}
          />
        )}
        {data?.status == "PROCESSING" && (
          <View>
            <Text
              style={[
                styles.text,
                { marginBottom: 12, marginHorizontal: 20, textAlign: "left" },
              ]}>
              click <Text style={{ color: "#4CD964" }}>yes i delivered</Text> if
              you already delivered your order
            </Text>
            <IconButton
              onPress={() => {
                navigation.navigate("OrderDelivery", { order: data });
              }}
              active={true}
              style={[styles.button, { marginBottom: 0 }]}
              title={"Yes I delivered"}
            />
          </View>
        )}
        {data?.status == "PROCESSING" && !data.requestedDeliveryDate && (
          <IconButton
            onPress={() => {
              navigation.navigate("NeedExtraTIme", { data: data });
            }}
            style={[styles.button, { marginTop: 12, marginBottom: 0 }]}
            title={"Need extra time"}
          />
        )}
        {data?.status == "WAITING_FOR_ACCEPT" ||
        data?.status == "ACCEPTED" ||
        data?.status == "PROCESSING" ? (
          <IconButton
            onPress={() => {
              navigation.navigate("CancelOrderConfirmation", {
                order: data,
                name: `${user?.user?.name}`,
              });
            }}
            style={[styles.button, { marginTop: 12 }]}
            title={"Cancel order"}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
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
        title: "Completed",
        color: "#4ADE80",
      };
    default:
      return {
        title: "Unknown",
        color: "#000000",
      };
  }
};
const attachmentIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12.643" height="17.152" viewBox="0 0 12.643 17.152">
<g id="_000000ff" data-name="#000000ff" transform="translate(-16.818)">
  <path id="Path_27803" data-name="Path 27803" d="M16.9,0h6.521a2.254,2.254,0,0,1,1.114.627q2.109,2.107,4.218,4.216a2.1,2.1,0,0,1,.658,1.069A11.016,11.016,0,0,1,29.456,7.5q0,4.422,0,8.843a6.834,6.834,0,0,1-.076.809H16.914a7.326,7.326,0,0,1-.088-1.747c0-1.785,0-3.57,0-5.355a4.882,4.882,0,0,1,.064-1.162.263.263,0,0,1,.431.239c.025,2.507,0,5.016.011,7.524q5.811,0,11.623,0,0-4.639,0-9.277a9.431,9.431,0,0,0-.04-1.348,1.2,1.2,0,0,0-1.1-.981c-1.12-.059-2.246.038-3.366-.051-.059-1.114.013-2.228-.036-3.341A1.249,1.249,0,0,0,23.139.507C21.2.489,19.265.505,17.328.5q0,3.232,0,6.464a8.5,8.5,0,0,1-.036,1.24.278.278,0,0,1-.413.05,2.7,2.7,0,0,1-.06-.614c.009-1.966,0-3.93.005-5.9A9.6,9.6,0,0,1,16.9,0m8.035,1.743q0,1.387,0,2.777,1.389,0,2.779,0Q26.324,3.129,24.932,1.743Z"/>
</g>
</svg>
`;
