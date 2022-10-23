import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Color } from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import Button from "./../../components/Button";
const { width, height } = Dimensions.get("window");
import { cancelOrder } from "../../Class/service";
import Barcode from "./../../components/Barcode";
import IconButton from "./../../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { serverToLocal } from "../../Class/dataConverter";
import { useFocusEffect } from "@react-navigation/native";
import { CheckBox } from "../Seller/Pricing";

const OrderDetails = ({ navigation, route }) => {
  const data = route.params && route.params.data ? route.params.data : null;
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
    return `${date.getDay() < 10 ? date.getDay() + 1 : date.getDay()}th ${
      Months[date.getMonth()]
    } ${date.getFullYear()}`;
  };
  useFocusEffect(
    React.useCallback(() => {
      return setListData(ListSelection);
    }, [ListSelection])
  );
  React.useEffect(() => {
    //console.log(data);
    try {
      if (data && data.selectedServices && data.selectedServices.category) {
        setListData(
          serverToLocal(
            data.selectedServices.options,
            data.selectedServices.category
          )
        );
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
  return (
    <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
      <View style={{ height: 33 }} />
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
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
        </View>
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
            {data ? data.service.providerInfo.title : "--"}{" "}
            {data ? data.service.providerInfo.name : "--"}{" "}
            {data ? `(${data.service.providerInfo.gender})` : "(-)"}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Medium",
              color: textColor,
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
              height="60"
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
              <View style={{ flexDirection: "row", margin: 2 }} key={i}>
                <CheckBox
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
                />
                <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: 14,
                    marginTop: 5,
                    color: textColor,
                  }}
                >
                  {doc.title}
                </Text>
              </View>
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
            backgroundColor: data && data.paid ? "green" : "red",
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderRadius: 50,
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            {data && data.paid ? "Paid" : "Due"}
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
      {data && data.status == "WAITING_FOR_ACCEPT" && (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            onPress={() => {
              try {
                validate();
              } catch (e) {
                console.warn(e.message);
              }
            }}
            style={{
              backgroundColor: backgroundColor,
              borderRadius: 5,
              alignSelf: "flex-end",
              marginVertical: 30,
              borderWidth: 0,
              marginRight: 20,
            }}
            title="Accept"
          />
          <Button
            onPress={() => {
              cancelOrder(user.token, data.id, "CANCELLED", "vendor")
                .then((response) => {
                  navigation.navigate("VendorOrder", { reload: response });
                })
                .catch((err) => {
                  console.warn(err.response.data);
                });
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
        </View>
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
      return "Delivery";
    case "REFUNDED":
      return "Refound";
    case "CANCELLED":
      return "Cancelled";
    case "COMPLETED":
      return "Completed";
    default:
      return "Unknown";
  }
};
