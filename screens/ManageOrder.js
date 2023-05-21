import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Animated,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Color } from "../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import { getOrders } from "../Class/service";
import Button from "./../components/Button";
import DropDown from "./../components/DropDown";
import { SvgXml } from "react-native-svg";
import ActivityLoader from "./../components/ActivityLoader";
import { getOnlineUsers, socket } from "../Class/socket";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NewTab from "./Vendor/components/NewTab";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import IconButton from "../components/IconButton";
import {
  waitionIcon,
  processingIcon,
  cancelIcon,
  deliveryIcon,
  refundIcon,
  dueIcon,
  paidIcon,
  completeIcon,
} from "../assets/icon";
import { OrderCart } from "./Vendor/Order";
import { useIsFocused } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native-paper";
import { DataTable } from "react-native-paper";
import customStyle from "../assets/stylesheet";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import UserOrderHeader from "../Hooks/UserOrderHeader";
import { setOrderRef } from "../Reducers/orderRef";
import { setHideBottomBar } from "../Reducers/hideBottomBar";
const {width,height}=Dimensions.get("window")
//import { Screens } from "./Vendor/Order";
const Tab = createMaterialTopTabNavigator();

const ManageOrder = ({ navigation, route }) => {
  const isFocused = useIsFocused();
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
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
    // {
    //   title: "Subscription",
    //   value: false,
    //   type: "SUBS",
    // },
    // {
    //   title: "Installment",
    //   value: false,
    //   type: "INSTALLMENT",
    // },
  ];
  const userOrders = useSelector((state) => state.userOrders);
  const type = route.params && route.params.type ? route.params.type : null;
  const [allOrders, setAllOrders] = useState([0, 0, 0, 0, 0]);
  //console.log(type)
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const orderRef = useSelector((state) => state.orderRef);

  return (
    <View
      style={{
        flex: 1,
       
      }}>
      <View
        style={{
          height: inset?.top,
        }}
      />
     <StatusBar backgroundColor="white"/>
      <UserOrderHeader
        onFilter={() => {
          dispatch(setOrderRef(orderRef ? false : true));
        }}
        onSearch={() => {
          navigation.navigate("SearchOrder");
        }}
        allOrders={allOrders}
        navigation={navigation}
      />
      <Tab.Navigator
        initialRouteName={type}
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#767676",
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: "#ffffff",
            
          },
          tabBarScrollEnabled: true,
        }}>
        {initialState.map((doc, i) => (
          <Tab.Screen
            options={{
              tabBarLabel: ({ focused, color }) => (
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 16,
                    
                    color: focused ? "#000000" : "#A3A3A3",
                  }}>
                  {`${initialState[i].title} `}
                  <Text
                    style={{
                      fontSize: 12,
                    }}>
                    {allOrders[i]}
                  </Text>
                </Text>
              ),
            }}
            key={i}
            name={doc.type}
            component={Screens}
            initialParams={{
              setAllOrders: setAllOrders,
              key: i,
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export default ManageOrder;
const Screens = ({ navigation, route }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 300);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
  const setOrder = route.params.setAllOrders;
  const key = route.params.key;
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const [Loader, setLoader] = React.useState(false);
  const [Orders, setOrders] = React.useState(null);
  const reload =
    route.params && route.params.reload ? route.params.reload : null;

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    //dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Home" });
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const [Active, setActive] = React.useState("STARTING");
  const [Search, setSearch] = React.useState();
  const [Filter, setFilter] = React.useState();
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
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [AllOrders, setAllOrders] = React.useState();
  const isFocused = useIsFocused();
  const [Open, setOpen] = React.useState();
  const orderRef = useSelector((state) => state.orderRef);

  const bottomSheetRef = React.useRef(null);

  const snapPoints = React.useMemo(() => ["25%", "60%"], []);
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(false));
      setTimeout(() => {
        dispatch(setHideBottomBar(false));
      }, 50);
    } else {
      //console.log("seen")
      //dispatch(setHideBottomBar(true));
    }
  }, [isFocused]);
  // callbacks
  const handleSheetChanges = React.useCallback((index) => {
    //console.log("handleSheetChanges", index);
    setIndex(index);
    if (index < 0) {
      dispatch(setOrderRef(false));
    }
  }, []);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const to = Math.min((parseInt(total / 20) + 1) * 20, 2);

  React.useEffect(() => {
    if (user) {
      //setLoader(true);
      getOrders(user.token, "user", null, route.name, 20 * page)
        .then((res) => {
          setAllOrders(res.data.orders);
          setOrders(res.data.orders);

          //console.log(res.data.orders)
          setOrder((val) => {
            return val.map((doc, i) => {
              if (i == key) {
                return res.data.total;
              } else {
                return doc;
              }
            });
          });
         // setLoader(false);
          //console.log(res.data.total)
          setTotal(res.data.total);
        })
        .catch((err) => {
         // setLoader(false);
          console.error(err.response.data.msg);
        });
    }
  }, [ Refresh]);
  React.useEffect(() => {
    socket.on("updateOrder", (e) => {
      //e = e?.order;
      setRefresh((val) => !val);
    });
    socket.on("getOrder", (e) => {
     // e = e?.order;
      setRefresh((val) => !val);
    });
    return () => {
      socket?.off("updateOrder");
      socket?.off("getOrder");
    };
  }, []);

  React.useEffect(() => {
    if (AllOrders) {
      if (!Filter) {
        setOrders(AllOrders);
      } else {
        let text = Filter;
        text = text.split(" ").join("_");
        let arr = AllOrders.filter((d) =>
          d.status.toUpperCase().match(text.toUpperCase())
        );
        setOrders(arr);
      }
    }
  }, [Filter]);
  React.useEffect(() => {
    if (AllOrders) {
      if (!Search) {
        setOrders(AllOrders);
      } else {
        let text = Search;
        text = text.split(" ").join("_");
        let arr = AllOrders.filter((d) =>
          d.status.toUpperCase().match(text.toUpperCase())
        );
        setOrders(arr);
      }
    }
  }, [Search]);
  useEffect(() => {
    if (orderRef) {
      setIndex(1);
    } else {
      bottomSheetRef?.current?.close();
    }
  }, [orderRef]);
  const renderItem = useCallback(
    ({ item }) => (
      <OrderCart
        onSelect={(e) => {
          setOpen((val) => {
            if (e == val) {
              return null;
            } else {
              return e;
            }
          });
          //console.log(e)
          //dispatch({ type: "ORDER_STATE", playload: e });
          //dispatch({ type: "ORDER_STATE", playload: e });
        }}
        onPress={() => {
          //console.log(doc.subsOrders)
          if (item.type == "SUBS" && item.status != "WAITING_FOR_ACCEPT") {
            navigation.navigate("SubscriptionScript", { data: item });
            return;
          }
          if (
            item.type == "INSTALLMENT" &&
            item.status != "WAITING_FOR_ACCEPT"
          ) {
            navigation.navigate("InstallmentScript", { data: item });
            return;
          }
          navigation.navigate("OrderDetails", {
            data: item,
            orderId:item?.id,
            type:item?.type
          });
        }}
        key={item.id}
        data={item}
        user={true}
      />
    ),
    []
  );
  const loadData = async () => {
    setLoader(true);
    const { data } = await getOrders(
      user.token,
      "user",
      null,
      route.name,
      Orders?.length
    );
    setLoader(false);
    if (AllOrders && Orders && data.orders.length > 0) {
      setAllOrders((d) => [...d, ...data.orders]);
      setOrders((d) => [...d, ...data.orders]);
    }
  };
  if (!AllOrders) {
    return (
      <View style={customStyle.fullBox}>
        <ActivityIndicator size="small" color={backgroundColor} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingVertical: 8 }}>
      {Orders && Orders.length > 0 && (
        <FlatList onRefresh={onRefresh}
         refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          data={Orders}
          keyExtractor={(item, i) => i}
          renderItem={renderItem}
          onEndReached={() => {
            //setPage((d) => d + 1);
            loadData();
            //console.log("ds");
          }}
        />
      )}
      {Orders && Orders.length == 0 && (
        <View style={customStyle.fullBox}>
          <SvgXml xml={noOrder} />
          <Text
            style={{
              fontSize: 24,
              marginTop: 24,
            }}>
            No Order Found
          </Text>
        </View>
      )}
      {Loader && (
        <View style={[customStyle.fullBox, { marginBottom: 20 }]}>
          <ActivityIndicator size="small" color={backgroundColor} />
        </View>
      )}
      {Index != -1 && (
        <View
          style={{
            backgroundColor: "#00000010",
            position: "absolute",
            width: width,
            height: height,
            top: 0,
          }}
        />
      )}
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={parseInt(Index)}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView>
          {AllStatus.map((doc, i) => (
            <IconButton
              onPress={() => {
                if (Filter == doc.title) {
                  setFilter(null);
                  return;
                }
                setFilter(doc.title);
              }}
              style={{
                justifyContent: "flex-start",
                borderWidth: 0,
                marginHorizontal: 10,
                backgroundColor: Filter == doc.title ? "#F2F2F6" : primaryColor,
              }}
              key={i}
              LeftIcon={() => <SvgXml xml={doc.icon} height="24" />}
              title={doc.title}
            />
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
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

const noOrder = `<svg width="101" height="100" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4162_49687)">
<path d="M44.6175 0H56.4674C61.0151 0.119415 65.548 0.565964 70.0302 1.33611C73.7198 1.95708 77.3324 2.96341 80.8074 4.33819C84.1538 5.76836 87.2346 7.74238 89.9223 10.1785C91.6823 11.7115 93.2206 13.4769 94.4938 15.425C96.0841 17.943 97.3267 20.6601 98.1884 23.5042C99.0962 26.0716 99.7418 28.7226 100.115 31.4174C100.647 35.1479 100.832 38.9125 100.998 42.6722V57.1625C100.893 61.4674 100.514 65.7616 99.8641 70.0194C99.3545 72.6221 98.6429 75.1819 97.7356 77.6764C96.4499 81.6615 94.2772 85.3107 91.3776 88.3556C88.6931 91.0814 85.5596 93.3357 82.1111 95.0222C78.874 96.4989 75.466 97.5773 71.9635 98.2333C67.2201 99.2069 62.3994 99.7665 57.5569 99.9056C54.4681 100.062 51.3687 99.9486 48.2743 99.9972C43.0612 100.036 37.853 99.6735 32.6967 98.9132C26.9704 97.9208 21.141 96.6021 16.1574 93.5021C12.09 90.9396 8.36513 87.6479 5.94882 83.4715C4.06322 80.2819 2.9358 76.7354 1.90876 73.2028C1.31748 70.9093 0.90906 68.5734 0.687266 66.2167C0.138296 60.9028 0.0161462 55.5472 0 50.2083C0.00561606 45.5049 0.0968771 40.7972 0.471749 36.1069C0.675641 32.6886 1.24032 29.3008 2.15657 25.9986C2.89359 23.3123 3.86604 20.6948 5.06288 18.1757C6.36626 15.5222 8.12782 13.114 10.2683 11.0597C12.9187 8.48611 15.9803 6.3629 19.3298 4.77569C22.643 3.31873 26.1218 2.26226 29.6907 1.62917C34.6092 0.659254 39.6036 0.114146 44.6175 0ZM47.8615 21.1236C44.7997 21.6852 41.9972 23.1938 39.8576 25.4319C37.7181 27.6701 36.352 30.5224 35.9561 33.5778C35.8367 34.8816 35.7971 36.1914 35.8375 37.5C32.9368 37.5139 30.034 37.4806 27.1326 37.5174C26.0825 37.5898 25.098 38.0495 24.3741 38.8055C23.6501 39.5615 23.2394 40.5588 23.2231 41.6C23.2194 51.0444 23.2213 60.4903 23.2287 69.9375C23.324 72.3308 24.3278 74.6006 26.0398 76.2942C27.7519 77.9878 30.0464 78.9808 32.4658 79.075C44.5188 79.0866 56.5725 79.0866 68.6269 79.075C70.5436 79.0345 72.4031 78.4212 73.9609 77.3158C75.5187 76.2103 76.7019 74.6644 77.355 72.8813C78.0261 71.1215 77.8562 69.2167 77.8766 67.3764C77.8728 58.7778 77.8709 50.1785 77.8709 41.5785C77.8381 40.5087 77.3941 39.4917 76.6294 38.7345C75.8648 37.9773 74.8371 37.5371 73.7558 37.5035C70.9239 37.4917 68.0927 37.5035 65.2615 37.4979C65.3268 35.9392 65.2473 34.3777 65.0242 32.8333C64.6796 30.9474 63.9615 29.1474 62.9113 27.5369C61.8611 25.9264 60.4994 24.5371 58.9046 23.4489C57.3098 22.3607 55.5133 21.5951 53.6184 21.1961C51.7235 20.797 49.7675 20.7724 47.8629 21.1236H47.8615Z" fill="#4ADE80"/>
<path d="M45.7344 26.2021C47.1339 25.4871 48.6782 25.0929 50.2528 25.0488C51.8273 25.0047 53.3917 25.3118 54.8299 25.9473C56.2681 26.5827 57.5433 27.5303 58.5609 28.7197C59.5785 29.9091 60.3124 31.3098 60.7082 32.818C61.0332 34.3565 61.1494 35.9311 61.0536 37.5C54.0494 37.5037 47.0462 37.5037 40.0439 37.5C39.9598 36.0055 40.0566 34.5064 40.3324 33.0347C40.6829 31.5784 41.3469 30.2141 42.2792 29.0349C43.2115 27.8557 44.39 26.8894 45.7344 26.2021Z" fill="#4ADE80"/>
<path d="M37.3012 43.8764C37.5859 43.7891 37.8861 43.763 38.1818 43.7997C38.4775 43.8365 38.7619 43.9353 39.0159 44.0895C39.2699 44.2438 39.4877 44.4499 39.6547 44.6941C39.8217 44.9383 39.9341 45.2149 39.9843 45.5055C40.0811 46.5472 39.9702 47.5979 40.0545 48.6409C40.2295 51.111 41.291 53.438 43.0476 55.2021C44.8041 56.9662 47.1401 58.0513 49.6342 58.2618C52.1282 58.4723 54.6163 57.7943 56.6495 56.3501C58.6828 54.9059 60.1275 52.7904 60.723 50.3854C61.1358 48.8576 60.9954 47.2715 61.0445 45.7111C61.083 45.1741 61.332 44.6733 61.7384 44.3154C62.1448 43.9574 62.6765 43.7706 63.2201 43.7948C63.7637 43.819 64.2763 44.0522 64.6485 44.4448C65.0208 44.8374 65.2234 45.3583 65.213 45.8965C65.2671 47.1776 65.242 48.4608 65.1379 49.7389C64.7147 53.0347 63.1643 56.0881 60.7444 58.3919C58.3244 60.6956 55.1806 62.1111 51.8351 62.4031C48.4895 62.6951 45.1437 61.8461 42.3534 59.9971C39.563 58.1481 37.4961 55.4105 36.496 52.2389C35.8976 50.108 35.6791 47.8904 35.8501 45.6854C35.8807 45.2747 36.0354 44.8825 36.2941 44.5599C36.5529 44.2373 36.9038 43.9991 37.3012 43.8764Z" fill="#4ADE80"/>
<path d="M47.863 21.1236C49.7679 20.7723 51.7242 20.797 53.6195 21.1963C55.5147 21.5956 57.3115 22.3616 58.9064 23.4502C60.5013 24.5388 61.863 25.9286 62.913 27.5396C63.9631 29.1506 64.6808 30.9511 65.0249 32.8375C65.2477 34.3813 65.3269 35.942 65.2615 37.5C68.0934 37.5077 70.9246 37.4945 73.7558 37.5056C74.8372 37.5392 75.8649 37.9794 76.6295 38.7366C77.3941 39.4937 77.8381 40.5108 77.871 41.5806C77.885 50.1792 77.8869 58.7785 77.8766 67.3785C77.857 69.2188 78.0268 71.1229 77.355 72.8834C76.7023 74.667 75.5191 76.2134 73.9612 77.3193C72.4032 78.4251 70.5434 79.0387 68.6263 79.0792C56.5732 79.0871 44.5195 79.0871 32.4651 79.0792C30.0458 78.9849 27.7512 77.992 26.0392 76.2984C24.3271 74.6048 23.3234 72.335 23.2281 69.9417C23.2084 60.4972 23.2066 51.0514 23.2225 41.6042C23.2387 40.5629 23.6495 39.5657 24.3734 38.8097C25.0974 38.0537 26.0818 37.594 27.132 37.5215C30.0327 37.4847 32.9355 37.5174 35.8369 37.5042C35.7963 36.1949 35.836 34.8844 35.9555 33.5799C36.3511 30.5238 37.7173 27.6709 39.8573 25.4322C41.9973 23.1936 44.8005 21.6849 47.863 21.1236ZM45.7345 26.2021C44.3892 26.8893 43.2099 27.8557 42.2769 29.0353C41.344 30.2149 40.6796 31.5798 40.329 33.0368C40.0546 34.508 39.9589 36.0064 40.044 37.5C47.0482 37.5037 54.0514 37.5037 61.0537 37.5C61.1497 35.9304 61.0335 34.3552 60.7083 32.816C60.3125 31.3078 59.5786 29.907 58.561 28.7176C57.5434 27.5282 56.2683 26.5807 54.83 25.9452C53.3918 25.3098 51.8274 25.0027 50.2529 25.0468C48.6783 25.0909 47.134 25.4851 45.7345 26.2M37.3012 43.8764C36.905 43.9995 36.5553 44.2374 36.2972 44.5593C36.0391 44.8812 35.8846 45.2723 35.8537 45.682C35.6826 47.887 35.9012 50.1046 36.4996 52.2354C37.4967 55.41 39.5627 58.1511 42.3536 60.0026C45.1446 61.8542 48.4923 62.7047 51.8398 62.4125C55.1872 62.1203 58.3327 60.7031 60.7528 58.3967C63.1728 56.0903 64.7216 53.0337 65.1415 49.7354C65.2455 48.4574 65.2706 47.1742 65.2166 45.8931C65.2269 45.3549 65.0244 44.834 64.6521 44.4414C64.2798 44.0488 63.7673 43.8155 63.2236 43.7914C62.68 43.7672 62.1484 43.954 61.742 44.3119C61.3356 44.6699 61.0866 45.1707 61.0481 45.7077C60.9989 47.2681 61.1386 48.8563 60.7266 50.382C60.1334 52.7895 58.6896 54.9078 56.6558 56.3544C54.622 57.801 52.1323 58.4805 49.6364 58.2702C47.1405 58.0599 44.8028 56.9737 43.0457 55.2077C41.2885 53.4417 40.2276 51.1123 40.0545 48.6403C39.9696 47.5986 40.0805 46.5479 39.9843 45.5049C39.934 45.2143 39.8216 44.9377 39.6546 44.6936C39.4875 44.4495 39.2697 44.2435 39.0157 44.0893C38.7617 43.9352 38.4774 43.8364 38.1817 43.7997C37.8861 43.763 37.5859 43.7891 37.3012 43.8764Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_4162_49687">
<rect width="101" height="100" fill="white"/>
</clipPath>
</defs>
</svg>
`;
