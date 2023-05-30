import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import RadioButton from "../../components/RadioButton";
import { Color } from "../../assets/colors";
import { useSelector, useDispatch } from "react-redux";
import Input from "./../../components/Input";
import IconButton from "./../../components/IconButton";
import { SvgXml } from "react-native-svg";
import { CheckBox } from "../Seller/Pricing";
import {
  acceptOrder,
  createOrder,
  createVendorOrder,
  createVendorOrderOffline,
  getLastOrder,
  getOfflineOrders,
  getOrders,
} from "../../Class/service";
import { convertServerFacilities, localOptionsToServer } from "../../Class/dataConverter";
import Animated, { FadeIn, StretchInY } from "react-native-reanimated";
import { socket } from "../../Class/socket";
import { setOfflineOrders } from "../../Reducers/offlineOrders";
import ActivityLoader from "../../components/ActivityLoader";
import SubHeader from "../../components/SubHeader";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const AcceptOrder = (props) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const [Service, setService] = React.useState();
  const [Description, setDescription] = React.useState();
  const [Deliver, setDeliver] = React.useState();
  const [Condition_1, setCondition_1] = React.useState(false);
  const [Condition_2, setCondition_2] = React.useState(false);
  const [Condition_3, setCondition_3] = React.useState(false);
  const [Condition_4, setCondition_4] = React.useState(false);
  const [ServiceError, setServiceError] = React.useState();
  const [DeliverError, setDeliverError] = React.useState();
  const [Confirmation_1Error, setConfirmation_1Error] = React.useState();
  const [Confirmation_2Error, setConfirmation_2Error] = React.useState();
  const [DescriptionError, setDescriptionError] = React.useState();
  const user = useSelector((state) => state.user);
  const ListSelection = useSelector((state) => state.ListSelection);
  const ref = React.useRef();
  const params = props.route.params;
  const [Loader, setLoader] = React.useState(true);
  const navigation = props.navigation;
  const [DeliverMethod, setDeliverMethod] = React.useState({
    online: [
      "Online File Share",
      "Deliver In Video/Voice Call",
      "Delivered In Another Platform",
      "Other",
    ],
    offline: [
      {
        title: "My Self",
        // options: [
        //   "By Walk",
        //   "By Vehicles",
        //   "Customer Will Come To My Place",
        //   "Other",
        // ],
      },
      // { title: "Courier Service" },
      { title: "Our employees" },
      { title: "Other" },
    ],
  });
  const [Select, setSelect] = React.useState();
  const [SubSelect, setSubSelect] = React.useState();
  const [CourierServiceName, setCourierServiceName] = React.useState();
  const [CourierServiceAddress, setCourierServiceAddress] = React.useState();
  const vendor = useSelector((state) => state.vendor);
  const [OtherService, setOtherService] = React.useState();
  const newVendor = params.vendor;
  const data = params.data;
  const userId = params.userId;
  const dispatch = useDispatch();
  const selectedPackage = params.selectedPackage;
  const userOffline = params.offline;
  const isFocused = useIsFocused();
  //console.log(userId)
  //console.log(data)
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
  React.useEffect(() => {
    if (user && vendor) {
      getLastOrder(user.token, vendor.service.id)
        .then((res) => {
          //console.log(res.data);
          setLoader(false);
          const data = res.data;
          if (data) {
            const agreement = data.agreement;
            setService(agreement.serviceType);
            setDeliver(agreement.deliverBy);
            setSelect(
              agreement.deliverMethodPhysical
                ? agreement.deliverMethodPhysical
                : agreement.deliverMethodOnline
            );
            setDescription(agreement.selfDeliverMethodOther);
            setCourierServiceName(agreement.courierServiceName);
            setCourierServiceAddress(agreement.courierServiceAddress);
            setOtherService(agreement.otherServiceType);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response.data.msg);
        });
    }
  }, [user, vendor]);

  const validate = () => {
    setServiceError(null);
    setDeliverError(null);
    setConfirmation_1Error(null);
    setConfirmation_2Error(null);
    //console.log(Description);
    if (!Service) {
      setServiceError("This field is required");
      ref.current.scrollTo({ y: 10 });
      return;
    }
    if (Service == "Other" && !OtherService) {
      setServiceError("This field is required");
      ref.current.scrollTo({ y: 10 });
      return;
    }
    if (!Deliver || !Select) {
      setDeliverError("This field is required");
      ref.current.scrollTo({ y: 400 });
      return;
    }
    if (Select == "My Self ") {
      setDeliverError("This field is required");
      ref.current.scrollTo({ y: 400 });
      return;
    }
    if (Select == "Courier Service" && !CourierServiceName) {
      setDeliverError("This field is required with typing");
      ref.current.scrollTo({ y: 400 });
      return;
    }
    if (Select == "Courier Service" && !CourierServiceAddress) {
      setDeliverError("This field is required with typing");
      ref.current.scrollTo({ y: 400 });
      return;
    }
    if (
      Select != "My Self" &&
      Select != "Our employees" &&
      Select != "My Self" &&
      !Description
    ) {
      setDeliverError("This field is required with typing");
      ref.current.scrollTo({ y: 400 });
      return;
    }
    if (SubSelect == "Other" && !Description) {
      setDeliverError("This field is required with typing");
      ref.current.scrollTo({ y: 400 });
      return;
    }
    // if (
    //   (Select == "Courier Service" && !CourierServiceName) ||
    //   !CourierServiceAddress
    // ) {
    //   setDeliverError("This field is required");
    //   ref.current.scrollTo({ y: 400 });
    //   return;
    // }
    if (!Condition_1 || !Condition_2 || !Condition_3) {
      setConfirmation_1Error("Be agree with all conditions");
      ref.current.scrollTo({ y: 900 });
      return;
    }
    if (!Condition_4) {
      setConfirmation_2Error("This field is required");
      return;
    }
    if (!params.facilities || !params.id) {
      Alert.alert("Ops!", "Something went wrong. Please try again.");
      return;
    }

    setLoader(true);
    if (userOffline) {
      createVendorOrderOffline(
        user.token,
        userId,
        data.facilites,
        data.services,
        data.service.id,
        data.type,
        parseInt(selectedPackage ? selectedPackage.price : data.price),
        Description,
        parseInt(selectedPackage ? selectedPackage.price : data.price),
        params.from,
        params.to,
        "VENDOR",
        {
          deliverMethodOnline: Select,
          selfDeliverMethodOther: Description,
          courierServiceName: CourierServiceName,
          courierServiceAreaName: CourierServiceAddress,
          otherServiceType: OtherService,
          deliverBy: Deliver,
          serviceType: Service,
        },
        selectedPackage ? selectedPackage : undefined,
        data.subsData ? data.subsData : undefined,
        data.installmentData ? data.installmentData : undefined
      )
        .then((res) => {
          //getLoadData(res.data.receiverId,res.data.order)
          //console.log(res.data.order)
          getLoadData();
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response.data.msg);
        });
      return;
    }

    if (newVendor) {
      //console.log(data.installmentData)
      createVendorOrder(
        user.token,
        userId,
        convertServerFacilities(data.facilites),
        data.skills,
        data.service.id,
        data.type,
        parseInt(selectedPackage ? selectedPackage.price : data.price),
        Description,
        parseInt(selectedPackage ? selectedPackage.price : data.price),
        params.from,
        params.to,
        "VENDOR",
        {
          deliverMethodOnline: Select,
          selfDeliverMethodOther: Description,
          courierServiceName: CourierServiceName,
          courierServiceAreaName: CourierServiceAddress,
          otherServiceType: OtherService,
          deliverBy: Deliver,
          serviceType: Service,
        },
        selectedPackage ? selectedPackage : undefined,
        data.subsData ? data.subsData : undefined,
        data.installmentData ? data.installmentData : undefined,
        data.id,
        data.title
      )
        .then((res) => {
          //getLoadData(res.data.receiverId,res.data.order)
          //console.log(res.data.order)
          socket.emit("newOrder", {
            receiverId: user.user.id,
            order: {
              type: "vendor",
              data: res.data.order,
            },
          });
          socket.emit("newOrder", {
            receiverId: res.data.receiverId,
            order: {
              type: "user",
              data: res.data.order,
            },
          });
          setTimeout(() => {
            setLoader(false);
            navigation.navigate("VendorOrderDetails", {
              data: res.data.order,
              orderId: res.data.order?.id,
              type: res.data.order?.type,
            });
          }, 300);
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response.data.msg);
        });
      return;
    }
    acceptOrder(user.token, {
      orderId: params.id,
      selectedServices: ListSelection,
      deliverBy: Deliver,
      serviceType: Service,
      deliverMethodPhysical: Select,
      facilites: params.facilities,
      deliverMethodOnline: Select,
      selfDeliverMethodOther: Description,
      courierServiceName: CourierServiceName,
      courierServiceAreaName: CourierServiceAddress,
      otherServiceType: OtherService,
    })
      .then((res) => {
        socket.emit("updateOrder", {
          receiverId: user.user.id,
          order: {
            type: "vendor",
            data: res.data.order,
          },
        });
        socket.emit("updateOrder", {
          receiverId: res.data.receiverId,
          order: {
            type: "user",
            data: res.data.order,
          },
        });

        setTimeout(() => {
          setLoader(false);
          navigation.navigate("VendorOrderDetails", {
            data: res.data.order,
            orderId: res.data.order?.id,
            type: res.data.order?.type,
          });
        }, 300);
      })
      .catch((error) => {
        setLoader(false);
        Alert.alert("Opps!", error.response.data.msg);
        console.warn(error.response.data.msg);
        navigation.goBack();
        //console.warn(error.response.data.msg);
      });
  };
  const getLoadData = () => {
    getOfflineOrders(user.token, vendor.service.id)
      .then((res) => {
        dispatch(setOfflineOrders(res.data.orders));
        navigation.navigate(data.type, { reload: res });
      })
      .catch((err) => {
        console.warn(err.response.data.msg);
      });
  };
  if (Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <SubHeader
        fontStyle={{
          fontSize: 20,
        }}
        title={"Information collection"}
        {...props}
      />
      <ScrollView ref={ref} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 32,
              flex: 1,
            }}>
            <SvgXml xml={info} />
            <Text style={[styles.text, { flex: 1 }]}>
              What Type Of Service/Item You Want To provide?
            </Text>
          </View>
          {ServiceError && (
            <Text style={{ color: "red", marginVertical: 5 }}>
              {ServiceError}
            </Text>
          )}

          <View style={styles.box}>
            <RadioButton
              dark={true}
              style={{ margin: 0, height: 20, width: 20 }}
              selectStyle={{ height: 16, width: 16 }}
              onChange={() => {
                setService("Teaching/Tutorial");
              }}
              value={Service == "Teaching/Tutorial" ? true : false}
              title="Teaching/Tutorial"
            />
          </View>
          <View style={styles.box}>
            <RadioButton
              dark={true}
              style={{ margin: 0, height: 20, width: 20 }}
              selectStyle={{ height: 16, width: 16 }}
              onChange={() => {
                setService("Consultation");
              }}
              value={Service == "Consultation" ? true : false}
              title="Consultation"
            />
          </View>
          <View style={styles.box}>
            <RadioButton
              dark={true}
              style={{ margin: 0, height: 20, width: 20 }}
              selectStyle={{ height: 16, width: 16 }}
              onChange={() => {
                setService("Manufacture");
              }}
              value={Service == "Manufacture" ? true : false}
              title="Manufacture"
            />
          </View>
          <View style={styles.box}>
            <RadioButton
              dark={true}
              style={{ margin: 0, height: 20, width: 20 }}
              selectStyle={{ height: 16, width: 16 }}
              onChange={() => {
                setService("Fixing");
              }}
              value={Service == "Fixing" ? true : false}
              title="Fixing"
            />
          </View>
          <View style={styles.box}>
            <RadioButton
              dark={true}
              style={{ margin: 0, height: 20, width: 20 }}
              selectStyle={{ height: 16, width: 16 }}
              onChange={() => {
                setService("Recover");
              }}
              value={Service == "Recover" ? true : false}
              title="Recover"
            />
          </View>
          <View style={styles.box}>
            <RadioButton
              dark={true}
              style={{ margin: 0, height: 20, width: 20 }}
              selectStyle={{ height: 16, width: 16 }}
              onChange={() => {
                setService("Build");
              }}
              value={Service == "Build" ? true : false}
              title="Build/Development"
            />
          </View>
          <View style={styles.box}>
            <RadioButton
              dark={true}
              style={{ margin: 0, height: 20, width: 20 }}
              selectStyle={{ height: 16, width: 16 }}
              onChange={() => {
                setService("Maintenance");
              }}
              value={Service == "Maintenance" ? true : false}
              title="Maintenance"
            />
          </View>
          <View style={styles.box}>
            <RadioButton
              dark={true}
              style={{ margin: 0, height: 20, width: 20 }}
              selectStyle={{ height: 16, width: 16 }}
              onChange={() => {
                setService("Other");
              }}
              value={Service == "Other" ? true : false}
              title="Other Service"
            />
          </View>
          {Service == "Other" && (
            <Input
              value={OtherService}
              style={{
                marginVertical: 10,
              }}
              onChange={(e) => {
                setOtherService(e);
              }}
              placeholder="Describe here"
            />
          )}
          <View
            style={{
              flexDirection: "row",
              marginTop: 32,
              flex: 1,
            }}>
            <SvgXml xml={info} />
            <Text style={[styles.text, { flex: 1 }]}>
              How would you like the service to be delivered ?
            </Text>
          </View>
          {DeliverError && <Text style={{ color: "red" }}>{DeliverError}</Text>}
          <View
            style={{
              flexDirection: "row",
              marginTop: 24,
              justifyContent: "space-between",
            }}>
            <Button
              onPress={() => {
                setDeliver("Online");
                setSelect(null);
                setSubSelect(null);
                setDescription(null);
              }}
              LeftIcon={Deliver == "Online" ? onlineAc : onlineDc}
              value={Deliver == "Online" ? true : false}
              title="Online"
            />
            <Button
              onPress={() => {
                setDeliver("Physical");
                setSelect(null);
                setSubSelect(null);
                setDescription(null);
              }}
              LeftIcon={Deliver == "Physical" ? offlineAc : offlineDc}
              value={Deliver == "Physical" ? true : false}
              title="Physical"
            />
          </View>
          {Deliver == "Online" ? (
            <Animated.View entering={FadeIn}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 32,
                }}>
                <SvgXml xml={info} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.text, { marginLeft: 0 }]}>
                    Delivery method ?
                  </Text>
                </View>
              </View>
              {DeliverMethod.online.map((doc, i) => (
                <View style={styles.box} key={i}>
                  <RadioButton
                    dark={true}
                    style={{ margin: 0, height: 20, width: 20 }}
                    selectStyle={{ height: 16, width: 16 }}
                    onChange={() => {
                      setSelect(doc);
                      setDescription(null);
                    }}
                    value={Select == doc ? true : false}
                    title={doc}
                  />
                  {Select == doc && (
                    <Input
                      value={Description}
                      onChange={(e) => {
                        setDescription(e);
                      }}
                      style={{
                        marginVertical: 10,
                      }}
                      placeholder="Service Name"
                    />
                  )}
                </View>
              ))}
            </Animated.View>
          ) : Deliver == "Physical" ? (
            <Animated.View entering={FadeIn}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 32,
                }}>
                <SvgXml xml={info} />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={[styles.text, { marginLeft: 0 }]}>
                    Delivery method ?
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      
                      fontWeight: "400",
                      color: "#EC2700",
                      marginBottom: 12,
                      flex: 1,
                    }}>
                    For physical services, you are required to deliver your
                    service in person, face to face with the buyer. For more
                    details, please refer to our{" "}
                    <Text
                      onPress={() => {
                        navigation.navigate("WebViewsGlobal", {
                          url: "https://duty.com.bd/legal/app/order-policy",
                          title: "Order Policy",
                        });
                      }}
                      style={{ color: "#0003FF" }}>
                      Order & delivery Policy section
                    </Text>
                  </Text>
                </View>
              </View>
              {DeliverMethod.offline.map((doc, i) => (
                <View style={styles.box} key={i}>
                  <RadioButton
                    dark={true}
                    style={{ margin: 0, height: 20, width: 20 }}
                    selectStyle={{ height: 16, width: 16 }}
                    onChange={() => {
                      setSelect(doc.title);
                      setDescription(null);
                      setSubSelect(null);
                    }}
                    value={Select == doc.title ? true : false}
                    title={doc.title}
                  />
                  {Select == "My Self " && doc.title == "My Self" && (
                    <View entering={FadeIn} style={{ marginVertical: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          marginHorizontal: 30,
                        }}>
                        {doc.options &&
                          doc.options.map((doc, i) => (
                            <RadioButton
                              style={{ marginLeft: 5, marginTop: 5 }}
                              key={i}
                              onChange={() => {
                                setSubSelect(doc);
                                setDescription(null);
                              }}
                              value={SubSelect == doc ? true : false}
                              title={doc}
                            />
                          ))}
                      </View>
                      {SubSelect == "Other" && (
                        <Input
                          value={Description}
                          onChange={(e) => setDescription(e)}
                          placeholder="Type here"
                        />
                      )}
                    </View>
                  )}
                  {Select == "Courier Service" &&
                    doc.title == "Courier Service" && (
                      <View style={{ marginBottom: 10 }}>
                        <Input
                          value={CourierServiceName}
                          onChange={(e) => setCourierServiceName(e)}
                          placeholder="Courier Service Name"
                        />
                        <Input
                          value={CourierServiceAddress}
                          onChange={(e) => setCourierServiceAddress(e)}
                          placeholder="Branch or Area Name"
                        />
                      </View>
                    )}
                  {Select == "Other" && doc.title == "Other" && (
                    <Input
                      value={Description}
                      onChange={(e) => {
                        setDescription(e);
                      }}
                      placeholder="Type here"
                    />
                  )}
                </View>
              ))}
            </Animated.View>
          ) : (
            <></>
          )}
          <View
            style={{
              flexDirection: "row",
              marginTop: 32,
              flex: 1,
            }}>
            <SvgXml xml={info} />
            <Text style={[styles.text, { flex: 1 }]}>
              If you agree, please indicate by checking the box below.
            </Text>
          </View>
          {Confirmation_1Error && (
            <Text style={{ color: "red" }}>{Confirmation_1Error}</Text>
          )}
          <CheckBox
            value={Condition_1}
            onChange={(e) => {
              setCondition_1((val) => !val);
            }}
            style={{
              marginTop: 24,
              fontSize: 16,
              alignItems: "flex-start",
              
            }}
            title="Yes, I have collected all the necessary information and understand what my customer wants."
          />
          <CheckBox
            value={Condition_2}
            onChange={(e) => {
              setCondition_2((val) => !val);
            }}
            style={{
              marginTop: 12,
              fontSize: 16,
              alignItems: "flex-start",
              
            }}
            title="If I provide a physical service, I will deliver it face to face and use a mask."
          />
          <CheckBox
            value={Condition_3}
            onChange={(e) => {
              setCondition_3((val) => !val);
            }}
            style={{
              marginTop: 12,
              fontSize: 16,
              alignItems: "flex-start",
              
            }}
            title="I will save all delivery proof documents for future inquiries"
          />
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
            value={Condition_4}
            onChange={(e) => {
              setCondition_4((val) => !val);
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
            }}>
            I agree with all the{" "}
            <Text onPress={() => {
              navigation.navigate("WebViewsGlobal", {
                url: "https://duty.com.bd/legal/app/order-policy",
                title: "Order Policy",
              });
            }} style={{ color: "#0003FF" }}>
              Order
            </Text>
            {" "}&{" "}
            <Text
              onPress={() => {
                navigation.navigate("WebViewsGlobal", {
                  url: "https://duty.com.bd/legal/app/refund-policy",
                  title: "Refund policy",
                });
              }}
              style={{ color: "#0003FF" }}>
              refund policy
            </Text>
          </Text>
        </View>
        {Confirmation_2Error && (
          <Text style={{ color: "red" }}>{Confirmation_2Error}</Text>
        )}
        <IconButton
          active={true}
          onPress={() => {
            try {
              validate();
            } catch (e) {
              console.warn(e.message);
            }
          }}
          style={{
            color: textColor,
            marginTop: 12,
          }}
          title="Confirm"
        />
      </View>
    </View>
  );
};
export default AcceptOrder;

const styles = StyleSheet.create({
  box: {
    borderColor: "#E6E6E6",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
  },
  text: {
    fontWeight: "500",
    fontSize: 16,
    
    marginLeft: 10,
  },
});
const Button = ({ value, onPress, LeftIcon, title }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderWidth: 1,
        borderColor: "#E6E6E6",
        width: width / 2 - 28,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        flexDirection: "row",
        backgroundColor: value ? "#535353" : "#ffffff",
      }}>
      <SvgXml xml={LeftIcon} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "400",
          marginLeft: 12,
          color: value ? "#ffffff" : "#000000",
        }}>
        {title}
      </Text>
    </Pressable>
  );
};

const onlineAc = `<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5358_49705)">
<path d="M12.4648 11.8301H3.46484V15.8301H12.4648V11.8301Z" fill="#F0BC5E"/>
<path d="M41.4648 25.8301H33.4648V29.8301H41.4648V25.8301Z" fill="#F0BC5E"/>
<path d="M22.9648 14.8301H21.9648C17.8227 14.8301 14.4648 18.1879 14.4648 22.3301C14.4648 26.4722 17.8227 29.8301 21.9648 29.8301H22.9648C27.107 29.8301 30.4648 26.4722 30.4648 22.3301C30.4648 18.1879 27.107 14.8301 22.9648 14.8301Z" fill="#F0BC5E"/>
<path d="M10.4648 14.8301H3.46484V18.8301H10.4648V14.8301Z" fill="#F0BC5E"/>
<path d="M41.4648 28.8301H34.4648V32.8301H41.4648V28.8301Z" fill="#F0BC5E"/>
<path d="M1.285 0H15.985C16.3328 0.0378687 16.6555 0.199477 16.8941 0.455364C17.1327 0.71125 17.2715 1.04437 17.285 1.394C17.295 2.85 17.285 4.307 17.285 5.764C20.167 5.764 23.049 5.764 25.931 5.764C25.931 6.244 25.931 6.724 25.931 7.204C23.049 7.204 20.166 7.204 17.284 7.204C17.284 9.06333 17.284 10.9227 17.284 12.782C18.9848 11.8812 20.8955 11.4512 22.8182 11.5366C24.741 11.622 26.606 12.2197 28.2202 13.2678C29.8345 14.3159 31.1393 15.7763 31.9997 17.4979C32.8601 19.2195 33.2448 21.1398 33.114 23.06C36.506 23.06 39.899 23.06 43.291 23.06C43.6347 23.0753 43.9621 23.211 44.2159 23.4434C44.4696 23.6757 44.6336 23.9899 44.679 24.331V43.4C44.6338 43.7248 44.4833 44.0259 44.2507 44.257C44.0181 44.4882 43.7161 44.6368 43.391 44.68H28.666C28.3217 44.6357 28.0043 44.4707 27.7703 44.2143C27.5363 43.958 27.4008 43.6269 27.388 43.28C27.378 41.824 27.388 40.369 27.388 38.912C24.506 38.912 21.624 38.912 18.742 38.912C18.742 38.432 18.742 37.952 18.742 37.472C21.624 37.472 24.507 37.472 27.389 37.472C27.389 35.6133 27.389 33.7547 27.389 31.896C25.2175 33.045 22.7188 33.4184 20.3062 32.9545C17.8937 32.4907 15.7117 31.2173 14.121 29.345C12.2887 27.2052 11.3723 24.4302 11.57 21.62C8.179 21.62 4.788 21.62 1.396 21.62C1.05054 21.606 0.721095 21.4706 0.465714 21.2375C0.210334 21.0045 0.0454086 20.6887 0 20.346L0 1.3C0.0395422 0.971431 0.187274 0.665355 0.419922 0.429991C0.652571 0.194627 0.956912 0.0433526 1.285 0ZM1.441 1.443C1.441 7.687 1.441 13.931 1.441 20.175C4.87633 20.175 8.312 20.175 11.748 20.175C12.2835 17.5969 13.7413 15.3027 15.848 13.723C15.858 11.552 15.848 9.38 15.848 7.209H8.545C9.208 7.743 9.876 8.271 10.537 8.809C10.237 9.184 9.937 9.561 9.637 9.934C8.20567 8.778 6.77133 7.62867 5.334 6.486C6.772 5.341 8.2 4.188 9.643 3.042C9.943 3.417 10.243 3.791 10.543 4.167C9.88 4.701 9.211 5.228 8.55 5.767C10.9853 5.767 13.421 5.767 15.857 5.767C15.857 4.32633 15.857 2.88567 15.857 1.445C11.053 1.445 6.24933 1.445 1.446 1.445M14.459 17.295C15.73 17.295 16.999 17.295 18.271 17.295C18.5901 16.4924 18.981 15.7203 19.439 14.988C19.848 14.333 20.339 13.732 20.792 13.109C19.5035 13.3278 18.2748 13.8129 17.1844 14.5334C16.094 15.2538 15.1658 16.1937 14.459 17.293M23.886 13.109C24.342 13.731 24.83 14.332 25.239 14.989C25.697 15.7228 26.0883 16.4962 26.408 17.3C27.679 17.3 28.95 17.3 30.221 17.3C29.5138 16.2009 28.5853 15.2612 27.4947 14.5408C26.4042 13.8204 25.1755 13.3352 23.887 13.116M19.837 17.3H24.842C24.1657 15.9231 23.3264 14.6325 22.342 13.456C21.3576 14.6325 20.5183 15.9231 19.842 17.3M13.699 18.743C13.2239 19.8837 12.9792 21.1073 12.9792 22.343C12.9792 23.5787 13.2239 24.8023 13.699 25.943H17.799C17.1434 23.5878 17.1434 21.0982 17.799 18.743H13.699ZM19.299 18.743C18.5653 21.0869 18.5653 23.5991 19.299 25.943H25.399C26.1307 23.5988 26.1307 21.0872 25.399 18.743H19.299ZM26.899 25.943H30.999C31.4737 24.8021 31.7181 23.5787 31.7181 22.343C31.7181 21.1073 31.4737 19.8839 30.999 18.743H26.899C27.5527 21.0985 27.5527 23.5875 26.899 25.943ZM32.93 24.5C32.393 27.077 30.9354 29.37 28.83 30.95C28.815 33.122 28.83 35.295 28.825 37.468C31.2617 37.468 33.6977 37.468 36.133 37.468C35.4717 36.9347 34.8073 36.4013 34.14 35.868C34.44 35.491 34.74 35.118 35.04 34.741C36.478 35.8857 37.9133 37.0333 39.346 38.184C37.9113 39.334 36.4757 40.4823 35.039 41.629C34.7403 41.2537 34.4403 40.8793 34.139 40.506L36.139 38.906C33.701 38.906 31.263 38.906 28.825 38.906C28.825 40.3467 28.825 41.7873 28.825 43.228C33.629 43.228 38.4327 43.228 43.236 43.228C43.236 36.984 43.236 30.74 43.236 24.496C39.8007 24.496 36.365 24.496 32.929 24.496M14.458 27.376C15.1656 28.4746 16.094 29.4139 17.1843 30.1342C18.2746 30.8546 19.5029 31.3401 20.791 31.56C20.322 30.918 19.818 30.299 19.401 29.621C18.9594 28.9062 18.5806 28.1543 18.269 27.374C16.998 27.374 15.729 27.374 14.458 27.374M19.835 27.374C20.5116 28.7504 21.351 30.0406 22.335 31.217C23.3188 30.0404 24.1581 28.7503 24.835 27.374H19.837M25.237 29.682C24.829 30.337 24.343 30.938 23.887 31.559C25.1752 31.3389 26.4035 30.8533 27.494 30.133C28.5844 29.4127 29.5131 28.4735 30.221 27.375C28.95 27.375 27.679 27.375 26.408 27.375C26.088 28.1808 25.6957 28.9559 25.236 29.691L25.237 29.682Z" fill="white"/>
<path d="M31.801 4.41596C32.2188 4.2893 32.6651 4.29213 33.0812 4.42409C33.4974 4.55605 33.8638 4.81094 34.1322 5.1552C34.4006 5.49946 34.5585 5.91695 34.585 6.35269C34.6116 6.78842 34.5055 7.22198 34.2808 7.59626C34.0561 7.97054 33.7233 8.268 33.3263 8.44946C32.9293 8.63092 32.4866 8.68787 32.0565 8.61282C31.6265 8.53777 31.2292 8.33424 30.9171 8.02902C30.605 7.72381 30.3927 7.33122 30.308 6.90296C30.2073 6.37735 30.3039 5.83306 30.5794 5.37422C30.8548 4.91538 31.2898 4.57421 31.801 4.41596ZM32.157 5.81595C32.0419 5.86271 31.9408 5.93852 31.8637 6.03598C31.7866 6.13343 31.7361 6.24921 31.7171 6.37202C31.698 6.49483 31.7111 6.62047 31.7551 6.7367C31.7991 6.85292 31.8725 6.95575 31.9681 7.03517C32.0637 7.11458 32.1782 7.16786 32.3005 7.18981C32.4229 7.21176 32.5488 7.20164 32.666 7.16042C32.7833 7.1192 32.8878 7.0483 32.9695 6.95463C33.0512 6.86096 33.1072 6.74772 33.132 6.62596C33.1559 6.49897 33.1453 6.36792 33.1014 6.2464C33.0575 6.12488 32.9819 6.01731 32.8825 5.93487C32.783 5.85243 32.6632 5.79811 32.5357 5.77755C32.4081 5.75699 32.2774 5.77094 32.157 5.81796V5.81595Z" fill="white"/>
<path d="M27.383 5.76489H28.824C28.824 6.24489 28.824 6.72489 28.824 7.20489C28.343 7.20489 27.862 7.20489 27.382 7.20489C27.383 6.72389 27.383 6.24489 27.383 5.76489Z" fill="white"/>
<path d="M36.031 5.76489H37.471C37.471 6.24489 37.471 6.72489 37.471 7.20489C36.991 7.20489 36.511 7.20489 36.031 7.20489C36.031 6.72589 36.031 6.24489 36.031 5.76489Z" fill="white"/>
<path d="M3.60299 11.531C4.56366 11.531 5.52432 11.531 6.48499 11.531C6.48499 12.011 6.48499 12.491 6.48499 12.971C5.52399 12.971 4.56299 12.971 3.60199 12.971C3.60199 12.49 3.60299 12.011 3.60299 11.531Z" fill="white"/>
<path d="M7.92802 11.53H12.25C12.25 12.01 12.25 12.49 12.25 12.97C10.807 12.97 9.36302 12.984 7.92102 12.961C7.93202 12.484 7.92402 12.004 7.92802 11.53Z" fill="white"/>
<path d="M3.60297 14.4141C6.00297 14.4141 8.40497 14.4141 10.809 14.4141C10.809 14.8951 10.809 15.3751 10.809 15.8561C8.40897 15.8561 6.00731 15.8561 3.60397 15.8561C3.60197 15.3731 3.60297 14.8941 3.60297 14.4141Z" fill="white"/>
<path d="M3.60297 17.2959C5.52431 17.2959 7.44597 17.2959 9.36797 17.2959C9.37297 17.7719 9.35997 18.2489 9.37697 18.7249C7.45297 18.7539 5.52797 18.7299 3.60397 18.7369C3.60197 18.2549 3.60297 17.7759 3.60297 17.2959Z" fill="white"/>
<path d="M33.87 25.9431C34.828 25.9431 35.786 25.9431 36.745 25.9431C36.758 26.4241 36.745 26.9061 36.75 27.3861H33.869C33.8683 26.9041 33.8687 26.4231 33.87 25.9431Z" fill="white"/>
<path d="M38.194 25.9431H41.075C41.075 26.4231 41.075 26.9041 41.075 27.3841H38.193C38.1924 26.9041 38.1927 26.4238 38.194 25.9431Z" fill="white"/>
<path d="M33.87 28.825C36.27 28.825 38.6716 28.825 41.075 28.825C41.075 29.305 41.075 29.785 41.075 30.265C38.675 30.265 36.273 30.265 33.869 30.265C33.8683 29.785 33.8687 29.305 33.87 28.825Z" fill="white"/>
<path d="M35.31 31.709C37.2327 31.7057 39.1543 31.7057 41.075 31.709C41.075 32.189 41.075 32.669 41.075 33.149C39.1536 33.149 37.232 33.149 35.31 33.149C35.31 32.669 35.311 32.189 35.31 31.709Z" fill="white"/>
<path d="M11.73 36.096C12.1585 35.9895 12.6093 36.0169 13.0218 36.1743C13.4343 36.3317 13.7887 36.6118 14.0372 36.9767C14.2858 37.3416 14.4166 37.7739 14.4121 38.2154C14.4076 38.6569 14.2679 39.0864 14.0119 39.4461C13.7559 39.8059 13.3959 40.0786 12.9802 40.2276C12.5646 40.3765 12.1133 40.3946 11.6871 40.2793C11.2609 40.1641 10.8802 39.921 10.5963 39.5829C10.3123 39.2447 10.1388 38.8277 10.099 38.388C10.0554 37.8747 10.1954 37.3626 10.4941 36.9429C10.7928 36.5231 11.2307 36.223 11.73 36.096ZM11.899 37.565C11.7896 37.6261 11.698 37.7148 11.6334 37.8223C11.5688 37.9297 11.5335 38.0522 11.5308 38.1775C11.5281 38.3028 11.5583 38.4267 11.6183 38.5368C11.6783 38.6468 11.766 38.7393 11.8727 38.805C11.9795 38.8707 12.1016 38.9074 12.2269 38.9114C12.3522 38.9153 12.4763 38.8865 12.587 38.8276C12.6977 38.7688 12.7911 38.6821 12.858 38.576C12.9248 38.47 12.9627 38.3483 12.968 38.223C12.9721 38.0954 12.9424 37.9689 12.8818 37.8564C12.8212 37.7439 12.732 37.6495 12.6231 37.5827C12.5142 37.5158 12.3896 37.479 12.2619 37.4759C12.1342 37.4728 12.008 37.5035 11.896 37.565H11.899Z" fill="white"/>
<path d="M7.20598 37.4729C7.68598 37.4729 8.16597 37.4729 8.64597 37.4729C8.64597 37.9529 8.64597 38.4339 8.64597 38.9139H7.20598C7.20498 38.4329 7.20698 37.9529 7.20598 37.4729Z" fill="white"/>
<path d="M15.853 37.473C16.336 37.473 16.818 37.459 17.3 37.482C17.29 37.959 17.3 38.436 17.295 38.913H15.854C15.853 38.433 15.854 37.953 15.853 37.473Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_5358_49705">
<rect width="44.679" height="44.679" fill="white"/>
</clipPath>
</defs>
</svg>
`;
const onlineDc = `<svg width="45" height="46" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5358_49628)">
<path d="M12.4648 12.509H3.46484V16.509H12.4648V12.509Z" fill="#F0BC5E"/>
<path d="M41.4648 26.509H33.4648V30.509H41.4648V26.509Z" fill="#F0BC5E"/>
<path d="M22.9648 15.509H21.9648C17.8227 15.509 14.4648 18.8669 14.4648 23.009C14.4648 27.1512 17.8227 30.509 21.9648 30.509H22.9648C27.107 30.509 30.4648 27.1512 30.4648 23.009C30.4648 18.8669 27.107 15.509 22.9648 15.509Z" fill="#F0BC5E"/>
<path d="M10.4648 15.509H3.46484V19.509H10.4648V15.509Z" fill="#F0BC5E"/>
<path d="M41.4648 29.509H34.4648V33.509H41.4648V29.509Z" fill="#F0BC5E"/>
<path d="M1.285 0.678955H15.985C16.3328 0.716824 16.6555 0.878432 16.8941 1.13432C17.1327 1.39021 17.2715 1.72333 17.285 2.07296C17.295 3.52895 17.285 4.98596 17.285 6.44296C20.167 6.44296 23.049 6.44296 25.931 6.44296C25.931 6.92296 25.931 7.40296 25.931 7.88296C23.049 7.88296 20.166 7.88296 17.284 7.88296C17.284 9.74229 17.284 11.6016 17.284 13.461C18.9848 12.5601 20.8955 12.1302 22.8182 12.2156C24.741 12.301 26.606 12.8986 28.2202 13.9467C29.8345 14.9948 31.1393 16.4552 31.9997 18.1769C32.8601 19.8985 33.2448 21.8188 33.114 23.739C36.506 23.739 39.899 23.739 43.291 23.739C43.6347 23.7542 43.9621 23.89 44.2159 24.1223C44.4696 24.3547 44.6336 24.6689 44.679 25.01V44.079C44.6338 44.4038 44.4833 44.7048 44.2507 44.936C44.0181 45.1672 43.7161 45.3157 43.391 45.359H28.666C28.3217 45.3147 28.0043 45.1497 27.7703 44.8933C27.5363 44.6369 27.4008 44.3058 27.388 43.959C27.378 42.503 27.388 41.048 27.388 39.591C24.506 39.591 21.624 39.591 18.742 39.591C18.742 39.111 18.742 38.631 18.742 38.151C21.624 38.151 24.507 38.151 27.389 38.151C27.389 36.2923 27.389 34.4336 27.389 32.575C25.2175 33.7239 22.7188 34.0973 20.3062 33.6335C17.8937 33.1696 15.7117 31.8963 14.121 30.024C12.2887 27.8842 11.3723 25.1091 11.57 22.299C8.179 22.299 4.788 22.299 1.396 22.299C1.05054 22.285 0.721095 22.1495 0.465714 21.9165C0.210334 21.6834 0.0454086 21.3677 0 21.025L0 1.97896C0.0395422 1.65039 0.187274 1.34431 0.419922 1.10895C0.652571 0.873582 0.956912 0.722308 1.285 0.678955ZM1.441 2.12196C1.441 8.36595 1.441 14.61 1.441 20.854C4.87633 20.854 8.312 20.854 11.748 20.854C12.2835 18.2758 13.7413 15.9817 15.848 14.402C15.858 12.231 15.848 10.059 15.848 7.88796H8.545C9.208 8.42196 9.876 8.94995 10.537 9.48796C10.237 9.86296 9.937 10.24 9.637 10.613C8.20567 9.45695 6.77133 8.30762 5.334 7.16496C6.772 6.01996 8.2 4.86696 9.643 3.72096C9.943 4.09596 10.243 4.46995 10.543 4.84595C9.88 5.37995 9.211 5.90696 8.55 6.44596C10.9853 6.44596 13.421 6.44596 15.857 6.44596C15.857 5.00529 15.857 3.56462 15.857 2.12396C11.053 2.12396 6.24933 2.12396 1.446 2.12396M14.459 17.974C15.73 17.974 16.999 17.974 18.271 17.974C18.5901 17.1714 18.981 16.3992 19.439 15.667C19.848 15.012 20.339 14.411 20.792 13.788C19.5035 14.0068 18.2748 14.4919 17.1844 15.2123C16.094 15.9327 15.1658 16.8726 14.459 17.972M23.886 13.788C24.342 14.41 24.83 15.011 25.239 15.668C25.697 16.4017 26.0883 17.1752 26.408 17.979C27.679 17.979 28.95 17.979 30.221 17.979C29.5138 16.8798 28.5853 15.9401 27.4947 15.2198C26.4042 14.4994 25.1755 14.0141 23.887 13.795M19.837 17.979H24.842C24.1657 16.6021 23.3264 15.3115 22.342 14.135C21.3576 15.3115 20.5183 16.6021 19.842 17.979M13.699 19.422C13.2239 20.5627 12.9792 21.7862 12.9792 23.022C12.9792 24.2577 13.2239 25.4812 13.699 26.622H17.799C17.1434 24.2667 17.1434 21.7772 17.799 19.422H13.699ZM19.299 19.422C18.5653 21.7659 18.5653 24.278 19.299 26.622H25.399C26.1307 24.2777 26.1307 21.7662 25.399 19.422H19.299ZM26.899 26.622H30.999C31.4737 25.4811 31.7181 24.2576 31.7181 23.022C31.7181 21.7863 31.4737 20.5628 30.999 19.422H26.899C27.5527 21.7774 27.5527 24.2665 26.899 26.622ZM32.93 25.179C32.393 27.7559 30.9354 30.049 28.83 31.629C28.815 33.801 28.83 35.974 28.825 38.147C31.2617 38.147 33.6977 38.147 36.133 38.147C35.4717 37.6136 34.8073 37.0803 34.14 36.547C34.44 36.17 34.74 35.797 35.04 35.42C36.478 36.5646 37.9133 37.7123 39.346 38.863C37.9113 40.013 36.4757 41.1613 35.039 42.308C34.7403 41.9326 34.4403 41.5583 34.139 41.185L36.139 39.585C33.701 39.585 31.263 39.585 28.825 39.585C28.825 41.0256 28.825 42.4663 28.825 43.907C33.629 43.907 38.4327 43.907 43.236 43.907C43.236 37.663 43.236 31.419 43.236 25.175C39.8007 25.175 36.365 25.175 32.929 25.175M14.458 28.055C15.1656 29.1536 16.094 30.0929 17.1843 30.8132C18.2746 31.5335 19.5029 32.0191 20.791 32.239C20.322 31.597 19.818 30.978 19.401 30.3C18.9594 29.5851 18.5806 28.8333 18.269 28.053C16.998 28.053 15.729 28.053 14.458 28.053M19.835 28.053C20.5116 29.4293 21.351 30.7196 22.335 31.896C23.3188 30.7194 24.1581 29.4292 24.835 28.053H19.837M25.237 30.361C24.829 31.016 24.343 31.617 23.887 32.238C25.1752 32.0179 26.4035 31.5323 27.494 30.812C28.5844 30.0917 29.5131 29.1525 30.221 28.054C28.95 28.054 27.679 28.054 26.408 28.054C26.088 28.8597 25.6957 29.6349 25.236 30.37L25.237 30.361Z" fill="#313131"/>
<path d="M31.801 5.09491C32.2188 4.96825 32.6651 4.97109 33.0812 5.10304C33.4974 5.235 33.8638 5.48989 34.1322 5.83415C34.4006 6.17842 34.5585 6.5959 34.585 7.03164C34.6116 7.46738 34.5055 7.90093 34.2808 8.27521C34.0561 8.64949 33.7233 8.94695 33.3263 9.12841C32.9293 9.30987 32.4866 9.36683 32.0565 9.29178C31.6265 9.21673 31.2292 9.0132 30.9171 8.70798C30.605 8.40276 30.3927 8.01017 30.308 7.58191C30.2073 7.0563 30.3039 6.51201 30.5794 6.05318C30.8548 5.59434 31.2898 5.25316 31.801 5.09491ZM32.157 6.49491C32.0419 6.54167 31.9408 6.61748 31.8637 6.71493C31.7866 6.81239 31.7361 6.92817 31.7171 7.05097C31.698 7.17378 31.7111 7.29943 31.7551 7.41565C31.7991 7.53187 31.8725 7.63471 31.9681 7.71412C32.0637 7.79353 32.1782 7.84681 32.3005 7.86877C32.4229 7.89072 32.5488 7.88059 32.666 7.83937C32.7833 7.79815 32.8878 7.72725 32.9695 7.63358C33.0512 7.53991 33.1072 7.42667 33.132 7.30491C33.1559 7.17793 33.1453 7.04687 33.1014 6.92535C33.0575 6.80383 32.9819 6.69627 32.8825 6.61383C32.783 6.53138 32.6632 6.47707 32.5357 6.45651C32.4081 6.43595 32.2774 6.4499 32.157 6.49691V6.49491Z" fill="#313131"/>
<path d="M27.383 6.44385H28.824C28.824 6.92385 28.824 7.40384 28.824 7.88384C28.343 7.88384 27.862 7.88384 27.382 7.88384C27.383 7.40284 27.383 6.92385 27.383 6.44385Z" fill="#313131"/>
<path d="M36.031 6.44385H37.471C37.471 6.92385 37.471 7.40384 37.471 7.88384C36.991 7.88384 36.511 7.88384 36.031 7.88384C36.031 7.40484 36.031 6.92385 36.031 6.44385Z" fill="#313131"/>
<path d="M3.60299 12.21C4.56366 12.21 5.52432 12.21 6.48499 12.21C6.48499 12.69 6.48499 13.17 6.48499 13.65C5.52399 13.65 4.56299 13.65 3.60199 13.65C3.60199 13.169 3.60299 12.69 3.60299 12.21Z" fill="#313131"/>
<path d="M7.92802 12.209H12.25C12.25 12.689 12.25 13.169 12.25 13.649C10.807 13.649 9.36302 13.663 7.92102 13.64C7.93202 13.163 7.92402 12.683 7.92802 12.209Z" fill="#313131"/>
<path d="M3.60297 15.093C6.00297 15.093 8.40497 15.093 10.809 15.093C10.809 15.574 10.809 16.054 10.809 16.535C8.40897 16.535 6.00731 16.535 3.60397 16.535C3.60197 16.052 3.60297 15.573 3.60297 15.093Z" fill="#313131"/>
<path d="M3.60297 17.9749C5.52431 17.9749 7.44597 17.9749 9.36797 17.9749C9.37297 18.4509 9.35997 18.9279 9.37697 19.4039C7.45297 19.4329 5.52797 19.4089 3.60397 19.4159C3.60197 18.9339 3.60297 18.4549 3.60297 17.9749Z" fill="#313131"/>
<path d="M33.87 26.6221C34.828 26.6221 35.786 26.6221 36.745 26.6221C36.758 27.1031 36.745 27.5851 36.75 28.0651H33.869C33.8683 27.5831 33.8687 27.1021 33.87 26.6221Z" fill="#313131"/>
<path d="M38.194 26.6221H41.075C41.075 27.1021 41.075 27.583 41.075 28.063H38.193C38.1924 27.583 38.1927 27.1027 38.194 26.6221Z" fill="#313131"/>
<path d="M33.87 29.5039C36.27 29.5039 38.6716 29.5039 41.075 29.5039C41.075 29.9839 41.075 30.4639 41.075 30.9439C38.675 30.9439 36.273 30.9439 33.869 30.9439C33.8683 30.4639 33.8687 29.9839 33.87 29.5039Z" fill="#313131"/>
<path d="M35.31 32.388C37.2327 32.3847 39.1543 32.3847 41.075 32.388C41.075 32.868 41.075 33.348 41.075 33.828C39.1536 33.828 37.232 33.828 35.31 33.828C35.31 33.348 35.311 32.868 35.31 32.388Z" fill="#313131"/>
<path d="M11.73 36.775C12.1585 36.6685 12.6093 36.6958 13.0218 36.8533C13.4343 37.0107 13.7887 37.2907 14.0372 37.6557C14.2858 38.0206 14.4166 38.4529 14.4121 38.8944C14.4076 39.3359 14.2679 39.7654 14.0119 40.1251C13.7559 40.4848 13.3959 40.7576 12.9802 40.9065C12.5646 41.0555 12.1133 41.0735 11.6871 40.9583C11.2609 40.843 10.8802 40.6 10.5963 40.2618C10.3123 39.9237 10.1388 39.5067 10.099 39.067C10.0554 38.5537 10.1954 38.0415 10.4941 37.6218C10.7928 37.2021 11.2307 36.902 11.73 36.775ZM11.899 38.244C11.7896 38.3051 11.698 38.3938 11.6334 38.5012C11.5688 38.6087 11.5335 38.7311 11.5308 38.8565C11.5281 38.9818 11.5583 39.1056 11.6183 39.2157C11.6783 39.3258 11.766 39.4183 11.8727 39.484C11.9795 39.5497 12.1016 39.5863 12.2269 39.5903C12.3522 39.5943 12.4763 39.5654 12.587 39.5066C12.6977 39.4478 12.7911 39.361 12.858 39.255C12.9248 39.1489 12.9627 39.0272 12.968 38.902C12.9721 38.7743 12.9424 38.6478 12.8818 38.5354C12.8212 38.4229 12.732 38.3284 12.6231 38.2616C12.5142 38.1948 12.3896 38.158 12.2619 38.1549C12.1342 38.1518 12.008 38.1825 11.896 38.244H11.899Z" fill="#313131"/>
<path d="M7.20598 38.1519C7.68598 38.1519 8.16597 38.1519 8.64597 38.1519C8.64597 38.6319 8.64597 39.1128 8.64597 39.5928H7.20598C7.20498 39.1118 7.20698 38.6319 7.20598 38.1519Z" fill="#313131"/>
<path d="M15.853 38.1519C16.336 38.1519 16.818 38.1379 17.3 38.1609C17.29 38.6379 17.3 39.1149 17.295 39.5919H15.854C15.853 39.1119 15.854 38.6319 15.853 38.1519Z" fill="#313131"/>
</g>
<defs>
<clipPath id="clip0_5358_49628">
<rect width="44.679" height="44.679" fill="white" transform="translate(0 0.678955)"/>
</clipPath>
</defs>
</svg>
`;
const offlineAc = `<svg width="52" height="50" viewBox="0 0 52 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5358_49653)">
<path d="M30.2889 1.00474C30.8526 0.653205 31.4905 0.437855 32.1519 0.37577C32.8134 0.313684 33.4802 0.406573 34.0995 0.647067C34.7187 0.887561 35.2735 1.26904 35.7197 1.76126C36.1658 2.25348 36.4912 2.84288 36.6699 3.48274C36.8365 4.34951 36.8899 5.23422 36.8289 6.11474C36.8289 7.35374 36.8369 8.59374 36.8289 9.83274C36.8158 10.0477 36.7217 10.2497 36.5657 10.3981C36.4097 10.5465 36.2032 10.6304 35.9879 10.6327C35.1879 10.6327 34.3879 10.6387 33.5879 10.6327C33.6404 10.7713 33.7222 10.8969 33.8279 11.0007C34.9839 12.3887 36.1149 13.8007 37.2829 15.1757C38.9459 15.3687 40.6019 15.6367 42.2689 15.7757C43.2509 15.8697 44.3149 15.5757 45.2219 16.0757C45.5933 16.3039 45.8864 16.6398 46.062 17.0388C46.2376 17.4377 46.2875 17.8807 46.2049 18.3087C47.0849 18.4167 48.0199 18.3147 48.9229 18.3587C49.134 18.382 49.3288 18.4831 49.4694 18.6423C49.6099 18.8015 49.6861 19.0073 49.6831 19.2196C49.6801 19.432 49.5981 19.6356 49.4531 19.7907C49.3081 19.9459 49.1105 20.0414 48.8989 20.0587C48.2989 20.0777 47.6939 20.0587 47.0909 20.0667C47.0982 26.9121 47.1059 33.7577 47.1139 40.6037C47.1181 40.7602 47.0795 40.9149 47.0023 41.0511C46.9251 41.1873 46.8123 41.2999 46.6759 41.3767C46.3299 41.5677 45.9139 41.4547 45.5419 41.5547C44.5718 41.7216 43.6885 42.2166 43.0399 42.957C42.3913 43.6974 42.0167 44.6381 41.9789 45.6217C41.9936 45.744 41.983 45.868 41.9479 45.986C41.9127 46.1041 41.8537 46.2136 41.7745 46.3079C41.6953 46.4022 41.5975 46.4793 41.4874 46.5343C41.3772 46.5893 41.2569 46.6211 41.1339 46.6277C34.8072 46.6331 28.4799 46.6331 22.1519 46.6277C22.0692 46.928 21.9504 47.2172 21.7979 47.4887C29.2472 47.4887 36.6969 47.4887 44.1469 47.4887C43.7495 46.8013 43.6032 45.9972 43.733 45.2139C43.8628 44.4305 44.2607 43.7166 44.8586 43.1941C45.4566 42.6717 46.2174 42.3731 47.0111 42.3495C47.8048 42.3259 48.582 42.5787 49.2099 43.0647C49.86 43.578 50.3061 44.3061 50.4681 45.1185C50.6301 45.9308 50.4974 46.7743 50.0939 47.4977C50.3242 47.4313 50.5701 47.444 50.7923 47.5337C51.0145 47.6235 51.2003 47.7851 51.3199 47.9927C51.3764 48.1221 51.4001 48.2633 51.3889 48.404C51.3777 48.5447 51.3319 48.6804 51.2556 48.7991C51.1793 48.9178 51.0749 49.0159 50.9516 49.0846C50.8283 49.1532 50.69 49.1904 50.5489 49.1927C34.5649 49.1967 18.5792 49.1967 2.5919 49.1927C2.47556 49.1996 2.35904 49.1827 2.2495 49.1429C2.13995 49.1031 2.03969 49.0414 1.95487 48.9615C1.87006 48.8815 1.80248 48.7851 1.75629 48.6781C1.71011 48.5711 1.68628 48.4558 1.68628 48.3392C1.68628 48.2227 1.71011 48.1074 1.75629 48.0004C1.80248 47.8934 1.87006 47.797 1.95487 47.717C2.03969 47.6371 2.13995 47.5753 2.2495 47.5356C2.35904 47.4958 2.47556 47.4788 2.5919 47.4857C7.0089 47.4907 11.4279 47.4777 15.8469 47.4917C15.6824 47.1527 15.5569 46.7961 15.4729 46.4287C15.3598 45.8524 15.3968 45.2567 15.5803 44.6988C15.7637 44.1409 16.0875 43.6395 16.5206 43.2428C16.9536 42.8461 17.4814 42.5674 18.0532 42.4334C18.625 42.2994 19.2217 42.3147 19.7859 42.4777C20.3558 42.6456 20.873 42.9571 21.288 43.3822C21.703 43.8074 22.0018 44.332 22.1559 44.9057C24.7699 44.9187 27.3829 44.8917 29.9959 44.9197L30.1009 44.8757C29.3052 43.6449 28.7708 42.2637 28.5309 40.8177C28.6689 40.6517 28.5149 40.4947 28.4619 40.3427C28.2101 38.2955 28.2381 36.2235 28.5449 34.1837L28.5209 34.0787C27.2319 32.3057 25.9589 30.5227 24.6749 28.7457C23.2639 29.7687 21.8959 30.8457 20.4679 31.8457C20.3366 31.9299 20.1951 31.9971 20.0469 32.0457C18.0256 32.8137 16.0059 33.5834 13.9879 34.3547C10.9426 35.5187 7.89657 36.6801 4.8499 37.8387C4.61985 37.9591 4.36087 38.0131 4.1019 37.9947C3.98625 37.9753 3.87582 37.9323 3.77743 37.8685C3.67903 37.8047 3.59476 37.7214 3.52982 37.6238C3.46487 37.5261 3.42064 37.4162 3.39984 37.3008C3.37904 37.1854 3.38213 37.0669 3.40891 36.9527C3.5806 35.5813 4.14254 34.2881 5.0279 33.2267C5.7353 32.6355 6.53807 32.1689 7.4019 31.8467C8.6619 31.2607 9.9159 30.6637 11.1789 30.0827C13.1359 29.1467 15.1129 28.2537 17.0659 27.3117C17.3579 26.8957 17.6359 26.4697 17.9229 26.0497C17.3756 26.0584 16.8279 26.0584 16.2799 26.0497C16.1625 26.0509 16.0462 26.0282 15.9378 25.9831C15.8295 25.938 15.7314 25.8713 15.6496 25.7872C15.5678 25.703 15.504 25.6031 15.4619 25.4935C15.4198 25.384 15.4004 25.267 15.4049 25.1497C15.4049 22.2987 15.4049 19.4497 15.4049 16.5967C15.4125 16.3735 15.5071 16.162 15.6686 16.0077C15.8301 15.8533 16.0455 15.7683 16.2689 15.7707C18.4469 15.7707 20.6259 15.7707 22.8049 15.7707L22.8969 15.7367C23.8369 13.8661 24.7776 11.9951 25.7189 10.1237C25.9976 9.57439 26.4014 9.09816 26.8978 8.73341C27.3942 8.36866 27.9694 8.12557 28.5769 8.02374C28.3773 7.47446 28.2695 6.89605 28.2579 6.31174C28.2227 5.46718 28.2504 4.62118 28.3409 3.78074C28.4579 3.20795 28.6904 2.66502 29.0243 2.18514C29.3582 1.70526 29.7865 1.29851 30.2829 0.989741M30.1089 3.79674C29.9725 4.33134 29.9259 4.88487 29.9709 5.43474C29.92 6.02705 29.9711 6.6237 30.1219 7.19874C30.297 7.68432 30.6135 8.10637 31.0305 8.41059C31.4475 8.7148 31.946 8.88725 32.4619 8.90574C33.3369 8.92174 34.2119 8.90574 35.0879 8.91474C35.1459 7.46974 35.1009 6.00475 35.1109 4.55274C35.0928 3.95128 34.8642 3.37522 34.465 2.92498C34.0658 2.47474 33.5213 2.17886 32.9263 2.0889C32.3313 1.99894 31.7236 2.12061 31.2091 2.4327C30.6947 2.74479 30.306 3.22751 30.1109 3.79674M27.2599 10.8927C25.7839 13.8261 24.3096 16.7594 22.8369 19.6927C22.7276 19.9651 22.6763 20.2573 22.686 20.5506C22.6957 20.8439 22.7663 21.132 22.8934 21.3965C23.0205 21.6611 23.2011 21.8963 23.424 22.0873C23.6469 22.2782 23.907 22.4207 24.1879 22.5057C25.5269 22.8657 26.8709 23.2107 28.2149 23.5547C28.5509 23.6439 28.9077 23.6105 29.2214 23.4606C29.535 23.3107 29.7851 23.0542 29.9269 22.7367C30.6489 20.9994 31.3679 19.2604 32.0839 17.5197C31.2349 16.7767 30.3839 16.0397 29.5389 15.2907C29.3851 15.1372 29.2956 14.9309 29.2887 14.7137C29.2818 14.4965 29.3579 14.2848 29.5015 14.1218C29.6452 13.9587 29.8456 13.8566 30.0619 13.8362C30.2783 13.8157 30.4942 13.8785 30.6659 14.0117C32.3479 15.4677 34.0159 16.9377 35.6939 18.3977C35.7845 18.4779 35.8904 18.5387 36.0052 18.5765C36.1201 18.6144 36.2415 18.6284 36.3619 18.6177C37.9409 18.5287 39.5269 18.4847 41.1019 18.3707C41.1019 18.0417 41.1019 17.7137 41.1019 17.3867C39.8659 17.2087 38.6229 17.0717 37.3849 16.9007C36.9749 16.8367 36.4759 16.8877 36.1849 16.5367C34.7276 14.7767 33.2739 13.0131 31.8239 11.2457C31.5264 10.8685 31.1714 10.5405 30.7719 10.2737C30.4145 10.0253 30.0175 9.83929 29.5979 9.72374C29.1346 9.64589 28.6586 9.71714 28.2384 9.92723C27.8182 10.1373 27.4756 10.4754 27.2599 10.8927ZM17.1229 17.4927C17.1179 19.7587 17.1309 22.0247 17.1169 24.2927L17.1869 24.3527C17.8169 24.3327 18.4509 24.3767 19.0779 24.3327C19.7559 23.3657 20.4199 22.3847 21.0589 21.3937C20.9368 20.8568 20.9279 20.3003 21.0329 19.7597C21.288 18.9786 21.6081 18.2203 21.9899 17.4927C20.3679 17.4927 18.7456 17.4927 17.1229 17.4927ZM42.8229 17.5237C42.8369 17.7937 42.8289 18.0627 42.8279 18.3337C43.2943 18.3592 43.7619 18.3559 44.2279 18.3237C44.3215 18.2952 44.4024 18.2353 44.457 18.1541C44.5115 18.0729 44.5364 17.9753 44.5273 17.8779C44.5183 17.7804 44.4759 17.6891 44.4073 17.6193C44.3387 17.5495 44.2482 17.5055 44.1509 17.4947C43.7071 17.476 43.2625 17.4857 42.8199 17.5237M33.4109 18.7707C32.7722 20.3561 32.1196 21.9361 31.4529 23.5107C31.3599 23.8317 31.0429 24.0447 30.9769 24.3657C33.2099 24.3197 35.4469 24.3657 37.6829 24.3427C37.6929 22.9907 37.6739 21.6377 37.6919 20.2857C36.9546 20.3684 36.2092 20.3438 35.4789 20.2127C34.7498 19.8701 34.0951 19.3877 33.5519 18.7927L33.4149 18.7737M39.4149 20.1887C39.3869 21.8887 39.4149 23.5817 39.3999 25.2777C39.3778 25.501 39.2707 25.7073 39.1008 25.8538C38.9308 26.0003 38.711 26.0758 38.4869 26.0647C36.1059 26.0697 33.7239 26.0587 31.3439 26.0697C32.2849 28.1777 33.1729 30.3087 34.1439 32.4037C34.2 32.5334 34.2217 32.6753 34.2069 32.8157C33.9739 35.1257 33.7289 37.4337 33.4979 39.7447C33.3186 41.4634 33.1412 43.1827 32.9659 44.9027C35.4059 44.9287 37.8499 44.8947 40.2919 44.9207C40.4217 44.2948 40.6231 43.6858 40.8919 43.1057C41.3265 42.239 41.9628 41.4893 42.7475 40.9197C43.5322 40.3501 44.4422 39.9774 45.4009 39.8327C45.4139 35.8817 45.3749 31.9327 45.4059 27.9797L45.3319 27.9507C45.3682 27.86 45.3882 27.7635 45.3909 27.6657C45.3909 25.1477 45.3819 22.6297 45.3849 20.1107L45.3259 20.0517C43.3549 20.1067 41.3859 20.0317 39.4169 20.1877M21.9599 23.1487C20.7599 24.9261 19.5599 26.7031 18.3599 28.4797C18.2064 28.6689 18.0036 28.8118 17.7739 28.8927C14.1839 30.5774 10.5919 32.2601 6.9979 33.9407C6.62637 34.1062 6.29996 34.3584 6.04609 34.6761C5.79221 34.9938 5.61828 35.3679 5.5389 35.7667C10.1949 33.9537 14.8769 32.2077 19.5389 30.4117C21.1709 29.2527 22.7579 28.0257 24.3639 26.8307C24.5509 26.7021 24.7811 26.6523 25.0046 26.6921C25.2281 26.732 25.4269 26.8583 25.5579 27.0437C27.0666 29.1324 28.5732 31.2231 30.0779 33.3157C30.2258 33.4913 30.3019 33.7164 30.2909 33.9457C30.1909 35.0707 30.0389 36.1937 30.0019 37.3237C29.8763 39.4801 30.3154 41.632 31.2759 43.5667H31.3889C31.7219 40.0177 32.1109 36.4727 32.4709 32.9257C31.3709 30.3907 30.2349 27.8627 29.1709 25.3107C28.7198 25.3479 28.2658 25.322 27.8219 25.2337C26.4959 24.8977 25.1759 24.5487 23.8509 24.2047C23.1696 24.0182 22.549 23.6565 22.0509 23.1557H21.9579M18.3109 44.1557C17.9727 44.2658 17.6772 44.4782 17.465 44.7636C17.2529 45.049 17.1348 45.3932 17.1269 45.7487C17.12 46.1106 17.2281 46.4653 17.4358 46.7617C17.6435 47.058 17.94 47.2808 18.2825 47.3978C18.6249 47.5148 18.9957 47.5199 19.3413 47.4126C19.687 47.3052 19.9895 47.0908 20.2054 46.8004C20.4213 46.5099 20.5393 46.1584 20.5425 45.7965C20.5457 45.4346 20.4338 45.081 20.2231 44.7868C20.0123 44.4926 19.7135 44.2729 19.3699 44.1595C19.0262 44.0461 18.6554 44.0448 18.3109 44.1557ZM46.5679 44.1557C46.1798 44.2842 45.851 44.5482 45.6417 44.8993C45.4324 45.2505 45.3567 45.6653 45.4283 46.0677C45.5 46.4702 45.7143 46.8333 46.032 47.0906C46.3496 47.3479 46.7493 47.4822 47.1579 47.4687C47.403 47.4644 47.6442 47.407 47.8649 47.3004C48.0857 47.1938 48.2806 47.0405 48.4364 46.8512C48.5921 46.6619 48.7049 46.4411 48.767 46.204C48.829 45.9668 48.8389 45.7191 48.7959 45.4777C48.7505 45.237 48.6543 45.0087 48.5138 44.8081C48.3732 44.6074 48.1916 44.439 47.9809 44.3141C47.7702 44.1891 47.5353 44.1104 47.2918 44.0833C47.0484 44.0562 46.8019 44.0812 46.5689 44.1567L46.5679 44.1557Z" fill="white"/>
<path d="M4.91682 5.52586C6.69682 5.46186 8.48582 5.51286 10.2698 5.49986C10.4011 5.50088 10.5303 5.53204 10.6477 5.59092C10.765 5.64981 10.8672 5.73487 10.9464 5.83951C11.0256 5.94416 11.0798 6.06561 11.1046 6.19449C11.1295 6.32338 11.1244 6.45625 11.0898 6.58286C11.0298 6.78383 10.9009 6.95719 10.7256 7.07243C10.5504 7.18767 10.3401 7.23739 10.1318 7.21286C8.41482 7.19986 6.69582 7.23386 4.97982 7.19486C4.79013 7.15762 4.61856 7.05741 4.49294 6.91047C4.36732 6.76353 4.29501 6.57848 4.28772 6.3853C4.28043 6.19212 4.33858 6.00213 4.45277 5.84614C4.56695 5.69015 4.73047 5.5773 4.91682 5.52586Z" fill="white"/>
<path d="M12.8409 6.32787C12.847 6.11505 12.9324 5.9122 13.0805 5.75917C13.2285 5.60615 13.4284 5.514 13.6409 5.50086C15.7629 5.48686 17.8839 5.50987 20.0059 5.48987C21.3139 5.50887 22.6219 5.48986 23.9299 5.49786C24.1509 5.48906 24.3668 5.56608 24.5324 5.71281C24.698 5.85955 24.8004 6.06462 24.8182 6.28513C24.836 6.50564 24.7679 6.7245 24.628 6.89592C24.4882 7.06734 24.2875 7.17804 24.0679 7.20486C21.7489 7.23886 19.4259 7.17986 17.1079 7.23386C15.9509 7.18086 14.7859 7.23386 13.6259 7.20786C13.4076 7.18883 13.2047 7.08715 13.0588 6.9236C12.9129 6.76005 12.835 6.54696 12.8409 6.32787Z" fill="white"/>
<path d="M7.72392 10.8512C7.69327 10.7286 7.69001 10.6009 7.71439 10.4769C7.73876 10.353 7.79016 10.236 7.86493 10.1342C7.9397 10.0324 8.036 9.94832 8.14697 9.88799C8.25793 9.82767 8.38083 9.79256 8.50692 9.78516C10.4069 9.77416 12.3069 9.79015 14.2069 9.77715C14.8119 9.86115 15.5689 9.57716 16.0459 10.0692C16.147 10.1856 16.215 10.3271 16.2428 10.4788C16.2706 10.6305 16.2571 10.7868 16.2037 10.9315C16.1504 11.0762 16.0591 11.204 15.9396 11.3014C15.82 11.3987 15.6764 11.4622 15.5239 11.4852C14.6339 11.5142 13.7429 11.4852 12.8529 11.5002C11.4419 11.4902 10.0309 11.5002 8.62092 11.4952C8.42005 11.5078 8.22099 11.4506 8.0575 11.3332C7.894 11.2158 7.77615 11.0455 7.72392 10.8512Z" fill="white"/>
<path d="M40.683 10.6597C40.8378 10.6075 41.0038 10.5979 41.1636 10.6318C41.3234 10.6656 41.4712 10.7418 41.5915 10.8522C41.7119 10.9626 41.8004 11.1033 41.8479 11.2596C41.8954 11.4159 41.9 11.5821 41.8614 11.7408C41.8228 11.8995 41.7423 12.045 41.6283 12.162C41.5143 12.279 41.371 12.3633 41.2134 12.4061C41.0558 12.4488 40.8895 12.4486 40.732 12.4052C40.5745 12.3619 40.4315 12.2771 40.318 12.1597C40.2116 12.0485 40.135 11.9124 40.0951 11.7639C40.0552 11.6153 40.0533 11.4591 40.0897 11.3097C40.1261 11.1602 40.1995 11.0224 40.3032 10.9088C40.4068 10.7951 40.5375 10.7095 40.683 10.6597Z" fill="white"/>
<path d="M0.637995 15.8056C1.831 15.7496 3.03099 15.7956 4.22599 15.7816C4.36167 15.7762 4.49671 15.8029 4.62005 15.8597C4.7434 15.9165 4.85153 16.0017 4.93562 16.1084C5.01971 16.215 5.07735 16.34 5.10384 16.4732C5.13032 16.6064 5.12489 16.7439 5.088 16.8746C5.02119 17.0793 4.88423 17.2539 4.70127 17.3675C4.51832 17.4811 4.30113 17.5265 4.088 17.4956C2.928 17.4726 1.76199 17.5406 0.606993 17.4606C0.42827 17.4057 0.27227 17.2941 0.162569 17.1427C0.0528688 16.9913 -0.00457103 16.8083 -0.00106962 16.6214C0.0024318 16.4345 0.0666853 16.2538 0.181979 16.1066C0.297272 15.9594 0.457341 15.8537 0.637995 15.8056Z" fill="white"/>
<path d="M5.99183 16.7536C5.97595 16.6318 5.98637 16.508 6.02237 16.3907C6.05838 16.2733 6.11913 16.165 6.20053 16.073C6.28194 15.9811 6.38211 15.9077 6.49428 15.8578C6.60646 15.8078 6.72804 15.7825 6.85083 15.7836C8.08483 15.7836 9.31816 15.7836 10.5508 15.7836C11.3268 15.7836 12.1028 15.7776 12.8778 15.7836C13.0893 15.802 13.2863 15.8985 13.4305 16.0543C13.5747 16.2101 13.6556 16.414 13.6576 16.6263C13.6596 16.8385 13.5825 17.0439 13.4413 17.2024C13.3001 17.3609 13.1049 17.4611 12.8938 17.4835C11.9348 17.5015 10.9748 17.4835 10.0158 17.4915C8.95983 17.4915 7.90583 17.4915 6.84983 17.4915C6.64224 17.4913 6.4416 17.4167 6.28422 17.2814C6.12684 17.146 6.02312 16.9588 5.99183 16.7536Z" fill="white"/>
<path d="M10.646 22.6723C10.7954 22.6136 10.9575 22.5953 11.1162 22.6192C11.2749 22.6431 11.4245 22.7083 11.55 22.8083C11.6755 22.9084 11.7724 23.0397 11.831 23.1891C11.8897 23.3384 11.908 23.5006 11.884 23.6593C11.8601 23.818 11.7948 23.9676 11.6947 24.093C11.5947 24.2185 11.4633 24.3153 11.3139 24.3739C11.1645 24.4325 11.0023 24.4507 10.8437 24.4268C10.685 24.4028 10.5354 24.3374 10.41 24.2373C10.2861 24.1365 10.1906 24.005 10.1329 23.856C10.0753 23.707 10.0575 23.5455 10.0813 23.3875C10.1051 23.2295 10.1698 23.0804 10.2688 22.955C10.3678 22.8296 10.4978 22.7321 10.646 22.6723Z" fill="white"/>
<path d="M30.1149 3.81156C30.31 3.24233 30.6987 2.7596 31.2131 2.44751C31.7276 2.13542 32.3353 2.01376 32.9303 2.10372C33.5252 2.19368 34.0698 2.48956 34.469 2.9398C34.8682 3.39004 35.0968 3.96609 35.1149 4.56756C35.1049 6.01956 35.1499 7.48456 35.0919 8.92956C34.2159 8.92056 33.3409 8.93756 32.4659 8.92056C31.95 8.90207 31.4515 8.72962 31.0345 8.4254C30.6175 8.12119 30.301 7.69914 30.1259 7.21356C29.9751 6.63851 29.924 6.04187 29.9749 5.44956C29.9306 4.89957 29.9779 4.34604 30.1149 3.81156Z" fill="#FFDED5"/>
<path d="M42.825 17.5301C43.2675 17.492 43.7121 17.4824 44.1559 17.5011C44.2532 17.5118 44.3438 17.5558 44.4124 17.6256C44.4809 17.6954 44.5233 17.7868 44.5324 17.8842C44.5414 17.9816 44.5166 18.0792 44.462 18.1604C44.4075 18.2417 44.3266 18.3016 44.2329 18.3301C43.7669 18.3622 43.2994 18.3655 42.8329 18.3401C42.8309 18.0691 42.839 17.8001 42.825 17.5301Z" fill="#FFDED5"/>
<path d="M22.569 4.55532C24.4416 3.99302 26.3927 3.73705 28.347 3.79732C28.2565 4.63775 28.2288 5.48376 28.264 6.32832C28.2756 6.91263 28.3834 7.49105 28.583 8.04032C27.9755 8.14216 27.4003 8.38523 26.9039 8.74999C26.4075 9.11474 26.0037 9.59097 25.725 10.1403C24.781 12.011 23.8403 13.882 22.903 15.7533L22.811 15.7873C20.632 15.7873 18.453 15.7873 16.275 15.7873C16.0516 15.7848 15.8361 15.8699 15.6747 16.0243C15.5132 16.1786 15.4186 16.3901 15.411 16.6133C15.405 19.4643 15.411 22.3133 15.411 25.1663C15.4065 25.2836 15.4259 25.4006 15.468 25.5101C15.51 25.6197 15.5739 25.7196 15.6557 25.8037C15.7375 25.8879 15.8356 25.9545 15.9439 25.9997C16.0523 26.0448 16.1686 26.0675 16.286 26.0663C16.8333 26.0723 17.381 26.0723 17.929 26.0663C17.642 26.4853 17.364 26.9123 17.072 27.3283C15.119 28.2693 13.142 29.1623 11.185 30.0993C9.32913 26.1664 8.91704 21.7057 10.021 17.4993C10.98 17.4933 11.94 17.5093 12.899 17.4913C13.1101 17.4689 13.3052 17.3687 13.4464 17.2102C13.5877 17.0517 13.6648 16.8463 13.6628 16.6341C13.6608 16.4218 13.5798 16.2179 13.4356 16.0621C13.2915 15.9063 13.0945 15.8098 12.883 15.7913C12.107 15.7833 11.331 15.7913 10.556 15.7913C11.1297 14.2682 11.9032 12.8279 12.856 11.5083C13.746 11.4903 14.637 11.5223 15.527 11.4933C15.6795 11.4704 15.823 11.4069 15.9426 11.3095C16.0622 11.2121 16.1534 11.0844 16.2068 10.9397C16.2601 10.795 16.2736 10.6386 16.2459 10.4869C16.2181 10.3352 16.1501 10.1938 16.049 10.0773C15.572 9.57732 14.815 9.86932 14.21 9.78532C15.0961 8.84936 16.0669 7.99739 17.11 7.24032C19.427 7.18632 21.751 7.24532 24.07 7.21132C24.2896 7.1845 24.4903 7.0738 24.6302 6.90238C24.77 6.73095 24.8381 6.51209 24.8203 6.29158C24.8025 6.07107 24.7001 5.866 24.5345 5.71927C24.3689 5.57254 24.153 5.49552 23.932 5.50432C22.624 5.49832 21.316 5.51532 20.008 5.49632C20.859 5.18332 21.688 4.79632 22.568 4.56132M10.646 22.6733C10.497 22.732 10.3661 22.8289 10.2664 22.9541C10.1666 23.0793 10.1015 23.2285 10.0775 23.3868C10.0535 23.5451 10.0716 23.7069 10.1298 23.8561C10.188 24.0052 10.2844 24.1364 10.4093 24.2366C10.5342 24.3368 10.6832 24.4024 10.8414 24.4269C10.9997 24.4514 11.1615 24.4339 11.3109 24.3761C11.4602 24.3184 11.5917 24.2224 11.6923 24.0978C11.7929 23.9733 11.859 23.8245 11.884 23.6663C11.9066 23.5077 11.8875 23.346 11.8287 23.1971C11.7698 23.0481 11.6731 22.917 11.5481 22.8168C11.4232 22.7166 11.2743 22.6507 11.1161 22.6255C10.9579 22.6003 10.7959 22.6168 10.646 22.6733Z" fill="#6D6D6D"/>
<path d="M36.8298 6.11591C38.9373 7.30899 40.7939 8.89893 42.2968 10.7979C43.5473 12.3895 44.5354 14.1706 45.2238 16.0739C44.3178 15.5739 43.2528 15.8659 42.2708 15.7739C40.6038 15.6359 38.9479 15.3689 37.2849 15.1739C36.1179 13.7969 34.9848 12.3869 33.8298 10.9989C33.7242 10.895 33.6423 10.7695 33.5898 10.6309C34.3898 10.6409 35.1898 10.6359 35.9898 10.6309C36.2052 10.6285 36.4116 10.5447 36.5676 10.3963C36.7237 10.2479 36.8177 10.0459 36.8308 9.83091C36.8398 8.59191 36.8308 7.35192 36.8308 6.11292M40.6848 10.6569C40.5389 10.7057 40.4077 10.7906 40.3034 10.9037C40.1991 11.0168 40.125 11.1544 40.0881 11.3038C40.0512 11.4531 40.0527 11.6094 40.0923 11.7581C40.132 11.9067 40.2085 12.0429 40.3149 12.1541C40.4213 12.2652 40.5541 12.3477 40.7009 12.3938C40.8477 12.4399 41.0037 12.4482 41.1545 12.4178C41.3054 12.3875 41.4461 12.3195 41.5636 12.2202C41.6812 12.1209 41.7717 11.9936 41.8268 11.8499C41.8861 11.6884 41.8987 11.5136 41.8634 11.3453C41.8281 11.1769 41.7462 11.0219 41.627 10.8979C41.5079 10.7738 41.3563 10.6858 41.1895 10.6437C41.0228 10.6016 40.8476 10.6072 40.6838 10.6599L40.6848 10.6569Z" fill="#6D6D6D"/>
<path d="M39.4129 20.1913C41.3809 20.0353 43.3509 20.1113 45.3219 20.0553L45.3809 20.1143C45.3809 22.6323 45.3859 25.1503 45.3869 27.6693C45.3841 27.767 45.3641 27.8635 45.3279 27.9543C44.4217 30.7124 42.8778 33.2179 40.8214 35.2672C38.7649 37.3165 36.2541 38.8517 33.4929 39.7483C33.7239 37.4373 33.9689 35.1283 34.2019 32.8193C34.2167 32.6788 34.195 32.5369 34.1389 32.4073C33.1709 30.3073 32.2839 28.1803 31.3389 26.0733C33.7189 26.0623 36.0999 26.0733 38.4819 26.0683C38.706 26.0794 38.9258 26.0039 39.0958 25.8574C39.2657 25.7109 39.3728 25.5046 39.3949 25.2813C39.4159 23.5853 39.3859 21.8853 39.4129 20.1913Z" fill="#6D6D6D"/>
<path d="M20.47 31.8555C21.897 30.8555 23.27 29.7745 24.677 28.7555C25.961 30.5315 27.234 32.3155 28.523 34.0885L28.547 34.1935C28.2401 36.2332 28.2122 38.3052 28.464 40.3525C28.477 40.4325 28.504 40.5945 28.518 40.6755C28.1651 40.6245 27.8081 40.608 27.452 40.6265C24.8972 40.5725 22.3814 39.9884 20.0641 38.9113C17.7468 37.8343 15.6784 36.2877 13.99 34.3695C16.01 33.5988 18.0297 32.8292 20.049 32.0605C20.1974 32.0103 20.3389 31.9414 20.47 31.8555Z" fill="#6D6D6D"/>
<path d="M27.2558 10.8963C27.4719 10.4803 27.8143 10.1434 28.2339 9.93412C28.6534 9.72482 29.1284 9.65382 29.5908 9.73134C30.0105 9.84688 30.4074 10.0329 30.7648 10.2813C31.1643 10.5481 31.5193 10.8761 31.8168 11.2533C33.2708 13.016 34.7245 14.7797 36.1778 16.5443C36.4778 16.8953 36.9708 16.8443 37.3778 16.9083C38.6158 17.0793 39.8588 17.2163 41.0948 17.3943C41.0948 17.7223 41.0948 18.0493 41.0948 18.3783C39.5198 18.4923 37.9338 18.5363 36.3548 18.6253C36.2344 18.636 36.113 18.6219 35.9982 18.5841C35.8833 18.5463 35.7774 18.4855 35.6868 18.4053C34.0098 16.9453 32.3418 15.4753 30.6588 14.0193C30.4872 13.8861 30.2712 13.8233 30.0548 13.8438C29.8385 13.8642 29.6381 13.9663 29.4944 14.1294C29.3508 14.2924 29.2747 14.5041 29.2816 14.7213C29.2886 14.9384 29.378 15.1448 29.5318 15.2983C30.3738 16.0473 31.2318 16.7843 32.0768 17.5273C31.3575 19.266 30.6385 21.005 29.9198 22.7443C29.778 23.0617 29.5279 23.3183 29.2143 23.4682C28.9006 23.6181 28.5438 23.6515 28.2078 23.5623C26.8638 23.2183 25.5198 22.8733 24.1808 22.5133C23.8999 22.4283 23.6398 22.2858 23.4169 22.0949C23.1941 21.9039 23.0134 21.6687 22.8863 21.4041C22.7593 21.1396 22.6886 20.8515 22.6789 20.5582C22.6692 20.2649 22.7206 19.9727 22.8298 19.7003C24.3038 16.7637 25.7791 13.829 27.2558 10.8963Z" fill="#9DC1E4"/>
<path d="M17.1269 17.5016C18.7489 17.5016 20.3712 17.5016 21.9939 17.5016C21.6119 18.2278 21.2915 18.9848 21.0359 19.7646C20.9309 20.3051 20.9398 20.8616 21.0619 21.3986C20.4229 22.3886 19.7619 23.3706 19.0809 24.3376C18.4549 24.3816 17.8209 24.3376 17.1899 24.3576L17.1199 24.2976C17.1269 22.0296 17.1179 19.7636 17.1269 17.5016Z" fill="#FFCE56"/>
<path d="M33.4149 18.775L33.5519 18.794C34.0959 19.3908 34.7521 19.8747 35.4829 20.218C36.2132 20.3491 36.9586 20.3737 37.696 20.291C37.678 21.643 37.696 22.996 37.687 24.348C35.451 24.368 33.214 24.324 30.981 24.371C31.046 24.05 31.3639 23.837 31.4569 23.516C32.1236 21.9414 32.7763 20.361 33.4149 18.775Z" fill="#FFCE56"/>
<path d="M21.9588 23.15H22.0518C22.5499 23.6508 23.1705 24.0125 23.8518 24.199C25.1758 24.543 26.4968 24.892 27.8228 25.228C28.2667 25.3163 28.7207 25.3422 29.1718 25.305C30.2378 27.857 31.3718 30.385 32.4718 32.92C32.1118 36.468 31.7228 40.013 31.3898 43.561H31.2768C30.3163 41.6263 29.8772 39.4744 30.0028 37.318C30.0388 36.188 30.1928 35.065 30.2918 33.94C30.3028 33.7107 30.2267 33.4856 30.0788 33.31C28.5715 31.22 27.0648 29.1294 25.5588 27.038C25.4278 26.8526 25.229 26.7263 25.0055 26.6864C24.782 26.6465 24.5518 26.6963 24.3648 26.825C22.7578 28.025 21.1708 29.248 19.5398 30.406C14.8758 32.206 10.1938 33.949 5.53979 35.761C5.61903 35.362 5.79289 34.9877 6.04678 34.6698C6.30066 34.3519 6.62714 34.0996 6.99879 33.934C10.5888 32.248 14.1808 30.5654 17.7748 28.886C18.0045 28.8051 18.2073 28.6622 18.3608 28.473C19.5621 26.7037 20.7615 24.9294 21.9588 23.15Z" fill="#9DC1E4"/>
<path d="M18.3119 44.153C18.6547 44.0439 19.0232 44.0463 19.3645 44.1599C19.7058 44.2735 20.0023 44.4924 20.2113 44.7852C20.4203 45.078 20.5311 45.4295 20.5276 45.7892C20.5242 46.1489 20.4067 46.4983 20.1921 46.787C19.9775 47.0757 19.6769 47.2889 19.3334 47.3959C18.99 47.5029 18.6215 47.4982 18.2809 47.3825C17.9403 47.2668 17.6451 47.046 17.438 46.752C17.2308 46.4579 17.1222 46.1057 17.1279 45.746C17.1335 45.3899 17.2508 45.0446 17.4633 44.7588C17.6757 44.4729 17.9726 44.2611 18.3119 44.153Z" fill="#E4E4E4"/>
<path d="M46.57 44.1572C46.8032 44.0815 47.0498 44.0563 47.2934 44.0835C47.5371 44.1106 47.7721 44.1893 47.983 44.3144C48.1938 44.4395 48.3755 44.6081 48.5161 44.8089C48.6566 45.0098 48.7527 45.2383 48.798 45.4792C48.8395 45.7241 48.8271 45.9752 48.7616 46.2148C48.6961 46.4545 48.5791 46.677 48.4187 46.8667C48.2584 47.0565 48.0586 47.2091 47.8332 47.3137C47.6079 47.4183 47.3624 47.4725 47.114 47.4725C46.8656 47.4725 46.6201 47.4183 46.3948 47.3137C46.1694 47.2091 45.9696 47.0565 45.8093 46.8667C45.6489 46.677 45.532 46.4545 45.4664 46.2148C45.4009 45.9752 45.3885 45.7241 45.43 45.4792C45.4851 45.1773 45.6198 44.8955 45.8202 44.6631C46.0206 44.4307 46.2795 44.256 46.57 44.1572Z" fill="#E4E4E4"/>
</g>
<defs>
<clipPath id="clip0_5358_49653">
<rect width="51.403" height="48.842" fill="white" transform="translate(0 0.358032)"/>
</clipPath>
</defs>
</svg>
`;
const offlineDc = `<svg width="52" height="50" viewBox="0 0 52 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5358_49676)">
<path d="M30.289 0.846904C30.8527 0.495368 31.4906 0.280018 32.152 0.217933C32.8135 0.155847 33.4803 0.248736 34.0996 0.48923C34.7189 0.729724 35.2736 1.11121 35.7198 1.60342C36.166 2.09564 36.4913 2.68505 36.67 3.3249C36.8366 4.19167 36.89 5.07639 36.829 5.9569C36.829 7.1959 36.837 8.43591 36.829 9.67491C36.8159 9.88985 36.7219 10.0918 36.5658 10.2403C36.4098 10.3887 36.2034 10.4725 35.988 10.4749C35.188 10.4749 34.388 10.4809 33.588 10.4749C33.6405 10.6135 33.7224 10.739 33.828 10.8429C34.984 12.2309 36.115 13.6429 37.283 15.0179C38.946 15.2109 40.602 15.4789 42.269 15.6179C43.251 15.7119 44.315 15.4179 45.222 15.9179C45.5934 16.1461 45.8865 16.482 46.0621 16.8809C46.2377 17.2799 46.2876 17.7229 46.205 18.1509C47.085 18.2589 48.02 18.1569 48.923 18.2009C49.1341 18.2242 49.3289 18.3253 49.4695 18.4845C49.61 18.6436 49.6863 18.8495 49.6833 19.0618C49.6803 19.2741 49.5983 19.4777 49.4533 19.6329C49.3083 19.788 49.1107 19.8836 48.899 19.9009C48.299 19.9199 47.694 19.9009 47.091 19.9089C47.0984 26.7542 47.106 33.5999 47.114 40.4459C47.1182 40.6024 47.0796 40.7571 47.0024 40.8933C46.9253 41.0295 46.8124 41.1421 46.676 41.2189C46.33 41.4099 45.914 41.2969 45.542 41.3969C44.5719 41.5638 43.6886 42.0588 43.04 42.7992C42.3914 43.5396 42.0168 44.4803 41.979 45.4639C41.9937 45.5862 41.9831 45.7102 41.948 45.8282C41.9128 45.9462 41.8538 46.0558 41.7746 46.1501C41.6954 46.2444 41.5977 46.3214 41.4875 46.3764C41.3773 46.4314 41.257 46.4633 41.134 46.4699C34.8074 46.4752 28.48 46.4752 22.152 46.4699C22.0694 46.7702 21.9505 47.0593 21.798 47.3309C29.2474 47.3309 36.697 47.3309 44.147 47.3309C43.7496 46.6435 43.6033 45.8394 43.7331 45.056C43.8629 44.2727 44.2608 43.5587 44.8587 43.0363C45.4567 42.5138 46.2175 42.2153 47.0112 42.1917C47.8049 42.1681 48.5821 42.4209 49.21 42.9069C49.8602 43.4202 50.3062 44.1483 50.4682 44.9606C50.6302 45.773 50.4976 46.6165 50.094 47.3399C50.3243 47.2735 50.5702 47.2862 50.7924 47.3759C51.0147 47.4656 51.2004 47.6272 51.32 47.8349C51.3765 47.9642 51.4002 48.1055 51.389 48.2462C51.3778 48.3868 51.332 48.5225 51.2557 48.6413C51.1794 48.76 51.075 48.858 50.9517 48.9267C50.8285 48.9954 50.6901 49.0326 50.549 49.0349C34.565 49.0389 18.5794 49.0389 2.59203 49.0349C2.47569 49.0418 2.35917 49.0248 2.24962 48.9851C2.14007 48.9453 2.03981 48.8836 1.95499 48.8036C1.87018 48.7237 1.80261 48.6273 1.75642 48.5203C1.71023 48.4133 1.6864 48.298 1.6864 48.1814C1.6864 48.0649 1.71023 47.9495 1.75642 47.8425C1.80261 47.7355 1.87018 47.6391 1.95499 47.5592C2.03981 47.4793 2.14007 47.4175 2.24962 47.3777C2.35917 47.338 2.47569 47.321 2.59203 47.3279C7.00903 47.3329 11.428 47.3199 15.847 47.3339C15.6825 46.9949 15.557 46.6383 15.473 46.2709C15.3599 45.6946 15.3969 45.0989 15.5804 44.541C15.7638 43.9831 16.0876 43.4817 16.5207 43.085C16.9538 42.6883 17.4815 42.4096 18.0533 42.2756C18.6252 42.1416 19.2218 42.1569 19.786 42.3199C20.3559 42.4878 20.8731 42.7992 21.2881 43.2244C21.7031 43.6495 22.002 44.1741 22.156 44.7479C24.77 44.7609 27.383 44.7339 29.996 44.7619L30.101 44.7179C29.3053 43.487 28.7709 42.1058 28.531 40.6599C28.669 40.4939 28.515 40.3369 28.462 40.1849C28.2103 38.1376 28.2382 36.0656 28.545 34.0259L28.521 33.9209C27.232 32.1479 25.959 30.3649 24.675 28.5879C23.264 29.6109 21.896 30.6879 20.468 31.6879C20.3367 31.7721 20.1952 31.8393 20.047 31.8879C18.0257 32.6559 16.006 33.4256 13.988 34.1969C10.9427 35.3609 7.89669 36.5222 4.85002 37.6809C4.61998 37.8013 4.361 37.8553 4.10202 37.8369C3.98637 37.8174 3.87595 37.7745 3.77755 37.7107C3.67915 37.6469 3.59488 37.5636 3.52994 37.4659C3.46499 37.3683 3.42076 37.2584 3.39996 37.1429C3.37917 37.0275 3.38225 36.9091 3.40903 36.7949C3.58073 35.4235 4.14266 34.1302 5.02802 33.0689C5.73542 32.4777 6.53819 32.011 7.40202 31.6889C8.66202 31.1029 9.91602 30.5059 11.179 29.9249C13.136 28.9889 15.113 28.0959 17.066 27.1539C17.358 26.7379 17.636 26.3119 17.923 25.8919C17.3757 25.9006 16.828 25.9006 16.28 25.8919C16.1627 25.8931 16.0463 25.8704 15.938 25.8253C15.8296 25.7801 15.7316 25.7135 15.6498 25.6293C15.5679 25.5452 15.5041 25.4453 15.462 25.3357C15.4199 25.2261 15.4005 25.1092 15.405 24.9919C15.405 22.1409 15.405 19.2919 15.405 16.4389C15.4126 16.2156 15.5072 16.0042 15.6687 15.8498C15.8302 15.6955 16.0456 15.6104 16.269 15.6129C18.447 15.6129 20.626 15.6129 22.805 15.6129L22.897 15.5789C23.837 13.7082 24.7777 11.8372 25.719 9.96591C25.9977 9.41655 26.4015 8.94032 26.8979 8.57557C27.3944 8.21082 27.9695 7.96773 28.577 7.8659C28.3774 7.31663 28.2696 6.73822 28.258 6.1539C28.2228 5.30935 28.2505 4.46334 28.341 3.6229C28.458 3.05011 28.6905 2.50718 29.0244 2.0273C29.3583 1.54742 29.7866 1.14067 30.283 0.831904M30.109 3.6389C29.9727 4.1735 29.926 4.72703 29.971 5.2769C29.9202 5.86921 29.9712 6.46586 30.122 7.0409C30.2972 7.52648 30.6136 7.94854 31.0306 8.25275C31.4476 8.55696 31.9462 8.72942 32.462 8.7479C33.337 8.7639 34.212 8.74791 35.088 8.75691C35.146 7.31191 35.101 5.84691 35.111 4.39491C35.0929 3.79344 34.8644 3.21739 34.4651 2.76715C34.0659 2.31691 33.5214 2.02102 32.9264 1.93106C32.3314 1.8411 31.7237 1.96277 31.2093 2.27486C30.6948 2.58695 30.3061 3.06967 30.111 3.6389M27.26 10.7349C25.784 13.6682 24.3097 16.6016 22.837 19.5349C22.7278 19.8073 22.6764 20.0994 22.6861 20.3927C22.6958 20.6861 22.7665 20.9741 22.8935 21.2387C23.0206 21.5032 23.2013 21.7385 23.4241 21.9294C23.647 22.1204 23.9071 22.2629 24.188 22.3479C25.527 22.7079 26.871 23.0529 28.215 23.3969C28.551 23.486 28.9078 23.4527 29.2215 23.3028C29.5351 23.1529 29.7852 22.8963 29.927 22.5789C30.649 20.8416 31.368 19.1026 32.084 17.3619C31.235 16.6189 30.384 15.8819 29.539 15.1329C29.3852 14.9794 29.2958 14.773 29.2888 14.5558C29.2819 14.3386 29.358 14.127 29.5016 13.9639C29.6453 13.8009 29.8457 13.6988 30.062 13.6783C30.2784 13.6579 30.4944 13.7207 30.666 13.8539C32.348 15.3099 34.016 16.7799 35.694 18.2399C35.7846 18.32 35.8905 18.3809 36.0054 18.4187C36.1202 18.4565 36.2416 18.4705 36.362 18.4599C37.941 18.3709 39.527 18.3269 41.102 18.2129C41.102 17.8839 41.102 17.5559 41.102 17.2289C39.866 17.0509 38.623 16.9139 37.385 16.7429C36.975 16.6789 36.476 16.7299 36.185 16.3789C34.7277 14.6189 33.274 12.8552 31.824 11.0879C31.5265 10.7107 31.1715 10.3827 30.772 10.1159C30.4147 9.86742 30.0177 9.68145 29.598 9.56591C29.1347 9.48805 28.6587 9.55931 28.2385 9.7694C27.8183 9.97949 27.4757 10.3176 27.26 10.7349ZM17.123 17.3349C17.118 19.6009 17.131 21.8669 17.117 24.1349L17.187 24.1949C17.817 24.1749 18.451 24.2189 19.078 24.1749C19.756 23.2079 20.42 22.2269 21.059 21.2359C20.9369 20.699 20.9281 20.1425 21.033 19.6019C21.2881 18.8208 21.6082 18.0625 21.99 17.3349C20.368 17.3349 18.7457 17.3349 17.123 17.3349ZM42.823 17.3659C42.837 17.6359 42.829 17.9049 42.828 18.1759C43.2945 18.2014 43.762 18.198 44.228 18.1659C44.3216 18.1374 44.4025 18.0775 44.4571 17.9963C44.5116 17.915 44.5365 17.8175 44.5274 17.72C44.5184 17.6226 44.476 17.5313 44.4074 17.4615C44.3388 17.3917 44.2483 17.3477 44.151 17.3369C43.7072 17.3182 43.2626 17.3279 42.82 17.3659M33.411 18.6129C32.7724 20.1982 32.1197 21.7782 31.453 23.3529C31.36 23.6739 31.043 23.8869 30.977 24.2079C33.21 24.1619 35.447 24.2079 37.683 24.1849C37.693 22.8329 37.674 21.4799 37.692 20.1279C36.9547 20.2106 36.2093 20.186 35.479 20.0549C34.7499 19.7123 34.0952 19.2298 33.552 18.6349L33.415 18.6159M39.415 20.0309C39.387 21.7309 39.415 23.4239 39.4 25.1199C39.378 25.3432 39.2709 25.5495 39.1009 25.696C38.9309 25.8425 38.7111 25.918 38.487 25.9069C36.106 25.9119 33.724 25.9009 31.344 25.9119C32.285 28.0199 33.173 30.1509 34.144 32.2459C34.2001 32.3755 34.2218 32.5174 34.207 32.6579C33.974 34.9679 33.729 37.2759 33.498 39.5869C33.3187 41.3056 33.1414 43.0249 32.966 44.7449C35.406 44.7709 37.85 44.7369 40.292 44.7629C40.4219 44.1369 40.6232 43.5279 40.892 42.9479C41.3266 42.0811 41.963 41.3314 42.7476 40.7619C43.5323 40.1923 44.4423 39.8195 45.401 39.6749C45.414 35.7239 45.375 31.7749 45.406 27.8219L45.332 27.7929C45.3683 27.7021 45.3883 27.6056 45.391 27.5079C45.391 24.9899 45.382 22.4719 45.385 19.9529L45.326 19.8939C43.355 19.9489 41.386 19.8739 39.417 20.0299M21.96 22.9909C20.76 24.7682 19.56 26.5452 18.36 28.3219C18.2066 28.511 18.0037 28.654 17.774 28.7349C14.184 30.4196 10.592 32.1022 6.99802 33.7829C6.62649 33.9484 6.30009 34.2005 6.04621 34.5183C5.79234 34.836 5.61841 35.21 5.53902 35.6089C10.195 33.7959 14.877 32.0499 19.539 30.2539C21.171 29.0949 22.758 27.8679 24.364 26.6729C24.5511 26.5442 24.7813 26.4944 25.0048 26.5343C25.2282 26.5742 25.427 26.7005 25.558 26.8859C27.0667 28.9746 28.5734 31.0652 30.078 33.1579C30.226 33.3335 30.302 33.5586 30.291 33.7879C30.191 34.9129 30.039 36.0359 30.002 37.1659C29.8764 39.3223 30.3155 41.4742 31.276 43.4089H31.389C31.722 39.8599 32.111 36.3149 32.471 32.7679C31.371 30.2329 30.235 27.7049 29.171 25.1529C28.72 25.1901 28.2659 25.1642 27.822 25.0759C26.496 24.7399 25.176 24.3909 23.851 24.0469C23.1697 23.8604 22.5492 23.4987 22.051 22.9979H21.958M18.311 43.9979C17.9729 44.1079 17.6773 44.3203 17.4652 44.6057C17.253 44.8911 17.1349 45.2354 17.127 45.5909C17.1201 45.9528 17.2283 46.3074 17.436 46.6038C17.6436 46.9002 17.9401 47.123 18.2826 47.2399C18.6251 47.3569 18.9959 47.3621 19.3415 47.2547C19.6871 47.1474 19.9896 46.933 20.2055 46.6425C20.4214 46.352 20.5395 46.0005 20.5426 45.6386C20.5458 45.2767 20.434 44.9232 20.2232 44.629C20.0124 44.3348 19.7137 44.1151 19.37 44.0017C19.0263 43.8883 18.6555 43.8869 18.311 43.9979ZM46.568 43.9979C46.1799 44.1263 45.8511 44.3903 45.6418 44.7415C45.4325 45.0926 45.3568 45.5074 45.4285 45.9099C45.5001 46.3123 45.7144 46.6755 46.0321 46.9328C46.3497 47.1901 46.7495 47.3243 47.158 47.3109C47.4031 47.3066 47.6443 47.2492 47.8651 47.1426C48.0858 47.0359 48.2808 46.8827 48.4365 46.6934C48.5922 46.5041 48.705 46.2833 48.7671 46.0461C48.8292 45.809 48.839 45.5612 48.796 45.3199C48.7506 45.0792 48.6544 44.8509 48.5139 44.6503C48.3733 44.4496 48.1917 44.2812 47.981 44.1562C47.7703 44.0312 47.5354 43.9526 47.292 43.9254C47.0485 43.8983 46.8021 43.9234 46.569 43.9989L46.568 43.9979Z" fill="#4C241D"/>
<path d="M4.917 5.36693C6.697 5.30293 8.486 5.35392 10.27 5.34092C10.4013 5.34194 10.5305 5.3731 10.6478 5.43199C10.7651 5.49088 10.8674 5.57593 10.9466 5.68058C11.0258 5.78523 11.08 5.90667 11.1048 6.03556C11.1297 6.16444 11.1246 6.29731 11.09 6.42393C11.03 6.62489 10.901 6.79826 10.7258 6.9135C10.5506 7.02873 10.3403 7.07846 10.132 7.05392C8.415 7.04092 6.696 7.07492 4.98 7.03592C4.79031 6.99868 4.61875 6.89847 4.49313 6.75153C4.36751 6.60459 4.2952 6.41954 4.2879 6.22636C4.28061 6.03318 4.33877 5.8432 4.45295 5.68721C4.56713 5.53122 4.73065 5.41836 4.917 5.36693Z" fill="#4C241D"/>
<path d="M12.841 6.16991C12.8471 5.95709 12.9325 5.75424 13.0806 5.60121C13.2286 5.44819 13.4285 5.35604 13.641 5.3429C15.763 5.3289 17.884 5.35191 20.006 5.33191C21.314 5.35091 22.622 5.3319 23.93 5.3399C24.1511 5.3311 24.367 5.40812 24.5325 5.55486C24.6981 5.70159 24.8005 5.90666 24.8183 6.12717C24.8362 6.34768 24.768 6.56654 24.6282 6.73796C24.4883 6.90938 24.2876 7.02009 24.068 7.04691C21.749 7.08091 19.426 7.0219 17.108 7.0759C15.951 7.0229 14.786 7.0759 13.626 7.0499C13.4077 7.03087 13.2048 6.92919 13.0589 6.76564C12.913 6.60209 12.8351 6.389 12.841 6.16991Z" fill="#4C241D"/>
<path d="M7.72399 10.693C7.69333 10.5704 7.69008 10.4426 7.71445 10.3187C7.73882 10.1948 7.79022 10.0778 7.86499 9.97596C7.93976 9.87417 8.03606 9.79011 8.14703 9.72979C8.25799 9.66946 8.3809 9.63436 8.50698 9.62696C10.407 9.61596 12.307 9.63195 14.207 9.61895C14.812 9.70295 15.569 9.41896 16.046 9.91096C16.1471 10.0274 16.2151 10.1689 16.2429 10.3206C16.2706 10.4723 16.2571 10.6286 16.2038 10.7733C16.1504 10.918 16.0592 11.0458 15.9396 11.1432C15.82 11.2405 15.6765 11.304 15.524 11.327C14.634 11.356 13.743 11.327 12.853 11.342C11.442 11.332 10.031 11.342 8.62098 11.337C8.42011 11.3496 8.22105 11.2924 8.05756 11.175C7.89406 11.0576 7.77621 10.8873 7.72399 10.693Z" fill="#4C241D"/>
<path d="M40.683 10.5019C40.8378 10.4498 41.0038 10.4402 41.1636 10.4741C41.3234 10.5079 41.4712 10.584 41.5915 10.6945C41.7119 10.8049 41.8004 10.9456 41.8479 11.1019C41.8954 11.2582 41.9 11.4244 41.8614 11.5831C41.8228 11.7418 41.7423 11.8873 41.6283 12.0043C41.5143 12.1213 41.371 12.2056 41.2134 12.2484C41.0558 12.2911 40.8895 12.2908 40.732 12.2475C40.5745 12.2042 40.4315 12.1194 40.318 12.0019C40.2116 11.8908 40.135 11.7547 40.0951 11.6062C40.0552 11.4576 40.0533 11.3014 40.0897 11.152C40.1261 11.0025 40.1995 10.8646 40.3032 10.751C40.4068 10.6374 40.5375 10.5518 40.683 10.5019Z" fill="#4C241D"/>
<path d="M0.637995 15.6479C1.831 15.5919 3.03099 15.6379 4.22599 15.6239C4.36167 15.6184 4.49671 15.6452 4.62005 15.702C4.7434 15.7588 4.85153 15.844 4.93562 15.9506C5.01971 16.0573 5.07735 16.1823 5.10384 16.3155C5.13032 16.4486 5.12489 16.5862 5.088 16.7169C5.02119 16.9216 4.88423 17.0962 4.70127 17.2098C4.51832 17.3234 4.30113 17.3688 4.088 17.3379C2.928 17.3149 1.76199 17.3829 0.606993 17.3029C0.42827 17.248 0.27227 17.1364 0.162569 16.985C0.0528688 16.8336 -0.00457103 16.6506 -0.00106962 16.4637C0.0024318 16.2768 0.0666853 16.0961 0.181979 15.9489C0.297272 15.8017 0.457341 15.696 0.637995 15.6479Z" fill="#4C241D"/>
<path d="M5.99201 16.596C5.97614 16.4742 5.98655 16.3505 6.02256 16.2331C6.05856 16.1157 6.11931 16.0074 6.20072 15.9154C6.28212 15.8235 6.38229 15.7501 6.49446 15.7002C6.60664 15.6502 6.72822 15.6249 6.85101 15.626C8.08501 15.626 9.31834 15.626 10.551 15.626C11.327 15.626 12.103 15.62 12.878 15.626C13.0895 15.6444 13.2865 15.7409 13.4307 15.8967C13.5748 16.0525 13.6558 16.2564 13.6578 16.4687C13.6598 16.6809 13.5827 16.8864 13.4415 17.0448C13.3003 17.2033 13.1051 17.3035 12.894 17.326C11.935 17.344 10.975 17.326 10.016 17.334C8.96001 17.334 7.90601 17.334 6.85001 17.334C6.64242 17.3337 6.44178 17.2591 6.2844 17.1238C6.12703 16.9884 6.0233 16.8012 5.99201 16.596Z" fill="#4C241D"/>
<path d="M10.646 22.5139C10.7954 22.4552 10.9575 22.4369 11.1162 22.4607C11.2749 22.4846 11.4245 22.5498 11.55 22.6499C11.6755 22.7499 11.7724 22.8812 11.831 23.0306C11.8897 23.18 11.908 23.3422 11.884 23.5009C11.8601 23.6595 11.7948 23.8091 11.6947 23.9346C11.5947 24.06 11.4633 24.1569 11.3139 24.2155C11.1645 24.2741 11.0023 24.2923 10.8437 24.2683C10.685 24.2443 10.5354 24.179 10.41 24.0789C10.2861 23.978 10.1906 23.8466 10.1329 23.6976C10.0753 23.5485 10.0575 23.387 10.0813 23.229C10.1051 23.071 10.1698 22.9219 10.2688 22.7965C10.3678 22.6711 10.4978 22.5737 10.646 22.5139Z" fill="#4C241D"/>
<path d="M30.115 3.65396C30.3101 3.08473 30.6988 2.60201 31.2133 2.28992C31.7277 1.97783 32.3354 1.85616 32.9304 1.94612C33.5254 2.03608 34.0699 2.33197 34.4691 2.78221C34.8684 3.23245 35.0969 3.8085 35.115 4.40997C35.105 5.86197 35.15 7.32697 35.092 8.77197C34.216 8.76297 33.341 8.77997 32.466 8.76297C31.9501 8.74448 31.4516 8.57202 31.0346 8.26781C30.6176 7.9636 30.3011 7.54154 30.126 7.05596C29.9752 6.48092 29.9241 5.88427 29.975 5.29196C29.9307 4.74198 29.978 4.18845 30.115 3.65396Z" fill="#FFDED5"/>
<path d="M42.824 17.3699C43.2666 17.3319 43.7112 17.3222 44.155 17.3409C44.2523 17.3517 44.3429 17.3957 44.4114 17.4655C44.48 17.5353 44.5224 17.6266 44.5315 17.724C44.5405 17.8215 44.5156 17.919 44.4611 18.0003C44.4065 18.0815 44.3256 18.1414 44.232 18.1699C43.766 18.202 43.2985 18.2054 42.832 18.1799C42.83 17.9089 42.838 17.6399 42.824 17.3699Z" fill="#FFDED5"/>
<path d="M22.569 4.39492C24.4416 3.83262 26.3927 3.57665 28.347 3.63692C28.2565 4.47735 28.2288 5.32336 28.264 6.16792C28.2756 6.75223 28.3834 7.33065 28.583 7.87992C27.9755 7.98176 27.4003 8.22483 26.9039 8.58959C26.4075 8.95434 26.0037 9.43057 25.725 9.97992C24.781 11.8506 23.8403 13.7216 22.903 15.5929L22.811 15.6269C20.632 15.6269 18.453 15.6269 16.275 15.6269C16.0516 15.6244 15.8361 15.7095 15.6747 15.8639C15.5132 16.0182 15.4186 16.2297 15.411 16.4529C15.405 19.3039 15.411 22.1529 15.411 25.0059C15.4065 25.1232 15.4259 25.2402 15.468 25.3497C15.51 25.4593 15.5739 25.5592 15.6557 25.6433C15.7375 25.7275 15.8356 25.7941 15.9439 25.8393C16.0523 25.8844 16.1686 25.9071 16.286 25.9059C16.8333 25.9119 17.381 25.9119 17.929 25.9059C17.642 26.3249 17.364 26.7519 17.072 27.1679C15.119 28.1089 13.142 29.0019 11.185 29.9389C9.32913 26.006 8.91704 21.5453 10.021 17.3389C10.98 17.3329 11.94 17.3489 12.899 17.3309C13.1101 17.3085 13.3052 17.2083 13.4464 17.0498C13.5877 16.8913 13.6648 16.6859 13.6628 16.4737C13.6608 16.2614 13.5798 16.0575 13.4356 15.9017C13.2915 15.7459 13.0945 15.6494 12.883 15.6309C12.107 15.6229 11.331 15.6309 10.556 15.6309C11.1297 14.1078 11.9032 12.6675 12.856 11.3479C13.746 11.3299 14.637 11.3619 15.527 11.3329C15.6795 11.31 15.823 11.2465 15.9426 11.1491C16.0622 11.0517 16.1534 10.924 16.2068 10.7793C16.2601 10.6346 16.2736 10.4782 16.2459 10.3265C16.2181 10.1748 16.1501 10.0334 16.049 9.91692C15.572 9.41692 14.815 9.70892 14.21 9.62492C15.0961 8.68895 16.0669 7.83699 17.11 7.07992C19.427 7.02592 21.751 7.08492 24.07 7.05092C24.2896 7.0241 24.4903 6.9134 24.6302 6.74198C24.77 6.57055 24.8381 6.35169 24.8203 6.13118C24.8025 5.91067 24.7001 5.7056 24.5345 5.55887C24.3689 5.41214 24.153 5.33512 23.932 5.34392C22.624 5.33792 21.316 5.35492 20.008 5.33592C20.859 5.02292 21.688 4.63592 22.568 4.40092M10.646 22.5129C10.497 22.5716 10.3661 22.6685 10.2664 22.7937C10.1666 22.9189 10.1015 23.0681 10.0775 23.2264C10.0535 23.3847 10.0716 23.5465 10.1298 23.6957C10.188 23.8448 10.2844 23.976 10.4093 24.0762C10.5342 24.1764 10.6832 24.242 10.8414 24.2665C10.9997 24.291 11.1615 24.2735 11.3109 24.2157C11.4602 24.158 11.5917 24.062 11.6923 23.9374C11.7929 23.8129 11.859 23.6641 11.884 23.5059C11.9066 23.3473 11.8875 23.1856 11.8287 23.0367C11.7698 22.8877 11.6731 22.7566 11.5481 22.6564C11.4232 22.5562 11.2743 22.4903 11.1161 22.4651C10.9579 22.4399 10.7959 22.4564 10.646 22.5129Z" fill="#D2DDFF"/>
<path d="M36.829 5.95698C38.9365 7.15006 40.793 8.74 42.296 10.639C43.5464 12.2305 44.5346 14.0116 45.223 15.915C44.317 15.415 43.252 15.707 42.27 15.615C40.603 15.477 38.947 15.21 37.284 15.015C36.117 13.638 34.984 12.228 33.829 10.84C33.7233 10.7361 33.6415 10.6105 33.589 10.472C34.389 10.482 35.189 10.477 35.989 10.472C36.2043 10.4696 36.4107 10.3858 36.5668 10.2373C36.7228 10.0889 36.8169 9.88692 36.83 9.67197C36.839 8.43297 36.83 7.19298 36.83 5.95398M40.684 10.498C40.5381 10.5468 40.4069 10.6317 40.3026 10.7448C40.1982 10.8578 40.1242 10.9955 40.0872 11.1448C40.0503 11.2942 40.0518 11.4505 40.0915 11.5991C40.1311 11.7478 40.2077 11.884 40.3141 11.9952C40.4205 12.1063 40.5532 12.1888 40.7 12.2349C40.8468 12.281 41.0029 12.2892 41.1537 12.2589C41.3045 12.2285 41.4452 12.1606 41.5628 12.0613C41.6803 11.962 41.7709 11.8346 41.826 11.691C41.8852 11.5295 41.8979 11.3546 41.8625 11.1863C41.8272 11.018 41.7453 10.863 41.6262 10.7389C41.5071 10.6149 41.3555 10.5268 41.1887 10.4848C41.0219 10.4427 40.8467 10.4483 40.683 10.501L40.684 10.498Z" fill="#D2DDFF"/>
<path d="M39.413 20.0319C41.381 19.8759 43.351 19.9519 45.322 19.8959L45.381 19.9549C45.381 22.4729 45.386 24.9909 45.387 27.5099C45.3842 27.6076 45.3643 27.7041 45.328 27.7949C44.4219 30.553 42.8779 33.0585 40.8215 35.1078C38.7651 37.157 36.2543 38.6923 33.493 39.5889C33.724 37.2779 33.969 34.9689 34.202 32.6599C34.2168 32.5194 34.1951 32.3775 34.139 32.2479C33.171 30.1479 32.284 28.0209 31.339 25.9139C33.719 25.9029 36.1 25.9139 38.482 25.9089C38.7061 25.92 38.9259 25.8445 39.0959 25.698C39.2658 25.5514 39.3729 25.3452 39.395 25.1219C39.416 23.4259 39.386 21.7259 39.413 20.0319Z" fill="#D2DDFF"/>
<path d="M20.47 31.6969C21.897 30.6969 23.27 29.6159 24.677 28.5969C25.961 30.3729 27.234 32.1569 28.523 33.9299L28.547 34.0349C28.2401 36.0747 28.2122 38.1467 28.464 40.1939C28.477 40.2739 28.504 40.4359 28.518 40.5169C28.1651 40.4659 27.8081 40.4495 27.452 40.4679C24.8972 40.4139 22.3814 39.8298 20.0641 38.7528C17.7468 37.6757 15.6784 36.1291 13.99 34.2109C16.01 33.4403 18.0297 32.6706 20.049 31.9019C20.1974 31.8517 20.3389 31.7828 20.47 31.6969Z" fill="#D2DDFF"/>
<path d="M27.256 10.7369C27.4721 10.3209 27.8145 9.98401 28.234 9.7747C28.6536 9.56539 29.1286 9.49439 29.591 9.57191C30.0107 9.68746 30.4076 9.87344 30.765 10.1219C31.1645 10.3887 31.5195 10.7167 31.817 11.0939C33.271 12.8566 34.7247 14.6202 36.178 16.3849C36.478 16.7359 36.971 16.6849 37.378 16.7489C38.616 16.9199 39.859 17.0569 41.095 17.2349C41.095 17.5629 41.095 17.8899 41.095 18.2189C39.52 18.3329 37.934 18.3769 36.355 18.4659C36.2345 18.4765 36.1132 18.4625 35.9983 18.4247C35.8835 18.3869 35.7776 18.326 35.687 18.2459C34.01 16.7859 32.342 15.3159 30.659 13.8599C30.4873 13.7267 30.2714 13.6639 30.055 13.6843C29.8387 13.7048 29.6383 13.8069 29.4946 13.97C29.351 14.133 29.2749 14.3447 29.2818 14.5618C29.2887 14.779 29.3782 14.9854 29.532 15.1389C30.374 15.8879 31.232 16.6249 32.077 17.3679C31.3577 19.1066 30.6387 20.8456 29.92 22.5849C29.7782 22.9023 29.5281 23.1589 29.2144 23.3088C28.9008 23.4587 28.544 23.492 28.208 23.4029C26.864 23.0589 25.52 22.7139 24.181 22.3539C23.9001 22.2689 23.64 22.1264 23.4171 21.9354C23.1942 21.7445 23.0135 21.5093 22.8865 21.2447C22.7594 20.9802 22.6888 20.6921 22.6791 20.3988C22.6694 20.1054 22.7208 19.8133 22.83 19.5409C24.304 16.6043 25.7793 13.6696 27.256 10.7369Z" fill="white"/>
<path d="M17.127 17.3429C18.749 17.3429 20.3713 17.3429 21.994 17.3429C21.612 18.0692 21.2916 18.8261 21.036 19.6059C20.931 20.1465 20.9399 20.703 21.062 21.2399C20.423 22.2299 19.762 23.2119 19.081 24.1789C18.455 24.2229 17.821 24.1789 17.19 24.1989L17.12 24.1389C17.127 21.8709 17.118 19.6049 17.127 17.3429Z" fill="#FFCE56"/>
<path d="M33.415 18.6169L33.552 18.636C34.096 19.2327 34.7521 19.7166 35.483 20.06C36.2133 20.1911 36.9587 20.2157 37.696 20.1329C37.678 21.4849 37.696 22.838 37.687 24.19C35.451 24.21 33.214 24.166 30.981 24.213C31.046 23.892 31.364 23.679 31.457 23.358C32.1237 21.7833 32.7763 20.2029 33.415 18.6169Z" fill="#FFCE56"/>
<path d="M21.959 22.991H22.052C22.5501 23.4918 23.1707 23.8534 23.852 24.04C25.176 24.384 26.497 24.733 27.823 25.069C28.2669 25.1572 28.7209 25.1832 29.172 25.146C30.238 27.698 31.372 30.226 32.472 32.761C32.112 36.309 31.723 39.854 31.39 43.402H31.277C30.3165 41.4672 29.8774 39.3153 30.003 37.159C30.039 36.029 30.193 34.906 30.292 33.781C30.303 33.5516 30.2269 33.3266 30.079 33.151C28.5716 31.061 27.065 28.9703 25.559 26.879C25.428 26.6936 25.2292 26.5672 25.0057 26.5273C24.7822 26.4875 24.552 26.5373 24.365 26.666C22.758 27.866 21.171 29.089 19.54 30.247C14.876 32.047 10.194 33.79 5.53998 35.602C5.61921 35.2029 5.79308 34.8287 6.04696 34.5108C6.30084 34.1928 6.62733 33.9405 6.99898 33.775C10.589 32.089 14.181 30.4063 17.775 28.727C18.0047 28.646 18.2075 28.5031 18.361 28.314C19.5623 26.5446 20.7616 24.7703 21.959 22.991Z" fill="#9DC1E4"/>
<path d="M18.312 43.9949C18.6548 43.8858 19.0233 43.8882 19.3647 44.0018C19.706 44.1154 20.0025 44.3343 20.2115 44.6271C20.4205 44.9199 20.5312 45.2714 20.5277 45.6311C20.5243 45.9908 20.4068 46.3402 20.1922 46.6289C19.9776 46.9176 19.677 47.1308 19.3336 47.2378C18.9901 47.3448 18.6216 47.3401 18.281 47.2244C17.9404 47.1087 17.6453 46.888 17.4381 46.5939C17.2309 46.2998 17.1223 45.9476 17.128 45.5879C17.1336 45.2318 17.251 44.8865 17.4634 44.6007C17.6758 44.3149 17.9727 44.103 18.312 43.9949Z" fill="#6B4F5B"/>
<path d="M46.57 43.9989C46.8032 43.9232 47.0498 43.898 47.2934 43.9251C47.5371 43.9522 47.7721 44.031 47.983 44.1561C48.1938 44.2811 48.3755 44.4497 48.5161 44.6506C48.6566 44.8514 48.7527 45.0799 48.798 45.3208C48.8395 45.5658 48.8271 45.8169 48.7616 46.0565C48.6961 46.2962 48.5791 46.5186 48.4187 46.7084C48.2584 46.8982 48.0586 47.0507 47.8332 47.1554C47.6079 47.26 47.3624 47.3142 47.114 47.3142C46.8656 47.3142 46.6201 47.26 46.3948 47.1554C46.1694 47.0507 45.9696 46.8982 45.8093 46.7084C45.6489 46.5186 45.532 46.2962 45.4664 46.0565C45.4009 45.8169 45.3885 45.5658 45.43 45.3208C45.4851 45.0189 45.6198 44.7372 45.8202 44.5048C46.0206 44.2724 46.2795 44.0977 46.57 43.9989Z" fill="#6B4F5B"/>
</g>
<defs>
<clipPath id="clip0_5358_49676">
<rect width="51.403" height="48.842" fill="white" transform="translate(0 0.199951)"/>
</clipPath>
</defs>
</svg>
`;
const info = `<svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5508_39933)">
<path d="M11.6667 4C5.23833 4 0 9.23833 0 15.6667C0 22.095 5.23833 27.3333 11.6667 27.3333C18.095 27.3333 23.3333 22.095 23.3333 15.6667C23.3333 9.23833 18.095 4 11.6667 4ZM10.7917 11C10.7917 10.5217 11.1883 10.125 11.6667 10.125C12.145 10.125 12.5417 10.5217 12.5417 11V16.8333C12.5417 17.3117 12.145 17.7083 11.6667 17.7083C11.1883 17.7083 10.7917 17.3117 10.7917 16.8333V11ZM12.74 20.7767C12.6817 20.9283 12.6 21.045 12.495 21.1617C12.3783 21.2667 12.25 21.3483 12.11 21.4067C11.97 21.465 11.8183 21.5 11.6667 21.5C11.515 21.5 11.3633 21.465 11.2233 21.4067C11.0833 21.3483 10.955 21.2667 10.8383 21.1617C10.7333 21.045 10.6517 20.9283 10.5933 20.7767C10.5334 20.6365 10.5017 20.4858 10.5 20.3333C10.5 20.1817 10.535 20.03 10.5933 19.89C10.6517 19.75 10.7333 19.6217 10.8383 19.505C10.955 19.4 11.0833 19.3183 11.2233 19.26C11.5074 19.1433 11.826 19.1433 12.11 19.26C12.25 19.3183 12.3783 19.4 12.495 19.505C12.6 19.6217 12.6817 19.75 12.74 19.89C12.7983 20.03 12.8333 20.1817 12.8333 20.3333C12.8333 20.485 12.7983 20.6367 12.74 20.7767Z" fill="#4ADE80"/>
</g>
<defs>
<clipPath id="clip0_5508_39933">
<rect width="23.3333" height="31.3333" fill="white"/>
</clipPath>
</defs>
</svg>
`;
