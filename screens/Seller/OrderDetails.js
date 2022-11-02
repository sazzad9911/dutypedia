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
} from "../../Class/service";
import Barcode from "./../../components/Barcode";
import { serverToLocal } from "../../Class/dataConverter";
import Toast from "react-native-root-toast";
import { TouchableOpacity } from "react-native-gesture-handler";
import { socket } from "../../Class/socket";

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
      borderBottomColor: "#F1EFEF",
      justifyContent: "center",
      borderTopWidth: 0,
    },
    text: {
      fontSize: 16,
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
  const [data, setData] = React.useState(oldData);
  const [Loader, setLoader] = React.useState(false);
  const orderSocket=useSelector(state=>state.orderSocket)

  React.useEffect(() => {
    //console.log(user.token);
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
  const loadData = async () => {
    try {
      const res = await getOrders(user.token, "user");
      let arr = res.data.orders.filter((order) => order.id == data.id);
      setData(arr[0]);
      route.params.onRefresh();
      setLoader(false);
    } catch (e) {
      console.warn(e.message);
    }
  };

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
    // console.log(date.getDate());
    return `${date.getDate()}th ${
      Months[date.getMonth()]
    } ${date.getFullYear()}`;
  };
  React.useEffect(() => {
    loadData();
  }, [orderSocket]);
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
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
              fontSize: 20,
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
              fontSize: 16,
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
              fontSize: 14,
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
                marginTop: 20,
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
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            Order Id: {data ? data.id : "Unknown Id"}
          </Text>
          <Text
            style={{
              fontSize: 14,
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
      <View
        style={{
          borderBottomWidth: 0,
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Poppins-Medium",
            color: textColor,
          }}
        >
          Service/ Item Name
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          {ListData && ListData.length > 0 ? (
            ListData.map((doc, i) => (
              <Text key={i}>
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
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: textColor,
            fontFamily: "Poppins-Medium",
          }}
        >
          Facilities
        </Text>
        <View style={{ marginTop: 10 }}>
          {Facilities && Facilities.length > 0 ? (
            Facilities.map((doc, i) => (
              <Text key={i}>
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#F1EFEF",
          paddingVertical: 20,
          marginHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Text style={[styles.text, { fontSize: 20 }]}>Price</Text>
        <Text style={styles.text}>
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
        <Text style={[styles.text, { fontSize: 20 }]}>Delivery Date</Text>
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
        <Text style={[styles.text, { fontSize: 20 }]}>Payment Status</Text>
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
        <Text style={[styles.text, { fontSize: 20 }]}>Service Status</Text>
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
      {data.requestedDeliveryDate &&
        data.status != "CANCELLED" &&
        data.status != "DELIVERED" && (
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: textColor,
                fontFamily: "Poppins-Medium",
              }}
            >
              Vendor Request Delivery Date
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: textColor,
                fontFamily: "Poppins-Medium",
              }}
            >
              Requested Delivery Date: {data.requestedDeliveryDate}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Button
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
                        loadData();
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
                }}
                title="Accept"
              />
              <Button
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
                        loadData();
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
          <Button
            onPress={() => {
              setLoader(true);
              makePayment(user.token, data.id)
                .then((res) => {
                  if (res) {
                    Toast.show("Payment success", {
                      duration: Toast.durations.LONG,
                    });
                    loadData();
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
              width: 120,
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
                      cancelOrder(user.token, data.id, "CANCELLED", "user")
                        .then((res) => {
                          Toast.show("Successfully request send", {
                            duration: Toast.durations.LONG,
                          });
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
                borderColor: backgroundColor,
                borderRadius: 5,
                alignSelf: "flex-end",
                marginVertical: 20,
                borderWidth: 0,
                marginHorizontal: 20,
                borderWidth: 1,
                color: textColor,
                width: 120,
              }}
              title={data && data.paid ? "Cancel & Refund" : "Cancel Order"}
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
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: textColor,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            If you Received then Click
          </Text>
          <Button
            onPress={() => {
              setLoader(true);
              completeOrder(user.token, data.id)
                .then((res) => {
                  if (res) {
                    Toast.show("Successful", {
                      duration: Toast.durations.LONG,
                    });
                    loadData();
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
              marginRight: 20,
              width: 120,
              marginBottom: 20,
            }}
            title="Yes I Received"
          />
        </View>
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
