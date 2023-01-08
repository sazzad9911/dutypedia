import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Color } from "../../assets/colors";
import Input from "./../../components/Input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "./../../components/Button";
const { width, height } = Dimensions.get("window");
import {
  dateConverter,
  dateDifference,
  convertDate,
  fileFromURL,
  serverTimeToLocalDate,
} from "../../action";
import TextArea from "./../../components/TextArea";
import IconButton from "./../../components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { SvgXml } from "react-native-svg";
import {
  hto_1,
  hto_2,
  hto_3,
  hto_4,
  hto_5,
  hto_6,
} from "../../assets/OfferIcons";
import { Entypo } from "@expo/vector-icons";
import { CheckBox } from "../Seller/Pricing";
import { createOrder, getOrders } from "../../Class/service";
import { localOptionsToServer, serverToLocal } from "../../Class/dataConverter";
import { SafeAreaView } from "react-native-safe-area-context";
import SubHeader from "../../components/SubHeader";
import { socket } from "../../Class/socket";
import ActivityLoader from "../../components/ActivityLoader";
import FixedBackHeader from "./components/FixedBackHeader";

const OfferNow = (props) => {
  const navigation = props.navigation;
  const route = props.route;
  const params = route.params ? route.params : null;
  const data = params ? params.data : null;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const [FromVisible, setFromVisible] = React.useState(false);
  const [ToVisible, setToVisible] = React.useState(false);
  const [From, setFrom] = React.useState();
  const [To, setTo] = React.useState();
  const [FromDateError, setFromDateError] = React.useState();
  const [ToDateError, setToDateError] = React.useState();
  const [Price, setPrice] = React.useState();
  const [PriceError, setPriceError] = React.useState();
  const [Document, setDocument] = React.useState();
  const [Visible, setVisible] = React.useState(false);
  const [Check, setCheck] = React.useState(false);
  const user = useSelector((state) => state.user);
  const [Description, setDescription] = React.useState();
  const vendor = useSelector((state) => state.vendor);
  const [Loader, setLoader] = React.useState(false);
  const gigs = params.gigs;
  const [ListData, setListData] = React.useState([]);
  const [Facilities, setFacilities] = React.useState([]);
  const dispatch = useDispatch();
  const type = route.params.type;
  const selectedPackage = params.selectedPackage;
  const [services, setServices] = React.useState();
  const service = params.services;
  const category = params.category;
  const [Offset, setOffset] = React.useState(0);
  const [TotalDuration, setTotalDuration] = React.useState([]);
  

  React.useEffect(() => {
    //console.log(type);
    if (category && service) {
      try {
        setServices(serverToLocal(service.options, service.category));
      } catch (err) {
        console.log(err.message);
      }
    }
    if (gigs) {
      //console.log(data.subsData)
      setPrice(gigs.price);
      try {
        if (gigs.services.category) {
          setListData(
            serverToLocal(gigs.services.options, gigs.services.category)
          );
        } else {
          setListData(serverToLocal(gigs.services, data.service.category));
        }
      } catch (e) {
        console.warn(e.message);
      }
      setFacilities(gigs.facilites.selectedOptions);
    }
    if (selectedPackage) {
      setPrice(selectedPackage.price);
    }
  }, [gigs]);
  React.useEffect(() => {
    if (data && data.subsData && data.subsData.totalDuration) {
      let arr = [];
      for (let i = 0; i < parseInt(data.subsData.totalDuration); i++) {
        arr.push(i);
      }
      setTotalDuration(arr);
    }
  }, [data]);
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (result.type === "success") {
      return result;
    }
    return false;
  };
  const validate = () => {
    if (!From) {
      setFromDateError("Invalid date");
      return;
    }
    if (!To &&type!="SUBS") {
      setToDateError("Invalid date");
      return;
    }
    if (!Price) {
      setPriceError("Invalid price");
      return;
    }

    setLoader(true);
    createOrder(
      user.token,
      gigs ? gigs.service.id : data.service.id,
      type,
      selectedPackage
        ? parseInt(selectedPackage.price)
        : gigs
        ? parseInt(gigs.price)
        : data.service.gigs.filter((d) => d.type == type)[0].price,
      Description,
      parseInt(Price),
      From,
      To,
      vendor ? "VENDOR" : "USER",
      service ? service : gigs ? gigs.services : "",
      service ? [] : gigs ? gigs.facilites.selectedOptions : "",
      selectedPackage ? selectedPackage : undefined,
      params.packageData,
      user.user.id,
      data.subsData?data.subsData:undefined
    )
      .then((res) => {
        getNewOrderUser(res);
      })
      .catch((err) => {
        setLoader(false);
        console.warn(err.response.data.msg);
      });
  };
  const getNewOrderUser = (res) => {
    socket.emit("newOrder", {
      receiverId: user.user.id,
      order: {
        type: "user",
        data: res.data.order,
      },
    });
    socket.emit("newOrder", {
      receiverId: res.data.receiverId,
      order: {
        type: "vendor",
        data: res.data.order,
      },
    });
    setTimeout(() => {
      setLoader(false);
      navigation.navigate("ManageOrder", {
        reload: res,
        active: gigs ? gigs.type : data.service.gigs[0].type,
        type: type,
      });
    }, 300);
    return;
    try {
      const res = getOrders(user.token, "user");
      setLoader(false);
      navigation.navigate("ManageOrder", {
        reload: res,
        active: gigs ? gigs.type : data.service.gigs[0].type,
        type: type,
      });

      dispatch({ type: "USER_ORDERS", playload: res.data.orders });
      dispatch({ type: "SET_ORDER_SOCKET", playload: res });
    } catch (e) {
      console.warn(e.message);
    }
  };
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* <SubHeader
        title={
          type == "ONETIME"
            ? "Fixed Service"
            : type == "PACKAGE"
            ? "Package Service"
            : "Offer Price"
        }
        {...props}
      /> */}

      <ScrollView
        scrollEventThrottle={16}
        onScroll={(e) => {
          const currentOffset = e.nativeEvent.contentOffset.y;
          setOffset(currentOffset);
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 60 }} />
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 20,
            borderWidth: 1,
            borderColor: "#C0FFD7",
            borderRadius: 5,
            paddingVertical: 20,
            paddingBottom: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{
                borderRadius: 30,
                width: 60,
                height: 60,
                overflow: "hidden",
                marginRight: 10,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#C0FFD7",
              }}
            >
              {data && data.service.profilePhoto ? (
                <Image
                  style={{ height: 60, width: 60 }}
                  source={{ uri: data.service.profilePhoto }}
                />
              ) : (
                <FontAwesome name="user" size={50} color={assentColor} />
              )}
            </View>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                }}
              >
                {data ? data.service.serviceCenterName : "---"}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  width: "120%",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    color: textColor,
                    flex: 1,
                  }}
                >
                  {data ? data.service.providerInfo.title : ""}{" "}
                  {data ? data.service.providerInfo.name : "Sazzad Hossain"}
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins-Medium",
                      color: textColor,
                      marginLeft: 5,
                    }}
                  >
                    (
                    {data
                      ? data.service.providerInfo.gender.toUpperCase()
                      : "Other"}
                    )
                  </Text>
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                  color: textColor,
                }}
              >
                {data ? data.service.providerInfo.position : "---"}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 0, backgroundColor: "#F8F8F8", marginTop: 20 }}
          />
          {gigs && !selectedPackage && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  marginTop: 20,
                  backgroundColor: "#F8F8F8",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {gigs.subsData ? gigs.subsData.subscriptionType : ""}{" "}
                  {gigs.price}৳
                </Text>
              </View>
              {type == "SUBS" && (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 10,
                      marginTop: 10,
                      backgroundColor: "white",
                      padding: 5,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      Duration
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      {data && data.subsData && data.subsData.payAsYouGo
                        ? "Pay As Go"
                        : `${data.subsData.totalDuration}`}
                      {data.subsData.subscriptionType == "Monthly"
                        ? " Months"
                        : data.subsData.subscriptionType == "Weekly"
                        ? " Weeks"
                        : " Years"}
                    </Text>
                  </View>
                  {data.subsData.otherChargeName && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 10,
                        marginTop: 10,
                        backgroundColor: "white",
                        padding: 5,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontSize: 16,
                          fontFamily: "Poppins-Medium",
                        }}
                      >
                        Service Charge
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 16,
                          fontFamily: "Poppins-Medium",
                        }}
                      >
                        {data.subsData.otherChargeAmount}৳
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 10,
                      marginTop: 10,
                      backgroundColor: "#F8F8F8",
                      padding: 5,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      Total
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                      }}
                    >
                      {data.subsData.amount}৳
                    </Text>
                  </View>
                </>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  backgroundColor: "#F8F8F8",
                  padding: 5,
                  borderRadius: 5,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Service List
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingHorizontal: 25,
                  paddingVertical: 5,
                }}
              >
                {ListData.length > 0 ? (
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#535353",
                    }}
                  >
                    {ListData.map((doc, i) => {
                      return `${i == 0 ? "" : ", "}${doc.data.title}`;
                    })}
                  </Text>
                ) : (
                  <Text>N/A</Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  backgroundColor: "#F8F8F8",
                  padding: 5,
                  borderRadius: 5,
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Facilities
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingHorizontal: 25,
                  paddingVertical: 5,
                  marginBottom: 5,
                }}
              >
                {Facilities.length > 0 ? (
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#535353",
                    }}
                  >
                    {Facilities.map((doc, i) => {
                      return `${i == 0 ? "" : ", "}${doc.title}`;
                    })}
                  </Text>
                ) : (
                  <Text>N/A</Text>
                )}
              </View>
            </>
          )}
          {!gigs && !selectedPackage && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  marginTop: 20,
                  backgroundColor: "#F8F8F8",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Starting Price
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {data ? data.service.gigs[0].price : "-"}৳
                </Text>
              </View>
              <Input
                error={PriceError}
                value={Price}
                onChange={(e) => {
                  if (parseInt(e) >= data.service.gigs[0].price) {
                    setPrice(parseInt(e));
                    setPriceError(null);
                  } else {
                    setPriceError(
                      `Price can be large or equal to ${data.service.gigs[0].price}৳`
                    );
                  }
                }}
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  marginTop: 15,
                  marginLeft: 20,
                  color: textColor,
                }}
                placeholderTextColor={assentColor}
                placeholder="Your Price"
              />
            </>
          )}
          {selectedPackage && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  marginTop: 20,
                  backgroundColor: "#F8F8F8",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Package
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Price
                </Text>
              </View>
            </>
          )}
          {selectedPackage && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  marginTop: 20,
                  backgroundColor: "#F8F8F8",
                  padding: 5,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {selectedPackage.name}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {selectedPackage.price}৳
                </Text>
              </View>
            </>
          )}
          {services && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  marginTop: 10,
                  backgroundColor: "#F8F8F8",
                  padding: 5,
                  borderRadius: 5,
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Service List
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  marginVertical: 0,
                  marginBottom: 5,
                }}
              >
                {services ? (
                  <Text
                    style={{
                      fontSize: 16,
                      marginHorizontal: 5,
                      color: "#535353",
                    }}
                  >
                    {services.map((doc, i) => {
                      return `${i != 0 ? ", " : ""}${doc.data.title}`;
                    })}
                  </Text>
                ) : (
                  <Text>N/A</Text>
                )}
              </View>
            </>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: "#F8F8F8",
              padding: 5,
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontFamily: "Poppins-Medium",
              }}
            >
              {type != "SUBS"
                ? "Delivery Time"
                : "Choose A Date When You Want To Start Using Service"}
            </Text>
          </View>
          {type != "SUBS" ? (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <View style={{ flex: 1 }}>
                <IconButton
                  onPress={() => {
                    setFromVisible(true);
                  }}
                  style={{
                    color: textColor,
                    borderRadius: 5,
                  }}
                  title={From ? From : "Select Date"}
                />
                {FromDateError && (
                  <Text style={{ color: "red", marginTop: 2 }}>
                    {FromDateError}
                  </Text>
                )}
                <DateTimePickerModal
                  date={new Date()}
                  isVisible={FromVisible}
                  mode="date"
                  onConfirm={(date) => {
                    let newDate = dateConverter(new Date());
                    let oldDate = dateConverter(date);
                    if (dateDifference(newDate, oldDate) >= 0) {
                      setFromDateError(null);
                      setFrom(dateConverter(date));
                      setFromVisible(false);
                    } else {
                      setFromDateError(
                        "Please select current and current date"
                      );
                      setFromVisible(false);
                    }
                  }}
                  onCancel={() => setFromVisible(false)}
                />
              </View>
              <Text
                style={{
                  marginHorizontal: 10,
                  marginTop: 8,
                  color: textColor,
                }}
              >
                TO
              </Text>
              <View style={{ flex: 1 }}>
                <IconButton
                  onPress={() => {
                    setToVisible(true);
                  }}
                  style={{
                    color: textColor,
                    borderRadius: 5,
                  }}
                  title={To ? To : "Select Date"}
                />
                {ToDateError && (
                  <Text style={{ color: "red", marginTop: 2 }}>
                    {ToDateError}
                  </Text>
                )}
                <DateTimePickerModal
                  date={new Date()}
                  isVisible={ToVisible}
                  mode="date"
                  onConfirm={(date) => {
                    let newDate = dateConverter(new Date(From));
                    let oldDate = dateConverter(date);
                    if (dateDifference(newDate, oldDate) >= 0) {
                      setToDateError(null);
                      setTo(dateConverter(date));
                      setToVisible(false);
                    } else {
                      setToDateError("Please select current and current date");
                      setToVisible(false);
                    }
                  }}
                  onCancel={() => setToVisible(false)}
                />
              </View>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <IconButton
                Icon={() => <Entypo name="calendar" size={24} color="black" />}
                onPress={() => {
                  setFromVisible(true);
                }}
                style={{
                  color: textColor,
                  borderRadius: 5,
                  marginHorizontal: 10,
                  width: width / 2,
                  marginVertical: 20,
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                }}
                title={From ? From : "Select Date"}
              />
              {FromDateError && (
                <Text style={{ color: "red", marginTop: 2 }}>
                  {FromDateError}
                </Text>
              )}
              <DateTimePickerModal
                date={new Date()}
                isVisible={FromVisible}
                mode="date"
                onConfirm={(date) => {
                  let newDate = dateConverter(new Date());
                  let oldDate = dateConverter(date);
                  if (dateDifference(newDate, oldDate) >= 0) {
                    setFromDateError(null);
                    setFrom(dateConverter(date));
                    setFromVisible(false);
                  } else {
                    setFromDateError("Please select current and current date");
                    setFromVisible(false);
                  }
                }}
                onCancel={() => setFromVisible(false)}
              />
            </View>
          )}
          {type == "SUBS" && From && (
            <>
              <View
                style={{
                  backgroundColor: "#F8F8F8",
                  marginHorizontal: 10,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    margin: 5,
                  }}
                >
                  1St Delivery Date
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    margin: 5,
                    marginTop: 0,
                  }}
                >
                  *Delivery Date Count From Your Selected Date
                </Text>
              </View>
              <Text
                style={{
                  marginHorizontal: 15,
                  fontSize: 16,
                  marginVertical: 10,
                  color: "#535353",
                }}
              >
                {serverTimeToLocalDate(From)} to{" "}
                {serverTimeToLocalDate(
                  From,
                  data.subsData.subscriptionType == "Monthly"
                    ? 30
                    : data.subsData.subscriptionType == "Yearly"
                    ? 365
                    : 7
                )}{" "}
                ={" "}
                {data.subsData.subscriptionType == "Monthly"
                  ? "30 day"
                  : data.subsData.subscriptionType == "Yearly"
                  ? `365 day`
                  : "7 day"}
              </Text>
              <TouchableOpacity onPress={()=>{
                navigation.navigate("SubscriptionDates",{subsData:data.subsData,date:From})
              }}>
              <Text
                style={{
                  textAlign: "right",
                  marginHorizontal: 10,
                  textDecorationLine: "underline",
                  marginVertical: 5,
                }}
              >
                View all delivery date
              </Text>
              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: "#F8F8F8",
                  marginHorizontal: 10,
                  padding: 5,
                  flexDirection: "row",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  Payment Date
                </Text>
              </View>
              {TotalDuration.map((doc, i) =>
                i < 2 ? (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      marginHorizontal: 15,
                      justifyContent: "space-between",
                      marginVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Poppins-SemiBold",
                      }}
                    >
                      1St Month
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                      }}
                    >
                      {serverTimeToLocalDate(From)} to{" "}
                      {serverTimeToLocalDate(
                        From,
                        data.subsData.subscriptionType == "Monthly"
                          ? 30
                          : data.subsData.subscriptionType == "Yearly"
                          ? 365
                          : 7
                      )}{" "}
                      ={" "}
                      {data.subsData.subscriptionType == "Monthly"
                        ? "30 day"
                        : data.subsData.subscriptionType == "Yearly"
                        ? `365 day`
                        : "7 day"}
                    </Text>
                  </View>
                ) : (
                  <View key={i} />
                )
              )}
              <TouchableOpacity onPress={()=>{
                navigation.navigate("SubscriptionDates",{subsData:data.subsData,date:From})
              }}
                style={{
                  alignSelf: "flex-end",
                  marginHorizontal: 10,
                  marginVertical: 10,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    textDecorationLine: "underline",
                  }}
                >
                  View all delivery date
                </Text>
              </TouchableOpacity>
            </>
          )}
          <View style={{ marginHorizontal: 10 }}>
            <TextArea
              onChange={(e) => setDescription(e)}
              value={Description}
              placeholderTextColor={assentColor}
              style={{
                width: width - 40,
                borderColor: "#C0FFD7",
              }}
              placeholder="Your Requirements"
            />
            <Text
              style={{
                color: "#606060",
                fontFamily: "Poppins-Medium",
                lineHeight: 20,
                fontSize: 14,
                fontStyle: "italic",
              }}
            >
              We Suggest To Tell Your Requirement To Seller, It Will Help Us For
              Future Inquiries.
            </Text>
          </View>
          {!Document ? (
            <View>
              <IconButton
                onPress={() => {
                  pickDocument().then((res) => {
                    if (res) {
                      setDocument(fileFromURL(res));
                    }
                  });
                }}
                style={{
                  marginHorizontal: 20,
                  marginTop: 20,
                  marginTop: 25,
                  borderColor: "#C0FFD7",
                  borderRadius: 20,
                  height: 35,
                  width: 150,
                }}
                LeftIcon={() => (
                  <Ionicons name="md-attach" size={24} color={assentColor} />
                )}
                title="Attachment"
              />
              <Text
                style={{
                  marginVertical: 10,
                  marginHorizontal: 20,
                  color: "#606060",
                  fontFamily: "Poppins-Medium",
                  lineHeight: 20,
                  fontSize: 14,
                  fontStyle: "italic",
                }}
              >
                Max file size: 25 MB
              </Text>
            </View>
          ) : (
            <View
              style={{
                marginHorizontal: 10,
                marginVertical: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginRight: 10,
                }}
              >
                {Document.name}
              </Text>
              <Ionicons
                onPress={() => {
                  setDocument(null);
                }}
                name="close"
                size={24}
                color="red"
              />
            </View>
          )}
          <View
            style={{
              paddingHorizontal: 20,
              borderTopWidth: 1,
              paddingTop: 10,
              borderTopColor: "#C0FFD7",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setVisible(!Visible);
              }}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Poppins-Medium",
                  marginBottom: 10,
                  color: textColor,
                }}
              >
                How to order work
              </Text>
              <Entypo
                name={`chevron-thin-${Visible ? "up" : "down"}`}
                size={20}
                color={"#4ADE80"}
              />
            </TouchableOpacity>
            {Visible && (
              <>
                <View style={{ height: 10 }} />
                <Cart
                  i={0}
                  Icon={hto_1}
                  description="We Suggest To Tell Your Requirement To Seller, It Will Help Us For Future"
                />
                <Cart
                  i={0}
                  Icon={hto_2}
                  description="We Suggest To Tell Your Requirement To Seller, It Will Help Us For Future"
                />
                <Cart
                  i={0}
                  Icon={hto_3}
                  description="We Suggest To Tell Your Requirement To Seller, It Will Help Us For Future"
                />
                <Cart
                  i={0}
                  Icon={hto_4}
                  description="We Suggest To Tell Your Requirement To Seller, It Will Help Us For Future"
                />
                <Cart
                  i={0}
                  Icon={hto_5}
                  description="We Suggest To Tell Your Requirement To Seller, It Will Help Us For Future"
                />
                <Cart
                  i={0}
                  Icon={hto_6}
                  description="We Suggest To Tell Your Requirement To Seller, It Will Help Us For Future"
                />
              </>
            )}
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#C0FFD7",
            marginHorizontal: 10,
            marginVertical: 10,
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
            }}
          >
            <CheckBox
              value={Check}
              style={{ color: textColor, fontSize: 14, width: 30 }}
              onChange={() => {
                setCheck((v) => !v);
              }}
              title=""
            />
            <Text
              style={{
                fontSize: 15,
                color: "#666666",
                width: width - 85,
              }}
            >
              Yes, I Understand And Agree To The{" "}
              <Text
                style={{
                  color: "#174296",
                }}
              >
                Dutypedia Terms Of Service
              </Text>
              , Including{" "}
              <Text
                style={{
                  color: "#174296",
                }}
              >
                The User Agreement
              </Text>{" "}
              And{" "}
              <Text
                style={{
                  color: "#174296",
                }}
              >
                Privacy Policy
              </Text>
            </Text>
          </View>
          <IconButton
            onPress={() => {
              validate();
            }}
            style={{
              color: textColor,
              marginTop: 20,
              marginBottom: 0,
              borderRadius: 5,
              backgroundColor: "#4ADE80",
              height: 35,
              width: "80%",
              marginLeft: "10%",
              color: "white",
            }}
            title={
              type == "STARTING" ? "Offer Your Price" : "Send Order Request"
            }
          />
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              alignSelf: "center",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                textDecorationLine: "underline",
                color: "#666666",
              }}
            >
              Cancel Order
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FixedBackHeader navigation={navigation} Yoffset={Offset} />
    </View>
  );
};

export default OfferNow;
const Cart = ({ Icon, description, i }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  return (
    <View
      style={{
        width: width - 85,
        borderRadius: 5,
        backgroundColor: primaryColor,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        shadowOffset: {
          height: 1,
          width: 1,
        },
        shadowColor: "black",
        shadowOpacity: 0,
        shadowRadius: 1,
        elevation: 1,
        marginBottom: 10,
      }}
    >
      <SvgXml xml={Icon} height="35" width="35" />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-SemiBold",
            color: textColor,
          }}
        >
          Your order request
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            color: textColor,
            flex: 1,
            lineHeight: 20,
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};
const calenderIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="21.38" height="21.38" viewBox="0 0 21.38 21.38">
<g id="Group_10275" data-name="Group 10275" transform="translate(-230.839 -566.307)">
  <path id="Path_27339" data-name="Path 27339" d="M5.582,5.625H20.3A2.207,2.207,0,0,1,22.5,7.832V21.076A2.207,2.207,0,0,1,20.3,23.283H5.582a2.207,2.207,0,0,1-2.207-2.207V7.832A2.207,2.207,0,0,1,5.582,5.625Z" transform="translate(228.589 563.278)" fill="none" stroke="#000" stroke-linejoin="round" stroke-width="2.25"/>
  <path id="Path_27340" data-name="Path 27340" d="M19.462,5.625H6.418a3.071,3.071,0,0,0-3.043,3.09v2.8h.736A1.582,1.582,0,0,1,5.582,10.04H20.3a1.582,1.582,0,0,1,1.472,1.472H22.5v-2.8a3.071,3.071,0,0,0-3.043-3.09Z" transform="translate(228.589 563.278)"/>
  <path id="Path_27341" data-name="Path 27341" d="M21.332,15.743a1.1,1.1,0,1,1-1.1-1.077A1.1,1.1,0,0,1,21.332,15.743Z" transform="translate(223.14 560.151)"/>
  <path id="Path_27343" data-name="Path 27343" d="M26.957,15.743a1.1,1.1,0,1,1-1.1-1.077A1.1,1.1,0,0,1,26.957,15.743Z" transform="translate(221.193 560.151)"/>
  <path id="Path_27342" data-name="Path 27342" d="M9,3.375V4.847" transform="translate(226.643 564.057)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.25"/>
  <path id="Path_27344" data-name="Path 27344" d="M27,3.375V4.847" transform="translate(220.415 564.057)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.25"/>
</g>
</svg>

`;
