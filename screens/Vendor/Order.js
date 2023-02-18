import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Animated as A,
  Image,
  TextInput,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Color } from "../../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import { getOrders } from "../../Class/service";
import Button from "../../components/Button";
import DropDown from "../../components/DropDown";
import { SvgXml } from "react-native-svg";
import ActivityLoader from "./../../components/ActivityLoader";
import { createStackNavigator } from "@react-navigation/stack";
import OrderDetails from "./OrderDetails";
import AddServiceList from "./../AddServiceList";
import AcceptOrder from "./AcceptOrder";
import UserProfile from "../UserProfile";
import { socket } from "../../Class/socket";
import IconButton from "../../components/IconButton";
const { width, height } = Dimensions.get("window");
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  waitionIcon,
  processingIcon,
  cancelIcon,
  deliveryIcon,
  refundIcon,
  dueIcon,
  paidIcon,
  completeIcon,
} from "../../assets/icon";
import Animated, { StretchInY } from "react-native-reanimated";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopTabBar from "../Seller/components/TopTabBar";
import OrderTabBar from "./components/OrderTabBar";
import MemberList from "./MemberList";
import NewTab from "./components/NewTab";
import VendorServiceList from "./VendorServiceList";
import SelectDate from "./SelectDate";
import OfflineProfile from "../OfflineProfile";
import Notice from "../UserNotice";
import Note, { AddNote, ViewNote } from "./Note";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";
import { addUserOrder, updateUserOrder } from "../../Reducers/userOrders";
import { addVendorOrder, updateVendorOrder } from "../../Reducers/vendorOrders";
import PackageList from "./PackageList";
import SubscriptionScript from "../services/SubscriptionScript";
import { setOrderListFilter } from "../../Reducers/orderListFilter";
import InstallmentScript from "../services/InstallmentScript";
import { getOfflineMembers } from "../../Class/member";
import VendorOfflineOrderDetails from "./VendorOfflineOrderDetails";
import SubscriptionOfflineScript from "../services/SubscriptionOfflineScript";
import InstallmentOfflineScript from "../services/InstallmentOfflineScript";
import { DataTable } from 'react-native-paper';
const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const Order = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="VendorOrder"
        component={VendorOrder}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VendorOrderDetails"
        component={OrderDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VendorOfflineOrderDetails"
        component={VendorOfflineOrderDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddServiceList"
        component={AddServiceList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AcceptOrder"
        component={AcceptOrder}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UserProfile"
        component={UserProfile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MemberList"
        component={MemberList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OfflineProfile"
        component={OfflineProfile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Note"
        component={Note}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddNote"
        component={AddNote}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ViewNote"
        component={ViewNote}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VendorServiceList"
        component={VendorServiceList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SelectDate"
        component={SelectDate}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PackageList"
        component={PackageList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddServiceList_1"
        component={AddServiceList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SubscriptionScript"
        component={SubscriptionScript}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SubscriptionOfflineScript"
        component={SubscriptionOfflineScript}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="InstallmentScript"
        component={InstallmentScript}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="InstallmentOfflineScript"
        component={InstallmentOfflineScript}
      />
    </Stack.Navigator>
  );
};

const VendorOrder = ({ navigation, route }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const order = useSelector((state) => state.order);
  const [initialState, setInitialState] = React.useState([
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
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
    {
      title: "Subscription",
      value: false,
      type: "SUBS",
    },
    {
      title: "Installment",
      value: false,
      type: "INSTALLMENT",
    },
    
  ]);
  const [initialStateOffline, setInitialStateOffline] = React.useState([
    {
      title: "Fixed",
      value: false,
      type: "ONETIME",
    },
    {
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
    {
      title: "Subscription",
      value: false,
      type: "SUBS",
    },
    {
      title: "Installment",
      value: false,
      type: "INSTALLMENT",
    },
  
  ]);
  const [AllStatus, setAllStatus] = React.useState([
    {
      title: "Waiting For Accept",
      icon: waitionIcon,
    },
    {
      title: "Due",
      icon: dueIcon,
    },
    {
      title: "Paid",
      icon: paidIcon,
    },
    {
      title: "Processing",
      icon: processingIcon,
    },
    {
      title: "Delivered",
      icon: deliveryIcon,
    },
    {
      title: "Completed",
      icon: completeIcon,
    },
    {
      title: "Canceled",
      icon: cancelIcon,
    },
    {
      title: "Refund",
      icon: refundIcon,
    },
  ]);
  const [Refresh, setRefresh] = React.useState(false);
  const [Loader, setLoader] = React.useState(false);
  const [Orders, setOrders] = React.useState(null);
  const user = useSelector((state) => state.user);
  const [Active, setActive] = React.useState("STARTING");
  const vendor = useSelector((state) => state.vendor);
  const reload =
    route.params && route.params.reload ? route.params.reload : null;
  const bottomSheetRef = React.useRef(null);
  const [Change, setChange] = React.useState(false);
  const orderSocket = useSelector((state) => state.orderSocket);
  const dispatch = useDispatch();
  const [Index, setIndex] = React.useState(-1);
  const vendorOrders = useSelector((state) => state.vendorOrders);
  const snapPoints = React.useMemo(() => ["25%", "60%"], []);
  const orderListFilter = useSelector((state) => state.orderListFilter);
  const [offlineOrder,setOfflineOrder]=useState(false)
  const offlineOrders=useSelector(state=>state.offlineOrders)
  const [allOrders,setAllOrders]=useState([0,0,0,0,0])

  // callbacks
  const handleSheetChanges = React.useCallback((index) => {
    //console.log("handleSheetChanges", index);
    setIndex(index);
  }, []);
  //console.log(vendorOrders)
  if (Loader) {
    return <View style={{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    }}><ActivityLoader /></View>;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar />
      {offlineOrder==false&&(
        <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: {
            margin: 0,
            padding: 0,
            width: 120,
            paddingTop: 0,
            paddingBottom: 10,
          },
          tabBarIndicatorStyle: {
            backgroundColor: backgroundColor,
          },
          tabBarScrollEnabled: true,
          tabBarPressColor: "white",
        }}
      >
        {initialState.map((doc, i) => (
          <Tab.Screen
            options={{
              title: `${initialState[i].title}(${
                allOrders[i]
              })`,
            }}
            key={i}
            name={doc.type}
            component={Screens}
            initialParams={{
              setAllOrders:setAllOrders,
              key:i
            }}
          />
        ))}
         
      </Tab.Navigator>
      )}
      {offlineOrder&&(
        <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: {
            margin: 0,
            padding: 0,
            width: 120,
            paddingTop: 0,
            paddingBottom: 10,
          },
          tabBarIndicatorStyle: {
            backgroundColor: backgroundColor,
          },
          tabBarScrollEnabled: true,
          tabBarPressColor: "white",
        }}
      >
         {initialStateOffline.map((doc, i) => (
          <Tab.Screen
            options={{
              title: `${initialStateOffline[i].title}(${
                offlineOrders
                  ? offlineOrders.filter((d) => d.type == initialStateOffline[i].type)
                      .length
                  : "0"
              })`,
            }}
            key={i}
            name={doc.type}
            component={OfflineScreens}
          />
        ))}
      </Tab.Navigator>
      )}
      {offlineOrder==null&&(
        <View style={{
          flex:1,
          justifyContent:"center",
          alignItems:"center"
        }}>
          <ActivityLoader/>
        </View>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          zIndex: 0,
          backgroundColor: primaryColor,
          marginHorizontal: 55,
          borderRadius: 25,
          flexDirection: "row",
          justifyContent: "space-between",
          width: width - 110,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowColor: "black",
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 3,
          paddingHorizontal: 10,
          paddingVertical: 10,
          shadowTopRadius: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            
            navigation.navigate("MemberList",{offline:offlineOrder});
          }} 
          style={styles.view}
        >
          <SvgXml xml={plus} height="20" />
          <Text style={styles.text}>New Order</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          let state=offlineOrder;
          setOfflineOrder(null)
          setTimeout(()=>{
            setOfflineOrder(!state)
          },100)
        }} style={styles.view}>
          <SvgXml xml={re} height="20" />
          <Text style={styles.text}>{offlineOrder?"Offline User":"Dutypedia User"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIndex(1);
          }}
          style={styles.view}
        >
          <SvgXml xml={sort} height="20" />
          <Text style={styles.text}>Sort</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={parseInt(Index)}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetScrollView>
          {AllStatus.map((doc, i) => (
            <IconButton
              onPress={() => {
                if (orderListFilter == doc.title) {
                  dispatch(setOrderListFilter(null));
                  return;
                }
                bottomSheetRef.current.close()
                dispatch(setOrderListFilter(doc.title));
              }}
              style={{
                justifyContent: "flex-start",
                borderWidth: 0,
                marginHorizontal: 10,
                backgroundColor:
                  orderListFilter == doc.title ? "#F2F2F6" : primaryColor,
              }}
              key={i}
              LeftIcon={() => <SvgXml xml={doc.icon} height="24" />}
              title={doc.title}
            />
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Order;
const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: Platform.OS == "ios" ? 11 : 9,
    marginTop: 2,
  },
});

export const OrderCart = ({ data, onPress, onSelect, user, open }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const dispatch = useDispatch();
  const [Open, setOpen] = React.useState(false);
  const orderState = useSelector((state) => state.orderState);
  const type = data.type;
  //console.warn(data.installmentData)

  //console.log(data.service)
  // React.useEffect(() => {
  //   //console.log(orderState)
  //   if (orderState && data && orderState != data.id) {
  //     setOpen(false);
  //   }
  // }, [orderState]);

  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress();
          dispatch({ type: "SET_LIST_SELECTION", playload: [] });
        }
        return;
        setOpen((val) => !val);
        if (onSelect) {
          onSelect(data.id);
        }
      }}
    >
      <View
        style={{
          backgroundColor: open ? "#F2F2F6" : primaryColor,
          paddingHorizontal: 10,
          paddingVertical: 0,
          paddingTop: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 5,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", flex: 1.3 }}
          >
            <View
              style={{
                borderWidth: 1,
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderColor: "#e5e5e5",
              }}
            >
              {data && !user &&data.user&& data.user.profilePhoto ? (
                <Image
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  source={{ uri: data.user.profilePhoto }}
                />
              ) : data && user && data.service && data.service.profilePhoto ? (
                <Image
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  source={{ uri: data.service.profilePhoto }}
                />
              ) : (
                <FontAwesome name="user" size={35} color={assentColor} />
              )}
            </View>
            <View
              style={{
                marginLeft: 10,
                flex: 1,
                marginRight: 20,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: textColor,
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {data
                  ? user
                    ? `${data.service.providerInfo.title}`
                    : data.user.firstName
                  : "Um"}{" "}
                {data
                  ? user
                    ? `${data.service.providerInfo.name}`
                    : data.user.lastName
                  : "Um"}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: textColor,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {"@"}
                {data
                  ? user
                    ? data.service.providerInfo.name.split(" ")[0].toLowerCase()
                    : data.user.username
                  : "Empty position"}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              paddingHorizontal: 10,
            }}
          >
            <Text>Status</Text>
            <Text style={{ color: "#4ADE80", textAlign: "center" }}>
              {data && data.status ? exporters(data.status) : "Unknown"}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <View
              style={{
                alignItems: "center",
                paddingVertical: 10,
                width: "100%",
                justifyContent: "center",
              }}
            >
              {type == "SUBS" ? (
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    color: textColor,
                    fontFamily: "Poppins-Medium",
                    textAlign: "center",
                  }}
                >
                  {data.subsData.subscriptionType}{" "}
                  {data ? data.subsData.amount : "0"}৳
                </Text>
              ):type=="INSTALLMENT"?(
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 14,
                    color: textColor,
                    fontFamily: "Poppins-Medium",
                    textAlign: "center",
                  }}
                >
                  {data.installmentData?.installmentType}{" "}
                  {data ? (data.installmentData?.totalAmount/data.installmentData.installmentCount).toFixed(2) : "0"}৳
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    color: textColor,
                    fontFamily: "Poppins-Medium",
                    textAlign: "center",
                  }}
                >
                  Offer Price {data ? data.offerPrice : "0"}৳
                </Text>
              )}

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: data.paid ? backgroundColor : "red",
                    fontSize: 15,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {data && data.paid && data.status != "REFUNDED"
                    ? "Paid"
                    : data && data.paid && data.status == "REFUNDED"
                    ? "Refunded"
                    : "Due"}
                </Text>
                <View style={{ width: 10 }} />
                {type == "SUBS"||type=="INSTALLMENT" && (
                  <SvgXml xml={notify} height="15" width={"15"} />
                )}
              </View>
              {/* {type=="SUBS"&&(
                <Text numberOfLines={1} style={{
                  color:"#E01A1A",
                  fontSize:14,
                  marginTop:2
                }}>(1 delivery incomplete)</Text>
              )} */}
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "#F1EFEF",
            marginLeft: 60,
            marginTop: 10,
          }}
        />
        {open && (
          <Animated.View entering={StretchInY}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    color: textColor,
                    textAlign: "center",
                  }}
                >
                  Service Name
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    color: textColor,
                    marginLeft: 15,
                    textAlign: "center",
                  }}
                >
                  Status
                </Text>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <View
                style={{ flex: 1, alignItems: "center", paddingHorizontal: 10 }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    color: textColor,
                    fontSize: 14,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {data
                    ? data.service.gigs[0].title
                    : "I will give you a best service"}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ color: "#4ADE80" }}>
                  {data && data.status ? exporters(data.status) : "Unknown"}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <IconButton
                  onPress={() => {
                    if (onPress) {
                      onPress();
                      dispatch({ type: "SET_LIST_SELECTION", playload: [] });
                    }
                  }}
                  Icon={() => (
                    <AntDesign name="right" size={20} color={assentColor} />
                  )}
                  style={{
                    borderWidth: 0,
                    color: "#6366F1",
                    marginTop: -25,
                    backgroundColor: "transparent",
                  }}
                  title={"See More"}
                />
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </Pressable>
  );
};

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="15.069" height="14.313" viewBox="0 0 15.069 14.313">
<path id="Path_19954" data-name="Path 19954" d="M4.449,13.449a8.24,8.24,0,0,1,7.364.606,7.274,7.274,0,0,1,1.894,1.7,6.332,6.332,0,0,1,1.362,3.8v.184a6.279,6.279,0,0,1-.98,3.24,7.185,7.185,0,0,1-2.454,2.345,8.242,8.242,0,0,1-7.168.506A10.731,10.731,0,0,1,2.5,26.65a15.434,15.434,0,0,1-2.2.512.262.262,0,0,1-.295-.2V26.9a.414.414,0,0,1,.114-.213A3.522,3.522,0,0,0,.8,25.4a10.3,10.3,0,0,0,.4-2.1,6.516,6.516,0,0,1-.956-1.975A6.37,6.37,0,0,1,0,19.728v-.179a6.332,6.332,0,0,1,1.376-3.817,7.444,7.444,0,0,1,3.072-2.284m-.635,5.2a1,1,0,1,0,1.1.535,1.007,1.007,0,0,0-1.1-.535m3.531,0a1,1,0,1,0,1.072.509,1.008,1.008,0,0,0-1.072-.509m3.5,0a1,1,0,1,0,1.08.5A1.007,1.007,0,0,0,10.847,18.651Z" transform="translate(0 -12.853)" fill="#546a79"/>
</svg>`;
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
      return "Refunded";
    case "CANCELLED":
      return "Cancelled";
    case "COMPLETED":
      return "Completed";
    default:
      return "Unknown";
  }
};
const plus = `<svg xmlns="http://www.w3.org/2000/svg" width="13.709" height="13.709" viewBox="0 0 13.709 13.709">
<path id="add-line" d="M18.181,11.327h-5.8v-5.8a.527.527,0,0,0-1.055,0v5.8h-5.8A.527.527,0,0,0,5,11.854a.48.48,0,0,0,.527.5h5.8v5.832a.527.527,0,1,0,1.055,0v-5.8h5.8a.527.527,0,1,0,0-1.055Z" transform="translate(-4.999 -5)" fill="#666"/>
</svg>
`;
const re = `<svg xmlns="http://www.w3.org/2000/svg" width="12.261" height="14.034" viewBox="0 0 12.261 14.034">
<g id="Group_10150" data-name="Group 10150" transform="translate(-250.972 -560.019)">
  <path id="Path_20519" data-name="Path 20519" d="M15.1,0h.129a1.538,1.538,0,0,1,.784.479q.985.99,1.976,1.976a1.563,1.563,0,0,1,.562,1.155A1.727,1.727,0,0,1,17.9,4.8c-.684.668-1.346,1.357-2.033,2.022a.808.808,0,0,1-1.032.212c-.436-.346-.294-.967-.321-1.453A5.827,5.827,0,0,0,9.1,7.505c-.163.172-.289.4-.513.505-.311.121-.6-.228-.515-.525a6.961,6.961,0,0,1,6.434-5.97C14.508.975,14.426.18,15.1,0Z" transform="translate(242.912 560.019)" fill="#666"/>
  <path id="Path_20520" data-name="Path 20520" d="M33.58,55.361a2.372,2.372,0,0,1,.558-.555.426.426,0,0,1,.512.543,7,7,0,0,1-1.971,3.929A7.084,7.084,0,0,1,28.22,61.3c0,.539.081,1.332-.587,1.515H27.5a1.528,1.528,0,0,1-.785-.476c-.639-.64-1.277-1.283-1.921-1.919a1.772,1.772,0,0,1-.614-1.045,1.506,1.506,0,0,1,.539-1.25c.718-.709,1.423-1.434,2.148-2.138a.8.8,0,0,1,1.027-.205c.424.352.289.967.319,1.452A5.823,5.823,0,0,0,33.58,55.361Z" transform="translate(228.564 511.238)" fill="#666"/>
</g>
</svg>
`;
const sort = `<svg xmlns="http://www.w3.org/2000/svg" width="9.374" height="12.5" viewBox="0 0 9.374 12.5">
<g id="_000000ff" data-name="#000000ff" transform="translate(-27.984 -15.988)">
  <path id="Path_20480" data-name="Path 20480" d="M29.9,16.284a.553.553,0,0,1,.867,0c.6.613,1.233,1.2,1.808,1.832a.517.517,0,0,1-.638.763,14.5,14.5,0,0,1-1.084-1.034c0,3.356,0,6.713,0,10.069a.532.532,0,1,1-1.039,0q0-5.034,0-10.07a13.67,13.67,0,0,1-1.079,1.031.517.517,0,0,1-.646-.756C28.663,17.486,29.3,16.9,29.9,16.284Z" transform="translate(0 -0.077)" fill="#666"/>
  <path id="Path_20481" data-name="Path 20481" d="M65.808,16.644a.533.533,0,1,1,1.041-.016q0,5.04,0,10.079c.344-.323.648-.687,1.011-.988a.514.514,0,0,1,.793.3c.091.325-.194.552-.392.756-.535.512-1.037,1.056-1.576,1.561a.531.531,0,0,1-.782-.061c-.6-.618-1.237-1.207-1.82-1.842a.517.517,0,0,1,.637-.763A13.324,13.324,0,0,1,65.805,26.7Q65.813,21.673,65.808,16.644Z" transform="translate(-31.313)" fill="#666"/>
</g>
</svg>
`;
export const Screens = ({ navigation, route }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const Order = useSelector((state) => state.orders);
  //const setRefresh=route.params.setRefresh;
  const [NewOrders, setNewOrders] = React.useState();
  const [Index, setIndex] = React.useState(-1);
  const [AllStatus, setAllStatus] = React.useState([
    {
      title: "Waiting For Accept",
      icon: waitionIcon,
    },
    {
      title: "Due",
      icon: dueIcon,
    },
    {
      title: "Paid",
      icon: paidIcon,
    },
    {
      title: "Processing",
      icon: processingIcon,
    },
    {
      title: "Delivered",
      icon: deliveryIcon,
    },
    {
      title: "Order Completed",
      icon: completeIcon,
    },
    {
      title: "Order Canceled",
      icon: cancelIcon,
    },
    {
      title: "Refund",
      icon: refundIcon,
    },
  ]);
  const [refreshing, setRefreshing] = React.useState(false);
  const bottomSheetRef = React.useRef(null);
  const scrollY = new A.Value(0);
  const diffClamp = A.diffClamp(scrollY, 0, 300);
  const [Search, setSearch] = React.useState();
  const [Filter, setFilter] = React.useState();
  const orderSocket = useSelector((state) => state.orderSocket);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
  const [Refresh, setRefresh] = React.useState(false);
  const [Loader, setLoader] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const dispatch = useDispatch();
  const [AllOrders, setAllOrders] = React.useState();
  const vendorOrders = useSelector((state) => state.vendorOrders);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const [Open, setOpen] = React.useState();
  const isFocused = useIsFocused();
  const orderListFilter = useSelector((state) => state.orderListFilter);
  const setOrder=route.params.setAllOrders;
  const key=route.params.key;
  const [total,setTotal]=useState(0)
  const [page,setPage]=useState(0)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    //dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Home" });
    wait(1000).then(() => setRefreshing(false));
  }, []);
  React.useEffect(() => {
    if (user&&vendor) {
      setLoader(true)
      getOrders(user.token,"vendor",vendor.service.id,route.name,(20*page)).then(res=>{
        setAllOrders(res.data.orders);
        setNewOrders(res.data.orders);
        //console.log(res.data.orders)
        setOrder(val=>{
          return val.map((doc,i)=>{
             if(i==key){
               return res.data.total;
             }else{
               return doc
             }
           })
         })
         setLoader(false)
         if(isFocused){
          setTotal(res.data.total) 
         }
      }).catch(err=>{
        setLoader(false)
        console.error(err.response.data.msg)
      })
      
    }
    
  }, [isFocused,Refresh,page]);
  React.useEffect(()=>{
    socket.on("updateOrder", (e) => {
      e=e.order;
      setRefresh(val=>(!val))
    });
    socket.on("newOrder", (e) => {
      e=e.order;
      setRefresh(val=>(!val))
    });
  },[])

  React.useEffect(() => {
    if (AllOrders) {
      switch (orderListFilter) {
        case "Waiting For Accept":
          let text = orderListFilter;
          text = text.split(" ").join("_");
          let arr = AllOrders.filter((d) =>
            d.status.toUpperCase().match(text.toUpperCase())
          );
          setNewOrders(arr);
          break;

        case "Due":
          let dues = AllOrders.filter((d) => d.paid == false);
          setNewOrders(dues);
          break;
        case "Paid":
          let paid = AllOrders.filter((d) => d.paid == true);
          setNewOrders(paid);
          break;
        case "Processing":
          let processing = AllOrders.filter((d) =>
            d.status.toUpperCase().match("PROCESSING")
          );
          setNewOrders(processing);
          break;
        case "Delivered":
          let delivered = AllOrders.filter((d) => d.delivered == true);
          setNewOrders(delivered);
          break;

        case "Completed":
          let completed = AllOrders.filter((d) => d.status == "COMPLETED");
          setNewOrders(completed);
          break;
        case "Canceled":
          let cancel = AllOrders.filter((d) => d.status == "CANCELLED");
          setNewOrders(cancel);
          break;
        case "Refund":
          let refund = AllOrders.filter((d) => d.status == "REFUNDED");
          setNewOrders(refund);
          break;
        default:
          setNewOrders(AllOrders);
      }
    }
  }, [orderListFilter]);
  React.useEffect(() => {
    if (AllOrders) {
      if (!Search) {
        setNewOrders(AllOrders);
      } else {
        let text = Search;
        text = text.split(" ").join("_");
        let arr = AllOrders.filter((d) =>
          d.status.toUpperCase().match(text.toUpperCase())
        );
        setNewOrders(arr);
      }
    }
  }, [Search]);

  const snapPoints = React.useMemo(() => ["25%", "60%"], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index) => {
    //console.log("handleSheetChanges", index);
    setIndex(index);
  }, []);

  if (!AllOrders) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color={backgroundColor} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flexGrow: 1 }}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        stickyHeaderHiddenOnScroll={true}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={() => {
        //       //setPageChange(true);
        //       onRefresh();
        //     }}
        //   />
        // }
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
          //scroll;
        }}
      >
        <A.View
          style={[
            {
              transform: [{ translateY: translateY }],
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: secondaryColor,
              zIndex: 500,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              marginVertical: 0,
              justifyContent: "space-between",
              marginBottom: 15,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                paddingHorizontal: 15,
                paddingVertical: 8,
                flex: 2,
                borderRadius: 20,
                justifyContent: "flex-start",
              }}
            >
              <AntDesign
                style={{ marginRight: 10 }}
                name="search1"
                size={24}
                color={assentColor}
              />
              <TextInput
                value={Search}
                onChangeText={(e) => {
                  setSearch(e);
                }}
                placeholderTextColor={assentColor}
                placeholder="Search Now"
                returnKeyType="search"
              />
            </View>
            {/* <DropDown
            value={Filter}
            onChange={(e) => {
              setFilter(e);
            }}
            style={{
              marginLeft: 15,
            }}
            DATA={[
              "Waiting for accept",
              "Accepted",
              "Canceled",
              "Refounded",
              "Processing",
              "Delivered",
              "Completed",
              "Waiting for payment",
            ]}
            placeholder={"Select"}
          /> */}
          </View>
        </A.View>
        {Loader && <ActivityLoader />}
        {NewOrders &&
          NewOrders.map((doc, i) => (
            <OrderCart
              onSelect={(e) => {
                //console.log(e)
                //dispatch({ type: "ORDER_STATE", playload: e });
                //dispatch({ type: "ORDER_STATE", playload: e });
                setOpen((val) => {
                  if (val != e) {
                    return e;
                  } else {
                    return null;
                  }
                });
              }}
              onPress={() => {
                if (doc.type == "SUBS" && doc.status != "WAITING_FOR_ACCEPT") {
                  navigation.navigate("SubscriptionScript", { data: doc });
                  return;
                }
                if (doc.type == "INSTALLMENT" && doc.status != "WAITING_FOR_ACCEPT") {
                  navigation.navigate("InstallmentScript", { data: doc });
                  return;
                }
                navigation.navigate("VendorOrderDetails", {
                  data: doc,
                });
              }}
              key={i}
              data={doc}
              open={Open == doc.id ? true : false}
            />
          ))}

        {NewOrders && NewOrders.length == 0 && !Loader && (
          <Text style={{ color: textColor, textAlign: "center" }}>
            No data available
          </Text>
        )}
        <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil( total/ 20)}
        onPageChange={page => setPage(page)}
        label={`${parseInt(total/20)+1} of ${page+1}`}
        // showFastPaginationControls
        // numberOfItemsPerPageList={numberOfItemsPerPageList}
        // numberOfItemsPerPage={numberOfItemsPerPage}
        // onItemsPerPageChange={onItemsPerPageChange}
        selectPageDropdownLabel={'Rows per page'}
      />
        <View style={{ height: 70 }} />
      </ScrollView>
      
    </View>
  );
};
const notify = `<svg xmlns="http://www.w3.org/2000/svg" width="10.924" height="11.104" viewBox="0 0 10.924 11.104">
<g id="_8023573" data-name="8023573" transform="translate(-16.046 -16.182)">
  <g id="_011839ff" data-name="#011839ff" transform="translate(16.046 16.182)">
    <path id="Path_28021" data-name="Path 28021" d="M19.963,16.211a1.273,1.273,0,0,1,1.19.366.6.6,0,0,1,.194.326.364.364,0,0,1-.666.237.543.543,0,0,0-.945.526,2.035,2.035,0,0,1,.658-.028.366.366,0,0,1-.046.724,2.468,2.468,0,0,0-1.617.543,2.352,2.352,0,0,0-.862,1.732c-.006.38,0,.759,0,1.139a5.818,5.818,0,0,1-.777,2.777h6.3a5.52,5.52,0,0,1-.475-1.055.366.366,0,0,1,.218-.444.37.37,0,0,1,.481.241,5.069,5.069,0,0,0,.738,1.4.367.367,0,0,1-.021.466.372.372,0,0,1-.29.12h-1.8a2,2,0,0,1-4.007,0h-1.8a.366.366,0,0,1-.3-.6,5.072,5.072,0,0,0,.956-2.312,11.87,11.87,0,0,0,.052-1.595,3.084,3.084,0,0,1,1.9-2.9,1.272,1.272,0,0,1,.928-1.667m-.986,9.072a1.279,1.279,0,0,0,2.531,0Z" transform="translate(-16.046 -16.182)" fill="#011839"/>
  </g>
  <g id="_7738c8ff" data-name="#7738c8ff" transform="translate(21.144 16.542)">
    <path id="Path_28022" data-name="Path 28022" d="M242.612,32.025a2.916,2.916,0,1,1-.986.286,2.914,2.914,0,0,1,.986-.286m.059,1.511c-.125.051-.252.1-.376.152a.367.367,0,0,0-.179.465.374.374,0,0,0,.437.214q0,.642,0,1.283a.536.536,0,0,0-.242.033.364.364,0,0,0,.15.7h.887a.365.365,0,0,0,.174-.7.541.541,0,0,0-.241-.033q0-.854,0-1.708a.646.646,0,0,0-.026-.245.364.364,0,0,0-.338-.232A.652.652,0,0,0,242.671,33.536Z" transform="translate(-240.004 -32.009)" fill="#333"/>
  </g>
</g>
</svg>
`;
export const OfflineScreens = ({ navigation, route }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const Order = useSelector((state) => state.orders);
  //const setRefresh=route.params.setRefresh;
  const [NewOrders, setNewOrders] = React.useState();
  const [Index, setIndex] = React.useState(-1);
  const [AllStatus, setAllStatus] = React.useState([
    {
      title: "Waiting For Accept",
      icon: waitionIcon,
    },
    {
      title: "Due",
      icon: dueIcon,
    },
    {
      title: "Paid",
      icon: paidIcon,
    },
    {
      title: "Processing",
      icon: processingIcon,
    },
    {
      title: "Delivered",
      icon: deliveryIcon,
    },
    {
      title: "Order Completed",
      icon: completeIcon,
    },
    {
      title: "Order Canceled",
      icon: cancelIcon,
    },
    {
      title: "Refund",
      icon: refundIcon,
    },
  ]);
  const [refreshing, setRefreshing] = React.useState(false);
  const bottomSheetRef = React.useRef(null);
  const scrollY = new A.Value(0);
  const diffClamp = A.diffClamp(scrollY, 0, 300);
  const [Search, setSearch] = React.useState();
  const [Filter, setFilter] = React.useState();
  const orderSocket = useSelector((state) => state.orderSocket);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
  const [Refresh, setRefresh] = React.useState(false);
  const [Loader, setLoader] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const dispatch = useDispatch();
  const [AllOrders, setAllOrders] = React.useState();
  const vendorOrders = useSelector((state) => state.offlineOrders);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const [Open, setOpen] = React.useState();
  const isFocused = useIsFocused();
  const orderListFilter = useSelector((state) => state.orderListFilter);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    //dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Home" });
    wait(1000).then(() => setRefreshing(false));
  }, []);
  React.useEffect(() => {
    if (vendorOrders) {
      let arr = vendorOrders.filter((d) => d.type == route.name);
      setAllOrders(arr);
      setNewOrders(arr);
    }
  }, [route.name, isFocused , vendorOrders , Refresh]);

  React.useEffect(() => {
    socket.on("updateOrder", (e) => {
      e = e.order;
      setTimeout(() => {
        setRefresh((val) => !val);
      }, 100);
    });
  }, []);

  React.useEffect(() => {
    if (AllOrders) {
      switch (orderListFilter) {
        case "Waiting For Accept":
          let text = orderListFilter;
          text = text.split(" ").join("_");
          let arr = AllOrders.filter((d) =>
            d.status.toUpperCase().match(text.toUpperCase())
          );
          setNewOrders(arr);
          break;

        case "Due":
          let dues = AllOrders.filter((d) => d.paid == false);
          setNewOrders(dues);
          break;
        case "Paid":
          let paid = AllOrders.filter((d) => d.paid == true);
          setNewOrders(paid);
          break;
        case "Processing":
          let processing = AllOrders.filter((d) =>
            d.status.toUpperCase().match("PROCESSING")
          );
          setNewOrders(processing);
          break;
        case "Delivered":
          let delivered = AllOrders.filter((d) => d.delivered == true);
          setNewOrders(delivered);
          break;

        case "Completed":
          let completed = AllOrders.filter((d) => d.status == "COMPLETED");
          setNewOrders(completed);
          break;
        case "Canceled":
          let cancel = AllOrders.filter((d) => d.status == "CANCELLED");
          setNewOrders(cancel);
          break;
        case "Refund":
          let refund = AllOrders.filter((d) => d.status == "REFUNDED");
          setNewOrders(refund);
          break;
        default:
          setNewOrders(AllOrders);
      }
    }
  }, [orderListFilter]);
  React.useEffect(() => {
    if (AllOrders) {
      if (!Search) {
        setNewOrders(AllOrders);
      } else {
        let text = Search;
        text = text.split(" ").join("_");
        let arr = AllOrders.filter((d) =>
          d.status.toUpperCase().match(text.toUpperCase())
        );
        setNewOrders(arr);
      }
    }
  }, [Search]);

  const snapPoints = React.useMemo(() => ["25%", "60%"], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index) => {
    //console.log("handleSheetChanges", index);
    setIndex(index);
  }, []);

  if (!vendorOrders) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color={backgroundColor} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flexGrow: 1 }}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        stickyHeaderHiddenOnScroll={true}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={() => {
        //       //setPageChange(true);
        //       onRefresh();
        //     }}
        //   />
        // }
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
          //scroll;
        }}
      >
        <A.View
          style={[
            {
              transform: [{ translateY: translateY }],
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: secondaryColor,
              zIndex: 500,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              marginVertical: 0,
              justifyContent: "space-between",
              marginBottom: 15,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                paddingHorizontal: 15,
                paddingVertical: 8,
                flex: 2,
                borderRadius: 20,
                justifyContent: "flex-start",
              }}
            >
              <AntDesign
                style={{ marginRight: 10 }}
                name="search1"
                size={24}
                color={assentColor}
              />
              <TextInput
                value={Search}
                onChangeText={(e) => {
                  setSearch(e);
                }}
                placeholderTextColor={assentColor}
                placeholder="Search Now"
                returnKeyType="search"
              />
            </View>
            {/* <DropDown
            value={Filter}
            onChange={(e) => {
              setFilter(e);
            }}
            style={{
              marginLeft: 15,
            }}
            DATA={[
              "Waiting for accept",
              "Accepted",
              "Canceled",
              "Refounded",
              "Processing",
              "Delivered",
              "Completed",
              "Waiting for payment",
            ]}
            placeholder={"Select"}
          /> */}
          </View>
        </A.View>
        {NewOrders &&
          NewOrders.map((doc, i) => (
            <OrderCartOffline
              onSelect={(e) => {
                //console.log(e)
                //dispatch({ type: "ORDER_STATE", playload: e });
                //dispatch({ type: "ORDER_STATE", playload: e });
                setOpen((val) => {
                  if (val != e) {
                    return e;
                  } else {
                    return null;
                  }
                });
              }}
              onPress={(userInfo) => {
                
                if (doc.type == "SUBS" && doc.status != "WAITING_FOR_ACCEPT") {
                  navigation.navigate("SubscriptionOfflineScript", { data: doc,userInfo:userInfo });
                  return;
                }
                if (doc.type == "INSTALLMENT" && doc.status != "WAITING_FOR_ACCEPT") {
                  navigation.navigate("InstallmentOfflineScript", { data: doc,userInfo:userInfo });
                  return;
                }
                navigation.navigate("VendorOfflineOrderDetails", {
                  data: doc,
                  userInfo:userInfo
                });
              }}
              key={i}
              data={doc}
              open={Open == doc.id ? true : false}
              user={true}
            />
          ))}

        {NewOrders && NewOrders.length == 0 && !Loader && (
          <Text style={{ color: textColor, textAlign: "center" }}>
            No data available
          </Text>
        )}
        <View style={{ height: 70 }} />
      </ScrollView>
    </View>
  );
};
export const OrderCartOffline = ({ data, onPress, onSelect, user, open }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const dispatch = useDispatch();
  const [Open, setOpen] = React.useState(false);
  const orderState = useSelector((state) => state.orderState);
  const type = data.type;
  const [userInfo,setUserInfo]=useState()
  const newUser=useSelector(state=>state.user)
  const vendor=useSelector(state=>state.vendor)
  //console.warn(data.installmentData)

  //console.log(data.service)
  // React.useEffect(() => {
  //   //console.log(orderState)
  //   if (orderState && data && orderState != data.id) {
  //     setOpen(false);
  //   }
  // }, [orderState]);
  useEffect(()=>{
    (async()=>{
      const res=await getOfflineMembers(newUser.token,vendor.service.id)
      setUserInfo(res?res.members.filter(d=>d.id==data.offlineMemberId)[0]:null)
    })()
  },[data.offlineMemberId])

  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress(userInfo);
          dispatch({ type: "SET_LIST_SELECTION", playload: [] });
        }
        return;
        setOpen((val) => !val);
        if (onSelect) {
          onSelect(data.id);
        }
      }}
    >
      <View
        style={{
          backgroundColor: open ? "#F2F2F6" : primaryColor,
          paddingHorizontal: 10,
          paddingVertical: 0,
          paddingTop: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 5,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", flex: 1.3 }}
          >
            <View
              style={{
                borderWidth: 1,
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderColor: "#e5e5e5",
              }}
            >
              {data&& data.profilePhoto ? (
                <Image
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  source={{ uri: data.profilePhoto }}
                />
              ) : (
                <FontAwesome name="user" size={35} color={assentColor} />
              )}
            </View>
            <View
              style={{
                marginLeft: 10,
                flex: 1,
                marginRight: 20,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: textColor,
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {userInfo?userInfo.name:'....'}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: textColor,
                  fontFamily: "Poppins-Medium",
                }}
              >
                
                {userInfo?userInfo.gender:'....'}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              paddingHorizontal: 10,
            }}
          >
            <Text>Status</Text>
            <Text style={{ color: "#4ADE80", textAlign: "center" }}>
              {data && data.status ? exporters(data.status) : "Unknown"}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <View
              style={{
                alignItems: "center",
                paddingVertical: 10,
                width: "100%",
                justifyContent: "center",
              }}
            >
              {type == "SUBS" ? (
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    color: textColor,
                    fontFamily: "Poppins-Medium",
                    textAlign: "center",
                  }}
                >
                  {data.subsData.subscriptionType}{" "}
                  {data ? data.subsData.amount : "0"}৳
                </Text>
              ):type=="INSTALLMENT"?(
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 14,
                    color: textColor,
                    fontFamily: "Poppins-Medium",
                    textAlign: "center",
                  }}
                >
                  {data.installmentData?.installmentType}{" "}
                  {data ? (data.installmentData?.totalAmount/data.installmentData.installmentCount).toFixed(2) : "0"}৳
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    color: textColor,
                    fontFamily: "Poppins-Medium",
                    textAlign: "center",
                  }}
                >
                  Price {data ? data.amount : "0"}৳
                </Text>
              )}

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: data.paid ? backgroundColor : "red",
                    fontSize: 15,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {data && data.paid && data.status != "REFUNDED"
                    ? "Paid"
                    : data && data.paid && data.status == "REFUNDED"
                    ? "Refunded"
                    : "Due"}
                </Text>
                <View style={{ width: 10 }} />
                {type == "SUBS"||type=="INSTALLMENT" && (
                  <SvgXml xml={notify} height="15" width={"15"} />
                )}
              </View>
              {/* {type=="SUBS"&&(
                <Text numberOfLines={1} style={{
                  color:"#E01A1A",
                  fontSize:14,
                  marginTop:2
                }}>(1 delivery incomplete)</Text>
              )} */}
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "#F1EFEF",
            marginLeft: 60,
            marginTop: 10,
          }}
        />
        {open && (
          <Animated.View entering={StretchInY}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    color: textColor,
                    textAlign: "center",
                  }}
                >
                  Service Name
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    color: textColor,
                    marginLeft: 15,
                    textAlign: "center",
                  }}
                >
                  Status
                </Text>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <View
                style={{ flex: 1, alignItems: "center", paddingHorizontal: 10 }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    color: textColor,
                    fontSize: 14,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {data
                    ? data.service.gigs[0].title
                    : "I will give you a best service"}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ color: "#4ADE80" }}>
                  {data && data.status ? exporters(data.status) : "Unknown"}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <IconButton
                  onPress={() => {
                    if (onPress) {
                      onPress();
                      dispatch({ type: "SET_LIST_SELECTION", playload: [] });
                    }
                  }}
                  Icon={() => (
                    <AntDesign name="right" size={20} color={assentColor} />
                  )}
                  style={{
                    borderWidth: 0,
                    color: "#6366F1",
                    marginTop: -25,
                    backgroundColor: "transparent",
                  }}
                  title={"See More"}
                />
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </Pressable>
  );
};