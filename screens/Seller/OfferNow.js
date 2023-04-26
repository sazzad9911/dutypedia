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
  Pressable,
  Modal,
  Alert,
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
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Animated, { FadeIn } from "react-native-reanimated";
import ViewMore from "../../Hooks/ViewMore";
import AnimatedHeight from "../../Hooks/AnimatedHeight";

const OfferNow = (props) => {
  const navigation = props.navigation;
  const route = props.route;
  const params = props;
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
  const type = params.type;
  const selectedPackage = params.selectedPackage;
  const [services, setServices] = React.useState();
  const service = params.services;
  const category = params.category;
  const [Offset, setOffset] = React.useState(0);
  const [TotalDuration, setTotalDuration] = React.useState([]);
  const [installmentData, setInstallmentData] = useState(
    data.installmentData ? data.installmentData : null
  );
  const isFocused = useIsFocused();
  const starting = data?.service?.gigs?.filter((d) => d.type == "STARTING")[0];
  const [condition, setCondition] = useState(false);
  const [screen, setScreen] = useState("");
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [newLayoutHeight, setNewLayoutHeight] = useState(0);
  const [cartId, setCartId] = useState();
  const [newServices, setNewServices] = useState();
  const [facilities, setNewFacilities] = useState();

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
    console.log(selectedPackage?.price)
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
      Price?
      parseInt(Price):0,
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
        Alert.alert(err.response.data.msg)                
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
  // React.useEffect(() => {
  //   if (isFocused) {
  //     //console.log("hidden")
  //     dispatch(setHideBottomBar(true));
  //     setTimeout(() => {
  //       dispatch(setHideBottomBar(true));
  //     }, 50);
  //   } else {
  //     //console.log("seen")
  //     dispatch(setHideBottomBar(false));
  //   }
  // }, [isFocused]);
  React.useEffect(() => {
    
    if (props?.serviceList) {
      let text = "";
      props?.serviceList.map((doc, i) => {
        if (i != 0) {
          text = text + `, ${doc.title}`;
        } else {
          text = doc.title;
        }
      });
      setServices(text);
    }
    if (props?.facilities) {
      let text = "";
      props?.facilities.map((doc, i) => {
        if (i != 0) {
          text = text + `, ${doc.title}`;
        } else {
          text = doc.title;
        }
      });
      setNewFacilities(text);
    }
  }, [props?.serviceList, props?.facilities]);
  //console.log(selectedPackage)
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }
  if (screen == "date") {
    return (
      <Animated.View layout={FadeIn} style={{ flex: 1 }}>
        <SubHeader
          onPress={() => setScreen()}
          style={{
            marginTop: 0,
          }}
          {...props}
          title={"Chose delivery date"}
        />
        <BottomSheetScrollView
          contentContainerStyle={{ backgroundColor: "#ffffff" }}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 20,
              alignItems: "flex-start",
            }}>
            <View style={{ flex: 1 }}>
              <IconButton
                Icon={() => <SvgXml xml={calenderNew} />}
                onPress={() => {
                  setFromVisible(true);
                }}
                style={{
                  color: "#767676",
                  borderRadius: 4,
                  borderColor: "#D1D1D1",
                  height: 40,
                }}
                title={From ? From : "dd/mm/yyyy"}
              />
              {FromDateError && (
                <Text style={{ color: "red", marginTop: 2 }}>
                  {FromDateError}
                </Text>
              )}
              <Modal transparent={true} visible={FromVisible}>
                <DateTimePickerModal
                  date={new Date()}
                  isVisible={true}
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
              </Modal>
            </View>
            <Text
              style={{
                marginHorizontal: 15,
                marginTop: 11,
                color: textColor,
                fontSize: 14,
              }}>
              T0
            </Text>
            <View style={{ flex: 1 }}>
              <IconButton
                Icon={() => <SvgXml xml={calenderNew} />}
                onPress={() => {
                  setToVisible(true);
                }}
                style={{
                  color: "#767676",
                  borderRadius: 4,
                  borderColor: "#D1D1D1",
                  height: 40,
                }}
                title={To ? To : "dd/mm/yyyy"}
              />
              {ToDateError && (
                <Text style={{ color: "red", marginTop: 2 }}>
                  {ToDateError}
                </Text>
              )}
              <Modal visible={ToVisible} transparent={true}>
                <DateTimePickerModal
                  date={new Date()}
                  isVisible={true}
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
              </Modal>
            </View>
          </View>
          <IconButton
            onPress={() => {
              setScreen();
            }}
            disabled={From && To ? false : true}
            active={From && To ? true : false}
            style={{
              marginHorizontal: 20,
              marginTop: 12,
            }}
            title={"Confirm"}
          />
          <View
            style={{
              marginHorizontal: 20,
              paddingBottom: 40,
            }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 36,
              }}>
              <SvgXml
                style={{
                  marginRight: 8,
                }}
                xml={icon}
              />
              <Text style={[styles.headLine, { flex: 1 }]}>
                Important Delivery Instructions for Buyers on our Platform
              </Text>
            </View>
            <ViewMore
              style={{
                marginTop: 24,
              }}
              width={"37%"}
              height={layoutHeight}
              component={
                <Text
                  onLayout={(e) => {
                    setLayoutHeight(e.nativeEvent.layout.height);
                  }}
                  style={[styles.spText, { marginTop: 0 }]}>
                  We offer buyers the option to select a delivery date that is
                  convenient for them, with the flexibility to choose a delivery
                  window that suits their schedule. However, we also want to
                  remind buyers to communicate with the seller about their
                  availability to ensure a successful delivery. Before selecting
                  a delivery date, we recommend that buyers reach out to the
                  seller to confirm their ability to deliver during the chosen
                  time frame. This will help avoid any potential conflicts or
                  delays in the delivery process. We strive to provide the best
                  possible service to our buyers and sellers, and clear
                  communication is key to ensuring a positive experience for all
                  parties involved. Thank you for choosing our platform for your
                  needs.If you have any questions or concerns regarding our
                  delivery policy, please refer to our
                  <Text style={{ color: "#4ADE80" }}>
                    Delivery Policy section
                  </Text>
                </Text>
              }
            />
          </View>
        </BottomSheetScrollView>
      </Animated.View>
    );
  }
  if (screen == "instruction") {
    return (
      <Animated.View layout={FadeIn} style={{ flex: 1 }}>
        <SubHeader
          onPress={() => setScreen()}
          style={{
            marginTop: 0,
          }}
          {...props}
          title={"How to order work"}
        />
        <BottomSheetScrollView
          contentContainerStyle={{ backgroundColor: "#ffffff" }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 32,
            }}>
            <Cart
              Icon={first}
              title={`Order Request Sent to Seller for [Service].`}
              description={`When you want to send an order request to a seller, it's important to provide a clear and detailed description of what you need. This will help ensure that the seller can fulfill your requirements and deliver your order to your satisfaction. When choosing a delivery date, it's a good idea to talk to the seller and ask which date is best for them. This will help ensure that they have enough time to complete your order and deliver it to you on time. Once you've confirmed the delivery date with the seller, you can send them an order request. Be sure to review the details of the request before sending it, to ensure that everything is correct. Remember, clear communication is key to a successful transaction. So be sure to communicate clearly with the seller and provide all the information they need to fulfill your requirements`}
            />
            <Cart
              title={`Reviewing and Accepting the Order`}
              Icon={second}
              description={`When you send your order request, the seller will review it to see if they can fulfill your requirements. If they can, they will accept your order. If they cannot, they may ask for more information or decline the order. So, it's important to make sure that you communicate clearly with the seller and provide all the information they need to fulfill your requirements. This will help ensure that your order is accepted and completed to your satisfaction.`}
              right={true}
            />
            <Cart
              title={`Making Payment`}
              Icon={third}
              description={`When a seller accepts your order, it's crucial to ensure a safe and secure transaction by making your payment through our platform. You can easily do this by clicking on the "Pay Now" button in your duty invoice. As a platform, we prioritize the security of our payment system and do not release any payment to the seller until you have received your service. This provides a layer of protection for you as the buyer and also ensures that the seller fulfills their end of the bargain. It's important not to pay through any other method or external link provided by the seller or any third party, as this could compromise the security of your transaction. By paying through our platform, your transaction is closely tracked and verified, which adds an extra layer of protection for both you and the seller. So always remember to make your payment by clicking the "Pay Now" button in your duty invoice. If you have any questions or concerns about making your payment, our support team is always available to assist you.`}
            />
            <Cart
              title={`The seller will process your service`}
              Icon={forth}
              description={`After you've made your payment, the seller will begin processing your order. During this time, they may need additional information from you to complete your order. If the seller requires any additional information, they will reach out to you through our messaging system. It's important to respond promptly to any messages from the seller, to ensure that your order is completed on time and to your satisfaction. If you have any questions or concerns during the processing period, don't hesitate to reach out to the seller or our support team for assistance. We're here to help ensure that your order is completed to your satisfaction, so please don't hesitate to ask for help if you need it.`}
              right={true}
            />
            <Cart
              title={`Receive your service`}
              Icon={fifth}
              description={`When the seller has successfully completed your order, they will deliver the service to you either online or physically. If the service is delivered online, the seller may need to provide additional proof or documents to confirm the delivery. Once you have received your service, please click on the "Yes, I Receive" button to confirm that you have received it. This will help ensure that the seller is paid promptly for their work. If the service is physical, the seller will provide you with documents that confirm the service that was performed in front of you. Once you have received these documents, please click on the "Yes, I Receive" button to confirm that you have received them. If you have any issues with the service that was delivered, please reach out to the seller or our support team for assistance. We're here to help ensure that you're satisfied with the service you receive.`}
            />
            <Cart
              title={`We pay to the seller`}
              Icon={sixth}
              description={`Once you have properly received your service and are satisfied with it, please click the "Yes, I Received" button to confirm that you have received the service. This will let the seller know that their work has been delivered to your satisfaction. If for any reason you are unable to click the button, it will be automatically marked as received after 72 hours. This is to ensure that the seller is properly compensated for their work and that the transaction can be completed. Once the service has been confirmed as received, we will proceed with payment to the seller. Our payment system is secure and reliable, so you can rest assured that the seller will receive their payment in a timely manner.`}
              right={true}
            />
          </View>
        </BottomSheetScrollView>
      </Animated.View>
    );
  }
  //console.log(serverToLocal(gigs?.services,))
  //console.log(props.services)

  return (
    <Animated.View layout={FadeIn} style={{ flex: 1 }}>
      <BottomSheetScrollView
        contentContainerStyle={{ backgroundColor: "#ffffff" }}>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <View style={{ alignItems: "center", width: width - 40 }}>
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
                {type == "STARTING"
                  ? "Starting"
                  : type == "ONETIME"
                  ? "Fixed"
                  : "Package"}{" "}
                price
              </Text>
              <Text
                style={{
                  marginTop: 12,
                  color: "#09090A",
                  fontSize: 16,
                  fontWeight: "400",
                }}>
                {starting ? starting?.price : type=="ONETIME" ? gigs?.price : selectedPackage?.price}৳
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
          <Text style={[styles.text14Bold, { marginTop: 32 }]}>Details</Text>
          {type == "STARTING" ? (
            <View
              style={{
                flex: 1,
                borderBottomColor: "#F1F1F1",
                borderBottomWidth: 1,
                paddingBottom: 12,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                }}>
                <Text style={[styles.text14, { flex: 1 }]}>
                  Your offer{" "}
                  <Text style={{ color: "black" }}>(Enter your amount )*</Text>
                </Text>
                <Input
                  keyboardType={"number-pad"}
                  onChange={(e) => {
                    if (parseInt(e) >= starting.price) {
                      setPrice(parseInt(e));
                      setPriceError(null);
                    } else {
                      setPriceError(
                        `Price can be large or equal to ${starting.price}৳`
                      );
                    }
                  }}
                  style={{
                    backgroundColor: "#F1F1F1",
                    height: 40,
                    minWidth: 110,
                    textAlign: "right",
                    marginHorizontal: 0,
                    marginLeft: 10,
                    borderBottomWidth: 0,
                  }}
                  placeholder={"00.00 ৳"}
                />
              </View>
              {PriceError && (
                <Text style={{ marginVertical: 3, color: "red" }}>
                  {PriceError}
                </Text>
              )}
            </View>
          ) : (
            <View>
              <Text style={[styles.text14, { marginTop: 20 }]}>
                {gigs?.title}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                {gigs?.images?.map((doc, i) => (
                  <Image
                    key={i}
                    style={{
                      width: 64,
                      height: 52,
                      borderRadius: 4,
                      marginLeft: i != 0 ? 16 : 0,
                    }}
                    source={{ uri: doc }}
                  />
                ))}
              </View>
              <Text style={[styles.text14, { marginTop: 20 }]}>
                Service List
              </Text>
              <View style={{ height: 10 }} />
              <AnimatedHeight
                fontStyle={styles.text14}
                text={services}
                button={true}
                title={"See More"}
              />
              {facilities && (
                <>
                  <Text style={[styles.text14, { marginTop: 20 }]}>
                    Facilities
                  </Text>
                  <View style={{ height: 10 }} />
                  <AnimatedHeight
                    fontStyle={styles.text14}
                    text={facilities}
                    button={true}
                    title={"See More"}
                  />
                </>
              )}
            </View>
          )}

          <View style={styles.box}>
            <Text style={styles.text14}>Duty Fee 5%</Text>
            <Text style={styles.text14}>00.00 ৳</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.text14}>Total pay</Text>
            <Text style={styles.text14}>00.00 ৳</Text>
          </View>
          <View style={[styles.box, { flex: 1, flexDirection: "column" }]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}>
              <Text style={[styles.text14, { flex: 1 }]}>Delivery date*</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 20,
                  flex: 1,
                  justifyContent: "flex-end",
                }}>
                <Text
                  onPress={() => {
                    setScreen("date");
                  }}
                  style={{
                    color: "#09090A",
                    fontSize: 16,
                    textDecorationLine: "underline",
                    fontWeight: "400",
                  }}>
                  {From && To ? `${From} To ${To}` : "choose date"}
                </Text>
                <SvgXml style={{ marginLeft: 8 }} xml={calenderIcon} />
              </View>
            </View>
            {FromDateError || ToDateError ? (
              <Text style={{ color: "red", marginVertical: 3 }}>
                Please select date
              </Text>
            ) : null}
          </View>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              marginTop: 32,
            }}>
            Tell your work instruction ( optional )
          </Text>
          <TextArea
            onChange={(e) => setDescription(e)}
            value={Description}
            style={{
              borderColor: "#D1D1D1",
              backgroundColor: "#FAFAFA",
              marginTop: 12,
            }}
            placeholder={" "}
          />
          <Text
            style={{
              fontSize: 12,
              lineHeight: 20,
              fontWeight: "400",
              color: "#767676",
            }}>
            We recommend that you communicate your requirements to the seller in
            writing, as it will assist us in addressing any future inquiries
            more effectively.
          </Text>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              marginTop: 32,
            }}>
            Attachments ( Optional )
          </Text>
          {!Document ? (
            <View>
              <Pressable
                onPress={() => {
                  pickDocument().then((res) => {
                    if (res) {
                      setDocument(fileFromURL(res));
                    }
                  });
                }}
                style={{
                  borderWidth: 1,
                  borderStyle: "dashed",
                  padding: 20,
                  marginTop: 20,
                  borderColor: "#AFAFAF",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#009FE3",
                  }}>
                  Add File{" "}
                  <Text
                    style={{
                      color: "#A6A4A4",
                      fontWeight: "400",
                    }}>
                    Here (Max 5 MB)
                  </Text>
                </Text>
              </Pressable>
              <Text
                style={{
                  color: "#EC2700",
                  marginTop: 8,
                  fontSize: 14,
                }}>
                Please do not share any personal Information
              </Text>
            </View>
          ) : (
            <View
              style={{
                marginHorizontal: 10,
                marginVertical: 20,
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}>
              <Text
                style={{
                  marginRight: 10,
                  flex: 1,
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
              alignItems: "flex-end",
              marginBottom: 32,
            }}>
            <Text
              onPress={() => {
                setScreen("instruction");
              }}
              style={{
                fontSize: 14,
                color: "#1A1A1A",
                textDecorationLine: "underline",
                marginTop: 20,
              }}>
              See How to order work
            </Text>
          </View>
        </View>
      </BottomSheetScrollView>
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 12,
        }}>
        <View
          style={{
            flexDirection: "row",
          }}>
          <CheckBox
            style={{ fontSize: 14 }}
            value={condition}
            onChange={(e) => {
              setCondition((val) => !val);
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
            }}>
            I agree with all the <Text style={{ color: "#0003FF" }}>Order</Text>{" "}
            & <Text style={{ color: "#0003FF" }}>refund policy</Text>
          </Text>
        </View>

        <IconButton
          disabled={condition ? false : true}
          active={condition ? true : false}
          onPress={() => {
            try {
              validate();
            } catch (e) {
              console.warn(e.message);
            }
          }}
          style={{
            marginTop: 12,
          }}
          title="Send Order Request"
        />
      </View>
    </Animated.View>
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
    padding: 20,
    paddingTop: 0,
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
    color: "#767676",
  },
  text14Bold: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A1A",
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    paddingVertical: 20,
  },
  spText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    marginTop: 24,
    color: "#1A1A1A",
  },
  headLine: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "500",
  },
  leading: {
    fontSize: 24,
    fontWeight: "500",
    lineHeight: 32,
  },
});
export default OfferNow;
const Cart = ({
  Icon,
  description,
  index,
  open,
  onMore,
  style,
  right,
  title,
  onOpen,
}) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const [layoutHeight, setLayoutHeight] = useState(0);
  return (
    <View
      style={[
        {
          marginTop: 40,
        },
        style,
      ]}>
      {right ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Text
            style={[
              styles.leading,
              { flex: 1, marginRight: 8, textAlign: "right" },
            ]}>
            {title}
          </Text>
          <SvgXml xml={Icon} />
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <SvgXml xml={Icon} />
          <Text style={[styles.leading, { flex: 1, marginLeft: 8 }]}>
            {title}
          </Text>
        </View>
      )}
      <ViewMore
        style={{
          marginTop: 24,
        }}
        onChange={(e) => {
          if (e) {
          }
        }}
        width={"37%"}
        height={layoutHeight}
        component={
          <Text
            onLayout={(e) => {
              setLayoutHeight(e.nativeEvent.layout.height);
            }}
            style={[styles.spText, { marginTop: 0 }]}>
            {description}
          </Text>
        }
      />
    </View>
  );
};
const calenderIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.33333 1V3M13.6667 1V3M1 15V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V15M1 15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15M1 15V8.33333C1 7.8029 1.21071 7.29419 1.58579 6.91912C1.96086 6.54405 2.46957 6.33333 3 6.33333H15C15.5304 6.33333 16.0391 6.54405 16.4142 6.91912C16.7893 7.29419 17 7.8029 17 8.33333V15M9 9.66667H9.00711V9.67378H9V9.66667ZM9 11.6667H9.00711V11.6738H9V11.6667ZM9 13.6667H9.00711V13.6738H9V13.6667ZM7 11.6667H7.00711V11.6738H7V11.6667ZM7 13.6667H7.00711V13.6738H7V13.6667ZM5 11.6667H5.00711V11.6738H5V11.6667ZM5 13.6667H5.00711V13.6738H5V13.6667ZM11 9.66667H11.0071V9.67378H11V9.66667ZM11 11.6667H11.0071V11.6738H11V11.6667ZM11 13.6667H11.0071V13.6738H11V13.6667ZM13 9.66667H13.0071V9.67378H13V9.66667ZM13 11.6667H13.0071V11.6738H13V11.6667Z" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const calenderNew = `<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.16667 1V2.75M12.3333 1V2.75M1.25 13.25V4.5C1.25 4.03587 1.43437 3.59075 1.76256 3.26256C2.09075 2.93437 2.53587 2.75 3 2.75H13.5C13.9641 2.75 14.4092 2.93437 14.7374 3.26256C15.0656 3.59075 15.25 4.03587 15.25 4.5V13.25M1.25 13.25C1.25 13.7141 1.43437 14.1592 1.76256 14.4874C2.09075 14.8156 2.53587 15 3 15H13.5C13.9641 15 14.4092 14.8156 14.7374 14.4874C15.0656 14.1592 15.25 13.7141 15.25 13.25M1.25 13.25V7.41667C1.25 6.95254 1.43437 6.50742 1.76256 6.17923C2.09075 5.85104 2.53587 5.66667 3 5.66667H13.5C13.9641 5.66667 14.4092 5.85104 14.7374 6.17923C15.0656 6.50742 15.25 6.95254 15.25 7.41667V13.25M8.25 8.58333H8.25622V8.58956H8.25V8.58333ZM8.25 10.3333H8.25622V10.3396H8.25V10.3333ZM8.25 12.0833H8.25622V12.0896H8.25V12.0833ZM6.5 10.3333H6.50622V10.3396H6.5V10.3333ZM6.5 12.0833H6.50622V12.0896H6.5V12.0833ZM4.75 10.3333H4.75622V10.3396H4.75V10.3333ZM4.75 12.0833H4.75622V12.0896H4.75V12.0833ZM10 8.58333H10.0062V8.58956H10V8.58333ZM10 10.3333H10.0062V10.3396H10V10.3333ZM10 12.0833H10.0062V12.0896H10V12.0833ZM11.75 8.58333H11.7562V8.58956H11.75V8.58333ZM11.75 10.3333H11.7562V10.3396H11.75V10.3333Z" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
export const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="24" height="24" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_3642_71276" transform="scale(0.0078125)"/>
</pattern>
<image id="image0_3642_71276" width="128" height="128" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADdgAAA3YBfdWCzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAvfSURBVHja7Z0LcBXVGceDirVlBqUjmbHValusrS8eBhBHHtIikwTGOjWF5O7eBIUICahgWyt9kDoOUHVahYKD2FiMg8hDrUgHBKogIIUo914Ir/B+CoSHQICEkNPv2wc35O69d/fePbt793w78x9xs7t3z/f/7Z7Hfns2izGWJaTC0nDQV5qGixoHQc2X7wbT2ZWCdQSAMFf/q7EAwDoCQJg7wByDO8AcAoAAIAAIAAKAACAACAACgAAgAAgAAoAAIAB8qJD0TgwAuI4AEESRQFEsALJMAIii3SXXsYj0aQsAIlAFtCMARNOGoi4sVNRD5Bg4FejbWUQuh6ssW2jgzDVQs5VYYcx8AUBYmgBq1m61F0Djyei4sRqvxYhpMZuQ2QCsDbSHQpw2ePRaQYbHmF9hEKfTSgwzFoCvim6FQlwyKBhBkNx8psQOY5jRVUBI+iBO4ZyBICxdA+oEygU9BZoKWgxaB1oGWgB6C/Qa6AXQb0AjQD1BV7toPlNil/ltgMDNUJBaRyEISzmgv4O2gS4m+O1kOgVCgKEBK93hsPm1Sux80QtwAoKw9BMtoNvTMDyZ9oEqQQ/7wXxnxwGSQRCRnkshiG1AJaD1HE2PpzWgAamNREJZPWC+8wNBiSE4yzaU3GDB/F4uGd9an4P6mx8TgTJiWT1gvjsjgYkgCAUkE8Z/D1TVYmzBK1oB6pO8UQxl9Ij57g0FG0NwnlUX3pjA+Lag34POeMz41poEuipuObCMWFYPmO/us4BQ8PtQF1ZpI197E76dE5Y6gD7zuPEt9Qnou0neStqrlB1jgLEQ9mFQpKgDm1twdYJg/Ri0NYPM17Ub1CVuubDMWHZ6Gpiwvn8AdCwDzdd1DiR5OcZeNn9ITF2ZuXqRALBm/hMebOWnq1ICwJz5D4IafWY+04akBxAAic2/BXTEh+a3fLZwJwFgbP63tckamM+FvYNsAiAWgDkCmK/rC9B1BEDU/HECme+phBgvmJ8dJ23M76pXnmsQANJ0Ac3XVSk2AGHpp2lm7GS6MF+ys8gA/Ftg83UtExOAsNSXzL+sfBEBWEXGX1a1WACEpVvJ9BjdJhIAz5LhMRorEgBryfAYrRQDAPWBTzMZbtglzBYBgLFkdlyNEAGA1WR0XP3H3wCoL2o2kdFx1aDEyMcA3EYmJ9UtfgagHxmcVL38DMAwMjipHvMzAH8hg5PqGe8BEJaHKgMValJjMi1ikaI+cQCYRQYn1cvGb1AFH2HhwFJTHuAciLi9LQBEiu5LoRBNhnPbqG/QOhvQLc8ydmwJY/U7GDu7hbGjHzNWU2a87c6JjJ34nLHz+xg7tY6xfTPcAGB2TNxqlClurA+ehYIPpg9AOPB6agUJTDQAYCWfoMmMHXoXDHujxYQTQcb2TmOsqZ7FLI0nwOxJ0W03jQAwsAveHLvtN18CRM9cCRRCtG28c0PCEXlSSscKSTPsAKAsRQAeMwBgHp+rfFwLwzbAFb9YNVlf6rcztv+f6tXdfDG6/twexo7/l7FL59X/x7/hNrgt7nN5ATDObIK/rYJ/NqmrTqzkN8+AmbmNzWl4+gBUF1yvpTFbIW81+7TfNQYATOV2B4h3pe/665Xbbn66lbktIMG/tdx29yuMXTzNDJfD7/ECoMrE3MZmtIFVl37Hvl5AWO7JQvLIpMI2Q/xewB+51Z14q8bl7Da1zsfqYNOTceYjKobq4R/qbR+F/8Z1RtvWlKt3hLpP1GPrS+0EXgBMTDy3sQkPNkoPeLUbOJwbAAerVGO+fp9fAw2PjQvebbCNwed3Rvl5HGAwN3O2Pa/dymv5AaDfAb6p9k1+oNMAdOcXOFmtr5svwa2/1P7jb3wi2gA8MIsnAPf6GYAfcO1Dn/qfatDuv9l/7F0vRev/rb/jCcANfgbgWm3aFD7BO/CWalDdUvuPfXRRtGfBz/wzIiSEfMAtgFt/q5p04bD9x8YxA6X/v4onAJ+JAECAazWgDwC17tOno00jo6OEfIeHR4kAQHst84VPEE+uVo3aP9O+Y+6ZEq3/Nz/FcwqZjqKkhX/MDQA0HpeTa+w7Zt0yrWo5xPPqXyLSewEl/J7+jVXNwi4hdg3tOCa2KXg1LqMaJhIAHbi+Ft5wTDVs+x/SPxbe8vVlz6u8zMfpcq8X7eXQJdwAOLFCNezQ7PSPhY0+/YlgvGcL6etDEd8O/hU3APa9rnp2OmIDTKu0R8e7eN7+C0SdIGIpl4BuHqOadqmBsUiJPd3KIx/x/PJIG5GniOEzK6jecMM0r3QHlpTjTOLV9bvXTQ+8MEnUZC4A1C1P/8o98K9optDGx51LABUMgHba17jsDe7eqenX3afWq8c4U8PrC2TtCABeDcKaUdrwbbM6lJtSmtkZLf1rLg8AfkkTRfLuFp7fr/Xfp1jfd/ufeKZ/fURzBRvnCthbFWBuIC6Y+Wt1X0wz55P+ddDpF0Azabr420GHbQs2Jobg0nDU+r44hqC/F2Cf+UeUng9NF58Qgjtt+04Qpobpj3Hx3QGz++HYAY4h4HLwbbvMrwPdQx+MMAdBF9BJexI5dml5fJXm99nxYrT+3/acHeZjWbrRJ2OsQdDTllnE9VQufNfPavp340k7zMcy3E8fjUoNgt7atOppJHO+rDXmzpp/PKynf6ef/lVv6nOy4k4WLd/NIvIUFgqMYWsD7RPMKZz652I3Do+mc9f+2dr26aV/nYv7UWksK5YZy44xEHSy6AmtArYZVreJs+39abUJ8GURswM6+h0jvfQv/N7hL4zLntVGKeuV208Qba7gCuOXSuWBCfbpmnLv4MiH5od09TZD6pnFaP7D8b+ZDGX00CdkvGO++k5/ryT79krp6SE+yTP7UEdP/8Y8wNQAkBNPuBHs5aXvCHnHfJw/2NwxrM9XgKbr8wLgGz5m0r9TS/+aYbIMa70CgTfMD0m1LBy42cKxrM81hNPD4IK3+KTp3ymlf30J+pa584eyKmV2H4LMMz/6kclaa692L1C9xfl/kuUQWH+EjEmdnayVwRsQ8Dc/Ipfban4UgkcsmbTjhejVjZM+JMoiOrrQKgAvpVaGJBBg7DIagOrSttrTL3vNj0KwPKXx/b3TDfIIn26R/jXZivnH0krpTgzBQSWGGQvARvln3MxXAeiszbNv7Qmf0QRPevq39fSv9K/SRBBgDDO6Cgi1mh7eLvOjECw0bRZO7KSM8R+Pn/5tLf2rTnnl3ZZyGECAscv4NoA6yeFM0H5l7sCwnG1zA/NR04ZhZk+8SR709O/D86wA8JrNQ+PZaowwVhCzGosNS989DDIHQFst0cJEOyDIWNO52Of8CMPl9K8KKwB0zvT4ZT4AoDXzpGmzp8nHzWju/Lcb5y9azubOn9Wor5tTNeksrpu/cHHz7OlBU8dZ+o683g+x8wUA9+XJI3PygsxhzSEACAACgAAgAFxXzqDicd0HFTOH9T4B4LL6DB3T9aGi0QseKiq/BGIOqxl/G8+BAHBJYMJ6F4xvrfUEgAvqL5V384D5ivBcCACH1btgTEcI/gUPAHABz4UAcKUKKHvTfQDK3qQqwK2Tz8pq8/PC8gF9hoxc1/vXTzKHtQd/G8+BAKBxAAKAACAACAACwGHjS0vb9i8sK+w7dNSWvkNGMmc16mv8bTwHAsCtXkBg9GzXewFwDgSAG+MAUulNYECjB8YBGvFcCACnnwMERt/jlZFAPBcCwAX1Kyxb6bb5eA5UBbgFgFTWCUyY0a+wvMF548ublN+GcyAAXFb3vOLy7vnFzFHllrxH3UCPqFu+PNDpcYDuucHJBIBXxgMGF94IpjQ5CUCPQcFHCQBvjQZOdOzqzwt+kVVRcRUB4CHdVVBwLRgz0wnzewyWf+iXuPkGgGiCaLAHNAqfB7OqQAty8oO18N8dKUndd0FObvG7WOfjbd8vV75vAYgBIi9YmcYVX+n3+PgegK65wzrm5AYPWjYf9sF9CQA/jBPkP/6jnDx5p3kA5J24jwixEQIApZcwULoJ6vR5YHBzAvObcRvcVpS4CAPA5bvBwOK7wOSpYPYK0DFNK3Ad/k20ePwfwVrko6ctlXIAAAAASUVORK5CYII="/>
</defs>
</svg>
`;
const first = `<svg width="80" height="92" viewBox="0 0 80 92" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5384_51505)">
<path d="M23.5916 0H59.8168C62.1385 0.189473 64.2983 1.28415 65.8448 3.05523C66.9654 4.3631 67.7145 5.9566 68.0118 7.6647C70.9968 7.66962 73.9827 7.6647 76.9666 7.6647C77.5134 7.65724 78.0516 7.80348 78.5219 8.08729C78.9921 8.3711 79.3762 8.78146 79.6317 9.27313C79.9893 10.2715 80.1111 11.3413 79.9874 12.3964C80.0232 13.5877 79.9989 14.7802 79.9147 15.969C79.7682 16.6468 79.4051 17.2561 78.8821 17.7019C78.3591 18.1476 77.7056 18.4047 77.0238 18.4329C77.0238 24.0263 77.0238 29.62 77.0238 35.214C77.032 36.7162 76.5068 38.171 75.5449 39.311C75.029 39.922 74.3965 40.4201 73.6857 40.775C72.9748 41.13 72.2005 41.3343 71.4096 41.3758C70.3193 41.4211 69.2291 41.3807 68.1388 41.3935C68.1388 43.6199 68.1388 45.8482 68.1388 48.0746C69.0325 48.0557 69.9118 48.3051 70.6669 48.7916C71.422 49.2781 72.0194 49.9802 72.3843 50.81C72.7492 51.6398 72.8656 52.5606 72.7188 53.4573C72.5719 54.354 72.1685 55.1868 71.5589 55.8517C70.4356 57.0491 69.293 58.217 68.1514 59.3829C68.1233 67.1994 68.1562 75.0178 68.1359 82.8343C68.1301 84.2258 67.8171 85.5983 67.2199 86.8504C66.6228 88.1025 65.7568 89.2021 64.6858 90.0683C63.2118 91.2474 61.4096 91.9234 59.5358 92H8.64661C6.92325 91.9305 5.25609 91.3575 3.84466 90.3495C2.43323 89.3415 1.33732 87.9412 0.688086 86.3163C0.20758 85.0951 -0.0251535 83.7876 0.00387694 82.4726C0.00387694 63.2456 0.00387694 44.019 0.00387694 24.7927C-0.0132068 24.5229 0.0266383 24.2524 0.120741 23.9995C0.214844 23.7465 0.361032 23.517 0.549501 23.3262C7.86775 15.746 15.1889 8.16766 22.513 0.591336C22.8056 0.287988 23.1816 0.0818334 23.5916 0ZM25.1732 3.06706C25.1684 8.75374 25.1781 14.4434 25.1732 20.1301C25.1707 20.9395 25.0079 21.7402 24.6943 22.4843C24.3808 23.2283 23.923 23.9005 23.3484 24.4606C22.2679 25.5058 20.8292 26.0814 19.3381 26.0651C13.876 26.0684 8.41466 26.0684 2.95392 26.0651C2.95392 27.0842 2.95392 28.1026 2.95392 29.1203V82.649C2.9186 84.2474 3.48985 85.7982 4.54911 86.9796C5.12431 87.6174 5.82757 88.122 6.61125 88.4594C7.39494 88.7967 8.24076 88.9589 9.09144 88.9349C25.8749 88.9257 42.6593 88.9221 59.4447 88.9241C60.9568 88.8555 62.3873 88.2078 63.4492 87.1109C64.5111 86.0141 65.1256 84.5493 65.1694 83.0107C65.1917 76.166 65.1742 69.3203 65.1761 62.4756C60.5889 67.2102 56.0052 71.9485 51.4251 76.6903C50.9802 77.2624 50.424 77.7348 49.7912 78.078C47.4736 79.1023 45.1581 80.1312 42.8444 81.1648C42.5651 81.313 42.2469 81.3681 41.935 81.322C41.6232 81.2759 41.3335 81.131 41.1072 80.908C40.8809 80.685 40.7295 80.3951 40.6745 80.0796C40.6194 79.764 40.6635 79.4389 40.8005 79.1503C41.8026 76.7248 42.8192 74.3072 43.8184 71.8818C43.9421 71.557 44.1287 71.2608 44.3669 71.0105C51.3188 63.8107 58.2695 56.6095 65.2188 49.4071C65.1219 46.7402 65.212 44.0663 65.1723 41.3965C60.1977 41.3965 55.2222 41.4073 50.2476 41.3915C49.1155 41.3614 48.0154 41.0029 47.0769 40.3582C46.1384 39.7136 45.4006 38.8096 44.9503 37.7528C44.5372 36.7228 44.3615 35.6103 44.4367 34.5005C44.4419 29.1404 44.4419 23.7809 44.4367 18.4221C43.6966 18.401 42.9895 18.106 42.448 17.5925C41.9065 17.079 41.5678 16.3823 41.4954 15.6329C41.4498 13.9575 41.475 12.282 41.4818 10.6066C41.5041 9.84116 41.8106 9.11269 42.3395 8.56766C42.8685 8.02262 43.5807 7.70142 44.333 7.66864C51.2138 7.64696 58.0947 7.66864 64.9755 7.6578C64.7235 6.6647 64.2319 5.75121 63.5452 5.00004C62.8585 4.24887 61.9984 3.68375 61.0428 3.35583C59.8933 3.06605 58.7055 2.96622 57.5248 3.06016H25.1732M5.04531 23C9.57698 23 14.1074 23 18.6364 23C19.2108 23.0482 19.7889 22.9942 20.345 22.8403C20.8913 22.6383 21.3633 22.2702 21.6968 21.7861C22.0304 21.3019 22.2094 20.7252 22.2096 20.134C22.2096 15.1674 22.2096 10.2002 22.2096 5.23234C16.4885 11.1562 10.7671 17.0788 5.04531 23ZM44.4328 10.7327C44.4328 12.2689 44.4328 13.8054 44.4328 15.3422C44.8098 15.3028 45.2866 15.4644 45.5454 15.082C46.9429 13.6346 48.3404 12.1855 49.7379 10.7347C47.9689 10.7314 46.1992 10.7314 44.4289 10.7347M53.532 11.1388C52.1965 12.5462 50.8359 13.926 49.4975 15.3314C50.5636 15.3402 51.6248 15.3314 52.6869 15.3402C54.1804 13.8146 55.6593 12.2761 57.1449 10.7387C56.1661 10.7436 55.1844 10.7229 54.2056 10.7387C53.9148 10.6904 53.7297 10.9673 53.5369 11.1398M56.9017 15.3353C57.9729 15.3353 59.0448 15.3353 60.1173 15.3353C61.5968 13.7991 63.0796 12.2656 64.5656 10.7347C63.4928 10.7347 62.4199 10.7347 61.3481 10.7347C59.8653 12.2676 58.3838 13.8008 56.9036 15.3343M64.3175 15.3343C65.3961 15.3343 66.4738 15.3491 67.5525 15.3235C69.0062 13.7821 70.4986 12.2742 71.964 10.7396C70.9027 10.7327 69.8425 10.7446 68.7813 10.7308C67.2704 12.2426 65.7993 13.7978 64.3136 15.3314M75.9335 10.9634C74.5289 12.4207 73.123 13.8773 71.7159 15.3333C73.4848 15.3333 75.2545 15.3333 77.0248 15.3333C77.0248 13.7972 77.0248 12.2607 77.0248 10.7239C76.6584 10.7692 76.1913 10.6017 75.9326 10.9624M47.3926 18.4073C47.3974 19.4175 47.3926 20.4247 47.3926 21.4349C47.3974 26.0848 47.379 30.7357 47.4013 35.3855C47.426 36.1799 47.7554 36.933 48.319 37.4836C48.8826 38.0343 49.6357 38.3389 50.4172 38.3323C57.2961 38.3323 64.1744 38.3323 71.052 38.3323C71.8306 38.3345 72.5794 38.0279 73.1393 37.4777C73.6991 36.9275 74.026 36.1769 74.0505 35.3855C74.0747 30.7366 74.0505 26.0887 74.0612 21.4399C74.0612 20.4297 74.0612 19.4224 74.0612 18.4122C65.1703 18.3925 56.2789 18.3925 47.3867 18.4122M67.1968 51.7143C66.5184 52.3992 65.8604 53.1029 65.1878 53.7928C65.8843 54.5156 66.5804 55.236 67.2763 55.9541C67.9547 55.2643 68.6272 54.5744 69.2901 53.8766C69.4556 53.7214 69.5871 53.5326 69.6762 53.3224C69.7654 53.1122 69.8102 52.8854 69.8076 52.6565C69.8002 52.281 69.6566 51.9215 69.4043 51.6472C69.1521 51.3728 68.8091 51.203 68.4412 51.1702C68.2068 51.1587 67.973 51.2016 67.7573 51.2957C67.5417 51.3898 67.35 51.5336 67.1968 51.7143ZM46.6269 73.0231C45.9796 74.258 45.5367 75.6013 44.9688 76.8776C46.1462 76.3542 47.3334 75.8477 48.5022 75.3007C49.1248 74.7508 49.7172 74.1664 50.2767 73.5503C55.2438 68.4005 60.2139 63.2535 65.1868 58.1096C64.4852 57.4 63.798 56.6736 63.1012 55.9601C57.6101 61.6477 52.0996 67.3137 46.6269 73.0231Z" fill="#2B1505"/>
<path d="M53.7171 23.002C53.93 22.6329 54.2127 22.3104 54.5489 22.0531C54.8851 21.7958 55.268 21.6088 55.6757 21.5029C59.0457 21.4583 62.4164 21.4583 65.7877 21.5029C66.1958 21.61 66.5789 21.7982 66.9151 22.0567C67.2513 22.3151 67.5338 22.6388 67.7463 23.0089C68.129 23.9751 68.2624 25.0248 68.1339 26.0582C68.2587 27.091 68.1254 28.1391 67.7463 29.1055C67.4918 29.5748 67.1186 29.9665 66.6654 30.2401C66.2122 30.5137 65.6954 30.6592 65.1684 30.6617C62.2119 30.667 59.2548 30.667 56.297 30.6617C55.745 30.6612 55.2042 30.5042 54.7353 30.2082C54.2663 29.9122 53.8879 29.489 53.6425 28.9863C53.3182 28.0419 53.2066 27.0355 53.3159 26.0414C53.1888 25.0085 53.3257 23.9596 53.7132 22.9961M56.2814 24.5266C56.2814 25.5477 56.2814 26.5657 56.2814 27.5819C59.245 27.6016 62.2067 27.5819 65.1703 27.5907C65.1752 26.5687 65.1703 25.5457 65.1703 24.5237L56.2814 24.5266Z" fill="#2B1505"/>
<path d="M13.343 30.8579C14.5747 30.6574 15.8239 30.5913 17.0693 30.6608C18.2023 30.5799 19.3368 30.7957 20.3644 31.2876C21.3192 31.776 22.1292 32.5139 22.7113 33.4255C23.2934 34.3372 23.6266 35.3898 23.6769 36.4756C23.7098 37.6109 23.6905 38.7423 23.6895 39.8826C23.6868 40.7855 23.4898 41.6768 23.1125 42.494C22.7351 43.3112 22.1865 44.0346 21.5051 44.6133C20.3577 45.5718 18.9015 46.0635 17.4182 45.9931C15.9719 46.093 14.5189 46.0036 13.0949 45.727C12.1981 45.4395 11.3801 44.9419 10.7068 44.2743C10.0335 43.6068 9.52373 42.7878 9.2184 41.8833C8.90649 40.7689 8.79229 39.6068 8.88114 38.4516C8.7969 37.2756 8.89004 36.0934 9.15734 34.946C9.45683 33.9571 9.99865 33.0619 10.7319 32.3446C11.4651 31.6272 12.3656 31.1112 13.3488 30.8451M13.6163 33.991C13.0797 34.2386 12.6258 34.6403 12.3106 35.1466C11.9953 35.653 11.8324 36.242 11.8418 36.8412C11.7997 38.1145 11.8288 39.3893 11.9291 40.6593C14.1413 38.3931 16.3415 36.1152 18.5298 33.8254C17.5868 33.7286 16.6384 33.6973 15.6912 33.7318C14.9893 33.6627 14.281 33.7512 13.6163 33.991ZM18.1877 38.5314C16.8212 39.9782 15.3927 41.3629 14.0641 42.8472C15.3011 42.9458 16.5426 42.9734 17.7826 42.93C18.5675 42.9155 19.3154 42.5883 19.8655 42.0188C20.4156 41.4493 20.7238 40.6829 20.7239 39.8846C20.7652 38.6029 20.7403 37.3199 20.6493 36.0409C19.7761 36.8146 19.0134 37.7085 18.1877 38.5314Z" fill="#2B1505"/>
<path d="M29.0847 33.8382C29.529 33.733 29.9863 33.6961 30.4414 33.7288C32.1772 33.7505 33.9138 33.7052 35.6486 33.7485C36.0344 33.7879 36.3903 33.9775 36.6419 34.2776C36.8934 34.5777 37.0211 34.9651 36.9982 35.3588C36.9753 35.7524 36.8036 36.1218 36.519 36.3897C36.2344 36.6575 35.859 36.8031 35.4712 36.7959C33.5562 36.8031 31.6412 36.8031 29.7262 36.7959C29.3703 36.8134 29.0197 36.7024 28.7364 36.4825C28.4531 36.2626 28.2553 35.948 28.1781 35.5942C28.1009 35.2404 28.1491 34.8702 28.3143 34.549C28.4795 34.2279 28.751 33.9765 29.0808 33.8392L29.0847 33.8382Z" fill="#2B1505"/>
<path d="M29.0953 39.9684C29.4189 39.88 29.7541 39.8441 30.0887 39.8619C33.8489 39.8747 37.6082 39.8619 41.3665 39.8688C41.5726 39.8519 41.7799 39.8782 41.9756 39.9463C42.1712 40.0144 42.351 40.1227 42.5037 40.2646C42.6564 40.4064 42.7787 40.5787 42.8631 40.7707C42.9474 40.9627 42.992 41.1703 42.994 41.3806C42.996 41.5909 42.9554 41.7993 42.8747 41.9929C42.794 42.1866 42.675 42.3612 42.525 42.506C42.3751 42.6508 42.1974 42.7627 42.0031 42.8346C41.8088 42.9065 41.6019 42.937 41.3955 42.9241C37.508 42.9313 33.6208 42.9313 29.734 42.9241C29.4428 42.942 29.1528 42.8733 28.8993 42.7265C28.6458 42.5797 28.4398 42.361 28.3064 42.0972C28.2118 41.9062 28.1572 41.6974 28.146 41.4839C28.1348 41.2704 28.1673 41.0568 28.2414 40.8567C28.3156 40.6566 28.4298 40.4744 28.5767 40.3214C28.7237 40.1685 28.9003 40.0483 29.0953 39.9684Z" fill="#2B1505"/>
<path d="M13.6871 49.1794C14.5788 49.065 15.4785 49.0278 16.3764 49.068C17.3035 49.012 18.2338 49.0699 19.1472 49.2405C20.1113 49.4846 21.0002 49.9695 21.7333 50.6514C22.4664 51.3333 23.0206 52.1905 23.3454 53.1453C23.6473 54.1481 23.7649 55.1988 23.6924 56.2449C23.7193 57.211 23.6966 58.1778 23.6246 59.1414C23.482 60.191 23.0739 61.1849 22.4402 62.0258C21.8066 62.8668 20.9691 63.5261 20.0097 63.9392C18.367 64.6507 16.5509 64.3334 14.8258 64.3994C13.4172 64.3882 12.0575 63.8725 10.9859 62.9427C9.91419 62.013 9.19914 60.7287 8.96642 59.3159C8.86006 57.8787 8.83353 56.4365 8.88695 54.9962C8.9258 53.6187 9.42099 52.295 10.2923 51.2396C11.1635 50.1841 12.3598 49.4589 13.6871 49.1814M12.1074 53.9288C11.8518 54.6735 11.7598 55.4661 11.838 56.2508C11.8034 57.1886 11.8358 58.1276 11.9349 59.0606C14.1329 56.7938 16.357 54.5419 18.5066 52.2238C17.2755 52.1237 16.0397 52.0955 14.8054 52.1391C14.2343 52.1416 13.6759 52.3118 13.1976 52.6293C12.7193 52.9468 12.3414 53.3981 12.1093 53.9288M14.0398 61.2476C14.9911 61.3413 15.9475 61.3712 16.9027 61.3373C17.6453 61.419 18.3963 61.3078 19.0851 61.014C19.587 60.7505 20.0066 60.3499 20.2968 59.8572C20.587 59.3645 20.7363 58.7992 20.7278 58.2249C20.7709 56.9538 20.7417 55.6813 20.6406 54.4137C18.4258 56.6766 16.2249 58.9535 14.0379 61.2446L14.0398 61.2476Z" fill="#2B1505"/>
<path d="M29.2833 52.1795C31.2836 52.0701 33.2926 52.1647 35.292 52.1311C35.6461 52.0881 36.0041 52.1706 36.3054 52.3647C36.6067 52.5588 36.8331 52.8525 36.9463 53.1965C37.0148 53.4144 37.0344 53.6451 37.0035 53.8717C36.9727 54.0983 36.8922 54.3149 36.768 54.5056C36.6438 54.6963 36.4791 54.8562 36.2861 54.9735C36.093 55.0909 35.8765 55.1626 35.6525 55.1834C33.6851 55.2209 31.7149 55.1903 29.7475 55.1982C29.3705 55.2261 28.997 55.109 28.7008 54.8701C28.4047 54.6311 28.2076 54.2878 28.1486 53.9081C28.0896 53.5284 28.173 53.14 28.3823 52.8198C28.5915 52.4997 28.9114 52.2711 29.2785 52.1795H29.2833Z" fill="#2B1505"/>
<path d="M29.449 58.287C33.4302 58.2416 37.4124 58.2742 41.3956 58.2712C41.5993 58.2613 41.8028 58.2936 41.9939 58.3662C42.1849 58.4388 42.3594 58.5501 42.5068 58.6935C42.6542 58.8368 42.7714 59.0091 42.8513 59.1999C42.9312 59.3908 42.9721 59.5961 42.9715 59.8035C42.9709 60.0109 42.9288 60.216 42.8479 60.4063C42.7669 60.5967 42.6487 60.7683 42.5005 60.9108C42.3523 61.0532 42.1771 61.1635 41.9857 61.235C41.7942 61.3065 41.5905 61.3376 41.3868 61.3265C37.4512 61.3265 33.5146 61.3422 29.5808 61.3195C29.2046 61.3056 28.8472 61.1482 28.5799 60.8785C28.3126 60.6088 28.155 60.2467 28.1384 59.8641C28.1218 59.4816 28.2474 59.1067 28.4903 58.8141C28.7331 58.5215 29.0754 58.3326 29.449 58.285V58.287Z" fill="#2B1505"/>
<path d="M14.5205 67.4783C15.8831 67.4832 17.2535 67.3975 18.6112 67.5355C19.6816 67.7 20.6876 68.1585 21.5207 68.8615C22.3537 69.5645 22.9823 70.4855 23.3387 71.525C23.6615 72.631 23.7808 73.788 23.6905 74.938C23.7289 75.892 23.6942 76.8476 23.5868 77.7961C23.4088 78.7913 22.9912 79.7261 22.3714 80.5172C21.7517 81.3082 20.9489 81.931 20.0349 82.3297C18.2468 83.0847 16.2708 82.7308 14.3936 82.7811C13.3317 82.6987 12.3111 82.3279 11.4383 81.7074C10.5655 81.0869 9.87249 80.2396 9.43161 79.2538C8.97924 78.1725 8.78816 76.9968 8.87436 75.825C8.91118 74.3339 8.71445 72.7698 9.28915 71.3594C9.69872 70.267 10.4111 69.3189 11.3401 68.63C12.269 67.9411 13.3744 67.541 14.5225 67.4783M11.8486 73.4902C11.8002 74.8133 11.8274 76.1382 11.93 77.4581C14.1422 75.1907 16.3438 72.9117 18.5347 70.6213C17.3016 70.5223 16.064 70.4933 14.8277 70.5346C14.0506 70.5366 13.3048 70.8464 12.7486 71.3985C12.1924 71.9505 11.8695 72.7012 11.8486 73.4912M14.0398 79.6382C14.9332 79.7402 15.8329 79.7731 16.7311 79.7367C17.4991 79.8213 18.2759 79.7255 19.0018 79.4568C19.5374 79.1954 19.9864 78.7807 20.2935 78.2635C20.6006 77.7464 20.7526 77.1492 20.7307 76.5455C20.7702 75.3 20.7401 74.0532 20.6406 72.8112C18.4271 75.0734 16.2262 77.349 14.0379 79.6382H14.0398Z" fill="#2B1505"/>
<path d="M28.9441 70.7041C29.3093 70.5553 29.7035 70.4956 30.0955 70.5296C31.8893 70.5444 33.6812 70.5247 35.4761 70.5385C35.673 70.5283 35.8699 70.5576 36.0556 70.6248C36.2414 70.6919 36.4123 70.7956 36.5586 70.93C36.705 71.0643 36.8238 71.2267 36.9085 71.4077C36.9931 71.5888 37.0418 71.7851 37.0519 71.9853C37.062 72.1855 37.0331 72.3858 36.9671 72.5747C36.901 72.7636 36.799 72.9374 36.6669 73.0862C36.5348 73.235 36.3752 73.3559 36.1971 73.4419C36.0191 73.528 35.8261 73.5776 35.6292 73.5878C33.6638 73.6164 31.6965 73.5947 29.7311 73.5986C29.4066 73.6173 29.0848 73.5287 28.8139 73.3461C28.543 73.1635 28.3374 72.8967 28.2279 72.5855C28.1065 72.2366 28.112 71.855 28.2433 71.5099C28.3747 71.1647 28.6233 70.8789 28.9441 70.7041Z" fill="#2B1505"/>
<path d="M29.0827 76.7731C29.5266 76.6652 29.9844 76.6283 30.4395 76.6637C32.1772 76.6834 33.9167 76.6381 35.6554 76.6815C36.0472 76.7129 36.4113 76.8993 36.6695 77.2007C36.9277 77.5022 37.0593 77.8945 37.036 78.2936C37.0128 78.6926 36.8366 79.0665 36.5453 79.3348C36.254 79.6032 35.8708 79.7446 35.478 79.7288C33.5679 79.7377 31.6567 79.7288 29.7466 79.7288C29.3892 79.7505 29.0358 79.6424 28.7495 79.4238C28.4632 79.2052 28.2625 78.8902 28.1833 78.5352C28.104 78.1801 28.1513 77.808 28.3168 77.4851C28.4822 77.1622 28.755 76.9095 29.0866 76.7721L29.0827 76.7731Z" fill="#2B1505"/>
<path d="M25.1742 3.06706H28.1514C28.1233 10.1936 28.1514 17.3202 28.1407 24.4478C28.1635 25.23 27.9904 26.0053 27.6378 26.7009C27.2852 27.3965 26.7647 27.9896 26.1249 28.4245C25.337 28.9259 24.4186 29.1739 23.4898 29.1361C16.6439 29.1164 9.79697 29.141 2.95101 29.1233C2.95101 28.1042 2.95101 27.0858 2.95101 26.068C8.41305 26.068 13.8744 26.068 19.3352 26.068C20.8263 26.0843 22.2649 25.5087 23.3454 24.4636C23.9201 23.9034 24.3779 23.2313 24.6914 22.4872C25.0049 21.7432 25.1678 20.9425 25.1703 20.133C25.1791 14.4434 25.1684 8.75374 25.1742 3.06706Z" fill="#FFC247"/>
<path d="M28.1514 3.06706H57.5239C58.7045 2.97312 59.8924 3.07295 61.0418 3.36273C61.9974 3.69065 62.8575 4.25578 63.5442 5.00694C64.2309 5.75811 64.7225 6.6716 64.9746 7.6647C58.0937 7.67751 51.2129 7.65386 44.332 7.67554C43.5802 7.70751 42.868 8.02756 42.3386 8.57142C41.8092 9.11529 41.5017 9.84269 41.4779 10.6076C41.4711 12.283 41.4469 13.9585 41.4915 15.6339C41.5639 16.3833 41.9026 17.08 42.4441 17.5935C42.9856 18.107 43.6927 18.402 44.4328 18.4231C44.4328 23.7832 44.4328 29.1427 44.4328 34.5015C44.3577 35.6113 44.5334 36.7238 44.9465 37.7538C45.3967 38.8106 46.1345 39.7146 47.073 40.3592C48.0115 41.0038 49.1116 41.3624 50.2437 41.3925C55.2193 41.4083 60.1958 41.3925 65.1684 41.3974C65.2081 44.0673 65.118 46.7411 65.2149 49.4081C58.274 56.6191 51.3246 63.8206 44.3669 71.0125C44.1287 71.2627 43.9422 71.559 43.8184 71.8837C42.8202 74.3092 41.8026 76.7268 40.8005 79.1522C40.6635 79.4408 40.6194 79.766 40.6745 80.0815C40.7295 80.3971 40.8809 80.6869 41.1072 80.91C41.3335 81.133 41.6232 81.2778 41.935 81.3239C42.2469 81.37 42.5651 81.315 42.8444 81.1667C45.1587 80.1371 47.4743 79.1082 49.7912 78.08C50.424 77.7367 50.9802 77.2643 51.4251 76.6923C56.0123 71.9616 60.596 67.2234 65.1761 62.4776C65.1761 69.3223 65.1917 76.168 65.1694 83.0127C65.1256 84.5513 64.5111 86.016 63.4492 87.1129C62.3873 88.2098 60.9568 88.8575 59.4447 88.926C42.6612 88.9497 25.8768 88.9533 9.09144 88.9369C8.24076 88.9609 7.39494 88.7987 6.61125 88.4614C5.82757 88.124 5.12431 87.6193 4.54911 86.9815C3.48868 85.801 2.91603 84.2505 2.95004 82.652V29.1233C9.796 29.141 16.6429 29.1164 23.4889 29.1361C24.4176 29.1739 25.336 28.9259 26.1239 28.4245C26.7637 27.9896 27.2843 27.3965 27.6369 26.7009C27.9895 26.0053 28.1625 25.23 28.1397 24.4478C28.1465 17.3192 28.1233 10.1927 28.1514 3.06706ZM13.3421 30.8598C12.3588 31.126 11.4583 31.642 10.7251 32.3594C9.99187 33.0767 9.45005 33.9719 9.15055 34.9608C8.88325 36.1081 8.79011 37.2904 8.87435 38.4664C8.7855 39.6216 8.89971 40.7836 9.21161 41.8981C9.51694 42.8026 10.0268 43.6215 10.7 44.2891C11.3733 44.9567 12.1913 45.4543 13.0881 45.7418C14.5121 46.0184 15.9651 46.1078 17.4114 46.0079C18.8947 46.0783 20.3509 45.5866 21.4983 44.6281C22.1797 44.0494 22.7283 43.326 23.1057 42.5088C23.483 41.6916 23.68 40.8003 23.6827 39.8974C23.6827 38.7621 23.7031 37.6306 23.6701 36.4903C23.6198 35.4046 23.2866 34.3519 22.7045 33.4403C22.1224 32.5287 21.3125 31.7908 20.3576 31.3024C19.33 30.8105 18.1955 30.5947 17.0626 30.6755C15.8171 30.6061 14.5679 30.6721 13.3362 30.8727M29.0779 33.854C28.748 33.9912 28.4766 34.2427 28.3114 34.5638C28.1462 34.885 28.098 35.2551 28.1752 35.609C28.2524 35.9628 28.4502 36.2774 28.7335 36.4973C29.0168 36.7172 29.3674 36.8282 29.7233 36.8106C31.6383 36.8139 33.5533 36.8139 35.4683 36.8106C35.856 36.8178 36.2315 36.6723 36.5161 36.4044C36.8006 36.1366 36.9724 35.7672 36.9953 35.3735C37.0182 34.9799 36.8905 34.5925 36.639 34.2924C36.3874 33.9922 36.0315 33.8027 35.6457 33.7633C33.9109 33.7199 32.1752 33.7633 30.4385 33.7436C29.9834 33.7109 29.5261 33.7478 29.0817 33.853M29.0924 39.9822C28.8965 40.0621 28.719 40.1827 28.5714 40.3362C28.4239 40.4897 28.3093 40.6728 28.2352 40.8739C28.1611 41.0749 28.129 41.2894 28.1409 41.5038C28.1528 41.7182 28.2085 41.9276 28.3045 42.1189C28.4396 42.3807 28.6465 42.597 28.9 42.7417C29.1535 42.8863 29.4429 42.9531 29.733 42.9339C33.6205 42.9372 37.5077 42.9372 41.3946 42.9339C41.601 42.9468 41.8078 42.9164 42.0021 42.8445C42.1964 42.7725 42.3741 42.6607 42.5241 42.5159C42.674 42.3711 42.793 42.1964 42.8737 42.0028C42.9544 41.8092 42.995 41.6007 42.993 41.3904C42.991 41.1802 42.9464 40.9725 42.8621 40.7805C42.7777 40.5885 42.6554 40.4162 42.5027 40.2744C42.35 40.1326 42.1703 40.0243 41.9746 39.9562C41.779 39.8881 41.5716 39.8617 41.3655 39.8787C37.6062 39.8698 33.8479 39.8836 30.0877 39.8718C29.7531 39.854 29.4179 39.8899 29.0943 39.9782M13.6851 49.1893C12.3578 49.4668 11.1616 50.192 10.2903 51.2474C9.41905 52.3029 8.92386 53.6266 8.88501 55.0041C8.8316 56.4444 8.85813 57.8865 8.96448 59.3238C9.1972 60.7366 9.91225 62.0208 10.9839 62.9506C12.0556 63.8804 13.4152 64.3961 14.8239 64.4073C16.5499 64.3393 18.366 64.6586 20.0078 63.947C20.9692 63.5339 21.8085 62.8736 22.4431 62.0309C23.0777 61.1882 23.4859 60.1921 23.6275 59.1405C23.6988 58.1751 23.7204 57.2066 23.6924 56.239C23.765 55.1929 23.6473 54.1421 23.3454 53.1394C23.0196 52.1859 22.4651 51.3301 21.732 50.6494C20.9989 49.9688 20.1105 49.4849 19.1472 49.2415C18.2338 49.0709 17.3035 49.013 16.3764 49.069C15.4785 49.0288 14.5788 49.066 13.6871 49.1804M29.2833 52.1814C28.9162 52.2731 28.5964 52.5017 28.3871 52.8218C28.1779 53.142 28.0945 53.5304 28.1535 53.9101C28.2125 54.2898 28.4096 54.6331 28.7057 54.872C29.0018 55.111 29.3754 55.2281 29.7524 55.2002C31.7197 55.1933 33.69 55.2239 35.6573 55.1854C35.8813 55.1646 36.0978 55.0928 36.2909 54.9755C36.484 54.8582 36.6487 54.6983 36.7729 54.5076C36.8971 54.3169 36.9776 54.1002 37.0084 53.8737C37.0392 53.6471 37.0197 53.4164 36.9511 53.1985C36.8379 52.8545 36.6116 52.5608 36.3102 52.3667C36.0089 52.1726 35.651 52.0901 35.2968 52.1331C33.2936 52.1676 31.2846 52.072 29.2882 52.1814M29.4549 58.2919C29.0813 58.3395 28.739 58.5284 28.4961 58.821C28.2532 59.1136 28.1276 59.4885 28.1442 59.871C28.1608 60.2535 28.3185 60.6157 28.5858 60.8854C28.853 61.1551 29.2104 61.3125 29.5867 61.3264C33.5204 61.3501 37.457 61.3353 41.3927 61.3333C41.5963 61.3444 41.8 61.3133 41.9915 61.2419C42.1829 61.1704 42.3581 61.0601 42.5063 60.9176C42.6545 60.7752 42.7727 60.6036 42.8537 60.4132C42.9347 60.2229 42.9767 60.0178 42.9773 59.8104C42.9779 59.603 42.937 59.3976 42.8571 59.2068C42.7772 59.016 42.66 58.8437 42.5126 58.7004C42.3652 58.557 42.1907 58.4457 41.9997 58.3731C41.8086 58.3005 41.6051 58.2682 41.4014 58.2781C37.4182 58.2781 33.4361 58.2495 29.4549 58.2939M14.5176 67.4744C13.3696 67.537 12.2641 67.9371 11.3352 68.626C10.4063 69.3149 9.69387 70.263 9.2843 71.3555C8.7096 72.7698 8.90536 74.3289 8.8695 75.8211C8.78334 76.9928 8.97443 78.1685 9.42676 79.2498C9.86764 80.2356 10.5607 81.083 11.4335 81.7034C12.3063 82.3239 13.3269 82.6947 14.3887 82.7771C16.2659 82.7269 18.241 83.0807 20.03 82.3258C20.9441 81.927 21.7468 81.3043 22.3666 80.5132C22.9864 79.7221 23.4039 78.7873 23.5819 77.7922C23.6893 76.8437 23.724 75.8881 23.6856 74.9341C23.7755 73.7843 23.6559 72.6276 23.3328 71.522C22.9765 70.4825 22.3479 69.5616 21.5148 68.8585C20.6818 68.1555 19.6758 67.697 18.6054 67.5325C17.2486 67.3945 15.8783 67.4803 14.5147 67.4753M28.9393 70.7011C28.6183 70.8757 28.3695 71.1615 28.2379 71.5067C28.1064 71.8518 28.1008 72.2335 28.2221 72.5825C28.3317 72.8954 28.5383 73.1637 28.8108 73.3468C29.0833 73.5299 29.407 73.6179 29.733 73.5976C31.6984 73.5976 33.6658 73.6154 35.6312 73.5868C36.0288 73.5661 36.4021 73.3857 36.6689 73.0852C36.9357 72.7846 37.0741 72.3886 37.0538 71.9843C37.0335 71.5799 36.8561 71.2003 36.5606 70.929C36.2651 70.6577 35.8757 70.5168 35.478 70.5375C33.6842 70.5227 31.8922 70.5424 30.0974 70.5286C29.7055 70.4946 29.3112 70.5543 28.9461 70.703M29.0847 76.7731C28.7531 76.9105 28.4803 77.1631 28.3148 77.486C28.1494 77.8089 28.1021 78.1811 28.1813 78.5362C28.2606 78.8912 28.4613 79.2061 28.7476 79.4247C29.0339 79.6433 29.3872 79.7514 29.7446 79.7298C31.6548 79.7298 33.5659 79.7367 35.4761 79.7298C35.8688 79.7456 36.252 79.6042 36.5434 79.3358C36.8347 79.0674 37.0109 78.6936 37.0341 78.2945C37.0573 77.8955 36.9257 77.5031 36.6676 77.2017C36.4094 76.9003 36.0453 76.7138 35.6534 76.6824C33.9158 76.6391 32.1762 76.6824 30.4376 76.6647C29.9835 76.6292 29.5277 76.6658 29.0847 76.7731Z" fill="#E9EEF2"/>
<path d="M5.04628 23C10.7667 17.0775 16.4882 11.1556 22.2106 5.23431C22.2106 10.2009 22.2106 15.1681 22.2106 20.136C22.2112 20.7278 22.0325 21.3055 21.6989 21.7904C21.3653 22.2753 20.8929 22.644 20.346 22.8463C19.7899 23.0001 19.2117 23.0541 18.6374 23.0059C14.1077 22.998 9.5773 22.9961 5.04628 23Z" fill="#F2F2F2"/>
<path d="M44.4367 10.7328C46.2057 10.7328 47.9753 10.7328 49.7456 10.7328C48.3481 12.1828 46.9493 13.6316 45.5493 15.0791C45.2905 15.4615 44.8127 15.2998 44.4367 15.3393C44.4328 13.8044 44.4328 12.2689 44.4367 10.7328Z" fill="#F2F2F2"/>
<path d="M56.9007 15.3353C58.3803 13.7992 59.863 12.265 61.349 10.7328C62.4199 10.7328 63.4928 10.7328 64.5666 10.7328C63.0857 12.2676 61.6036 13.8005 60.1202 15.3314C59.0464 15.334 57.9732 15.3353 56.9007 15.3353Z" fill="#F2F2F2"/>
<path d="M75.9335 10.9634C76.1923 10.6027 76.6594 10.7663 77.0257 10.7249C77.0257 12.261 77.0257 13.7975 77.0257 15.3343C75.2567 15.3343 73.4871 15.3343 71.7168 15.3343C73.1221 13.8744 74.5276 12.4174 75.9335 10.9634Z" fill="#F2F2F2"/>
<path d="M56.2863 24.5326H65.1752C65.1752 25.5546 65.1752 26.5776 65.1752 27.5996C62.2116 27.5947 59.2499 27.6105 56.2863 27.5908C56.2892 26.5727 56.2844 25.5536 56.2863 24.5326Z" fill="#F2F2F2"/>
<path d="M13.6163 33.989C14.281 33.7492 14.9893 33.6608 15.6912 33.7298C16.6384 33.6953 17.5868 33.7266 18.5298 33.8234C16.3441 36.1145 14.1438 38.3925 11.9291 40.6573C11.8288 39.3873 11.7997 38.1126 11.8418 36.8392C11.8324 36.24 11.9953 35.651 12.3106 35.1446C12.6258 34.6383 13.0797 34.2366 13.6163 33.989Z" fill="#F2F2F2"/>
<path d="M18.1877 38.5305C19.0144 37.7075 19.7761 36.8146 20.6493 36.0439C20.7403 37.3229 20.7652 38.6059 20.7239 39.8876C20.7238 40.6859 20.4156 41.4522 19.8655 42.0218C19.3154 42.5913 18.5675 42.9185 17.7826 42.933C16.5426 42.9764 15.3011 42.9488 14.0641 42.8502C15.3918 41.363 16.8212 39.9773 18.1877 38.5305Z" fill="#F2F2F2"/>
<path d="M12.1074 53.9259C12.3395 53.3951 12.7174 52.9439 13.1957 52.6263C13.674 52.3088 14.2323 52.1386 14.8035 52.1361C16.0378 52.0925 17.2735 52.1208 18.5046 52.2209C16.3551 54.5389 14.1309 56.787 11.9329 59.0577C11.8338 58.1244 11.8014 57.185 11.836 56.2469C11.7586 55.4623 11.8512 54.6701 12.1074 53.9259Z" fill="#F2F2F2"/>
<path d="M14.0379 61.2456C16.2236 58.9525 18.4239 56.6746 20.6387 54.4117C20.7398 55.6794 20.7689 56.9519 20.7259 58.2229C20.7343 58.7972 20.5851 59.3625 20.2949 59.8552C20.0047 60.348 19.5851 60.7486 19.0832 61.012C18.3943 61.3058 17.6434 61.4171 16.9007 61.3353C15.9455 61.3693 14.9892 61.3393 14.0379 61.2456Z" fill="#F2F2F2"/>
<path d="M11.8477 73.4942C11.8686 72.7041 12.1914 71.9534 12.7476 71.4014C13.3038 70.8494 14.0496 70.5395 14.8268 70.5375C16.063 70.4963 17.3006 70.5252 18.5337 70.6242C16.3441 72.9173 14.1426 75.1962 11.9291 77.461C11.8264 76.1415 11.7992 74.8169 11.8477 73.4942Z" fill="#F2F2F2"/>
<path d="M14.0379 79.6381C16.2288 77.3523 18.429 75.0757 20.6387 72.8082C20.7382 74.0502 20.7683 75.297 20.7288 76.5425C20.7506 77.1463 20.5987 77.7434 20.2916 78.2606C19.9844 78.7777 19.5355 79.1925 18.9999 79.4539C18.274 79.7226 17.4972 79.8184 16.7292 79.7338C15.831 79.7712 14.9313 79.7392 14.0379 79.6381Z" fill="#F2F2F2"/>
<path d="M53.5359 11.1378C53.7297 10.9654 53.9109 10.6884 54.2046 10.7367C55.1834 10.7209 56.1651 10.7416 57.144 10.7367C55.6631 12.2752 54.1842 13.8126 52.6859 15.3383C51.6199 15.3275 50.5587 15.3383 49.4965 15.3294C50.8398 13.924 52.2014 12.5442 53.5359 11.1378Z" fill="#C29160"/>
<path d="M64.3146 15.3314C65.8012 13.7949 67.2714 12.2426 68.7784 10.7278C69.8396 10.7426 70.8998 10.7278 71.961 10.7367C70.4957 12.2712 69.0062 13.7791 67.5495 15.3205C66.4709 15.3461 65.3922 15.3294 64.3146 15.3314Z" fill="#C29160"/>
<path d="M47.3935 18.4112C56.2843 18.4007 65.1758 18.4007 74.0679 18.4112C74.0612 19.4214 74.0679 20.4287 74.0679 21.4389C71.3088 21.5069 68.5439 21.3906 65.7915 21.5049C62.4215 21.4563 59.0509 21.4563 55.6796 21.5049C52.9205 21.3916 50.1556 21.5049 47.3993 21.4369C47.3955 20.4247 47.3984 19.4175 47.3935 18.4112Z" fill="#C29160"/>
<path d="M47.3974 21.4349C50.1575 21.5049 52.9215 21.3896 55.6777 21.5029C55.27 21.6088 54.887 21.7958 54.5508 22.0531C54.2146 22.3104 53.9319 22.6329 53.7191 23.002C53.3315 23.9655 53.1946 25.0144 53.3217 26.0474C53.2124 27.0415 53.324 28.0478 53.6483 28.9922C53.8937 29.4949 54.2721 29.9181 54.7411 30.2141C55.21 30.5101 55.7508 30.6672 56.3028 30.6677C59.2593 30.6729 62.2164 30.6729 65.1742 30.6677C65.7012 30.6652 66.2181 30.5196 66.6713 30.246C67.1244 29.9724 67.4976 29.5808 67.7521 29.1115C68.1313 28.145 68.2646 27.0969 68.1398 26.0641C68.2682 25.0307 68.1348 23.981 67.7521 23.0148C67.5396 22.6447 67.2571 22.321 66.921 22.0625C66.5848 21.8041 66.2016 21.6159 65.7935 21.5089C68.5507 21.3935 71.3108 21.5088 74.0699 21.4428C74.0631 26.0917 74.0835 30.7396 74.0592 35.3885C74.0348 36.1799 73.7079 36.9304 73.148 37.4807C72.5881 38.0309 71.8393 38.3375 71.0607 38.3353C64.1838 38.3406 57.3055 38.3406 50.4259 38.3353C49.6444 38.3419 48.8913 38.0373 48.3278 37.4866C47.7642 36.9359 47.4348 36.1829 47.41 35.3885C47.3829 30.7357 47.4022 26.0848 47.3974 21.4349Z" fill="#E3A76F"/>
<path d="M67.2036 51.7083C67.3569 51.5275 67.5488 51.3846 67.7646 51.2905C67.9804 51.1964 68.2144 51.1536 68.4489 51.1653C68.8168 51.198 69.1599 51.3679 69.4121 51.6422C69.6643 51.9166 69.8079 52.276 69.8154 52.6515C69.8179 52.8804 69.7732 53.1073 69.684 53.3175C69.5949 53.5276 69.4633 53.7164 69.2979 53.8717C68.635 54.5724 67.9576 55.2593 67.284 55.9492C66.5862 55.2264 65.8901 54.506 65.1955 53.7879C65.8662 53.098 66.5261 52.3933 67.2036 51.7083Z" fill="#7E8596"/>
<path d="M46.6269 73.023C52.0996 67.3176 57.6101 61.6467 63.1022 55.9581C63.798 56.6716 64.4861 57.397 65.1878 58.1076C60.231 63.268 55.2609 68.4149 50.2776 73.5484C49.7182 74.1644 49.1258 74.7488 48.5032 75.2987C47.3344 75.8487 46.1472 76.3552 44.9697 76.8756C45.5376 75.6013 45.9805 74.2579 46.6269 73.023Z" fill="#DCE1EB"/>
</g>
<defs>
<clipPath id="clip0_5384_51505">
<rect width="80" height="92" fill="white"/>
</clipPath>
</defs>
</svg>
`;
const second = `<svg width="72" height="92" viewBox="0 0 72 92" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5384_51551)">
<path d="M35.3535 0H35.9974C36.0009 5.39227 36.0009 10.7842 35.9974 16.1758C30.4546 16.163 24.9118 16.1827 19.371 16.1669C18.7286 16.1541 18.1103 15.9308 17.6192 15.5344C17.1281 15.138 16.7941 14.5925 16.6728 13.9889C16.5491 12.9255 16.647 11.8502 16.6171 10.7819C16.6171 8.98492 16.6171 7.18794 16.6171 5.39095C20.4817 5.37814 24.3441 5.41461 28.2097 5.37518C28.7411 3.9211 29.6959 2.6426 30.9616 1.69029C32.2272 0.737972 33.7511 0.151514 35.3535 0Z" fill="#FE810D"/>
<path d="M35.9974 0H37.3615C38.0219 0.251315 38.7276 0.382393 39.3736 0.674115C40.4063 1.12794 41.3316 1.77807 42.0932 2.58491C42.8548 3.39175 43.4368 4.33842 43.8037 5.3673C47.6631 5.4215 51.5225 5.3742 55.3818 5.39095C55.3818 7.18794 55.3818 8.98492 55.3818 10.7819C55.3684 11.7428 55.4024 12.7047 55.3818 13.6656C55.351 14.3434 55.0469 14.9834 54.5335 15.4514C54.0201 15.9194 53.3371 16.179 52.6279 16.1758C47.0872 16.1706 41.5464 16.1706 36.0057 16.1758C36.0016 10.7849 35.9988 5.39292 35.9974 0Z" fill="#FF495A"/>
<path d="M0.00614133 8.25692C-0.015515 7.89443 0.0391935 7.53146 0.167014 7.18958C0.294834 6.8477 0.493163 6.53388 0.750224 6.26674C1.00729 5.9996 1.31784 5.78459 1.66344 5.63448C2.00905 5.48438 2.38266 5.40223 2.7621 5.39292C7.3818 5.38405 11.9994 5.39292 16.6191 5.39292C16.6191 7.1899 16.6191 8.98689 16.6191 10.7839C12.9277 10.7839 9.23834 10.7839 5.5469 10.7839C5.5469 36.0586 5.5469 61.3327 5.5469 86.6061C15.6964 86.6133 25.8452 86.6133 35.9933 86.6061C36.0046 88.4027 35.9933 90.1994 35.9984 91.998H2.12849C1.53157 91.8116 1.00866 91.4548 0.630142 90.9755C0.251622 90.4962 0.0356514 89.9175 0.0112937 89.3173C0.000991107 62.2969 -0.000727101 35.2767 0.00614133 8.25692Z" fill="#596C76"/>
<path d="M55.3798 5.38998C59.9974 5.38998 64.6154 5.38998 69.2337 5.38998C69.7583 5.38314 70.2737 5.52206 70.7173 5.78989C71.161 6.05772 71.5139 6.44295 71.7331 6.89886C71.9976 7.62599 72.0867 8.4009 71.9938 9.16562C71.9883 35.9423 71.9866 62.7194 71.9887 89.4967C71.9456 90.0689 71.7216 90.615 71.3464 91.0625C70.9712 91.51 70.4625 91.8376 69.888 92.002H35.9995C35.9995 90.2034 36.0046 88.4067 35.9943 86.61C46.1479 86.6133 56.3005 86.6133 66.452 86.61C66.452 61.3353 66.452 36.0606 66.452 10.7859C62.7606 10.7809 59.0712 10.7859 55.3798 10.7859C55.3777 8.98559 55.3777 7.18697 55.3798 5.38998Z" fill="#465A61"/>
<path d="M5.54694 10.7848C9.23837 10.7799 12.9277 10.7848 16.6192 10.7848C16.6491 11.8542 16.5512 12.9284 16.6748 13.9918C16.7961 14.5954 17.1302 15.141 17.6213 15.5374C18.1123 15.9338 18.7307 16.157 19.3731 16.1699C24.9138 16.1856 30.4567 16.1699 35.9995 16.1788C35.9995 21.6269 36.0088 27.073 35.9943 32.5192C30.9177 32.532 26.0026 34.2274 22.0858 37.3168C18.0129 40.5345 15.2434 45.0123 14.2558 49.9762C13.5095 53.7582 13.8092 57.6611 15.1253 61.2982C16.8926 66.1511 20.4141 70.2405 25.055 72.8291C28.3793 74.6748 32.1527 75.6513 35.9964 75.6606C36.0094 79.3117 36.0094 82.9622 35.9964 86.612C25.849 86.612 15.7002 86.612 5.55003 86.612C5.54796 61.3353 5.54694 36.0596 5.54694 10.7848Z" fill="#F2F2F2"/>
<path d="M25.6505 52.6303C25.8838 52.3443 26.1769 52.108 26.5111 51.9364C26.8453 51.7649 27.2132 51.662 27.5913 51.6341C27.9694 51.6063 28.3494 51.6543 28.7071 51.7749C29.0648 51.8955 29.3922 52.0861 29.6685 52.3346C30.8883 53.5005 32.103 54.6743 33.2919 55.8708C34.2017 55.1444 34.9867 54.2811 35.8192 53.4739C35.9547 53.78 36.019 54.1105 36.0077 54.4427C35.9778 56.604 36.0211 58.7683 35.9871 60.9296L35.982 61.0804C35.3638 61.4904 34.86 62.1192 34.0976 62.2897C33.626 62.4162 33.1277 62.4201 32.6539 62.3011C32.1802 62.1821 31.7482 61.9444 31.4024 61.6126C29.5528 59.8228 27.7083 58.0285 25.8689 56.2295C25.3874 55.7543 25.1004 55.1294 25.0603 54.4687C25.0202 53.8081 25.2297 53.1556 25.6505 52.6303Z" fill="#F2F2F2"/>
<path d="M55.3798 10.7849C59.0712 10.7849 62.7606 10.7849 66.452 10.7849C66.4555 36.0596 66.4555 61.3343 66.452 86.609C56.2991 86.6123 46.1466 86.6123 35.9944 86.609C36.0019 82.9579 36.0019 79.3074 35.9944 75.6576C40.8951 75.6687 45.6561 74.0966 49.5063 71.196C53.7219 68.0295 56.625 63.5337 57.6979 58.5101C58.5178 54.6798 58.2554 50.7097 56.9376 47.0087C55.0911 41.7975 51.2271 37.4613 46.1404 34.8924C43.011 33.3243 39.5291 32.5097 35.9964 32.5192C36.0108 27.073 35.9964 21.6269 36.0016 16.1788C41.5423 16.1715 47.0831 16.1715 52.6238 16.1788C53.333 16.182 54.016 15.9223 54.5294 15.4543C55.0428 14.9863 55.3468 14.3463 55.3777 13.6686C55.4025 12.7047 55.3664 11.7428 55.3798 10.7849Z" fill="#DAEDFF"/>
<path d="M42.6035 46.8539C42.9018 46.606 43.2521 46.4219 43.6309 46.314C44.0097 46.2061 44.4082 46.177 44.7998 46.2285C45.1913 46.28 45.5668 46.411 45.9011 46.6127C46.2354 46.8144 46.5207 47.0822 46.7379 47.398C47.1015 47.9317 47.2637 48.5682 47.1975 49.2021C47.1314 49.8361 46.8409 50.4294 46.3742 50.8838L37.6088 59.4246C37.1002 59.9556 36.5591 60.4572 35.9881 60.9266C36.0211 58.7653 35.9789 56.602 36.0088 54.4397C36.0201 54.1075 35.9557 53.777 35.8202 53.4709C35.8717 53.4098 35.9789 53.2896 36.0263 53.2285C38.2341 51.1145 40.3977 48.963 42.6035 46.8539Z" fill="#DAEDFF"/>
<path d="M22.0837 37.3139C26.0006 34.2245 30.9157 32.5291 35.9923 32.5162C36.0273 39.4151 35.9521 46.3248 36.0293 53.2285C35.9778 53.2896 35.8707 53.4099 35.8233 53.471C34.9908 54.2781 34.2068 55.1464 33.2961 55.8678C32.1071 54.6714 30.8935 53.5025 29.6726 52.3317C29.3963 52.0832 29.0689 51.8925 28.7112 51.7719C28.3536 51.6513 27.9735 51.6034 27.5954 51.6312C27.2173 51.659 26.8494 51.762 26.5152 51.9335C26.181 52.105 25.8879 52.3413 25.6546 52.6273C25.235 53.1524 25.0264 53.8042 25.0667 54.4639C25.107 55.1237 25.3934 55.7478 25.874 56.2226C27.7141 58.0196 29.5586 59.814 31.4076 61.6057C31.7534 61.9375 32.1854 62.1752 32.6591 62.2942C33.1328 62.4132 33.6312 62.4093 34.1028 62.2828C34.8652 62.1123 35.3648 61.4835 35.9871 61.0735C36.018 65.9323 36.0036 70.793 35.9964 75.6517C32.1527 75.6425 28.3793 74.666 25.055 72.8202C20.4141 70.2317 16.8926 66.1423 15.1253 61.2893C13.8092 57.6523 13.5095 53.7494 14.2557 49.9674C15.2442 45.0059 18.0129 40.5304 22.0837 37.3139Z" fill="#64E0DB"/>
<path d="M35.9943 32.5152C39.527 32.5058 43.0089 33.3204 46.1383 34.8884C51.225 37.4574 55.0891 41.7935 56.9355 47.0048C58.2533 50.7057 58.5157 54.6758 57.6958 58.5061C56.6229 63.5297 53.7199 68.0256 49.5042 71.1921C45.6538 74.0928 40.8923 75.665 35.9912 75.6537C35.9985 70.7949 36.0139 65.9342 35.982 61.0754L35.9871 60.9247C36.558 60.4552 37.0992 59.9537 37.6077 59.4227L46.3784 50.8829C46.8451 50.4284 47.1355 49.8351 47.2016 49.2012C47.2678 48.5673 47.1056 47.9308 46.742 47.397C46.5248 47.0812 46.2394 46.8135 45.9052 46.6118C45.5709 46.4101 45.1954 46.279 44.8039 46.2275C44.4123 46.176 44.0138 46.2052 43.635 46.313C43.2562 46.4209 42.9059 46.605 42.6076 46.853C40.4018 48.9621 38.2383 51.1165 36.0345 53.2285C35.9531 46.3247 36.0294 39.419 35.9943 32.5152Z" fill="#00C7C7"/>
</g>
<defs>
<clipPath id="clip0_5384_51551">
<rect width="72" height="92" fill="white"/>
</clipPath>
</defs>
</svg>
`;
const third = `<svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5384_51574)">
<path d="M40.3156 17.287C44.2574 17.3206 48.024 18.8572 50.7868 21.5588C53.5496 24.2603 55.0825 27.9057 55.0482 31.693C55.0822 35.4801 53.5492 39.1252 50.7864 41.8266C48.0236 44.5279 44.2572 46.0644 40.3156 46.098C36.3739 46.0644 32.6075 44.5279 29.8447 41.8266C27.0819 39.1252 25.549 35.4801 25.5829 31.693C25.5487 27.9057 27.0815 24.2603 29.8444 21.5588C32.6072 18.8572 36.3737 17.3206 40.3156 17.287Z" fill="#FEA31C"/>
<path d="M17.1329 5.28249C17.8477 3.72674 19.0144 2.4021 20.4931 1.46739C21.9717 0.53268 23.6996 0.0275782 25.4696 0.0126432C35.1928 0.00680725 44.9163 0.00680725 54.6402 0.0126432C56.2834 -0.11319 57.9348 0.119566 59.4711 0.693502C61.1506 1.389 62.5809 2.54228 63.5853 4.01067C64.5897 5.47907 65.1239 7.19814 65.122 8.95523C65.1274 26.8521 65.1274 44.7489 65.122 62.6458C64.6218 62.6688 64.125 62.7388 63.639 62.8549C63.563 60.1762 63.6217 57.4956 63.6005 54.8169C63.6531 53.6585 63.6227 52.4979 63.5094 51.3435C63.2485 50.1752 62.5445 49.142 61.5343 48.445C61.2205 48.2393 60.8351 48.1604 60.4612 48.2252C60.174 47.1563 59.5145 46.214 58.5924 45.5553C57.8688 45.0607 57.0093 44.7826 56.1217 44.7558C55.2341 44.729 54.3581 44.9546 53.6036 45.4045C52.9054 45.8277 52.3347 46.4191 51.948 47.1199C51.5614 47.8207 51.3724 48.6065 51.3997 49.3992C51.4038 56.7979 51.4038 64.1962 51.3997 71.5942C50.1849 71.5942 48.9701 71.5942 47.7624 71.5942C47.3256 71.1426 46.7966 70.7823 46.2083 70.536C45.6201 70.2896 44.9854 70.1625 44.3437 70.1625C43.7141 70.176 43.0937 70.3105 42.5191 70.5581C41.9444 70.8057 41.4272 71.1613 40.9979 71.604C37.151 71.5758 33.3041 71.604 29.4572 71.5913C31.1063 68.6928 32.8161 65.8254 34.5584 62.9804C34.7548 63.7661 35.198 64.4748 35.8279 65.0103C36.4684 65.4619 37.2541 65.6823 38.0469 65.6328C39.7679 65.6328 41.4889 65.6221 43.2099 65.6328C43.7255 65.6864 44.2471 65.6244 44.7336 65.4518C45.2201 65.2791 45.6584 65.0005 46.0141 64.6378C46.2923 64.3408 46.5059 63.9934 46.6424 63.6159C46.7788 63.2384 46.8353 62.8385 46.8085 62.4398C46.7817 62.041 46.6722 61.6514 46.4864 61.2939C46.3006 60.9364 46.0422 60.6183 45.7265 60.3581C44.4439 59.2882 42.6419 59.7463 41.1072 59.6588C39.3862 59.7648 37.5266 59.3135 35.9443 60.1451C36.1022 58.6628 35.843 56.9237 34.4855 56.023C34.4303 55.0852 34.1567 54.1712 33.6848 53.3485C33.213 52.5258 32.555 51.8154 31.7592 51.2696C30.6738 50.5705 29.3823 50.227 28.0773 50.2905C26.7722 50.3539 25.5233 50.8209 24.5169 51.6217C23.5434 52.5219 22.7536 53.5891 22.1885 54.7683C20.3393 57.9041 18.4894 61.0383 16.6389 64.1709L16.5589 64.0834C16.6045 63.7741 16.6105 63.386 16.2977 63.208C16.3544 55.0669 16.3068 46.9248 16.321 38.7836C16.3251 28.9015 16.3251 19.019 16.321 9.13615C16.3015 7.80795 16.5776 6.49107 17.1309 5.27374M28.5451 4.49561C28.4975 5.46827 28.4975 6.45259 28.5451 7.43011C29.5459 7.4768 30.5475 7.4768 31.5497 7.43011C31.5973 6.45162 31.5952 5.47118 31.5497 4.49367C30.5485 4.44698 29.5463 4.44698 28.5471 4.49367M34.6454 4.49367C34.5995 5.4741 34.5995 6.45454 34.6454 7.43498C38.6948 7.46869 42.7459 7.46869 46.7986 7.43498C46.8465 6.45454 46.8465 5.4741 46.7986 4.49367C42.7492 4.458 38.6982 4.458 34.6454 4.49367ZM34.0583 19.5825C31.0671 21.2197 28.8115 23.8615 27.7251 26.9999C26.735 29.8322 26.7461 32.8992 27.7566 35.7248C28.767 38.5504 30.7204 40.9762 33.3132 42.6256C33.3686 42.8233 33.4467 43.0145 33.546 43.1956C35.3151 45.224 37.7066 46.6628 40.3783 47.3061C42.8021 47.9111 45.3531 47.8571 47.7468 47.15C50.1404 46.4429 52.2824 45.1105 53.9336 43.3016C55.8331 41.2835 57.041 38.7532 57.3938 36.0534C57.667 34.0611 57.4733 32.0354 56.8268 30.1243C56.1803 28.2132 55.0974 26.4651 53.6573 25.0079C53.3166 24.5638 52.8381 24.2348 52.2906 24.0684C51.2965 22.5561 49.9952 21.252 48.4645 20.2341C46.9338 19.2161 45.2052 18.5052 43.382 18.1439C40.1928 17.5362 36.8825 18.0506 34.0552 19.5932L34.0583 19.5825Z" fill="#95979D"/>
<path d="M28.544 4.50731C29.5432 4.46062 30.5454 4.46062 31.5466 4.50731C31.5922 5.47996 31.5942 6.46429 31.5466 7.44375C30.5458 7.49044 29.5442 7.49044 28.542 7.44375C28.4965 6.46526 28.4965 5.48482 28.544 4.50731Z" fill="#3D9AE2"/>
<path d="M34.6424 4.50453C38.6918 4.46887 42.7428 4.46887 46.7956 4.50453C46.8435 5.48497 46.8435 6.46541 46.7956 7.44584C42.7462 7.4828 38.6952 7.4828 34.6424 7.44584C34.5965 6.46541 34.5965 5.48497 34.6424 4.50453Z" fill="#3D9AE2"/>
<path d="M52.2865 24.08C52.834 24.2465 53.3125 24.5754 53.6532 25.0196C55.0934 26.4768 56.1763 28.2249 56.8228 30.136C57.4693 32.0471 57.663 34.0728 57.3898 36.0651C57.037 38.7648 55.829 41.2951 53.9296 43.3133C52.2783 45.1222 50.1364 46.4546 47.7427 47.1617C45.3491 47.8688 42.798 47.9228 40.3743 47.3177C37.7025 46.6745 35.311 45.2357 33.542 43.2073C33.4426 43.0262 33.3646 42.835 33.3091 42.6373C35.8819 44.2472 38.947 44.971 42.0034 44.6902C45.0598 44.4095 47.9266 43.1409 50.1353 41.0918C52.6482 38.7649 54.1715 35.6239 54.4094 32.2785C54.616 29.3993 53.8732 26.5306 52.2865 24.08Z" fill="#3D9AE2"/>
<path d="M60.4561 48.2242C60.83 48.1595 61.2154 48.2384 61.5292 48.4441C62.5393 49.1411 63.2434 50.1743 63.5043 51.3426C63.6177 52.497 63.6481 53.6575 63.5954 54.8159C63.6167 57.4946 63.557 60.1753 63.6339 62.8539C63.0097 63.0956 62.4415 63.4539 61.9625 63.908C61.4834 64.3622 61.1028 64.9031 60.8429 65.4996C60.7669 65.5239 60.6141 65.5764 60.5392 65.5968C60.5645 60.5731 60.5392 55.5493 60.5523 50.5207C60.5715 49.754 60.5394 48.9869 60.4561 48.2242Z" fill="#3D9AE2"/>
<path d="M34.4814 56.0337C35.839 56.9344 36.1012 58.6735 35.9402 60.1558C35.4958 60.49 35.1393 60.9198 34.8993 61.4106C34.6593 61.9013 34.5425 62.4394 34.5584 62.9814C32.8161 65.8264 31.1063 68.6928 29.4572 71.5923C29.0239 71.5923 28.5916 71.5923 28.1594 71.5923C27.8506 71.106 27.5519 70.6021 27.2594 70.1031C29.3428 66.4586 31.5315 62.8744 33.6371 59.2444C34.1843 58.2554 34.474 57.1537 34.4814 56.0337Z" fill="#3D9AE2"/>
<path d="M4.57173 15.3641C4.71078 15.2267 4.87707 15.1176 5.06077 15.0431C5.24448 14.9685 5.44186 14.9301 5.64127 14.9301C5.84068 14.9301 6.03807 14.9685 6.22177 15.0431C6.40547 15.1176 6.57176 15.2267 6.71081 15.3641C8.24755 16.8386 9.75695 18.3394 11.2846 19.8247C10.5827 20.5444 9.86393 21.2467 9.12829 21.9314C8.48039 21.3012 7.85274 20.6504 7.17447 20.0523C7.15523 25.7997 7.17447 31.5471 7.16536 37.2935H4.1182C4.10909 31.5461 4.12731 25.7987 4.10909 20.0542C3.43183 20.6524 2.80722 21.3031 2.15729 21.9295C1.423 21.2434 0.704241 20.5425 0.000999451 19.8266C1.52863 18.3423 3.04107 16.8444 4.57173 15.3641Z" fill="#FF9811"/>
<path d="M74.63 15.4535C74.7946 15.2795 74.9982 15.1439 75.2256 15.0569C75.4529 14.9699 75.6978 14.9339 75.9418 14.9515C76.1858 14.9691 76.4225 15.04 76.6337 15.1586C76.8449 15.2773 77.0252 15.4407 77.1608 15.6364C78.5781 17.038 80.0126 18.4269 81.437 19.8256C80.7358 20.5454 80.017 21.2476 79.2807 21.9324C78.6328 21.3021 78.0051 20.6514 77.3289 20.0532C77.3076 25.8006 77.3289 31.548 77.3178 37.2945C76.3054 37.2945 75.286 37.2945 74.2696 37.2945C74.2625 31.549 74.2807 25.8016 74.2625 20.0571C73.5852 20.6553 72.9606 21.306 72.3107 21.9343C71.5767 21.2486 70.86 20.5434 70.1544 19.8295C71.6493 18.3718 73.1412 16.9132 74.63 15.4535Z" fill="#FF9811"/>
<path d="M4.12024 40.2815C5.13258 40.2777 6.14796 40.2777 7.16638 40.2815C7.16638 41.2756 7.16638 42.2687 7.16638 43.2627C6.15403 43.2627 5.13359 43.2627 4.11821 43.2627C4.11416 42.2648 4.11484 41.2711 4.12024 40.2815Z" fill="#FF9811"/>
<path d="M74.2736 40.2815C75.29 40.2777 76.3061 40.2777 77.3218 40.2815C77.3218 41.2749 77.3218 42.2687 77.3218 43.2627C76.3041 43.2666 75.2873 43.2666 74.2716 43.2627C74.2709 42.2654 74.2716 41.2717 74.2736 40.2815Z" fill="#FF9811"/>
<path d="M74.2777 46.2449C75.29 46.241 76.3061 46.241 77.3258 46.2449C77.3258 47.2364 77.3258 48.2295 77.3258 49.2242C76.3135 49.2242 75.2931 49.2242 74.2797 49.2242C74.273 48.2282 74.2723 47.2351 74.2777 46.2449Z" fill="#FF9811"/>
<path d="M14.763 39.4986C15.2128 39.1454 15.7455 38.903 16.3149 38.7924C16.3018 46.9335 16.3493 55.0756 16.2916 63.2168C16.2354 63.3707 16.2303 63.5376 16.277 63.6945C16.3238 63.8513 16.4202 63.9903 16.5528 64.0922L16.6328 64.1797C16.078 65.1475 15.4737 66.0871 14.923 67.0578C14.6277 67.4854 14.4855 67.9938 14.518 68.5061C14.6014 68.8795 14.8287 69.2089 15.1543 69.428C15.4798 69.6472 15.8796 69.74 16.2734 69.6878C16.9537 69.5906 17.3414 68.9642 17.6725 68.4409C20.2347 64.0046 22.881 59.6121 25.4675 55.1885C25.6865 54.702 26.0277 54.2754 26.4606 53.9469C26.8935 53.6184 27.4045 53.3983 27.9478 53.3064C28.7114 53.2196 29.481 53.4144 30.101 53.8514C30.721 54.2885 31.1454 54.9352 31.2885 55.6612C31.435 56.5665 31.225 57.4918 30.6993 58.2562C28.8275 61.3969 26.9891 64.559 25.1081 67.691C24.6559 68.343 24.2823 69.0423 23.9946 69.7754C23.9237 70.3668 24.0991 70.9612 24.4825 71.4289C25.4149 72.8879 26.3047 74.3741 27.2219 75.8428C28.0577 77.1414 28.5066 78.6355 28.5197 80.1624C28.5143 82.7723 28.5116 85.3823 28.5116 87.9922C20.8857 87.9699 13.2617 88.0107 5.63268 88V65.2564C5.68836 62.8326 5.43021 60.3649 6.04976 57.9878C6.51878 56.3312 7.16613 54.7261 7.98132 53.1984C9.82513 49.2838 11.6693 45.3702 13.5138 41.4575C13.7711 40.7224 14.1982 40.0527 14.763 39.4986Z" fill="#FFC477"/>
<path d="M53.5975 45.4046C54.352 44.9547 55.2281 44.729 56.1156 44.7558C57.0032 44.7826 57.8627 45.0608 58.5863 45.5553C59.5084 46.2141 60.1679 47.1563 60.4551 48.2253C60.5383 48.9906 60.5701 49.7602 60.5503 50.5295C60.5351 55.5532 60.5614 60.577 60.5371 65.6056C59.9652 65.7622 59.2353 65.9616 59.1199 66.6308C58.9984 68.035 58.9645 69.445 59.0186 70.8531C58.945 71.8109 58.9922 72.7736 59.1593 73.7205C59.2796 73.9763 59.4741 74.1934 59.7196 74.3456C59.9651 74.4979 60.251 74.5788 60.5432 74.5788C60.8354 74.5788 61.1213 74.4979 61.3668 74.3456C61.6123 74.1934 61.8068 73.9763 61.9271 73.7205C62.0987 72.7123 62.1466 71.6882 62.0698 70.6692C62.0243 69.3737 62.1711 68.0703 62.0091 66.7786C61.9423 66.1464 61.2883 65.8537 60.8408 65.5035C61.1008 64.9071 61.4813 64.3661 61.9604 63.912C62.4395 63.4578 63.0076 63.0996 63.6319 62.8579C64.1179 62.7418 64.6147 62.6718 65.1149 62.6487C66.0472 62.6457 66.9572 62.9226 67.7177 63.4407C68.4782 63.9588 69.0512 64.6922 69.3567 65.5385C68.9163 65.8721 68.2967 66.1688 68.234 66.7777C68.149 68.0079 68.1287 69.2415 68.1732 70.4738C68.1114 71.5084 68.1432 72.5462 68.2684 73.5756C68.3509 73.812 68.4947 74.0244 68.6863 74.1926C68.8779 74.3609 69.1109 74.4795 69.3634 74.5373C69.6159 74.5951 69.8796 74.5902 70.1295 74.523C70.3795 74.4558 70.6075 74.3286 70.7922 74.1533C71.1629 73.6213 71.3208 72.9783 71.2366 72.3432C71.2062 70.7218 71.2366 69.0994 71.2305 67.4799C71.2304 66.8944 71.0326 66.3247 70.6666 65.8566C71.0915 65.3252 71.6372 64.8943 72.262 64.5968C72.8869 64.2992 73.5742 64.1429 74.2716 64.1398C75.2025 64.1372 76.111 64.4138 76.8703 64.9312C77.6297 65.4485 78.2019 66.1808 78.5072 67.0257C78.0669 67.3612 77.4514 67.6579 77.3825 68.2668C77.2276 69.3688 77.3562 70.4854 77.3117 71.5943C77.2398 72.3491 77.3084 73.1103 77.5141 73.8421C77.6553 74.0751 77.8603 74.2663 78.1069 74.3949C78.3535 74.5235 78.6321 74.5845 78.9123 74.5712C79.1925 74.558 79.4636 74.471 79.6959 74.3197C79.9281 74.1685 80.1126 73.9588 80.2292 73.7137C80.3958 72.705 80.4443 71.6815 80.374 70.6625C80.3528 69.5458 80.5947 68.2872 79.8132 67.3477C80.2792 66.7638 80.8907 66.302 81.5913 66.0049C82.2918 65.7078 83.059 65.5848 83.822 65.6474C84.9668 65.7598 86.0273 66.2767 86.7978 67.0979C87.5683 67.919 87.9938 68.9859 87.9919 70.0915C87.9993 76.0604 87.9993 82.0296 87.9919 87.9991C74.3246 87.9991 60.6579 87.9991 46.992 87.9991C44.9329 84.5471 42.9021 81.0757 40.847 77.6189C40.3544 76.913 40.0146 76.1192 39.8479 75.2845C39.7535 74.6286 39.8064 73.9608 40.003 73.3261C40.1996 72.6914 40.5354 72.1046 40.9878 71.6049C41.4171 71.1622 41.9343 70.8066 42.5089 70.559C43.0835 70.3115 43.704 70.177 44.3336 70.1635C44.9752 70.1635 45.61 70.2907 46.1982 70.537C46.7864 70.7834 47.3155 71.1436 47.7522 71.5952C49.1149 73.4579 50.107 75.553 51.3704 77.4808C51.4139 75.518 51.3785 73.5551 51.3896 71.5943C51.3896 64.1956 51.3896 56.7973 51.3896 49.3992C51.3627 48.6062 51.5523 47.8201 51.9397 47.1193C52.327 46.4185 52.8986 45.8273 53.5975 45.4046Z" fill="#FFC477"/>
<path d="M24.5078 51.6324C25.5142 50.8315 26.763 50.3646 28.0681 50.3011C29.3732 50.2377 30.6647 50.5811 31.7501 51.2803C32.5458 51.8261 33.2039 52.5365 33.6757 53.3592C34.1476 54.1819 34.4212 55.0958 34.4764 56.0337C34.4701 57.1531 34.1818 58.2544 33.6361 59.2434C31.5254 62.8734 29.3367 66.4576 27.2584 70.1022C27.554 70.6021 27.8496 71.1011 28.1583 71.5913C29.5938 73.9422 31.3786 76.2708 31.5294 79.1129C31.6307 82.0697 31.5507 85.0334 31.573 87.9941C30.5546 87.9883 29.5392 88.0126 28.5228 87.9941C28.5228 85.3842 28.5255 82.7742 28.5309 80.1643C28.5163 78.6355 28.0649 77.1399 27.226 75.8408C26.3088 74.3721 25.4189 72.8859 24.4866 71.4269C24.1032 70.9592 23.9278 70.3648 23.9986 69.7734C24.2863 69.0403 24.6599 68.341 25.1122 67.689C26.9941 64.5531 28.8315 61.392 30.7034 58.2543C31.229 57.4898 31.4391 56.5645 31.2926 55.6592C31.1495 54.9333 30.7251 54.2865 30.105 53.8495C29.485 53.4124 28.7155 53.2176 27.9518 53.3044C27.4079 53.3963 26.8962 53.6167 26.4629 53.9457C26.0296 54.2748 25.6883 54.7022 25.4696 55.1894C22.8861 59.6131 20.2398 64.0056 17.6745 68.4418C17.3425 68.9661 16.9557 69.5886 16.2754 69.6888C15.8816 69.741 15.4818 69.6482 15.1563 69.429C14.8307 69.2098 14.6034 68.8805 14.52 68.507C14.4874 67.9948 14.6296 67.4863 14.925 67.0587C15.4757 66.0861 16.0801 65.1474 16.6348 64.1806C18.484 61.0448 20.3339 57.9106 22.1845 54.778C22.7482 53.5995 23.5362 52.5327 24.5078 51.6324Z" fill="#FFB655"/>
<path d="M59.1209 66.6268C59.2373 65.9576 59.9672 65.7583 60.5381 65.6017L60.8419 65.5044C61.2903 65.8546 61.9443 66.1473 62.0101 66.7795C62.1761 68.0673 62.0253 69.3707 62.0708 70.6702C62.1476 71.6891 62.0997 72.7132 61.9281 73.7214C61.8078 73.9772 61.6133 74.1943 61.3678 74.3465C61.1223 74.4988 60.8364 74.5798 60.5442 74.5798C60.2521 74.5798 59.9661 74.4988 59.7206 74.3465C59.4752 74.1943 59.2806 73.9772 59.1603 73.7214C58.9932 72.7745 58.9459 71.8117 59.0196 70.854C58.9654 69.4443 58.9992 68.0327 59.1209 66.6268Z" fill="#FFB655"/>
<path d="M68.237 66.7747C68.2998 66.1648 68.9193 65.8691 69.3597 65.5355C69.796 65.6377 70.2344 65.7388 70.6697 65.8565C71.0356 66.3247 71.2335 66.8943 71.2336 67.4799C71.2336 69.1013 71.2082 70.7237 71.2396 72.3431C71.3237 72.9783 71.1659 73.6212 70.7952 74.1532C70.6106 74.3285 70.3825 74.4558 70.1326 74.523C69.8826 74.5901 69.6189 74.595 69.3664 74.5372C69.1139 74.4794 68.8809 74.3608 68.6894 74.1926C68.4978 74.0243 68.3539 73.8119 68.2714 73.5755C68.1462 72.5461 68.1144 71.5083 68.1763 70.4737C68.1316 69.2405 68.1519 68.0059 68.237 66.7747Z" fill="#FFB655"/>
<path d="M77.3856 68.2658C77.4544 67.6559 78.0699 67.3602 78.5103 67.0247C78.9466 67.1268 79.385 67.2299 79.8182 67.3476C80.5998 68.2872 80.3578 69.5458 80.3791 70.6624C80.4494 71.6815 80.4008 72.7049 80.2343 73.7136C80.1177 73.9588 79.9332 74.1685 79.7009 74.3197C79.4687 74.4709 79.1976 74.5579 78.9174 74.5712C78.6372 74.5844 78.3586 74.5234 78.112 74.3948C77.8654 74.2662 77.6603 74.075 77.5192 73.842C77.3135 73.1102 77.2449 72.3491 77.3167 71.5942C77.3592 70.4844 77.2307 69.3688 77.3856 68.2658Z" fill="#FFB655"/>
<path d="M35.9342 60.1548C37.5205 59.3193 39.3832 59.7706 41.0971 59.6685C42.6318 59.756 44.4378 59.3008 45.7164 60.3678C46.0321 60.628 46.2905 60.9461 46.4763 61.3036C46.6621 61.6611 46.7716 62.0507 46.7984 62.4495C46.8252 62.8483 46.7687 63.2481 46.6323 63.6256C46.4958 64.0031 46.2822 64.3505 46.0039 64.6475C45.6483 65.0102 45.21 65.2888 44.7235 65.4615C44.2369 65.6341 43.7154 65.6961 43.1997 65.6425C41.4788 65.6279 39.7578 65.6425 38.0368 65.6425C37.2439 65.6921 36.4582 65.4717 35.8177 65.0201C35.1879 64.4845 34.7448 63.7758 34.5483 62.9901C34.5313 62.4462 34.648 61.906 34.8888 61.4134C35.1295 60.9209 35.4877 60.4897 35.9342 60.1548Z" fill="#E6E7E8"/>
<path opacity="0.8" d="M16.2916 63.2158C16.6045 63.3967 16.5953 63.7848 16.5528 64.0911C16.4202 63.9892 16.3238 63.8503 16.277 63.6934C16.2303 63.5366 16.2354 63.3697 16.2916 63.2158Z" fill="#849190"/>
<path d="M37.2392 25.974C37.4662 24.8264 39.2338 24.6531 39.7547 25.6672C39.911 26.7643 39.8329 27.8795 39.8292 28.9838C42.2145 28.9838 44.6035 28.9802 46.9888 28.991C46.9926 29.2364 46.9963 29.7309 47 29.9799C44.611 29.9763 42.2219 29.9799 39.8366 29.9763C39.8738 31.5209 39.7175 33.0763 39.911 34.6137C40.4692 36.3568 43.3495 36.4471 44.2165 34.906C44.4212 34.3791 44.3393 33.8053 44.3691 33.2568C43.409 33.5635 42.1252 34.0074 41.3772 33.0583C40.5064 32.1308 41.7419 30.8821 42.7987 31.0012C44.7524 31.1961 46.319 33.513 45.3813 35.2886C44.0342 37.703 39.7175 37.5406 38.6979 34.9421C38.3481 33.3145 38.59 31.6328 38.5342 29.9835C37.6969 29.9763 36.8633 29.9763 36.026 29.9727C36.0186 29.7273 36.0074 29.2328 36 28.9874C36.841 28.9874 37.6857 28.9838 38.5304 28.9802C38.5267 28.3847 38.5267 27.7857 38.5193 27.1866C38.043 26.8618 37.2429 26.6669 37.2392 25.974Z" fill="#F3F6F9" stroke="white" stroke-width="0.5"/>
</g>
<defs>
<clipPath id="clip0_5384_51574">
<rect width="88" height="88" fill="white"/>
</clipPath>
</defs>
</svg>
`;
const forth = `<svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5384_52014)">
<path d="M4.05844 11.0513C2.1969 5.60497 6.66419 1.04737 11.304 0C19.816 14.0724 24.5062 30.2253 31.4552 45.1723C27.0868 46.7352 22.3075 48.5513 20.1639 53.3347C14.7906 39.2358 9.15754 25.2427 4.05844 11.0513ZM8.66139 14.6419C10.8824 13.8599 15.0144 15.7289 15.5852 12.2014C16.1308 9.89615 13.8855 8.65049 12.2972 7.82886C9.58392 8.82234 9.7913 12.3743 8.66139 14.6419ZM15.0513 22.1158C16.3168 25.6139 17.3343 30.0403 21.4906 30.689C20.2376 27.1778 19.5302 22.3009 15.0513 22.1158ZM20.226 35.4175C21.2803 38.9287 22.5836 42.9575 26.4676 43.7924C25.3251 40.335 24.7417 35.3666 20.226 35.4175Z" fill="#869CA8"/>
<path d="M67.3379 8.48065C69.9311 7.47396 73.4671 5.41989 75.6261 8.40134C77.758 10.6537 76.2589 13.5691 75.254 15.9546C73.3682 16.0472 71.4699 16.1397 69.5832 16.2465L69.2237 15.0669C68.5909 12.8796 67.9484 10.6934 67.3379 8.48065Z" fill="#869CA8"/>
<path d="M21.8132 13.6596C28.5752 13.381 35.2878 12.1221 42.075 12.295C48.6887 11.9523 55.1406 13.863 61.6923 14.4731C61.6177 15.4137 61.481 17.2959 61.419 18.2355C48.8495 18.1826 36.281 18.2355 23.7116 18.1958L21.8132 13.6596Z" fill="#869CA8"/>
<path d="M67.9465 29.1271C68.778 28.8485 70.4409 28.3055 71.2839 28.0401C70.4112 30.8474 68.9191 33.3988 66.9291 35.4866C68.1203 36.9312 69.3074 38.3799 70.4903 39.8327C66.9048 42.2183 64.9193 37.5407 62.5364 35.5619C64.6683 33.7366 65.6635 30.7541 67.9465 29.1271Z" fill="#869CA8"/>
<path d="M72.9836 27.9587C73.9023 27.9587 75.7386 27.9852 76.6563 27.9984C77.4383 31.0988 79.9201 33.0604 81.8426 35.3392C79.9811 37.4197 78.1079 39.4737 76.1844 41.4739C75.6882 40.8516 74.6833 39.6059 74.1872 38.9826C75.2919 37.8559 76.383 36.7302 77.5004 35.6035C75.5564 33.3709 74.0248 30.7787 72.9836 27.9587Z" fill="#869CA8"/>
<path d="M18.0291 58.3306C21.3665 54.7797 24.9277 50.8566 29.6925 49.7045C34.0348 49.2143 36.9012 53.4811 40.0535 55.9592C39.7434 62.6116 39.9295 69.2802 39.8926 75.9417H47.645V82.474C32.3464 82.474 17.0432 82.474 1.7356 82.474V75.9406H9.2796C12.2449 70.0967 14.8031 64.0148 18.0272 58.3306M28.2389 52.026C27.5693 53.3642 26.9113 54.7024 26.2417 56.0406C27.048 57.5242 27.8426 58.9956 28.6488 60.4792C30.49 58.3987 32.9669 57.3391 35.4234 56.3446C33.2663 54.4614 30.6732 53.3764 28.2409 52.0229L28.2389 52.026Z" fill="#869CA8"/>
<path d="M52.0763 87.0316C51.7537 83.136 53.9495 78.737 58.0321 78.8163C67.2138 78.6577 76.4206 78.737 85.6149 78.7767C88.0472 78.5916 89.9456 80.486 91.9806 81.5598C89.7343 83.7329 87.7866 87.0458 84.3746 86.9797C73.6288 87.5085 62.8463 86.9655 52.0763 87.0316Z" fill="#869CA8"/>
<path d="M45.9839 88.9392H49.395C49.4076 89.6947 49.4444 91.218 49.457 91.9898C48.5635 91.9898 46.7766 91.9766 45.8958 91.9634C45.9064 91.2048 45.9587 89.6947 45.9839 88.9392Z" fill="#869CA8"/>
<path d="M9.50527 88.9392H15.6102C15.6102 89.708 15.6228 91.2312 15.6228 92H9.49268C9.49268 91.2444 9.49268 89.708 9.50527 88.9392Z" fill="#869CA8"/>
<path d="M18.4885 88.9392H24.6904V92H18.4885V88.9392Z" fill="#869CA8"/>
<path d="M27.7321 88.9392H33.8371V92H27.7195C27.7195 91.2312 27.7321 89.708 27.7321 88.9392Z" fill="#869CA8"/>
<path d="M37.0999 88.9392H43.3017V92H37.0999V88.9392Z" fill="#869CA8"/>
<path d="M11.303 0C14.1007 1.16488 16.6735 2.85314 18.8964 4.98265C33.1035 5.1545 47.2981 5.02231 61.5052 5.04874L61.5547 8.28238C63.453 8.25594 65.3514 8.2295 67.2623 8.18984L67.3369 8.48169C67.9445 10.6944 68.5899 12.8807 69.2227 15.0669C66.7168 14.8635 64.1972 14.7222 61.6913 14.471C55.1396 13.8609 48.6877 11.9533 42.074 12.298C35.2907 12.1261 28.5742 13.385 21.8123 13.6626L23.7106 18.1948C28.8475 30.9433 34.1957 43.5951 40.0516 55.9582C36.9003 53.4801 34.0338 49.2133 29.6906 49.7034C24.9258 50.8566 21.3646 54.7786 18.0272 58.3295C18.722 56.6466 19.3296 54.924 20.1591 53.3336C22.3084 48.5513 27.0887 46.7352 31.4494 45.1723C24.5052 30.2253 19.8151 14.0724 11.303 0Z" fill="#64656B"/>
<path d="M8.6604 14.6419C9.78934 12.3763 9.57905 8.82437 12.2963 7.82886C13.8845 8.65049 16.1308 9.89615 15.5842 12.2014C15.0134 15.7289 10.8814 13.8599 8.6604 14.6419Z" fill="#64656B"/>
<path d="M69.585 16.2485C71.4708 16.1468 73.3691 16.0451 75.2559 15.9567C75.9255 19.9448 76.2734 23.9899 76.6581 28.0015C75.7394 27.9882 73.9031 27.9618 72.9854 27.9618C72.5639 27.975 71.7072 28.0147 71.2857 28.0411C70.4417 28.3065 68.7797 28.8495 67.9483 29.1281C67.8243 27.6303 67.7623 26.1335 67.7371 24.6356C69.5453 22.248 69.2943 19.0957 69.585 16.2485Z" fill="#64656B"/>
<path d="M28.2399 52.0229C30.6722 53.3743 33.2653 54.4634 35.4244 56.3425C32.9678 57.336 30.4822 58.3966 28.6498 60.4771C27.8435 58.9935 27.0489 57.5221 26.2427 56.0385C26.9123 54.6993 27.5703 53.3611 28.2399 52.0229Z" fill="#64656B"/>
<path d="M91.9787 81.5588C92.0901 85.0304 91.8818 89.6155 87.8845 90.4056C78.4169 91.0411 68.8912 90.5245 59.3946 90.671C56.4167 91.1479 54.1463 88.9352 52.0735 87.0265C62.8434 86.9604 73.626 87.5034 84.3707 86.9736C87.7856 87.0448 89.7334 83.7319 91.9787 81.5588Z" fill="#64656B"/>
<path d="M15.0513 22.1158C19.5302 22.3009 20.2376 27.1778 21.4906 30.689C17.3343 30.0403 16.3168 25.6139 15.0513 22.1158Z" fill="#676B72"/>
<path d="M20.2249 35.4195C24.7416 35.3666 25.3249 40.336 26.4665 43.7944C22.5825 42.9596 21.2792 38.9307 20.2249 35.4195Z" fill="#6A6E76"/>
<path d="M56.8655 49.6109C57.5971 49.5977 59.0739 49.5977 59.8065 49.5977C59.8191 50.6308 59.8317 51.6782 59.8433 52.7113C59.165 52.7774 57.7832 52.9147 57.101 52.9635C57.0389 52.1286 56.9275 50.4457 56.8655 49.6109Z" fill="#099BF4"/>
<path d="M81.5198 52.7245C81.5324 51.6782 81.5324 50.644 81.545 49.5977C82.2398 49.5977 83.642 49.5977 84.3368 49.6109C84.2748 50.4457 84.1507 52.1286 84.0887 52.9665C83.4579 52.9106 82.1652 52.7774 81.5198 52.7245Z" fill="#099BF4"/>
<path d="M61.6052 54.6332L64.3098 54.7349C66.1713 56.5764 63.1682 59.386 61.5674 57.4113C61.5809 56.7269 61.5935 55.3226 61.6052 54.6332Z" fill="#099BF4"/>
<path d="M77.3762 54.4735C78.2724 54.6624 79.1586 54.9 80.0314 55.1853C80.3163 57.5872 77.6572 57.4428 76.2715 58.1546C76.5574 57.2394 77.1029 55.3877 77.3762 54.4735Z" fill="#099BF4"/>
<path d="M56.9148 57.5618C57.6348 57.5486 59.0864 57.5486 59.8054 57.5353L59.8423 61.0334C59.1475 61.073 57.7453 61.1656 57.0379 61.2052C57.0136 60.291 56.9439 58.4607 56.9148 57.5618Z" fill="#099BF4"/>
<path d="M81.5566 57.5485H84.3358C84.2738 58.4891 84.142 60.3581 84.0751 61.2987L81.5198 60.9804C81.5324 59.8405 81.545 58.6884 81.5566 57.5485Z" fill="#099BF4"/>
<path d="M65.961 59.2975C66.8051 59.2975 68.5048 59.2843 69.3527 59.2843C69.3653 60.1852 69.3653 61.9607 69.3653 62.8484C68.5096 62.8484 66.7973 62.8352 65.9407 62.8352C65.9484 61.9475 65.9484 60.172 65.961 59.2975Z" fill="#099BF4"/>
<path d="M72.0029 59.2975C72.847 59.2975 74.5341 59.2843 75.3946 59.2843C75.4072 60.172 75.4198 61.9475 75.4314 62.822C74.5757 62.8352 72.8634 62.8484 72.0068 62.8616L72.0029 59.2975Z" fill="#099BF4"/>
<path d="M59.8308 74.1112V67.6582H81.5325V74.1112H59.8308Z" fill="#099BF4"/>
<path opacity="0.98" d="M0.0125976 88.9392C2.03499 88.9392 4.05738 88.926 6.07978 88.926V91.997H0C0.0125976 91.2313 0.0125976 89.708 0.0125976 88.9392Z" fill="#8398A4"/>
</g>
<defs>
<clipPath id="clip0_5384_52014">
<rect width="92" height="92" fill="white"/>
</clipPath>
</defs>
</svg>

`;
const fifth = `<svg width="76" height="88" viewBox="0 0 76 88" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5384_51652)">
<path d="M7.07991 0.0237774C10.3952 -0.022847 13.7106 0.0168367 17.0188 0.00394057C17.5817 1.30645 18.1273 2.6159 18.6942 3.91344C18.8458 4.28289 19.1126 4.59614 19.4568 4.80863C19.8009 5.02111 20.2048 5.122 20.611 5.09691C25.0449 5.09691 29.482 5.09691 33.9169 5.09691C34.2926 5.10348 34.6617 5.00058 34.9774 4.80132C35.2931 4.60206 35.541 4.31543 35.6897 3.97792C36.2546 2.6645 36.7728 1.32827 37.3225 0.00988934C40.4665 0.0277455 43.6104 -0.0218523 46.7543 0.0327081C48.5717 0.175069 50.2774 0.947576 51.5641 2.21107C52.8508 3.47455 53.6339 5.14596 53.7724 6.92418C53.8484 9.05799 53.7815 11.1948 53.8089 13.3316C44.8517 13.3425 35.8956 13.3226 26.9415 13.3405C24.0381 13.3473 21.2481 14.4434 19.1465 16.4028C17.8822 17.6042 16.9033 19.0627 16.279 20.6751C15.6547 22.2875 15.4004 24.0144 15.534 25.7336C15.5411 37.0128 15.5229 48.2919 15.5432 59.569C15.5694 61.7257 16.2222 63.8306 17.4253 65.638C18.6285 67.4454 20.3324 68.8809 22.3381 69.7768C23.7771 70.4085 25.3368 70.7341 26.9141 70.7321C35.8773 70.7367 44.8409 70.7367 53.8048 70.7321C53.7977 74.0434 53.818 77.3567 53.7957 80.668C53.7572 82.1533 53.2723 83.5945 52.4015 84.8119C51.5307 86.0292 50.3126 86.9686 48.8993 87.5129C47.9267 87.8659 46.8937 88.0319 45.8568 88.002C33.0285 87.993 20.1982 88.0129 7.36793 87.9911C5.40748 87.9129 3.55207 87.1033 2.1829 85.7286C0.813727 84.354 0.0347799 82.5186 0.00607412 80.5996C-0.000687021 56.1784 -0.000687021 31.7578 0.00607412 7.33785C0.0469798 5.47839 0.793265 3.70023 2.09988 2.34902C3.40649 0.997813 5.18007 0.170098 7.07586 0.0267593M20.7033 81.2315C20.3512 81.4059 20.061 81.6799 19.8702 82.0178C19.6794 82.3557 19.5968 82.7419 19.6333 83.1262C19.6754 83.5919 19.8917 84.0261 20.2407 84.3455C20.5897 84.6649 21.0469 84.8471 21.5248 84.8573C25.3553 84.8712 29.1868 84.8642 33.0174 84.8573C33.2777 84.8631 33.5366 84.818 33.7788 84.7245C34.021 84.6311 34.2417 84.4912 34.4279 84.3132C34.6142 84.1352 34.7621 83.9225 34.8631 83.6878C34.9642 83.453 35.0162 83.2009 35.0162 82.9462C35.0162 82.6915 34.9642 82.4394 34.8631 82.2046C34.7621 81.9698 34.6142 81.7572 34.4279 81.5792C34.2417 81.4011 34.021 81.2613 33.7788 81.1679C33.5366 81.0744 33.2777 81.0293 33.0174 81.0351C29.34 81.0212 25.6595 81.0351 21.9822 81.0262C21.5469 80.9946 21.1101 81.0639 20.7073 81.2285L20.7033 81.2315Z" fill="#869CA8"/>
<path d="M21.2104 0.000976562C25.1995 0.00560593 29.1885 0.00560593 33.1776 0.000976562C33.0022 0.420596 32.8308 0.837238 32.6614 1.25686C29.0195 1.27075 25.3776 1.25686 21.7388 1.2638C21.5616 0.843194 21.3855 0.422249 21.2104 0.000976562Z" fill="#869CA8"/>
<path d="M25.4283 31.5497C25.5302 31.1291 25.7778 30.7559 26.129 30.4935C26.4803 30.2311 26.9135 30.0957 27.3553 30.1103C28.9272 30.1213 30.4992 30.0746 32.0752 30.1351C33.2121 30.2671 33.6451 31.4307 33.996 32.3523C34.0975 32.8324 34.6857 32.6975 35.0457 32.7134C38.428 32.6886 41.8133 32.7312 45.1986 32.7293C45.8406 33.9197 46.586 35.0545 47.2188 36.2489C46.8993 37.4591 46.6488 38.6863 46.3628 39.9034C46.2436 40.3596 46.2942 40.8424 46.5054 41.2655C46.7167 41.6885 47.0749 42.0243 47.516 42.2128C48.8242 42.7039 50.2542 42.8477 51.5402 43.3784C52.383 44.4339 52.96 45.6759 53.7764 46.7513C54.0984 47.1367 54.5472 47.4007 55.0462 47.4983C54.9655 47.9246 54.7501 48.3154 54.4305 48.6158C54.1109 48.9161 53.703 49.1109 53.2643 49.1728C47.3233 49.2243 41.3802 49.148 35.4413 49.2015C35.3154 49.3303 35.2262 49.4892 35.1828 49.6622C35.1394 49.8353 35.1432 50.0164 35.1938 50.1876C35.4118 50.515 35.8104 50.508 36.1623 50.513C41.2677 50.5083 46.3747 50.5083 51.4834 50.513C51.7424 50.5057 52.0002 50.5494 52.2416 50.6415C52.483 50.7336 52.7029 50.8722 52.8885 51.0491C53.074 51.226 53.2212 51.4376 53.3215 51.6713C53.4218 51.905 53.473 52.156 53.4721 52.4094C53.4712 52.6628 53.4182 52.9135 53.3163 53.1465C53.2145 53.3795 53.0657 53.5901 52.879 53.7658C52.6922 53.9414 52.4713 54.0786 52.2293 54.1691C51.9873 54.2596 51.7292 54.3015 51.4702 54.2925C46.2925 54.2991 41.1148 54.2991 35.9372 54.2925C35.331 54.3039 34.7288 54.1956 34.1664 53.974C33.6041 53.7524 33.0932 53.4221 32.6644 53.0029C32.0934 52.4395 31.6857 51.7378 31.483 50.9697C31.2804 50.2015 31.2902 49.3944 31.5113 48.6311C31.7517 47.7614 32.2664 46.9879 32.9821 46.4208C33.6979 45.8537 34.5783 45.5219 35.498 45.4726C35.18 44.5512 34.8116 43.6472 34.3946 42.7644C33.133 39.8122 31.8024 36.8838 30.5844 33.9137C29.3613 33.8463 28.1362 33.9603 26.9181 33.8532C26.6636 33.8014 26.4224 33.7001 26.2087 33.5553C25.995 33.4105 25.8132 33.2251 25.6742 33.0103C25.5353 32.7954 25.4419 32.5553 25.3996 32.3044C25.3574 32.0535 25.3671 31.7969 25.4283 31.5497Z" fill="#869CA8"/>
<path d="M59.9041 31.6529C60.0945 31.4774 60.3204 31.3426 60.5671 31.2573C60.8138 31.1719 61.076 31.1379 61.337 31.1573C61.598 31.1767 61.8519 31.2492 62.0826 31.37C62.3133 31.4909 62.5157 31.6575 62.6768 31.8593C62.9781 32.2379 63.1255 32.7123 63.0904 33.1909C63.0554 33.6695 62.8405 34.1185 62.4872 34.4514C61.1363 35.7985 59.7915 37.1556 58.4244 38.4849C58.1138 38.7966 57.6995 38.9894 57.2563 39.0285C56.8131 39.0677 56.3702 38.9505 56.0076 38.6982C55.4224 38.2498 54.9508 37.6784 54.4154 37.1784C54.121 36.9649 53.8739 36.6954 53.6889 36.3859C53.504 36.0765 53.3851 35.7336 53.3393 35.3779C53.3265 35.1187 53.3686 34.8597 53.4629 34.6171C53.5572 34.3745 53.7017 34.1535 53.8874 33.9681C54.073 33.7827 54.2959 33.6368 54.5419 33.5395C54.7879 33.4422 55.0517 33.3957 55.317 33.4028C55.6695 33.4466 56.0092 33.56 56.3155 33.7362C56.6219 33.9123 56.8883 34.1476 57.0989 34.4276C58.039 33.511 58.9457 32.5557 59.9041 31.6529Z" fill="white"/>
<path d="M36.2678 55.6813C36.7076 55.5888 37.1646 55.6103 37.5933 55.7438C38.022 55.8773 38.4075 56.1182 38.7117 56.4425C39.0158 56.7667 39.228 57.1631 39.3271 57.5924C39.4263 58.0216 39.4089 58.4688 39.2769 58.8895C39.155 59.2786 38.9369 59.6324 38.6418 59.9194C38.3468 60.2063 37.9838 60.4176 37.5853 60.5345C37.1867 60.6513 36.7648 60.6702 36.357 60.5893C35.9492 60.5085 35.5681 60.3304 35.2476 60.071C34.8968 59.7651 34.6363 59.3728 34.4931 58.935C34.35 58.4972 34.3294 58.0299 34.4336 57.5817C34.5378 57.1335 34.7629 56.7208 35.0855 56.3866C35.4081 56.0523 35.8163 55.8088 36.2678 55.6813Z" fill="#869CA8"/>
<path d="M49.1021 55.6763C49.5567 55.5845 50.0281 55.6142 50.4668 55.7624C50.9055 55.9105 51.2953 56.1715 51.5951 56.518C51.895 56.8645 52.0938 57.2836 52.1707 57.7313C52.2476 58.179 52.1997 58.6387 52.0321 59.062C51.8724 59.4643 51.6075 59.8186 51.264 60.0895C50.9206 60.3604 50.5104 60.5384 50.0746 60.6058C49.6388 60.6731 49.1926 60.6275 48.7804 60.4734C48.3683 60.3193 48.0047 60.0622 47.7259 59.7277C47.4561 59.396 47.2751 59.0037 47.1994 58.5863C47.1237 58.1689 47.1556 57.7397 47.2922 57.3374C47.4289 56.9351 47.666 56.5726 47.982 56.2825C48.298 55.9925 48.683 55.7841 49.1021 55.6763Z" fill="#869CA8"/>
<path d="M25.0277 16.255C25.7931 16.0752 26.5783 15.9885 27.3654 15.9971C40.5828 15.9971 53.8008 15.9971 67.0195 15.9971C69.2916 15.9596 71.4898 16.7869 73.1502 18.3045C74.0593 19.1439 74.7817 20.1577 75.2722 21.2825C75.7628 22.4073 76.0109 23.619 76.001 24.8418C76.0058 36.3491 76.0058 47.8607 76.001 59.3766C76.0316 61.5357 75.26 63.6323 73.8297 65.277C72.9907 66.238 71.9455 67.0062 70.7684 67.5269C69.5913 68.0476 68.3113 68.3081 67.0195 68.2898C53.9597 68.2964 40.8995 68.2964 27.839 68.2898C26.4014 68.3517 24.9678 68.0981 23.6434 67.5477C22.0786 66.8518 20.7494 65.7333 19.8123 64.3237C18.8752 62.9142 18.3691 61.2722 18.3535 59.5909C18.3467 47.9308 18.3467 36.2714 18.3535 24.6127C18.3799 22.6973 19.0468 20.8431 20.2522 19.3335C21.4576 17.8239 23.1353 16.742 25.0287 16.253M59.9162 21.8221C58.7205 22.4273 57.608 23.1871 56.4184 23.7972C54.9772 23.6494 53.5878 23.1425 52.1457 22.9719C51.718 22.9643 51.3001 23.0969 50.9584 23.3486C50.6167 23.6003 50.371 23.9565 50.2603 24.3607C49.8841 25.6166 49.6052 26.8982 49.2289 28.1541C48.1255 28.8713 46.9977 29.5489 45.8984 30.275C45.5156 30.5463 45.2382 30.9365 45.1115 31.3819C44.9847 31.8273 45.0162 32.3016 45.2006 32.7273C41.8153 32.7273 38.431 32.6866 35.0477 32.7114C34.6877 32.6955 34.0975 32.8304 33.9981 32.3503C33.6472 31.4287 33.2141 30.2671 32.0772 30.1332C30.5053 30.0727 28.9333 30.1193 27.3573 30.1084C26.9156 30.0938 26.4823 30.2291 26.131 30.4915C25.7798 30.7539 25.5322 31.1271 25.4304 31.5478C25.3693 31.7951 25.3598 32.0518 25.4023 32.3028C25.4448 32.5537 25.5385 32.7937 25.6778 33.0086C25.8171 33.2234 25.9991 33.4086 26.2131 33.5532C26.427 33.6978 26.6685 33.7988 26.9232 33.8502C28.1402 33.9574 29.3664 33.8433 30.5894 33.9108C31.8065 36.8808 33.1391 39.8092 34.3997 42.7614C34.8167 43.6442 35.185 44.5483 35.5031 45.4696C34.5836 45.5192 33.7034 45.8511 32.9878 46.4182C32.2723 46.9852 31.7577 47.7586 31.5174 48.6282C31.2963 49.3915 31.2865 50.1985 31.4891 50.9667C31.6918 51.7349 32.0995 52.4366 32.6705 53C33.0993 53.4192 33.6102 53.7494 34.1725 53.971C34.7348 54.1926 35.3371 54.301 35.9433 54.2896C41.1209 54.2896 46.2986 54.2896 51.4763 54.2896C51.7352 54.2986 51.9934 54.2566 52.2354 54.1661C52.4774 54.0756 52.6983 53.9385 52.8851 53.7628C53.0718 53.5871 53.2205 53.3765 53.3224 53.1435C53.4243 52.9105 53.4773 52.6599 53.4782 52.4064C53.479 52.153 53.4279 51.902 53.3276 51.6683C53.2273 51.4346 53.0801 51.2231 52.8945 51.0462C52.709 50.8692 52.4891 50.7306 52.2477 50.6385C52.0063 50.5464 51.7485 50.5027 51.4895 50.51C46.3815 50.51 41.2744 50.51 36.1684 50.51C35.8175 50.51 35.4189 50.51 35.1999 50.1846C35.1493 50.0135 35.1455 49.8323 35.1889 49.6593C35.2323 49.4862 35.3214 49.3274 35.4473 49.1986C41.3863 49.145 47.3293 49.2214 53.2704 49.1698C53.7091 49.108 54.117 48.9132 54.4366 48.6128C54.7562 48.3124 54.9716 47.9216 55.0523 47.4953C55.5621 47.4625 56.0571 47.3144 56.4985 47.0628C57.5458 46.4643 58.5883 45.8582 59.6262 45.2444C60.9639 45.4795 62.2742 45.8496 63.6149 46.0807C64.0565 46.1535 64.5101 46.0689 64.8933 45.8422C65.2765 45.6156 65.5639 45.262 65.7031 44.8456C66.0773 43.6662 66.3431 42.4539 66.6848 41.2655C66.7003 41.164 66.7394 41.0673 66.7992 40.983C66.859 40.8987 66.9379 40.8291 67.0297 40.7794C68.0682 40.085 69.1716 39.4769 70.1918 38.7527C70.5582 38.4807 70.8145 38.0908 70.9154 37.6519C71.0164 37.213 70.9555 36.7533 70.7435 36.3541C70.1107 35.1865 69.415 34.0566 68.7547 32.9059C69.0093 31.5518 69.3876 30.2225 69.6178 28.8634C69.6726 28.4125 69.5592 27.9574 69.2983 27.5817C69.0375 27.2061 68.6467 26.9352 68.198 26.8189C66.9597 26.4647 65.7092 26.1503 64.4618 25.8269C63.6849 24.7198 63.0226 23.5383 62.2498 22.4302C61.9977 22.075 61.625 21.8188 61.1979 21.707C60.7708 21.5953 60.317 21.6354 59.9173 21.8202M36.2718 55.6823C35.8204 55.8098 35.4121 56.0534 35.0895 56.3876C34.7669 56.7218 34.5418 57.1345 34.4376 57.5827C34.3335 58.0309 34.354 58.4982 34.4972 58.936C34.6403 59.3738 34.9008 59.7661 35.2516 60.072C35.5722 60.3314 35.9533 60.5095 36.3611 60.5903C36.7689 60.6712 37.1908 60.6523 37.5893 60.5354C37.9879 60.4186 38.3508 60.2073 38.6459 59.9203C38.941 59.6334 39.1591 59.2797 39.2809 58.8905C39.413 58.4698 39.4303 58.0227 39.3312 57.5934C39.232 57.1642 39.0199 56.7677 38.7157 56.4435C38.4116 56.1192 38.026 55.8783 37.5973 55.7448C37.1686 55.6113 36.7117 55.5898 36.2718 55.6823ZM49.1021 55.6823C48.683 55.7901 48.298 55.9985 47.982 56.2886C47.666 56.5786 47.4289 56.9412 47.2922 57.3434C47.1556 57.7457 47.1237 58.1749 47.1994 58.5923C47.2751 59.0097 47.4561 59.402 47.7259 59.7337C48.0047 60.0682 48.3683 60.3253 48.7804 60.4794C49.1926 60.6335 49.6388 60.6791 50.0746 60.6118C50.5104 60.5444 50.9205 60.3664 51.264 60.0955C51.6075 59.8246 51.8723 59.4704 52.0321 59.0681C52.2011 58.6445 52.2501 58.1842 52.174 57.7357C52.0978 57.2872 51.8993 56.8671 51.5993 56.5198C51.2994 56.1725 50.9092 55.9107 50.4698 55.7623C50.0305 55.6139 49.5583 55.5842 49.1031 55.6764L49.1021 55.6823Z" fill="#64E0DB"/>
<path d="M59.9173 21.8201C60.317 21.6354 60.7707 21.5953 61.1979 21.707C61.625 21.8187 61.9977 22.075 62.2498 22.4302C63.0226 23.5373 63.6849 24.7188 64.4618 25.8269C65.7092 26.1542 66.9596 26.4677 68.198 26.8189C68.6467 26.9352 69.0375 27.2061 69.2983 27.5817C69.5592 27.9574 69.6726 28.4125 69.6178 28.8634C69.3876 30.2225 69.0093 31.5517 68.7558 32.9058C69.416 34.0556 70.1117 35.1874 70.7446 36.354C70.9565 36.7533 71.0174 37.213 70.9165 37.6519C70.8155 38.0908 70.5592 38.4807 70.1928 38.7527C69.1726 39.4769 68.0692 40.082 67.0306 40.7794C66.9388 40.829 66.86 40.8987 66.8002 40.983C66.7404 41.0673 66.7012 41.164 66.6858 41.2655C66.343 42.4559 66.0773 43.6661 65.7041 44.8456C65.5649 45.262 65.2775 45.6156 64.8943 45.8422C64.5111 46.0689 64.0575 46.1535 63.6159 46.0807C62.2762 45.8496 60.9649 45.4795 59.6272 45.2444C58.5887 45.8588 57.5461 46.4649 56.4995 47.0628C56.0581 47.3144 55.5631 47.4625 55.0533 47.4953C54.5543 47.3978 54.1055 47.1338 53.7835 46.7483C52.9722 45.672 52.389 44.43 51.5473 43.3755C50.2573 42.8438 48.8313 42.7009 47.5231 42.2099C47.082 42.0214 46.7238 41.6856 46.5125 41.2625C46.3013 40.8394 46.2508 40.3567 46.37 39.9005C46.656 38.6833 46.9064 37.4572 47.2259 36.2459C46.5931 35.0555 45.8476 33.9167 45.2057 32.7263C45.0212 32.3006 44.9898 31.8263 45.1165 31.3809C45.2433 30.9355 45.5207 30.5453 45.9034 30.274C47.0007 29.5479 48.1346 28.8703 49.234 28.1531C49.6102 26.8972 49.8891 25.6156 50.2654 24.3597C50.376 23.9556 50.6218 23.5993 50.9634 23.3476C51.3051 23.0959 51.7231 22.9633 52.1507 22.9709C53.5919 23.1415 54.9813 23.6484 56.4234 23.7962C57.6131 23.1861 58.7256 22.4263 59.9213 21.8211M59.9051 31.6539C58.9497 32.5576 58.042 33.5129 57.0989 34.4315C56.8883 34.1516 56.6218 33.9164 56.3155 33.7402C56.0092 33.5641 55.6695 33.4506 55.317 33.4068C55.0517 33.3997 54.7879 33.4462 54.5419 33.5435C54.2959 33.6407 54.073 33.7866 53.8874 33.9721C53.7017 34.1575 53.5572 34.3784 53.4629 34.621C53.3686 34.8636 53.3265 35.1226 53.3393 35.3819C53.3851 35.7375 53.504 36.0804 53.6889 36.3899C53.8739 36.6993 54.121 36.9689 54.4154 37.1824C54.9519 37.6784 55.4224 38.2537 56.0076 38.7021C56.3702 38.9544 56.8131 39.0716 57.2563 39.0325C57.6995 38.9934 58.1138 38.8006 58.4244 38.4889C59.7915 37.1596 61.1363 35.8035 62.4872 34.4553C62.8405 34.1225 63.0554 33.6735 63.0904 33.1949C63.1255 32.7163 62.9781 32.2419 62.6768 31.8632C62.516 31.6608 62.3137 31.4934 62.0829 31.3719C61.8521 31.2503 61.5978 31.1773 61.3365 31.1575C61.0751 31.1377 60.8124 31.1716 60.5652 31.2569C60.318 31.3422 60.0918 31.4771 59.901 31.6529L59.9051 31.6539Z" fill="#E01A1A"/>
</g>
<defs>
<clipPath id="clip0_5384_51652">
<rect width="76" height="88" fill="white"/>
</clipPath>
</defs>
</svg>
`;
const sixth = `<svg width="93" height="89" viewBox="0 0 93 89" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5384_51670)">
<path d="M10.084 0.20599C11.3627 0.0128022 12.6572 -0.0541875 13.949 0.00598928C32.9677 0.00598928 51.986 0.00598928 71.004 0.00598928C74.1135 0.0181018 77.0922 1.25864 79.291 3.45729C81.4898 5.65594 82.7306 8.63452 82.743 11.744C82.7483 32.2893 82.7503 52.835 82.749 73.381C85.686 73.403 88.625 73.361 91.562 73.398C91.9171 73.3936 92.2611 73.5222 92.5262 73.7585C92.7914 73.9948 92.9586 74.3217 92.995 74.675C93.0193 76.4382 92.6903 78.1884 92.0273 79.8225C91.3644 81.4565 90.381 82.9412 89.1351 84.1891C87.8891 85.437 86.4059 86.4227 84.773 87.0882C83.14 87.7538 81.3903 88.0855 79.627 88.064C64.027 88.0587 48.431 88.0567 32.839 88.058C29.7291 88.0469 26.7498 86.806 24.5516 84.6061C22.3534 82.4061 21.1147 79.4259 21.106 76.316C21.1007 56.7487 21.0987 37.182 21.1 17.616C15.3527 17.6087 9.60567 17.6087 3.85901 17.616C3.13392 17.6454 2.40768 17.627 1.68501 17.561C1.17201 17.486 0.876007 17.016 0.557007 16.661V10.935C0.774146 8.20072 1.92808 5.62512 3.82401 3.64299C5.50513 1.87765 7.69217 0.676876 10.084 0.20599ZM8.18401 3.96299C7.13206 4.51825 6.2036 5.28102 5.45474 6.2052C4.70587 7.12938 4.15214 8.19579 3.82701 9.33999C3.48031 11.0971 3.36666 12.8922 3.48901 14.679C9.35567 14.679 15.225 14.679 21.097 14.679C21.2202 12.8927 21.1055 11.098 20.756 9.34199C20.3977 8.08215 19.7627 6.91817 18.8973 5.93497C18.032 4.95177 16.958 4.17415 15.7538 3.65883C14.5497 3.14351 13.2457 2.90349 11.9369 2.95629C10.6282 3.00908 9.34775 3.35335 8.18901 3.96399M20.117 2.94499C21.9351 4.62071 23.2054 6.80589 23.762 9.21499C24.0277 10.7148 24.1206 12.2401 24.039 13.761C24.039 34.5537 24.039 55.3453 24.039 76.136C24.0215 77.489 24.3093 78.8286 24.881 80.055C25.5282 81.433 26.5219 82.6194 27.7649 83.4985C29.0078 84.3775 30.4576 84.9191 31.9724 85.0703C33.4873 85.2214 35.0155 84.977 36.4076 84.3608C37.7998 83.7447 39.0083 82.7779 39.915 81.555C41.2332 79.7143 41.8477 77.4621 41.647 75.207C41.6071 74.9896 41.6145 74.7663 41.6685 74.552C41.7225 74.3377 41.822 74.1376 41.9602 73.9652C42.0984 73.7927 42.2721 73.652 42.4694 73.5526C42.6668 73.4532 42.8832 73.3974 43.104 73.389C55.3387 73.3723 67.572 73.37 79.804 73.382C79.808 53.3233 79.808 33.2657 79.804 13.209C79.85 12.1728 79.7954 11.1346 79.641 10.109C79.2535 8.06364 78.1548 6.22135 76.5395 4.9082C74.9242 3.59504 72.8964 2.89571 70.815 2.93399C53.913 2.93932 37.013 2.94166 20.115 2.94099M44.597 76.316C44.5819 77.9734 44.2259 79.61 43.5512 81.1239C42.8765 82.6378 41.8974 83.9967 40.675 85.116C53.6583 85.138 66.642 85.141 79.626 85.125C82.1237 85.1615 84.5495 84.2891 86.4519 82.6703C88.3543 81.0514 89.6035 78.7963 89.967 76.325C74.845 76.319 59.7217 76.316 44.597 76.316Z" fill="#525050"/>
<path d="M34.321 8.79602C34.3231 8.4129 34.4762 8.04607 34.7471 7.77516C35.018 7.50425 35.3849 7.35112 35.768 7.34902C36.755 7.32902 37.74 7.34302 38.727 7.34302C39.7698 7.34466 40.7781 7.7166 41.5721 8.39252C42.3662 9.06844 42.8944 10.0044 43.0625 11.0336C43.2306 12.0627 43.0278 13.1181 42.4902 14.0116C41.9525 14.9051 41.115 15.5786 40.127 15.912C39.1868 16.1462 38.2147 16.2256 37.249 16.147C37.243 16.699 37.275 17.253 37.227 17.804C37.1798 18.1708 36.995 18.5059 36.7101 18.7417C36.4252 18.9774 36.0614 19.0962 35.6922 19.074C35.3231 19.0518 34.9762 18.8902 34.7216 18.6219C34.4671 18.3537 34.3239 17.9988 34.321 17.629C34.3083 14.6844 34.3083 11.74 34.321 8.79602ZM37.253 10.278C37.253 11.256 37.253 12.232 37.253 13.21C38.053 13.153 38.987 13.419 39.66 12.865C39.8229 12.7269 39.9537 12.555 40.0435 12.3613C40.1332 12.1675 40.1797 11.9566 40.1797 11.743C40.1797 11.5295 40.1332 11.3185 40.0435 11.1248C39.9537 10.931 39.8229 10.7591 39.66 10.621C38.984 10.067 38.046 10.337 37.25 10.278H37.253Z" fill="#525050"/>
<path d="M47.6 8.33105C47.6996 8.04184 47.8869 7.79093 48.1359 7.6133C48.3849 7.43568 48.6831 7.34021 48.989 7.34021C49.2949 7.34021 49.5931 7.43568 49.8421 7.6133C50.0911 7.79093 50.2785 8.04184 50.378 8.33105C51.312 10.644 52.225 12.967 53.163 15.28C53.3662 15.7875 53.4474 16.3355 53.4 16.8801C53.4903 17.4622 53.3644 18.0573 53.046 18.553C52.7962 18.8498 52.4391 19.0356 52.0528 19.0699C51.6664 19.1042 51.2822 18.9841 50.984 18.736C50.6745 18.4377 50.4753 18.0432 50.419 17.6171C49.465 17.6097 48.5123 17.6097 47.561 17.6171C47.5337 17.8945 47.4379 18.1608 47.2822 18.3921C47.1265 18.6234 46.9158 18.8124 46.669 18.942C46.4607 19.0375 46.2329 19.0826 46.0039 19.0739C45.775 19.0652 45.5513 19.0028 45.3509 18.8918C45.1504 18.7807 44.9789 18.6242 44.85 18.4348C44.7212 18.2453 44.6386 18.0282 44.609 17.801C44.4902 16.9558 44.5609 16.0946 44.816 15.28C45.753 12.967 46.666 10.646 47.6 8.33105ZM48.234 14.675C48.7367 14.6804 49.2407 14.6804 49.746 14.675C49.5295 14.0562 49.277 13.4505 48.99 12.861C48.7027 13.4505 48.4509 14.0562 48.234 14.675Z" fill="#525050"/>
<path d="M57.309 7.42498C57.5286 7.34957 57.7629 7.32729 57.9928 7.35994C58.2227 7.3926 58.4415 7.47928 58.6314 7.61286C58.8213 7.74645 58.9768 7.92314 59.0852 8.12845C59.1936 8.33376 59.2518 8.56184 59.255 8.79399C59.2677 11.7387 59.2677 14.6837 59.255 17.629C59.255 18.0163 59.1011 18.3878 58.8272 18.6617C58.5534 18.9356 58.1819 19.0895 57.7945 19.0895C57.4072 19.0895 57.0357 18.9356 56.7618 18.6617C56.4879 18.3878 56.334 18.0163 56.334 17.629C56.316 14.745 56.334 11.861 56.327 8.97699C56.2956 8.64605 56.375 8.31404 56.5527 8.03313C56.7305 7.75221 56.9965 7.53829 57.309 7.42498Z" fill="#525050"/>
<path d="M63.178 7.42998C64.9142 7.0932 66.7135 7.38305 68.256 8.24798C69.1936 8.83754 69.9451 9.68046 70.4236 10.6792C70.9021 11.678 71.0881 12.7919 70.96 13.8919C70.832 14.992 70.3951 16.0334 69.7 16.8955C69.0049 17.7577 68.0799 18.4055 67.032 18.764C65.9334 19.0727 64.7877 19.1791 63.651 19.078C63.2683 19.0754 62.9021 18.9222 62.6315 18.6516C62.3608 18.381 62.2077 18.0147 62.205 17.632C62.188 14.748 62.205 11.864 62.198 8.98198C62.1665 8.65129 62.2456 8.31947 62.4229 8.03859C62.6003 7.7577 62.8659 7.54364 63.178 7.42998ZM65.145 10.253C65.1264 12.227 65.1264 14.201 65.145 16.175C65.8713 16.1391 66.5636 15.8569 67.108 15.375C67.6328 14.8973 67.9657 14.245 68.0447 13.5398C68.1236 12.8346 67.9432 12.1248 67.537 11.543C67.2636 11.1589 66.9057 10.8427 66.4908 10.6187C66.0759 10.3947 65.6152 10.2689 65.144 10.251L65.145 10.253Z" fill="#525050"/>
<path d="M32.357 22.104C32.9432 22.0083 33.5383 21.9795 34.131 22.018H70.831C71.0353 21.9986 71.2414 22.0215 71.4364 22.0854C71.6313 22.1494 71.811 22.2528 71.9642 22.3894C72.1173 22.526 72.2406 22.6928 72.3262 22.8793C72.4119 23.0657 72.4581 23.2679 72.462 23.473C72.4747 25.4377 72.4747 27.4044 72.462 29.373C72.4575 29.5778 72.411 29.7793 72.3252 29.9653C72.2394 30.1512 72.1163 30.3175 71.9635 30.4538C71.8107 30.5901 71.6315 30.6935 71.437 30.7575C71.2425 30.8216 71.0369 30.8449 70.833 30.826C58.4757 30.826 46.1187 30.826 33.762 30.826C33.1622 30.9144 32.5497 30.8203 32.004 30.556C31.7897 30.4018 31.619 30.1945 31.5088 29.9546C31.3985 29.7146 31.3524 29.4501 31.375 29.187C31.375 27.281 31.364 25.375 31.381 23.471C31.3823 23.1705 31.4766 22.8777 31.651 22.6329C31.8254 22.3882 32.0714 22.2034 32.355 22.104M34.311 24.955C34.311 25.933 34.311 26.9104 34.311 27.887C46.0503 27.891 57.7903 27.891 69.531 27.887C69.531 26.909 69.531 25.933 69.531 24.955C57.7943 24.9537 46.055 24.953 34.313 24.953L34.311 24.955Z" fill="#525050"/>
<path d="M32.357 33.845C32.9425 33.7493 33.537 33.7204 34.129 33.759H70.835C71.1919 33.7258 71.5488 33.8216 71.8412 34.0288C72.1336 34.2361 72.3421 34.5412 72.429 34.889C72.4787 35.1029 72.4798 35.3252 72.4321 35.5395C72.3845 35.7539 72.2894 35.9548 72.1538 36.1275C72.0182 36.3002 71.8456 36.4403 71.6487 36.5375C71.4518 36.6347 71.2356 36.6864 71.016 36.689C58.416 36.707 45.807 36.689 33.202 36.7C32.9097 36.7427 32.6113 36.7067 32.3374 36.5958C32.0636 36.4849 31.8242 36.3031 31.644 36.069C31.5156 35.8833 31.4316 35.6707 31.3985 35.4474C31.3653 35.2242 31.3839 34.9963 31.4528 34.7814C31.5217 34.5665 31.6391 34.3702 31.7959 34.2079C31.9526 34.0455 32.1446 33.9213 32.357 33.845Z" fill="#525050"/>
<path d="M32.357 39.716C32.9425 39.6202 33.537 39.5914 34.129 39.63C38.108 39.635 42.087 39.621 46.066 39.637C46.2983 39.6398 46.5266 39.6977 46.7322 39.8059C46.9377 39.9142 47.1146 40.0698 47.2483 40.2598C47.382 40.4498 47.4686 40.6688 47.5011 40.8989C47.5335 41.1289 47.5109 41.3634 47.435 41.583C47.3197 41.8937 47.1056 42.1579 46.8256 42.3352C46.5456 42.5124 46.2152 42.5928 45.885 42.564C41.533 42.559 37.185 42.573 32.83 42.557C32.4855 42.5547 32.1529 42.4309 31.8909 42.2073C31.6288 41.9837 31.4541 41.6748 31.3975 41.335C31.341 40.9952 31.4062 40.6464 31.5817 40.35C31.7573 40.0536 32.0319 39.8297 32.357 39.716Z" fill="#525050"/>
<path d="M61.152 39.681C63.8039 39.4398 66.4586 40.1131 68.675 41.589C70.4753 42.7808 71.9119 44.4463 72.8264 46.4021C73.7409 48.3579 74.0979 50.5281 73.8581 52.6738C73.6183 54.8195 72.7911 56.8574 71.4674 58.5631C70.1437 60.2688 68.375 61.5761 66.356 62.341C64.7884 62.9363 63.1115 63.1887 61.4381 63.0813C59.7648 62.9738 58.1339 62.509 56.6553 61.7182C55.1767 60.9273 53.8848 59.8288 52.8665 58.4966C51.8483 57.1644 51.1274 55.6294 50.7523 53.9951C50.3773 52.3608 50.3569 50.6651 50.6924 49.0222C51.0279 47.3793 51.7116 45.8274 52.6974 44.4711C53.6833 43.1147 54.9484 41.9853 56.4074 41.159C57.8665 40.3328 59.4857 39.8288 61.156 39.681M61.156 42.627C59.179 42.863 57.3405 43.7624 55.9408 45.1783C54.541 46.5942 53.6628 48.4429 53.4495 50.4224C53.2363 52.402 53.7006 54.3953 54.7666 56.0769C55.8327 57.7584 57.4374 59.0288 59.3188 59.6804C61.2001 60.332 63.2468 60.3264 65.1246 59.6644C67.0023 59.0025 68.6001 57.7234 69.6569 56.036C70.7137 54.3487 71.1671 52.3528 70.943 50.3744C70.7188 48.3961 69.8305 46.5522 68.423 45.144C67.4799 44.2038 66.3366 43.4889 65.0784 43.0525C63.8202 42.6161 62.4797 42.4697 61.157 42.624L61.156 42.627Z" fill="#525050"/>
<path d="M32.357 45.5859C32.9431 45.4893 33.5383 45.4604 34.131 45.4999C38.108 45.5049 42.089 45.4909 46.068 45.5069C46.3001 45.51 46.5282 45.5682 46.7335 45.6766C46.9388 45.785 47.1154 45.9406 47.2489 46.1305C47.3823 46.3205 47.4688 46.5394 47.5011 46.7693C47.5335 46.9992 47.5108 47.2335 47.435 47.4529C47.3199 47.7642 47.1056 48.0289 46.8251 48.2062C46.5446 48.3835 46.2135 48.4635 45.883 48.4339C41.531 48.4289 37.183 48.4429 32.83 48.4269C32.4856 48.4247 32.1529 48.3008 31.8909 48.0773C31.6288 47.8537 31.4541 47.5448 31.3975 47.205C31.341 46.8652 31.4062 46.5163 31.5817 46.2199C31.7573 45.9235 32.0319 45.6986 32.357 45.5849V45.5859Z" fill="#525050"/>
<path d="M61.466 45.696C61.6899 45.5782 61.9395 45.5176 62.1925 45.5195C62.4455 45.5213 62.6941 45.5857 62.9163 45.7068C63.1384 45.8279 63.3272 46.0021 63.4658 46.2137C63.6045 46.4253 63.6887 46.6679 63.711 46.92C64.1191 47.0001 64.494 47.1999 64.788 47.494C65.0356 47.7923 65.1553 48.1764 65.121 48.5626C65.0868 48.9488 64.9013 49.3058 64.605 49.556C64.091 50.013 63.356 49.8719 62.728 49.9559C63.4348 50.089 64.0685 50.4761 64.5095 51.0443C64.9505 51.6124 65.1684 52.3222 65.122 53.04C65.0826 53.4995 64.9411 53.9444 64.7079 54.3423C64.4747 54.7402 64.1556 55.081 63.774 55.3399C63.6 55.9489 63.6 56.732 62.93 57.052C62.7062 57.1701 62.4566 57.2311 62.2034 57.2296C61.9503 57.228 61.7015 57.1639 61.4791 57.043C61.2568 56.922 61.0677 56.748 60.9288 56.5364C60.7899 56.3248 60.7055 56.0821 60.683 55.83C60.2763 55.7478 59.9025 55.5482 59.608 55.256C59.3598 54.9572 59.2397 54.5724 59.2738 54.1855C59.3079 53.7986 59.4934 53.4408 59.79 53.19C60.304 52.737 61.039 52.878 61.667 52.799C60.9947 52.6694 60.3881 52.3108 59.9504 51.7843C59.5128 51.2577 59.2713 50.5956 59.267 49.911C59.2755 49.4169 59.4032 48.9322 59.6393 48.4982C59.8754 48.0641 60.2129 47.6935 60.623 47.418C60.793 46.797 60.795 46.015 61.466 45.696Z" fill="#525050"/>
<path d="M32.358 51.457C32.6344 51.3839 32.9204 51.3535 33.206 51.367C37.493 51.38 41.783 51.36 46.07 51.378C46.2895 51.3804 46.5056 51.4321 46.7024 51.5293C46.8992 51.6265 47.0716 51.7667 47.2069 51.9395C47.3422 52.1123 47.4369 52.3134 47.484 52.5278C47.5311 52.7421 47.5294 52.9643 47.479 53.178C47.3921 53.5257 47.1836 53.8308 46.8912 54.0381C46.5988 54.2454 46.2419 54.3411 45.885 54.308H33.016C32.6852 54.3375 32.3539 54.2575 32.0731 54.0802C31.7923 53.903 31.5776 53.6383 31.462 53.327C31.3339 52.9602 31.3562 52.5575 31.5241 52.2071C31.692 51.8567 31.9918 51.587 32.358 51.457Z" fill="#525050"/>
<path d="M49.969 66.133C50.2447 66.06 50.53 66.0296 50.815 66.043C58.039 66.056 65.264 66.036 72.487 66.054C72.7064 66.0566 72.9224 66.1084 73.1191 66.2056C73.3158 66.3029 73.4882 66.4431 73.6234 66.6159C73.7587 66.7887 73.8534 66.9896 73.9006 67.2039C73.9477 67.4182 73.9462 67.6404 73.896 67.854C73.8078 68.2004 73.5992 68.5042 73.3075 68.7109C73.0158 68.9176 72.6601 69.0137 72.304 68.982H50.625C50.2946 69.0111 49.9637 68.9308 49.6833 68.7536C49.4029 68.5764 49.1885 68.3119 49.073 68.001C48.9455 67.6344 48.9681 67.2323 49.136 66.8823C49.3038 66.5324 49.6033 66.263 49.969 66.133Z" fill="#525050"/>
<path d="M8.18801 3.96393C9.3469 3.35235 10.6277 3.00729 11.937 2.95395C13.2463 2.90061 14.5509 3.14033 15.7557 3.65562C16.9605 4.1709 18.035 4.94874 18.9008 5.93235C19.7666 6.91595 20.4018 8.08049 20.76 9.34094C21.1095 11.097 21.2242 12.8917 21.101 14.6779C15.2343 14.6819 9.36501 14.6819 3.49301 14.6779C3.37067 12.8911 3.48431 11.096 3.83101 9.33893C4.15639 8.1951 4.71023 7.12908 5.45908 6.20525C6.20794 5.28143 7.13627 4.51897 8.18801 3.96393Z" fill="#D0D2D4"/>
<path d="M34.313 24.957C46.0543 24.9536 57.795 24.9536 69.535 24.957C69.535 25.935 69.535 26.911 69.535 27.889C57.7957 27.889 46.0557 27.889 34.315 27.889C34.311 26.9096 34.3103 25.9323 34.313 24.957Z" fill="#D0D2D4"/>
<path d="M44.594 76.3229C59.718 76.3229 74.8413 76.3229 89.964 76.3229C89.6005 78.7942 88.3513 81.0493 86.4489 82.6682C84.5465 84.287 82.1207 85.1594 79.623 85.1229C66.6397 85.1175 53.656 85.1145 40.672 85.1139C41.8933 83.9956 42.8717 82.6382 43.5464 81.1259C44.2211 79.6136 44.5777 77.9788 44.594 76.3229Z" fill="#D0D2D4"/>
<path d="M20.117 2.94593C37.019 2.92726 53.919 2.92493 70.817 2.93893C72.8984 2.90066 74.9262 3.59998 76.5415 4.91314C78.1568 6.22629 79.2555 8.06858 79.643 10.1139C79.7974 11.1396 79.852 12.1778 79.806 13.2139C79.806 33.2713 79.806 53.3289 79.806 73.3869C67.5713 73.3923 55.338 73.3946 43.106 73.3939C42.8852 73.4023 42.6688 73.4582 42.4714 73.5576C42.2741 73.657 42.1004 73.7977 41.9622 73.9701C41.824 74.1425 41.7245 74.3427 41.6705 74.5569C41.6165 74.7712 41.6091 74.9946 41.649 75.2119C41.8497 77.467 41.2352 79.7193 39.917 81.5599C39.0103 82.7828 37.8018 83.7496 36.4096 84.3658C35.0175 84.9819 33.4893 85.2263 31.9744 85.0752C30.4596 84.924 29.0098 84.3825 27.7668 83.5034C26.5239 82.6244 25.5302 81.4379 24.883 80.0599C24.3113 78.8335 24.0235 77.4939 24.041 76.1409C24.041 55.3503 24.041 34.5586 24.041 13.7659C24.1226 12.245 24.0296 10.7197 23.764 9.21993C23.2076 6.80915 21.9365 4.62246 20.117 2.94593ZM34.317 8.79593C34.3077 11.7406 34.3077 14.6849 34.317 17.6289C34.3201 17.9986 34.4635 18.3534 34.7181 18.6214C34.9728 18.8895 35.3197 19.0509 35.6887 19.073C36.0578 19.0951 36.4215 18.9762 36.7063 18.7405C36.9911 18.5047 37.1758 18.1696 37.223 17.8029C37.271 17.2529 37.24 16.7029 37.245 16.1459C38.2107 16.2245 39.1828 16.1451 40.123 15.9109C41.111 15.5775 41.9485 14.904 42.4862 14.0105C43.0238 13.117 43.2267 12.0616 43.0585 11.0325C42.8904 10.0033 42.3622 9.06735 41.5681 8.39143C40.7741 7.71551 39.7658 7.34357 38.723 7.34193C37.736 7.34193 36.751 7.32693 35.764 7.34793C35.3809 7.35003 35.0141 7.50316 34.7431 7.77407C34.4722 8.04498 34.3191 8.41281 34.317 8.79593ZM47.599 8.33093C46.665 10.6459 45.752 12.9669 44.814 15.2799C44.5589 16.0945 44.4882 16.9556 44.607 17.8009C44.636 18.0286 44.7182 18.2463 44.8469 18.4363C44.9755 18.6264 45.1471 18.7835 45.3478 18.8949C45.5484 19.0064 45.7725 19.0691 46.0018 19.078C46.2312 19.0868 46.4594 19.0416 46.668 18.9459C46.9148 18.8162 47.1255 18.6273 47.2812 18.396C47.4369 18.1647 47.5327 17.8984 47.56 17.6209C48.512 17.6136 49.4647 17.6136 50.418 17.6209C50.4743 18.0471 50.6735 18.4416 50.983 18.7399C51.2812 18.988 51.6654 19.108 52.0518 19.0738C52.4381 19.0395 52.7952 18.8537 53.045 18.5569C53.3634 18.0612 53.4893 17.4661 53.399 16.8839C53.4464 16.3394 53.3652 15.7913 53.162 15.2839C52.225 12.9709 51.311 10.6479 50.377 8.33493C50.2774 8.04573 50.0901 7.79481 49.8411 7.61719C49.5921 7.43957 49.2939 7.34409 48.988 7.34409C48.6821 7.34409 48.3839 7.43957 48.1349 7.61719C47.8859 7.79481 47.6986 8.04573 47.599 8.33493M57.307 7.42893C56.9947 7.54242 56.7289 7.7564 56.5513 8.0373C56.3738 8.31821 56.2945 8.65012 56.326 8.98093C56.331 11.8649 56.315 14.7489 56.333 17.6329C56.333 18.0203 56.4869 18.3918 56.7608 18.6657C57.0347 18.9396 57.4061 19.0934 57.7935 19.0934C58.1808 19.0934 58.5523 18.9396 58.8262 18.6657C59.1001 18.3918 59.254 18.0203 59.254 17.6329C59.2667 14.6883 59.2667 11.7433 59.254 8.79793C59.2508 8.56578 59.1926 8.3377 59.0842 8.13239C58.9758 7.92708 58.8203 7.75039 58.6304 7.61681C58.4405 7.48322 58.2216 7.39655 57.9918 7.36389C57.7619 7.33123 57.5276 7.35352 57.308 7.42893M63.177 7.42893C62.8648 7.54259 62.5993 7.75665 62.4219 8.03754C62.2445 8.31842 62.1654 8.65024 62.197 8.98093C62.203 11.8629 62.188 14.7469 62.204 17.6309C62.2066 18.0136 62.3598 18.3799 62.6304 18.6505C62.901 18.9211 63.2673 19.0743 63.65 19.0769C64.7867 19.178 65.9323 19.0716 67.031 18.7629C68.0792 18.4047 69.0045 17.757 69.7 16.8948C70.3954 16.0326 70.8325 14.9911 70.9606 13.8908C71.0888 12.7905 70.9028 11.6764 70.4241 10.6775C69.9455 9.67851 69.1938 8.83548 68.256 8.24593C66.7134 7.38108 64.9141 7.09124 63.178 7.42793M32.357 22.1039C32.0733 22.2033 31.8274 22.3881 31.653 22.6328C31.4786 22.8776 31.3843 23.1704 31.383 23.4709C31.366 25.3709 31.383 27.2809 31.377 29.1869C31.3544 29.45 31.4005 29.7145 31.5108 29.9545C31.621 30.1944 31.7917 30.4017 32.006 30.5559C32.5514 30.82 33.1635 30.9141 33.763 30.8259C46.1203 30.8206 58.4773 30.8206 70.834 30.8259C71.0379 30.8448 71.2435 30.8215 71.438 30.7574C71.6325 30.6934 71.8117 30.59 71.9645 30.4537C72.1173 30.3174 72.2404 30.1511 72.3262 29.9652C72.4119 29.7792 72.4585 29.5776 72.463 29.3729C72.4757 27.4063 72.4757 25.4396 72.463 23.4729C72.4591 23.2678 72.4129 23.0656 72.3272 22.8792C72.2415 22.6927 72.1183 22.5259 71.9652 22.3893C71.812 22.2527 71.6323 22.1493 71.4374 22.0853C71.2424 22.0214 71.0363 21.9985 70.832 22.0179H34.132C33.5393 21.9793 32.9432 22.0082 32.357 22.1039ZM32.358 33.8449C32.146 33.9215 31.9544 34.0457 31.798 34.208C31.6415 34.3702 31.5244 34.5662 31.4556 34.7809C31.3868 34.9955 31.3682 35.2231 31.4013 35.446C31.4343 35.669 31.518 35.8814 31.646 36.0669C31.8262 36.301 32.0656 36.4829 32.3394 36.5938C32.6132 36.7047 32.9117 36.7406 33.204 36.6979C45.809 36.6849 58.414 36.7049 71.018 36.6869C71.2376 36.6844 71.4538 36.6326 71.6507 36.5355C71.8476 36.4383 72.0202 36.2982 72.1558 36.1255C72.2914 35.9528 72.3865 35.7518 72.4341 35.5375C72.4817 35.3231 72.4807 35.1008 72.431 34.8869C72.3441 34.5392 72.1356 34.2341 71.8432 34.0268C71.5508 33.8195 71.1939 33.7238 70.837 33.7569H34.129C33.537 33.7184 32.9425 33.7473 32.357 33.8429M32.357 39.7139C32.0318 39.8277 31.7573 40.0525 31.5817 40.3489C31.4062 40.6453 31.3409 40.9942 31.3975 41.334C31.454 41.6738 31.6288 41.9827 31.8909 42.2063C32.1529 42.4298 32.4855 42.5537 32.83 42.5559C37.182 42.5729 41.53 42.5559 45.885 42.5629C46.2151 42.5917 46.5456 42.5113 46.8256 42.3341C47.1056 42.1569 47.3197 41.8926 47.435 41.5819C47.5109 41.3624 47.5335 41.1279 47.501 40.8978C47.4686 40.6678 47.382 40.4488 47.2483 40.2587C47.1146 40.0687 46.9377 39.9132 46.7322 39.8049C46.5266 39.6966 46.2983 39.6387 46.066 39.6359C42.087 39.6189 38.108 39.6359 34.129 39.6289C33.537 39.5904 32.9425 39.6182 32.357 39.7139ZM61.157 39.6799C58.7469 39.8967 56.4627 40.8533 54.6175 42.4188C52.7722 43.9842 51.4561 46.082 50.8495 48.4245C50.2429 50.7671 50.3755 53.24 51.229 55.5043C52.0825 57.7686 53.6153 59.7136 55.6173 61.0729C57.6194 62.4321 59.9927 63.1391 62.4122 63.097C64.8316 63.0549 67.1789 62.2657 69.1324 60.8376C71.0859 59.4094 72.55 57.4122 73.3242 55.1196C74.0984 52.8269 74.1448 50.351 73.457 48.0309C72.6632 45.3938 70.9755 43.1156 68.684 41.5879C66.4676 40.112 63.8129 39.4387 61.161 39.6799M32.361 45.5849C32.0358 45.6987 31.7613 45.9235 31.5857 46.2199C31.4102 46.5163 31.3449 46.8652 31.4015 47.205C31.4581 47.5448 31.6328 47.8537 31.8949 48.0773C32.1569 48.3008 32.4895 48.4247 32.834 48.4269C37.186 48.4439 41.534 48.4269 45.887 48.4339C46.2175 48.4634 46.5485 48.3833 46.829 48.206C47.1094 48.0287 47.3238 47.7641 47.439 47.4529C47.5148 47.2335 47.5375 46.9992 47.5051 46.7693C47.4728 46.5394 47.3863 46.3205 47.2529 46.1305C47.1194 45.9406 46.9428 45.785 46.7375 45.6766C46.5322 45.5682 46.3041 45.51 46.072 45.5069C42.093 45.4899 38.112 45.5069 34.135 45.4999C33.5423 45.4604 32.9471 45.4883 32.361 45.5849ZM32.361 51.4569C31.9946 51.5861 31.6942 51.8552 31.5255 52.2052C31.3569 52.5553 31.3337 52.9578 31.461 53.3249C31.5766 53.6362 31.7913 53.9009 32.0721 54.0782C32.3529 54.2554 32.6842 54.3355 33.015 54.3059H45.883C46.2399 54.3391 46.5968 54.2433 46.8892 54.0361C47.1816 53.8288 47.3901 53.5237 47.477 53.1759C47.5274 52.9623 47.5291 52.7401 47.482 52.5257C47.4349 52.3113 47.3402 52.1103 47.2049 51.9374C47.0696 51.7646 46.8972 51.6244 46.7004 51.5272C46.5036 51.43 46.2875 51.3783 46.068 51.3759C41.781 51.3579 37.491 51.3759 33.204 51.3649C32.9184 51.3515 32.6324 51.3818 32.356 51.4549M49.968 66.1309C49.6016 66.2601 49.3012 66.5292 49.1325 66.8792C48.9639 67.2293 48.9407 67.6318 49.068 67.9989C49.1835 68.3099 49.3979 68.5743 49.6783 68.7515C49.9587 68.9288 50.2896 69.009 50.62 68.9799H72.297C72.6531 69.0116 73.0088 68.9155 73.3005 68.7089C73.5922 68.5022 73.8009 68.1984 73.889 67.8519C73.9392 67.6383 73.9408 67.4162 73.8936 67.2019C73.8464 66.9876 73.7517 66.7866 73.6164 66.6138C73.4812 66.441 73.3088 66.3008 73.1121 66.2036C72.9154 66.1063 72.6994 66.0545 72.48 66.0519C65.257 66.0339 58.033 66.0519 50.808 66.0409C50.5252 66.0292 50.2423 66.0606 49.969 66.1339L49.968 66.1309Z" fill="#E9EEF2"/>
<path d="M37.25 10.279C38.05 10.338 38.984 10.068 39.657 10.622C39.8199 10.7601 39.9507 10.932 40.0405 11.1257C40.1302 11.3195 40.1767 11.5305 40.1767 11.744C40.1767 11.9575 40.1302 12.1685 40.0405 12.3623C39.9507 12.556 39.8199 12.7279 39.657 12.866C38.984 13.42 38.048 13.154 37.25 13.211C37.25 12.237 37.25 11.257 37.25 10.279Z" fill="#E9EEF2"/>
<path d="M65.145 10.251C65.6156 10.2686 66.076 10.3938 66.4906 10.6171C66.9053 10.8404 67.2632 11.1558 67.537 11.539C67.9431 12.1208 68.1236 12.8306 68.0446 13.5358C67.9657 14.241 67.6328 14.8933 67.108 15.371C66.5636 15.8529 65.8712 16.1351 65.145 16.171C65.1257 14.1983 65.1257 12.225 65.145 10.251Z" fill="#E9EEF2"/>
<path d="M48.233 14.6719C48.4496 14.0531 48.702 13.4474 48.989 12.8579C49.276 13.4474 49.5284 14.0531 49.745 14.6719C49.2403 14.6806 48.7363 14.6806 48.233 14.6719Z" fill="#E9EEF2"/>
<path d="M61.158 42.6269C63.263 42.3778 65.3872 42.8968 67.1401 44.0886C68.893 45.2804 70.1568 47.0649 70.6992 49.114C71.2417 51.1631 71.0263 53.3391 70.0926 55.2421C69.159 57.145 67.5698 58.6471 65.6173 59.472C63.6648 60.297 61.4801 60.3896 59.4648 59.7326C57.4495 59.0756 55.739 57.7133 54.6478 55.896C53.5567 54.0788 53.1581 51.9288 53.5254 49.8411C53.8927 47.7535 55.0011 45.8686 56.647 44.5329C57.9406 43.4845 59.5046 42.8237 61.158 42.6269ZM61.466 45.6959C60.795 46.0149 60.793 46.7959 60.622 47.4089C60.2119 47.6845 59.8744 48.0551 59.6383 48.4892C59.4022 48.9232 59.2745 49.4079 59.266 49.9019C59.2703 50.5866 59.5118 51.2486 59.9494 51.7752C60.3871 52.3018 60.9937 52.6604 61.666 52.7899C61.039 52.8689 60.303 52.7279 59.789 53.1809C59.4924 53.4317 59.3069 53.7895 59.2728 54.1765C59.2387 54.5634 59.3588 54.9481 59.607 55.2469C59.9015 55.5392 60.2753 55.7388 60.682 55.8209C60.7045 56.0731 60.7889 56.3157 60.9278 56.5273C61.0667 56.739 61.2557 56.913 61.4781 57.0339C61.7005 57.1549 61.9493 57.219 62.2024 57.2206C62.4556 57.2221 62.7051 57.1611 62.929 57.0429C63.599 56.7239 63.599 55.9429 63.773 55.3309C64.1547 55.072 64.4737 54.7311 64.7069 54.3332C64.9401 53.9353 65.0816 53.4904 65.121 53.0309C65.1674 52.3132 64.9495 51.6033 64.5085 51.0352C64.0675 50.4671 63.4338 50.08 62.727 49.9469C63.354 49.8659 64.09 50.0079 64.604 49.5469C64.9003 49.2968 65.0857 48.9398 65.12 48.5536C65.1543 48.1674 65.0346 47.7833 64.787 47.4849C64.493 47.1909 64.118 46.9911 63.71 46.9109C63.6863 46.6598 63.6011 46.4184 63.4619 46.2081C63.3228 45.9977 63.134 45.8248 62.9122 45.7047C62.6904 45.5847 62.4424 45.521 62.1902 45.5195C61.938 45.518 61.6893 45.5785 61.466 45.6959Z" fill="#FFD33A"/>
</g>
<defs>
<clipPath id="clip0_5384_51670">
<rect width="92.443" height="88.064" fill="white" transform="translate(0.557007)"/>
</clipPath>
</defs>
</svg>
`;
