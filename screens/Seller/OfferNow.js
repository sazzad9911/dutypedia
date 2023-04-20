import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Pressable
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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SubHeader from "../../components/SubHeader";
import { socket } from "../../Class/socket";
import ActivityLoader from "../../components/ActivityLoader";
import FixedBackHeader from "./components/FixedBackHeader";
import { uploadFile } from "../../Class/upload";
import { LinearGradient } from "expo-linear-gradient";
import Avatar from "../../components/Avatar";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const OfferNow = (props) => {
  const navigation = props.navigation;
  const route = props.route;
  const params = route.params ? route.params : null;
  const data = params ? params.data : null;
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
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
  const [installmentData, setInstallmentData] = useState(
    data.installmentData ? data.installmentData : null
  );
  const isFocused=useIsFocused()
  const starting=data?.service?.gigs.filter(d=>d.type=="STARTING")[0]

  React.useEffect(() => {
    // console.log(data.installmentData);
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
  const validate = async () => {
    if (!From) {
      setFromDateError("Invalid date");
      return;
    }
    if (!To && type != "SUBS" && type != "INSTALLMENT") {
      setToDateError("Invalid date");
      return;
    }
    if (!Price) {
      setPriceError("Invalid price");
      return;
    }

    setLoader(true);
    let urls;
    if (Document) {
      let arr = [];
      arr.push(Document);
      urls = await uploadFile(arr, user.token);
    }
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
      data.subsData ? data.subsData : undefined,
      data.installmentData ? data.installmentData : undefined,
      urls ? urls[0] : undefined,
      gigs ? gigs.id : data.service.gigs.filter((d) => d.type == type)[0]?.id,
      gigs
        ? gigs?.title
        : data.service.gigs.filter((d) => d.type == type)[0]?.title
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
  const inset = useSafeAreaInsets();
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(true));
      setTimeout(() => {
        dispatch(setHideBottomBar(true));
      }, 50);
    } else {
      //console.log("seen")
      dispatch(setHideBottomBar(false));
    }
  }, [isFocused]);

  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:"#818181"}}>
      <View
        style={{
          paddingTop: inset?.top,
          backgroundColor:"#818181"
        }}>
          <StatusBar backgroundColor="#818181"/>
        <View style={{ alignItems: "center", width: width - 40 ,marginHorizontal:20}}>
          <LinearGradient // Background Linear Gradient colors=
            colors={["#FFAFBD", "#C9FFBF"]}
            style={styles.top}
            end={{ x: 0.1, y: 0.3 }}>
            <View style={{ height: 30 }} />
            <Text
              style={{
                marginTop: 12,
                color: "#767676",
                fontSize: 14,
                fontWeight: "500",
              }}>
              {data ? data.service.serviceCenterName : "---"}
            </Text>
            <Text
              style={{
                marginTop: 8,
                color: "#767676",
                fontSize: 12,
                fontWeight: "400",
              }}>
              {data?.service?.providerInfo?.name}
            </Text>
            <Text
              style={{
                marginTop: 8,
                color: "#767676",
                fontSize: 12,
                fontWeight: "400",
              }}>
              {data?.service?.providerInfo?.position}
            </Text>
            <Text
              style={{
                marginTop: 15,
                color: "#1A1A1A",
                fontSize: 20,
                fontWeight: "500",
              }}>
              starting price
            </Text>
            <Text
              style={{
                marginTop: 12,
                color: "#09090A",
                fontSize: 16,
                fontWeight: "400",
              }}>
              {starting?.price}৳
            </Text>
          </LinearGradient>
          <View style={styles.avatar}>
            {data && data.service.profilePhoto ? (
              <Image
                style={{ height: 60, width: 60 }}
                source={{ uri: data.service.profilePhoto }}
              />
            ) : (
              <FontAwesome name="user" size={45} color={"#4ADE80"} />
            )}
          </View>
        </View>
        <View style={{
          marginTop:-100,
          borderTopLeftRadius:16,
          borderTopRightRadius:16,
          backgroundColor:"#ffffff",
          zIndex:-1,
          paddingHorizontal:20,
          paddingTop:120
        }}>
          <Text style={[styles.text14Bold]}>Details</Text>
          <View style={{
            flexDirection:"row",justifyContent:"space-between",
            alignItems:"center",
            flex:1,
            borderBottomColor:"#F1F1F1",
            borderBottomWidth:1,
            paddingBottom:12
          }}>
            <Text style={[styles.text14,{flex:1}]}>Your offer <Text style={{color:"black"}}>(Enter your amount )*</Text></Text>
            <Input style={{
              backgroundColor:"#F1F1F1",
              height:40,
              minWidth:110,
              textAlign:"right",
              marginHorizontal:0,
              marginLeft:10,
              borderBottomWidth:0
            }}  placeholder={"00.00 ৳"}/>
          </View>
          <View style={styles.box}>
            <Text style={styles.text14}>Duty Fee 5%</Text>
            <Text style={styles.text14}>00.00 ৳</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.text14}>Total pay</Text>
            <Text style={styles.text14}>3.12 ৳</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.text14}>Delivery date*</Text>
            <View style={{flexDirection:"row"}}>
              <Text style={{
                color:"#09090A",
                fontSize:16,
                textDecorationLine:"underline",
                fontWeight:"400"
              }}>choose date</Text>
              <SvgXml style={{marginLeft:8}} xml={calenderIcon}/>
            </View>
          </View>
          <Text style={{
            fontWeight:"500",
            fontSize:16,
            marginTop:32
          }}>Tell your work instruction ( optional )</Text>
          <TextArea style={{
            borderColor:"#D1D1D1",
            backgroundColor:"#FAFAFA",
            marginTop:12
          }} placeholder={" "}/>
          <Text style={{
            fontSize:12,
            lineHeight:20,
            fontWeight:"400",
            color:"#767676"
          }}>We recommend that you communicate your requirements to the seller in writing, as it will assist us in addressing any future inquiries more effectively.</Text>
          <Text style={{
            fontWeight:"500",
            fontSize:16,
            marginTop:32
          }}>Attachments ( Optional )</Text>
          <Pressable style={{
            borderWidth:1,
            borderStyle:"dashed",
            padding:20,
            marginTop:20,
            borderColor:"#AFAFAF",
            justifyContent:"center",
            alignItems:"center"
          }}>
            <Text style={{
              fontSize:16,
              fontWeight:"600",
              color:"#009FE3"
            }}>Add File <Text style={{
              color:"#A6A4A4",
              fontWeight:"400"
            }}>Here (Max 5 MB)</Text></Text>
          </Pressable>
          <Text style={{
            color:"#EC2700",
            marginTop:8,
            fontSize:14
          }}>Please do not share any personal Information</Text>
          <View style={{
            alignItems:"flex-end",
            marginBottom:32
          }}>
            <Text style={{
              fontSize:14,
              color:"#1A1A1A",
              textDecorationLine:"underline",
              marginTop:20
            }}>See How to order work</Text>
          </View>
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
  return (
    <View
      style={{
        flex: 1,
      }}>
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
        showsVerticalScrollIndicator={false}>
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
          }}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
            }}>
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
              }}>
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
                }}>
                {data ? data.service.serviceCenterName : "---"}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  width: "120%",
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    color: textColor,
                    flex: 1,
                  }}>
                  {data ? data.service.providerInfo.title : ""}{" "}
                  {data ? data.service.providerInfo.name : "Sazzad Hossain"}
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins-Medium",
                      color: textColor,
                      marginLeft: 5,
                    }}>
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
                }}>
                {data ? data.service.providerInfo.position : "---"}
              </Text>
            </View>
          </View>
          <View
            style={{ height: 0, backgroundColor: "#F8F8F8", marginTop: 20 }}
          />
          {type == "INSTALLMENT" && installmentData.advancedPaymentAmount && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
                marginTop: 20,
                backgroundColor: "#F8F8F8",
                padding: 5,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}>
                Weekly Installment
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}>
                {(
                  installmentData?.totalAmount /
                  installmentData?.installmentCount
                ).toFixed(2)}
                ৳
              </Text>
            </View>
          )}
          {type == "INSTALLMENT" && installmentData.advancedPaymentAmount && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
                marginTop: 20,
                backgroundColor: "#F8F8F8",
                padding: 5,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}>
                Advanced Payment
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}>
                {installmentData?.advancedPaymentAmount}৳
              </Text>
            </View>
          )}
          {type == "INSTALLMENT" && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
                marginTop: 20,
                backgroundColor: "#F8F8F8",
                padding: 5,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}>
                Total Installment
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}>
                {installmentData?.installmentCount}{" "}
                {installmentData.installmentType == "Weekly"
                  ? "Week"
                  : installmentData.installmentType == "Monthly"
                  ? "Month"
                  : "Year"}
                {" x "}
                {(
                  installmentData.totalAmount / installmentData.installmentCount
                ).toFixed(2)}
                ৳
              </Text>
            </View>
          )}
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
                }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}>
                  {type == "INSTALLMENT" ? "Total" : ""} Price
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}>
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
                    }}>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                      }}>
                      Duration
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                      }}>
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
                      }}>
                      <View>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 16,
                            fontFamily: "Poppins-Medium",
                          }}>
                          {data.subsData.otherChargeName}
                        </Text>
                        <Text
                          style={{
                            color: "red",
                            marginTop: 3,
                          }}>
                          *This payment one time only
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 16,
                          fontFamily: "Poppins-Medium",
                        }}>
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
                    }}>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                      }}>
                      Total
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                        fontFamily: "Poppins-Medium",
                      }}>
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
                }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}>
                  Service List
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingHorizontal: 25,
                  paddingVertical: 5,
                }}>
                {ListData.length > 0 ? (
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#535353",
                    }}>
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
                }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}>
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
                }}>
                {Facilities.length > 0 ? (
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#535353",
                    }}>
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
                }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}>
                  Starting Price
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}>
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
                }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}>
                  Package
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}>
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
                }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}>
                  {selectedPackage.name}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}>
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
                }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}>
                  Service List
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  marginVertical: 0,
                  marginBottom: 5,
                }}>
                {services ? (
                  <Text
                    style={{
                      fontSize: 16,
                      marginHorizontal: 5,
                      color: "#535353",
                    }}>
                    {services.map((doc, i) => {
                      return `${i != 0 ? ", " : ""}${doc.data.title}`;
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
                }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                  }}>
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
                }}>
                {Facilities.length > 0 ? (
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#535353",
                    }}>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: "#F8F8F8",
              padding: 5,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                fontFamily: "Poppins-Medium",
              }}>
              {type != "SUBS" && type != "INSTALLMENT"
                ? "Delivery Time"
                : "Choose A Date When You Want To Start Using Service"}
            </Text>
          </View>
          {type != "SUBS" && type != "INSTALLMENT" ? (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}>
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
                }}>
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
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    margin: 5,
                  }}>
                  1St Delivery Date
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    margin: 5,
                    marginTop: 0,
                  }}>
                  *Delivery Date Count From Your Selected Date
                </Text>
              </View>
              <Text
                style={{
                  marginHorizontal: 15,
                  fontSize: 16,
                  marginVertical: 10,
                  color: "#535353",
                }}>
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SubscriptionDates", {
                    subsData: data.subsData,
                    date: From,
                  });
                }}>
                <Text
                  style={{
                    textAlign: "right",
                    marginHorizontal: 10,
                    textDecorationLine: "underline",
                    marginVertical: 5,
                  }}>
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
                }}>
                <Text
                  style={{
                    fontSize: 16,
                  }}>
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
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Poppins-SemiBold",
                      }}>
                      1St Month
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                      }}>
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SubscriptionDates", {
                    subsData: data.subsData,
                    date: From,
                  });
                }}
                style={{
                  alignSelf: "flex-end",
                  marginHorizontal: 10,
                  marginVertical: 10,
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    textDecorationLine: "underline",
                  }}>
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
              }}>
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
                }}>
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
              }}>
              <Text
                style={{
                  marginRight: 10,
                }}>
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
            }}>
            <TouchableOpacity
              onPress={() => {
                setVisible(!Visible);
              }}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Poppins-Medium",
                  marginBottom: 10,
                  color: textColor,
                }}>
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
          }}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
            }}>
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
              }}>
              Yes, I Understand And Agree To The{" "}
              <Text
                style={{
                  color: "#174296",
                }}>
                Dutypedia Terms Of Service
              </Text>
              , Including{" "}
              <Text
                style={{
                  color: "#174296",
                }}>
                The User Agreement
              </Text>{" "}
              And{" "}
              <Text
                style={{
                  color: "#174296",
                }}>
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
            }}>
            <Text
              style={{
                fontSize: 15,
                textDecorationLine: "underline",
                color: "#666666",
              }}>
              Cancel Order
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FixedBackHeader navigation={navigation} Yoffset={Offset} />
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  top: {
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 40,
    width: width - 40,
    padding:20,
    paddingTop:0
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#ffffff",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    transform: [{ translateY: 10 }],
    zIndex: 100,
  },
  text14: {
    fontSize: 14,
    fontWeight: "400",
    color:"#767676"
  },
  text14Bold: {
    fontSize: 14,
    fontWeight: "500",
    color:"#1A1A1A"
  },
  box:{
    flexDirection:"row",
    justifyContent:"space-between",
    borderBottomWidth:1,
    borderBottomColor:"#F1F1F1",
    paddingVertical:20
  }
});
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
      }}>
      <SvgXml xml={Icon} height="35" width="35" />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-SemiBold",
            color: textColor,
          }}>
          Your order request
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            color: textColor,
            flex: 1,
            lineHeight: 20,
          }}>
          {description}
        </Text>
      </View>
    </View>
  );
};
const calenderIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.33333 1V3M13.6667 1V3M1 15V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V15M1 15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15M1 15V8.33333C1 7.8029 1.21071 7.29419 1.58579 6.91912C1.96086 6.54405 2.46957 6.33333 3 6.33333H15C15.5304 6.33333 16.0391 6.54405 16.4142 6.91912C16.7893 7.29419 17 7.8029 17 8.33333V15M9 9.66667H9.00711V9.67378H9V9.66667ZM9 11.6667H9.00711V11.6738H9V11.6667ZM9 13.6667H9.00711V13.6738H9V13.6667ZM7 11.6667H7.00711V11.6738H7V11.6667ZM7 13.6667H7.00711V13.6738H7V13.6667ZM5 11.6667H5.00711V11.6738H5V11.6667ZM5 13.6667H5.00711V13.6738H5V13.6667ZM11 9.66667H11.0071V9.67378H11V9.66667ZM11 11.6667H11.0071V11.6738H11V11.6667ZM11 13.6667H11.0071V13.6738H11V13.6667ZM13 9.66667H13.0071V9.67378H13V9.66667ZM13 11.6667H13.0071V11.6738H13V11.6667Z" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
