import React, { useRef, useState } from "react";
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
import Button from "./../../components/Button";
const { width, height } = Dimensions.get("window");
import {
  dateConverter,
  dateDifference,
  convertDate,
  fileFromURL,
  serverTimeToLocalDate,
  slashDate,
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
import { createOrder, getDutyFee, getOrders } from "../../Class/service";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePickerHook from "../../Hooks/DatePickerHook";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import ReadMoreText from "rn-read-more-text";

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
  const [dutyFee, setDutyFee] = useState();

  React.useEffect(() => {
    //console.log(data.installmentData);
    if (category && service) {
      // try {
      //   setServices(serverToLocal(service.options, service.category));
      // } catch (err) {
      //   console.log(err.message);
      // }
    }
    if (gigs) {
      //console.log(data.subsData)
      setPrice(gigs.price);
      setListData(
          gigs?.skills  
        );
      setFacilities(gigs.facilites.selectedOptions);
    }
    if (selectedPackage) {
      //console.log(selectedPackage?.price)
      setPrice(selectedPackage.price);
    }
  }, [gigs, selectedPackage?.price]);
  React.useEffect(() => {
    if (data && data.subsData && data.subsData.totalDuration) {
      let arr = [];
      for (let i = 0; i < parseInt(data.subsData.totalDuration); i++) {
        arr.push(i);
      }
      setTotalDuration(arr);
    }
    getDutyFee(user.token).then((res) => {
      setDutyFee(res.data.fee);
    });
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
    console.log(selectedPackage?.price);
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
      Price ? parseInt(Price) : 0,
      From,
      To,
      vendor ? "VENDOR" : "USER",
      service ? service : gigs ? gigs.skills : "",
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
        Alert.alert(err.response.data.msg);
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
      navigation.navigate("OrderDetails", {
        data: res.data.order,
        orderId: res.data.order.id,
        type: res.data.order.type,
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
  const renderFooter = ({ isShowingAll, toggle }) => (
    <Text
      style={{ color: "blue", alignSelf: "flex-end" }}
      onPress={() => toggle()}>
      {isShowingAll ? "Show less" : "Show more"}
    </Text>
  );
  const [textRef, setTextRef] = useState();

  const inset = useSafeAreaInsets();
  const handleManualToggle = () => {
    if (textRef) {
      textRef.toggle();
    }
  };

  React.useEffect(() => {
    //console.log(props?.serviceList)
    if (props?.serviceList) {
      let text = "";
      props?.serviceList.map((doc, i) => {
        if (i != 0) {
          text = text + `, ${doc}`;
        } else {
          text = doc;
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

  //console.log(serverToLocal(gigs?.services,))
  //console.log(props.services)

  return (
    <Animated.View layout={FadeIn} style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
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
                {starting
                  ? starting?.price
                  : type == "ONETIME"
                  ? gigs?.price
                  : selectedPackage?.price}
                ৳
              </Text>
            </LinearGradient>
            <View style={styles.avatar}>
              {data && data.service.profilePhoto ? (
                <Image
                  style={{ height: 60, width: 60 }}
                  source={{ uri: data.service.profilePhoto }}
                />
              ) : (
                <SvgXml height={"60"} width={"60"} xml={avatar} />
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
                  value={Price}
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
              {/* <AnimatedHeight
                fontStyle={styles.text14}
                text={services}
                button={true}
                title={"See More"}
              /> */}
              <Pressable style={{ marginTop: 0 }} onPress={handleManualToggle}>
                <ReadMoreText
                  ref={(e) => setTextRef(e)}
                  style={styles.text14}
                  limitLines={2}
                  //renderFooter={renderFooter}
                >
                  {`${services}`}
                </ReadMoreText>
              </Pressable>
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
            <Text style={styles.text14}>
              Duty Fee {dutyFee ? dutyFee * 100 : "0"}%
            </Text>
            <Text style={styles.text14}>
              {Price ? (Price * dutyFee).toFixed(2) : "00.00"} ৳
            </Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.text14}>Total pay</Text>
            <Text style={styles.text14}>
              {Price
                ? (parseInt(Price) + parseInt(Price) * dutyFee).toFixed(2)
                : "00.00"}{" "}
              ৳
            </Text>
          </View>
          <View style={[styles.box, { flex: 1, flexDirection: "column" }]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}>
              <Text style={[styles.text14]}>Delivery date*</Text>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 20,
                  flex: 1,
                  justifyContent: "flex-end",
                }}>
                <Text
                  onPress={() => {
                    navigation.navigate("ChooseDateOrder", {
                      setFrom: setFrom,
                      setTo: setTo,
                    });
                  }}
                  style={{
                    color: "#09090A",
                    fontSize: 14,
                    textDecorationLine: "underline",
                    fontWeight: "400",
                  }}>
                  {From && To
                    ? `${slashDate(From)} To ${slashDate(To)}`
                    : "choose date"}
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
                navigation.navigate("InstructionOrder");
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
      </ScrollView>
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
            I agree with all the <Text onPress={() => {
              navigation?.navigate("WebViewsGlobal", {
                url: "https://duty.com.bd/legal/app/order-policy",
                title: "Order Policy",
              });
            }} style={{ color: "#0003FF" }}>Order</Text>{" "}
            & <Text onPress={() => {
                navigation?.navigate("WebViewsGlobal", {
                  url: "https://duty.com.bd/legal/app/refund-policy",
                  title: "Refund policy",
                });
              }} style={{ color: "#0003FF" }}>refund policy</Text>
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
    
    fontWeight: "400",
    marginTop: 24,
    color: "#1A1A1A",
  },
  headLine: {
    fontSize: 24,
    
    fontWeight: "500",
  },
  leading: {
    fontSize: 24,
    fontWeight: "500",
    
  },
});
export default OfferNow;

const calenderIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.33333 1V3M13.6667 1V3M1 15V5C1 4.46957 1.21071 3.96086 1.58579 3.58579C1.96086 3.21071 2.46957 3 3 3H15C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5V15M1 15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15M1 15V8.33333C1 7.8029 1.21071 7.29419 1.58579 6.91912C1.96086 6.54405 2.46957 6.33333 3 6.33333H15C15.5304 6.33333 16.0391 6.54405 16.4142 6.91912C16.7893 7.29419 17 7.8029 17 8.33333V15M9 9.66667H9.00711V9.67378H9V9.66667ZM9 11.6667H9.00711V11.6738H9V11.6667ZM9 13.6667H9.00711V13.6738H9V13.6667ZM7 11.6667H7.00711V11.6738H7V11.6667ZM7 13.6667H7.00711V13.6738H7V13.6667ZM5 11.6667H5.00711V11.6738H5V11.6667ZM5 13.6667H5.00711V13.6738H5V13.6667ZM11 9.66667H11.0071V9.67378H11V9.66667ZM11 11.6667H11.0071V11.6738H11V11.6667ZM11 13.6667H11.0071V13.6738H11V13.6667ZM13 9.66667H13.0071V9.67378H13V9.66667ZM13 11.6667H13.0071V11.6738H13V11.6667Z" stroke="black" stroke-opacity="0.87" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export const icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="24" height="24" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_3642_71276" transform="scale(0.0078125)"/>
</pattern>
<image id="image0_3642_71276" width="128" height="128" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`;

const avatar = `<svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="34" cy="34" r="32" stroke="white" stroke-width="4"/>
<circle cx="34" cy="34" r="30" fill="#D9D9D9"/>
<path d="M34 4C17.4274 4 4 17.4274 4 34C4 50.5726 17.4274 64 34 64C50.5726 64 64 50.5726 64 34C64 17.4274 50.5726 4 34 4ZM34 15.6129C39.879 15.6129 44.6452 20.379 44.6452 26.2581C44.6452 32.1371 39.879 36.9032 34 36.9032C28.121 36.9032 23.3548 32.1371 23.3548 26.2581C23.3548 20.379 28.121 15.6129 34 15.6129ZM34 57.2258C26.8992 57.2258 20.5363 54.0081 16.2782 48.9758C18.5524 44.6935 23.004 41.7419 28.1935 41.7419C28.4839 41.7419 28.7742 41.7903 29.0524 41.875C30.625 42.3831 32.2702 42.7097 34 42.7097C35.7298 42.7097 37.3871 42.3831 38.9476 41.875C39.2258 41.7903 39.5161 41.7419 39.8065 41.7419C44.996 41.7419 49.4476 44.6935 51.7218 48.9758C47.4637 54.0081 41.1008 57.2258 34 57.2258Z" fill="#929292"/>
</svg>`;
