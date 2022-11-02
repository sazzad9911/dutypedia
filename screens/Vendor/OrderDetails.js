import React from "react";
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
} from "../../Class/service";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Barcode from "./../../components/Barcode";
import IconButton from "./../../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { serverToLocal } from "../../Class/dataConverter";
import { useFocusEffect } from "@react-navigation/native";
import { CheckBox } from "../Seller/Pricing";
import { convertDate, dateConverter, dateDifference } from "../../action";
import { socket } from "../../Class/socket";

const OrderDetails = ({ navigation, route }) => {
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
      fontSize: 20,
      fontFamily: "Poppins-Medium",
      color: textColor,
    },
    smallText: {
      fontSize: 14,
      fontFamily: "Poppins-Medium",
      color: textColor,
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
  //console.log(data);

  const stringDate = (d) => {
    const Months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
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
    //console.log(data.user);
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
  const loadData = async () => {
    try {
      const res = await getOrders(user.token, "vendor", vendor.service.id);
      let arr = res.data.orders.filter((order) => order.id == data.id);
      setData(arr[0]);
      route.params.onRefresh();
      setLoader(false);
    } catch (e) {
      console.warn(e.message);
    }
  };
  React.useEffect(() => {
    socket.on("updateOrder", (e) => {
      //console.log(e)
      loadData();
    });
  }, []);
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserProfile", {
              name: `${data.user.firstName + " " + data.user.lastName}`,
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
          {data && data.user.profilePhoto ? (
            <Image
              style={{
                width: 70,
                height: 70,
              }}
              source={{ uri: data.user.profilePhoto }}
            />
          ) : (
            <FontAwesome name="user" size={50} color={assentColor} />
          )}
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 15,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            {data ? `${data.user.firstName + " " + data.user.lastName}` : "--"}{" "}
            {data ? `(${data.user.gender.toUpperCase()})` : "(-)"}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: textColor,
              marginTop: 1,
            }}
          >
            {"ID: "}
            {data ? data.id : "-"}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
        <View style={styles.view}></View>
        <View
          style={[styles.view, { borderBottomColor: backgroundColor, flex: 2 }]}
        >
          {data && (
            <Text
              style={{
                textAlign: "center",
                marginVertical: 10,
                fontFamily: "Poppins-Medium",
                fontSize: 16,
                marginTop: 0,
              }}
            >
              {
                initialState.filter((d) =>
                  d.type.match(data.service.gigs[0].type)
                )[0].title
              }{" "}
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
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            Order Id: {data ? data.id : "Unknown Id"}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 150,
              height: 50,
              overflow: "hidden",
            }}
          >
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
            }}
          >
            {data
              ? data.id.split("").map((doc, i) => {
                  return ` ${doc}`;
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
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            Service/Item Name
          </Text>

          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins-Medium",
              color: textColor,
              textAlign: "center",
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
            height: 1,
            backgroundColor: "#ECECEC",
            marginVertical: 10,
          }}
        />
        <Text style={[styles.smallText, { fontSize: 14, marginBottom: 5 }]}>
          Add What Service Do You Want To Sell
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {ListData &&
            ListData.map((doc, i) =>
              i == 0 ? (
                <Text style={{ color: textColor }} key={i}>
                  {doc.data.title}
                </Text>
              ) : (
                <Text style={{ color: textColor }} key={i}>
                  {", "}
                  {doc.data.title}
                </Text>
              )
            )}
          {ListData.length == 0 && (
            <Text style={{ color: "#606060", fontSize: 18 }}>N/A</Text>
          )}
        </View>
        {data && data.status == "WAITING_FOR_ACCEPT" && data.type != "ONETIME" && (
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
            height: 1,
            backgroundColor: "#ECECEC",
            marginVertical: 10,
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins-Medium",
            color: textColor,
            marginVertical: 10,
          }}
        >
          Extra Facilities
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {data &&
            data.service.gigs[0].facilites.selectedOptions &&
            data.service.gigs[0].facilites.selectedOptions.map((doc, i) => (
              <CheckBox
                key={i}
                style={{ width: "70%", marginBottom: 10 }}
                disabled={
                  data &&
                  data.status == "WAITING_FOR_ACCEPT" &&
                  data.type != "ONETIME"
                    ? false
                    : true
                }
                value={
                  Facilities.filter((d) => d.title == doc.title).length > 0
                    ? true
                    : false
                }
                onChange={(e) => {
                  if (
                    Facilities.filter((d) => d.title == doc.title).length > 0
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
            ))}
          {FacilitiesError && (
            <Text style={{ color: "red" }}>{FacilitiesError}</Text>
          )}
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
          marginTop: 0,
        }}
      >
        <Text style={[styles.text]}>Price</Text>
        <Text
          style={[
            styles.text,
            {
              color: "#666666",
              fontSize: 18,
            },
          ]}
        >
          Basic Price :{" "}
          {data
            ? (data.offerPrice ? data.offerPrice : data.amount) + "৳"
            : "Pice is empty"}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
        }}
      >
        <Text style={styles.text}>Delivery Date</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text style={[styles.smallText, { flex: 0 }]}>
            {data ? stringDate(data.deliveryDateFrom) : "Unavailable Date"}{" "}
          </Text>
          <Text style={[styles.smallText, { flex: 0, marginHorizontal: 10 }]}>
            To
          </Text>
          <Text style={[styles.smallText, { flex: 0 }]}>
            {data ? stringDate(data.deliveryDateTo) : "Unavailable Date"}
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
        }}
      >
        <Text style={styles.text}>Payment Status</Text>
        <View
          style={{
            padding: 3,
            backgroundColor:
              data && data.paid && data.status != "REFUNDED"
                ? "green"
                : data && data.paid && data.status == "REFUNDED"
                ? "#FA1ABA"
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
              fontSize: 15,
              fontFamily: "Poppins-Medium",
            }}
          >
            {data && data.paid && data.status != "REFUNDED"
              ? "Paid"
              : data && data.paid && data.status == "REFUNDED"
              ? "Refund"
              : "Due"}
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
        }}
      >
        <Text style={[styles.text, { fontSize: 18 }]}>Service Status</Text>
        <Text style={[styles.smallText, { marginTop: 5 }]}>
          {data ? exporters(data.status) : "Unknown"}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
        }}
      >
        <Text style={[styles.text, { fontSize: 22 }]}>Introduction</Text>
        <Text style={[styles.smallText, { marginTop: 5, marginBottom: 5 }]}>
          {data && data.description ? data.description : "No details found!"}
        </Text>
      </View>
      <View style={{ height: 10 }} />
      <View style={{ marginHorizontal: 20 }}>
        {data.status == "PROCESSING" &&
          !data.requestedDeliveryDate &&
          !data.refundRequestByUser && (
            <Text
              style={{
                fontSize: 16,
                color: textColor,
              }}
            >
              When Delivered The Order Then Click
            </Text>
          )}
        {data.status == "PROCESSING" &&
          !data.requestedDeliveryDate &&
          !data.refundRequestByUser && (
            <Button
              onPress={() => {
                try {
                  setLoader(true);
                  completeOrderDelivery(user.token, data.id)
                    .then((res) => {
                      loadData();
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
                width: 120,
              }}
              title="Yes I Delivered"
            />
          )}
      </View>
      {data.refundRequestByUser &&
        data.status != "DELIVERED" &&
        data.status != "REFUNDED" && (
          <View style={{ marginHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: textColor,
                fontFamily: "Poppins-Medium",
              }}
            >
              Customer request for refund
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={() => {
                  try {
                    setLoader(true);
                    orderRefound(user.token, data.id, true)
                      .then((res) => {
                        loadData();
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
                  marginVertical: 20,
                  borderWidth: 0,
                  marginRight: 20,
                  width: 140,
                }}
                title="Accept Refund"
              />
              <Button
                onPress={() => {
                  try {
                    setLoader(true);
                    orderRefound(user.token, data.id, false)
                      .then((res) => {
                        loadData();
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
                  marginVertical: 20,
                  borderWidth: 0,
                  marginRight: 20,
                  width: 140,
                }}
                title="Cancel Refund"
              />
            </View>
          </View>
        )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
      >
        {data.status === "WAITING_FOR_ACCEPT" && (
          <Button
            onPress={() => {
              try {
                validate();
              } catch (e) {
                console.warn(e.message);
              }
            }}
            style={{
              backgroundColor: "#4ADE80",
              borderRadius: 5,
              alignSelf: "flex-end",
              marginVertical: 30,
              borderWidth: 0,
              marginRight: 20,
            }}
            title="Accept"
          />
        )}
        {data.status == "PROCESSING" && !data.refundRequestByUser && (
          <Button
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
              width: 140,
            }}
            title="Request Extra Time"
          />
        )}

        {data.status != "CANCELLED" &&
          data.status != "DELIVERED" &&
          data.status != "REFUNDED" &&
          data.status != "COMPLETED" && (
            <Button
              onPress={() => {
                Alert.alert("Hey!", "Are you want to cancel this order?", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      setLoader(true);
                      cancelOrder(user.token, data.id, "CANCELLED", "vendor")
                        .then((response) => {
                          setLoader(false);
                          loadData();
                        })
                        .catch((err) => {
                          setLoader(false);
                          console.warn(err.response.data);
                        });
                    },
                  },
                ]);
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
              }}
              title="Cancel"
            />
          )}
      </View>
      {data && data.requestedDeliveryDate && (
        <Text
          style={{
            fontSize: 16,
            color: backgroundColor,
            textAlign: "center",
            marginBottom: 30,
          }}
        >
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
              requestForTime(user.token, data.id, dateConverter(e))
                .then((response) => {
                  loadData();
                })
                .catch((error) => {
                  setLoader(false);
                  console.warn(error.message);
                });
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
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            textAlign: "center",
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          Order Refund
        </Text>
      )}
      {data && data.status == "COMPLETED" && (
        <Text
          style={{
            color: "green",
            fontSize: 16,
            fontFamily: "Poppins-Medium",
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          Order Completed
        </Text>
      )}
    </ScrollView>
  );
};
export default OrderDetails;
const exporters = (key) => {
  switch (key) {
    case "WAITING_FOR_ACCEPT":
      return "Waiting for accept";
    case "ACCEPTED":
      return "Accepted";
    case "WAITING_FOR_PAYMENT":
      return "Waiting for payment";
    case "PROCESSING":
      return "Processing";
    case "DELIVERED":
      return "Delivered";
    case "REFUNDED":
      return "Canceled";
    case "CANCELLED":
      return "Cancelled";
    case "COMPLETED":
      return "Completed";
    default:
      return "Unknown";
  }
};
