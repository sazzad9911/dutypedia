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
  getOfflineOrders,
  makeOfflinePayment,
  completeOfflineOrderDelivery,
  changeOfflineOrderDateDelivery,
  makePaymentOfflineSubscription,
  cancelOfflineSubs,
  getSubsOfflineOrderById,
  completeOfflineSubs,
  cancelOfflineInstallment,
  makeOfflineAdvancedPaymentInstallment,
  makeOfflinePaymentInstallment,
} from "../../Class/service";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Barcode from "./../../components/Barcode";
import IconButton from "./../../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { serverToLocal } from "../../Class/dataConverter";
import { useFocusEffect } from "@react-navigation/native";
import { CheckBox } from "../Seller/Pricing";
import {
  convertDate,
  dateConverter,
  dateDifference,
  serverTimeToLocalDate,
} from "../../action";
import { socket } from "../../Class/socket";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { setOfflineOrders } from "../../Reducers/offlineOrders";

const VendorOfflineOrderDetails = ({ navigation, route }) => {
  const newData = route.params && route.params.data ? route.params.data : null;
  const isDark = useSelector((state) => state.isDark);
  const dispatch = useDispatch();
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
      borderBottomColor: "#F1EFEF",
      justifyContent: "center",
    },
    text: {
      fontSize: width < 350 ? 18 : 20,
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
  const ListSelection = useSelector((state) => state.ListSelection);
  const [ServiceError, setServiceError] = React.useState();
  const [FacilitiesError, setFacilitiesError] = React.useState();
  const ref = React.useRef();
  const [Loader, setLoader] = React.useState(false);
  const vendor = useSelector((state) => state.vendor);
  const [data, setData] = React.useState(newData);
  const [Refound, setRefound] = React.useState(false);
  const [RefoundDate, setRefoundDate] = React.useState();
  //console.log(data.type);
  const orderSocket = useSelector((state) => state.orderSocket);
  const vendorOrders = useSelector((state) => state.vendorOrders);
  const [Refresh, setRefresh] = React.useState(false);
  const [MemberId, setMemberId] = React.useState();
  const type = newData.type;
  const sOrder =
    route.params && route.params.subsOrder ? route.params.subsOrder : null;
  const index = route.params && route.params.index ? route.params.index : 0;
  const [subsOrder, setSubsOrder] = useState(sOrder);
  const installmentData = data.installmentData ? data.installmentData : null;
  const [installmentOrder, setInstallmentOrder] = useState(sOrder);
  const userInfo = route?.params?.userInfo;
  //console.log(sOrder)

  //console.log(index)
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
    //console.log(date.getDate());
    return `${date.getDate()}th ${
      Months[date.getMonth()]
    } ${date.getFullYear()}`;
  };
  useFocusEffect(
    React.useCallback(() => {
      return setListData(ListSelection);
    }, [ListSelection])
  );
  React.useEffect(() => {
    //console.log(data.selectedServices);
    //console.warn(subsOrder)
    try {
      if (data && data.selectedServices && data.selectedServices.category) {
        setListData(
          serverToLocal(
            data.selectedServices.options,
            data.selectedServices.category
          )
        );
        dispatch({
          type: "SET_LIST_SELECTION",
          playload: serverToLocal(
            data.selectedServices.options,
            data.selectedServices.category
          ),
        });
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
        dispatch({ type: "SET_LIST_SELECTION", playload: arr });
      } else if (data && data.selectedServices) {
        setListData(
          serverToLocal(data.selectedServices, data.service.category)
        );
        dispatch({
          type: "SET_LIST_SELECTION",
          playload: serverToLocal(data.selectedServices, data.service.category),
        });
      }
    } catch (e) {
      console.warn(e.message);
    }
    if (data && data.facilites && Array.isArray(data.facilites)) {
      setFacilities(data.facilites);
    }
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
    if (ListSelection.length == 0) {
      setServiceError("*There at list one service required");
      ref.current.scrollTo({ y: 200 });
      return;
    }
    // if (Facilities.length == 0) {
    //   setFacilitiesError("*There at list one facility required");
    //   ref.current.scrollTo({ y: 400 });
    //   return;
    // }
    navigation.navigate("AcceptOrder", {
      facilities: Facilities,
      id: data.id,
      data: data,
    });
  };

  const loadData = (res) => {
    setData(res.data.order)
    getOfflineOrders(user.token,vendor.service.id).then(res=>{
      dispatch(setOfflineOrders(res.data.orders))
      setLoader(false);
    }).catch(err=>{
      setLoader(false);
      console.error(err.response.data.msg)
    })
    
  };
  const loadDataSubs = async () => {
    if (index == null) {
      Alert.alert("Some thing went wrong");
      setLoader(false);
      return;
    }
    try {
      //const vendorRes = await getOrders(user.token, "vendor", order.service.id);
      //const userRes = await getOrders(user.token, "user");
      const res = await getSubsOfflineOrderById(user.token, data.id);
      //dispatch({ type: "USER_ORDERS", playload: res.data.orders });
      //let userArr = userRes.data.orders.filter((o) => o.id == order.id);
      //let vendorArr = vendorRes.data.orders.filter((o) => o.id == order.id);
      setData(res.data.order);
      setSubsOrder(res.data.order.subsOrders[index]);
      //route.params.onRefresh();
      setLoader(false);
    } catch (e) {
      console.warn(e.message);
    }
    getOfflineOrders(user.token,vendor.service.id).then(res=>{
      dispatch(setOfflineOrders(res.data.orders))
      setLoader(false);
    }).catch(err=>{
      setLoader(false);
      console.error(err.response.data.msg)
    })
  };
  const loadDataInstallment = async () => {
    if (index == null) {
      Alert.alert("Some thing went wrong");
      setLoader(false);
      return;
    }
    try {
      //const vendorRes = await getOrders(user.token, "vendor", order.service.id);
      //const userRes = await getOrders(user.token, "user");
      const res = await getSubsOfflineOrderById(user.token, data.id);
      //dispatch({ type: "USER_ORDERS", playload: res.data.orders });
      //let userArr = userRes.data.orders.filter((o) => o.id == order.id);
      //let vendorArr = vendorRes.data.orders.filter((o) => o.id == order.id);
      setData(res.data.order);
      setInstallmentOrder(res.data.order.installmentOrders[index]);
      //route.params.onRefresh();
      setLoader(false);
    } catch (e) {
      console.warn(e.message);
    }
    getOfflineOrders(user.token,vendor.service.id).then(res=>{
      dispatch(setOfflineOrders(res.data.orders))
      setLoader(false);
    }).catch(err=>{
      setLoader(false);
      console.error(err.response.data.msg)
    })
  };

  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            flexDirection: "row",
            alignItems: "center",
          }}>
          <TouchableOpacity
            onPress={() => {
              if (userInfo) {
                navigation.navigate("OfflineProfile", { user: userInfo });
              } else {
                Alert.alert(
                  "Opps!",
                  "This user is not  into your member list. Accept order to add into member list."
                );
              }
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
            {userInfo && userInfo.profilePhoto ? (
              <Image
                style={{
                  width: 70,
                  height: 70,
                }}
                source={{ uri: userInfo.profilePhoto }}
              />
            ) : (
              <FontAwesome name="user" size={50} color={assentColor} />
            )}
          </TouchableOpacity>
          <View
            style={{
              marginLeft: 15,
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: width < 350 ? 16 : 18,
                fontFamily: "Poppins-Medium",
                color: textColor,
              }}>
              {userInfo ? `${userInfo.name}` : "--"}{" "}
            </Text>
            <Text>
              {userInfo ? `${userInfo.gender.toUpperCase()}` : "(-)"}
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
            paddingHorizontal: 10,
            marginVertical: 20,
            flexDirection: "row",
          }}>
          <View>
            <Text
              style={{
                fontSize: width < 350 ? 14 : 16,
                fontFamily: "Poppins-Medium",
                color: textColor,
              }}>
              Order Id: {data ? data.id : "Unknown Id"}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
            }}>
            <View
              style={{
                width: width / 3,
                height: 50,
                overflow: "hidden",
              }}>
              <Barcode
                height="50"
                width="150"
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
        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: width < 350 ? 18 : 20,
                fontFamily: "Poppins-Medium",
                color: textColor,
              }}>
              Service/Item Name
            </Text>

            <Text
              style={{
                fontSize: width < 350 ? 13 : 14,
                fontFamily: "Poppins-Medium",
                color: textColor,
                textAlign: "center",
              }}>
              Date:{" "}
              {data && data.createdAt
                ? stringDate(data.createdAt)
                : "Unavailable Date"}
            </Text>
          </View>
          <View
            style={{
              height: 0,
              backgroundColor: "#ECECEC",
              marginVertical: 10,
            }}
          />
          <Text
            style={[
              styles.smallText,
              { fontSize: width < 350 ? 14 : 16, marginBottom: 5 },
            ]}>
            Add What Service Do You Want To Sell
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {ListData && ListData.length > 0 && (
              <Text
                style={{
                  color: "#606060",
                  fontSize: width < 350 ? 14 : 16,
                }}>
                {ListData.map((doc, i) => {
                  return i == 0 ? doc.data.title : `, ${doc.data.title}`;
                })}
              </Text>
            )}
            {ListData.length == 0 && (
              <Text
                style={{ color: "#606060", fontSize: width < 350 ? 16 : 18 }}>
                N/A
              </Text>
            )}
          </View>
          {data &&
            data.status == "WAITING_FOR_ACCEPT" &&
            data.type != "ONETIME" &&
            data.type != "PACKAGE" &&
            type != "SUBS" &&
            type != "INSTALLMENT" && (
              <IconButton
                onPress={() => {
                  if (data.service.gigs[0].services.category) {
                    dispatch({
                      type: "SET_NEW_LIST_DATA",
                      playload: serverToLocal(
                        data.service.gigs[0].services.options,
                        data.service.gigs[0].services.category
                      ),
                    });
                    navigation.navigate("AddServiceList", {
                      NewDataList: serverToLocal(
                        data.service.gigs[0].services.options,
                        data.service.gigs[0].services.category
                      ),
                      facilites: data.service.gigs[0].facilites.selectedOptions,
                      setListData: setListData,
                      name: "VendorOrderDetails",
                      data: data,
                    });
                  } else {
                    dispatch({
                      type: "SET_NEW_LIST_DATA",
                      playload: serverToLocal(
                        data.service.gigs[0].services,
                        data.service.gigs[0].dashboard
                      ),
                    });
                    navigation.navigate("AddServiceList", {
                      NewDataList: serverToLocal(
                        data.service.gigs[0].services,
                        data.service.gigs[0].dashboard
                      ),
                      facilites: data.service.gigs[0].facilites.selectedOptions,
                      setListData: setListData,
                      name: "VendorOrderDetails",
                      data: data,
                    });
                  }
                }}
                style={{
                  borderWidth: 1,
                  borderColor: "#e5e5e5",
                  borderRadius: 5,
                  height: 30,
                  width: 80,
                  marginVertical: 20,
                }}
                LeftIcon={() => (
                  <AntDesign name="plus" size={24} color={textColor} />
                )}
                title={"Add"}
              />
            )}

          {ServiceError && <Text style={{ color: "red" }}>{ServiceError}</Text>}
          <View
            style={{
              height: 0,
              backgroundColor: "#ECECEC",
              marginVertical: 10,
            }}
          />
        </View>
        {type == "BARGAINING" ? (
          <View style={{ paddingHorizontal: 10 }}>
            <Text
              style={{
                fontSize: width < 350 ? 18 : 20,
                fontFamily: "Poppins-Medium",
                color: textColor,
                marginVertical: 10,
              }}>
              Extra Facilities
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
              }}>
              {data &&
              data.status == "WAITING_FOR_ACCEPT" &&
              data.type != "ONETIME" &&
              data.type != "PACKAGE"
                ? data &&
                  data.service.gigs[0].facilites.selectedOptions &&
                  data.service.gigs[0].facilites.selectedOptions.map(
                    (doc, i) => (
                      <CheckBox
                        key={i}
                        style={{ width: "70%", marginBottom: 10 }}
                        value={
                          Facilities.filter((d) => d.title == doc.title)
                            .length > 0
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          if (
                            Facilities.filter((d) => d.title == doc.title)
                              .length > 0
                          ) {
                            setFacilities((val) =>
                              val.filter((d) => d.title != doc.title)
                            );
                          } else {
                            setFacilities((val) => [...val, doc]);
                          }
                        }}
                        title={doc.title}
                      />
                    )
                  )
                : data &&
                  data.service.gigs[0].facilites.selectedOptions &&
                  data.service.gigs[0].facilites.selectedOptions.map(
                    (doc, i) => (
                      <Text
                        key={i}
                        style={{
                          width: "100%",
                          marginTop: 5,
                        }}>{`${i + 1}. ${doc.title}`}</Text>
                    )
                  )}
              {FacilitiesError && (
                <Text style={{ color: "red", fontSize: width < 350 ? 14 : 16 }}>
                  {FacilitiesError}
                </Text>
              )}
            </View>
          </View>
        ) : (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#C0FFD7",
              paddingVertical: 20,
              marginHorizontal: 10,
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
        )}

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
        <View style={{ height: 10 }} />
        {type == "SUBS" && subsOrder ? (
          <>
            <View style={{ marginHorizontal: 20 }}>
              {subsOrder.status == "PROCESSING" &&
                !subsOrder.requestedDeliveryDate &&
                !subsOrder.refundRequestByUser &&
                !subsOrder.requestedDeliveryDate &&
                subsOrder.status != "DELIVERED" &&
                subsOrder.status != "COMPLETED" &&
                subsOrder.status != "REFUNDED" &&
                subsOrder.status != "CANCELLED" && (
                  <Text
                    style={{
                      fontSize: width < 350 ? 14 : 16,
                      color: textColor,
                    }}>
                    When Delivered The Order Then Click
                  </Text>
                )}
              {subsOrder.status == "PROCESSING" &&
                !subsOrder.requestedDeliveryDate &&
                !subsOrder.refundRequestByUser &&
                !subsOrder.requestedDeliveryDate &&
                subsOrder.status != "DELIVERED" &&
                subsOrder.status != "COMPLETED" &&
                subsOrder.status != "REFUNDED" &&
                subsOrder.status != "CANCELLED" && (
                  <IconButton
                    onPress={() => {
                      try {
                        setLoader(true);
                        completeOfflineSubs(user.token, subsOrder.id)
                          .then((res) => {
                            loadDataSubs();
                          })
                          .catch((err) => {
                            setLoader(false);
                            console.warn(err.message);
                          });
                      } catch (e) {
                        console.warn(e.message);
                      }
                    }}
                    style={{
                      backgroundColor: "#4ADE80",
                      borderRadius: 5,
                      marginVertical: 10,
                      borderWidth: 0,
                      marginRight: 20,
                      width: 130,
                      fontSize: 16,
                      padding: 10,
                      height: 40,
                    }}
                    title="Yes I Delivered"
                  />
                )}
            </View>
            
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}>
              {subsOrder.status === "WAITING_FOR_PAYMENT" && (
                <IconButton
                  onPress={() => {
                    //console.log(subsOrder)
                    makePaymentOfflineSubscription(user.token,data.id,data.subsData.subscriptionType,
                      subsOrder.dateFrom,subsOrder.dateTo).then(res=>{
                        loadDataSubs()
                      }).catch(err=>{
                        console.warn(err.response.data.msg)
                      })
                  }}
                  style={{
                    backgroundColor: "#4ADE80",
                    borderRadius: 5,
                    alignSelf: "flex-end",
                    marginVertical: 30,
                    borderWidth: 0,
                    marginRight: 20,
                    width: 100,
                    height: 40,
                  }}
                  title="Make It Paid"
                />
              )}
              {subsOrder.status != "CANCELLED" &&
                subsOrder.status != "DELIVERED" &&
                subsOrder.status != "REFUNDED" &&
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
                              cancelOfflineSubs(user.token, subsOrder.id)
                                .then((res) => {
                                  //console.log(res.data);
                                  loadDataSubs()
                                })
                                .catch((err) => {
                                  setLoader(false);
                                  console.warn(err.response.data.msg);
                                });
                            },
                          },
                        ]
                      );
                    }}
                    style={{
                      backgroundColor: primaryColor,
                      borderRadius: 5,
                      alignSelf: "flex-end",
                      marginVertical: 30,
                      borderWidth: 0,
                      marginRight: 10,
                      borderColor: backgroundColor,
                      borderWidth: 1,
                      color: backgroundColor,
                      width: 100,
                      height: 40,
                    }}
                    title="Cancel"
                  />
                )}
            </View>

            {subsOrder && subsOrder.status == "REFUNDED" && (
              <Text
                style={{
                  color: backgroundColor,
                  fontSize: width < 350 ? 14 : 16,
                  fontFamily: "Poppins-Medium",
                  textAlign: "center",
                  marginHorizontal: 20,
                  marginVertical: 20,
                }}>
                Order Refund
              </Text>
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
          </>
        ) : type == "INSTALLMENT" && installmentOrder ? (
          <>
            
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}>
                {installmentOrder &&
                (installmentOrder.status == "ACCEPTED" ||
                  installmentOrder.status == "WAITING_FOR_PAYMENT") && (
                  <IconButton
                    onPress={() => {
                      setLoader(true);
                      //console.log(installmentData)
                      if (index == 0&&installmentData.advancedPayment) {
                        makeOfflineAdvancedPaymentInstallment(user.token, data.id)
                          .then((res) => {
                            if (res) {
                              Alert.alert("Payment success")
                              
                              //console.log(res.data)
                              loadDataInstallment(
                                res.data.receiverId,
                                res.data.order
                              );
                            }
                          })
                          .catch((err) => {
                            Alert.alert(err.response.data.msg)
                            
                            setLoader(false);
                          });
                        return;
                      }
                      makeOfflinePaymentInstallment(
                        user.token,
                        data.id,
                        data.installmentData.installmentType,
                        installmentOrder.dateFrom,
                        installmentOrder.dateTo
                      )
                        .then((res) => {
                          if (res) {
                            Alert.alert("Payment success")
                            //console.log(res.data)
                            loadDataInstallment(
                              res.data.receiverId,
                              res.data.order
                            );
                          }
                        })
                        .catch((err) => {
                          Alert.alert(err.response.data.msg)
                          
                          setLoader(false);
                        });
                    }}
                    style={{
                      backgroundColor: "#4ADE80",
                      borderRadius: 5,
                      alignSelf: "flex-end",
                      marginVertical: 30,
                      borderWidth: 0,
                      marginRight: 0,
                      width: 120,
                      height: 40,
                      marginRight:20
                    }}
                    title="Make Paid"
                  />
                )}
              {installmentOrder.status != "CANCELLED" &&
                installmentOrder.status != "DELIVERED" &&
                installmentOrder.status != "REFUNDED" &&
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
                              cancelOfflineInstallment(user.token, data.id)
                                .then((res) => {
                                  //console.log(res.data);
                                  loadDataInstallment(
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
                      backgroundColor: primaryColor,
                      borderRadius: 5,
                      alignSelf: "flex-end",
                      marginVertical: 30,
                      borderWidth: 0,
                      marginRight: 10,
                      borderColor: backgroundColor,
                      borderWidth: 1,
                      color: backgroundColor,
                      width: 100,
                      height: 40,
                    }}
                    title="Cancel"
                  />
                )}
            </View>

            {installmentOrder && installmentOrder.status == "REFUNDED" && (
              <Text
                style={{
                  color: backgroundColor,
                  fontSize: width < 350 ? 14 : 16,
                  fontFamily: "Poppins-Medium",
                  textAlign: "center",
                  marginHorizontal: 20,
                  marginVertical: 20,
                }}>
                Order Refund
              </Text>
            )}
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
          </>
        ) : (
          <>
            <View style={{ marginHorizontal: 20 }}>
              {data.status == "PROCESSING" &&
                !data.requestedDeliveryDate &&
                !data.refundRequestByUser &&
                !data.requestedDeliveryDate &&
                data.status != "DELIVERED" &&
                data.status != "COMPLETED" &&
                data.status != "REFUNDED" &&
                data.status != "CANCELLED" && (
                  <Text
                    style={{
                      fontSize: width < 350 ? 14 : 16,
                      color: textColor,
                    }}>
                    When completed the order click complete
                  </Text>
                )}
              {data.status == "PROCESSING" &&
                !data.requestedDeliveryDate &&
                !data.refundRequestByUser &&
                !data.requestedDeliveryDate &&
                data.status != "DELIVERED" &&
                data.status != "COMPLETED" &&
                data.status != "REFUNDED" &&
                data.status != "CANCELLED" && (
                  <IconButton
                    onPress={() => {
                      try {
                        setLoader(true);
                        completeOfflineOrderDelivery(user.token,data.id).then(res=>{
                          loadData(res)
                        }).catch(err=>{
                          console.error(err.response.data.msg)
                        })
                      } catch (e) {
                        console.warn(e.message);
                      }
                    }}
                    style={{
                      backgroundColor: "#4ADE80",
                      borderRadius: 5,
                      marginVertical: 10,
                      borderWidth: 0,
                      marginRight: 20,
                      width: 140,
                      fontSize: 16,
                      padding: 10,
                      height: 40,
                    }}
                    title="Complete Order"
                  />
                )}
            </View>
            
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}>
              {data.status === "ACCEPTED" && (
                <IconButton
                  onPress={() => {
                    makeOfflinePayment(user.token,data.id).then(res=>{
                      loadData(res)
                    }).catch(err=>{
                      console.error(err.response.data.msg)
                    })
                  }}
                  style={{
                    backgroundColor: "#4ADE80",
                    borderRadius: 5,
                    alignSelf: "flex-end",
                    marginVertical: 30,
                    borderWidth: 0,
                    marginRight: 20,
                    width: 110,
                    height: 40,
                  }}
                  title="Make It Paid"
                />
              )}
              {data.status == "PROCESSING" &&
                !data.requestedDeliveryDate &&
                !data.refundRequestByUser && (
                  <IconButton
                    onPress={() => {
                      setRefound(true);
                    }}
                    style={{
                      backgroundColor: "#4ADE80",
                      borderRadius: 5,
                      alignSelf: "flex-end",
                      marginVertical: 30,
                      borderWidth: 0,
                      marginRight: 20,
                      width: 170,
                      height: 40,
                    }}
                    title="Change Delivery Date"
                  />
                )}

              {data.status != "CANCELLED" &&
                data.status != "DELIVERED" &&
                data.status != "REFUNDED" &&
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
                                "vendor"
                              )
                                .then((res) => {
                                  loadData(res.data.receiverId, res.data.order);
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
                      backgroundColor: primaryColor,
                      borderRadius: 5,
                      alignSelf: "flex-end",
                      marginVertical: 30,
                      borderWidth: 0,
                      marginRight: 10,
                      borderColor: backgroundColor,
                      borderWidth: 1,
                      color: backgroundColor,
                      width: 100,
                      height: 40,
                    }}
                    title="Cancel"
                  />
                )}
            </View>
            {data &&
              data.requestedDeliveryDate &&
              data.status != "DELIVERED" &&
              data.status != "COMPLETED" &&
              data.status != "REFUNDED" &&
              data.status != "CANCELLED" &&
              !data.refundRequestByUser && (
                <Text
                  style={{
                    fontSize: width < 350 ? 14 : 16,
                    color: backgroundColor,
                    textAlign: "center",
                    marginBottom: 30,
                  }}>
                  You Requested for extra time
                </Text>
              )}
            <DateTimePickerModal
              date={RefoundDate ? RefoundDate : new Date()}
              buttonTextColorIOS={backgroundColor}
              isVisible={Refound}
              mode="date"
              onConfirm={(e) => {
                
                if (dateDifference(data.deliveryDateTo, e) > 0) {
                  setRefoundDate(e);
                  try {
                    setRefound(false);
                    setLoader(true);
                    changeOfflineOrderDateDelivery(user.token,data.id,dateConverter(e)).then(res=>{
                      loadData(res)
                    }).catch(err=>{
                      setLoader(false);
                      console.error(err.response.data.msg)
                    })
                  } catch (err) {
                    console.warn(err.message);
                  }
                  
                } else {
                  setRefound(false);
                  Alert.alert(
                    "Opps!",
                    "You need to select upcoming date from delivery"
                  );
                }
              }}
              onCancel={() => {
                setRefound(false);
              }}
            />
            {data && data.status == "REFUNDED" && (
              <Text
                style={{
                  color: backgroundColor,
                  fontSize: width < 350 ? 14 : 16,
                  fontFamily: "Poppins-Medium",
                  textAlign: "center",
                  marginHorizontal: 20,
                  marginVertical: 20,
                }}>
                Order Refund
              </Text>
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
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default VendorOfflineOrderDetails;
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
const attachmentIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12.643" height="17.152" viewBox="0 0 12.643 17.152">
<g id="_000000ff" data-name="#000000ff" transform="translate(-16.818)">
  <path id="Path_27803" data-name="Path 27803" d="M16.9,0h6.521a2.254,2.254,0,0,1,1.114.627q2.109,2.107,4.218,4.216a2.1,2.1,0,0,1,.658,1.069A11.016,11.016,0,0,1,29.456,7.5q0,4.422,0,8.843a6.834,6.834,0,0,1-.076.809H16.914a7.326,7.326,0,0,1-.088-1.747c0-1.785,0-3.57,0-5.355a4.882,4.882,0,0,1,.064-1.162.263.263,0,0,1,.431.239c.025,2.507,0,5.016.011,7.524q5.811,0,11.623,0,0-4.639,0-9.277a9.431,9.431,0,0,0-.04-1.348,1.2,1.2,0,0,0-1.1-.981c-1.12-.059-2.246.038-3.366-.051-.059-1.114.013-2.228-.036-3.341A1.249,1.249,0,0,0,23.139.507C21.2.489,19.265.505,17.328.5q0,3.232,0,6.464a8.5,8.5,0,0,1-.036,1.24.278.278,0,0,1-.413.05,2.7,2.7,0,0,1-.06-.614c.009-1.966,0-3.93.005-5.9A9.6,9.6,0,0,1,16.9,0m8.035,1.743q0,1.387,0,2.777,1.389,0,2.779,0Q26.324,3.129,24.932,1.743Z"/>
</g>
</svg>
`;
