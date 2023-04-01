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
import NewTabe from "./Vendor/components/NewTabe";
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
import SearchOrderHeader from "../Hooks/SearchOrderHeader";

//import { Screens } from "./Vendor/Order";
const Tab = createMaterialTopTabNavigator();

const SearchOrder = ({ navigation, route }) => {
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#4ADE80",
      }}>
      <View
        style={{
          height: inset?.top,
        }}
      />
      <StatusBar style="light" backgroundColor="#4ADE80" />
      <SearchOrderHeader
        navigation={navigation}
        allOrders={allOrders}
        
      />
      <Tab.Navigator
        initialRouteName={type}
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "#ffffff",
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: "#4ADE80",
            marginLeft: 20,
            marginRight: 20,
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
                    lineHeight: 16,
                    color: focused ? "#ffffff" : "#E8E8E8",
                  }}>
                  {`${initialState[i].title}`}
                  <Text
                    style={{
                      fontSize: 12,
                    }}>
                    ({allOrders[i]})
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

export default SearchOrder;
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

  // callbacks
  const handleSheetChanges = React.useCallback((index) => {
    //console.log("handleSheetChanges", index);
    setIndex(index);
    if (index < 0) {
      dispatch(setOrderRef());
    }
  }, []);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const to = Math.min((parseInt(total / 20) + 1) * 20, 2);
  const searchOrderRef = useSelector((state) => state.searchOrderRef);

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
          setLoader(false);
          //console.log(res.data.total)
          setTotal(res.data.total);
        })
        .catch((err) => {
          setLoader(false);
          console.error(err.response.data.msg);
        });
    }
  }, [isFocused]);

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
    //console.log(searchOrderRef)
    if (AllOrders) {
      if (!searchOrderRef) {
        setOrders(AllOrders);
      } else {
        let text = searchOrderRef;
        text = text.split(" ").join("_");
        let arr = AllOrders.filter((d) =>
          d.service.serviceCenterName
            .toUpperCase()
            .match(searchOrderRef.toUpperCase())
        );
        setOrders(arr);
      }
    }
  }, [searchOrderRef]);

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
  if (!Array.isArray(AllOrders)) {
    return (
      <View style={customStyle.fullBox}>
        <ActivityIndicator size="small" color={backgroundColor} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingVertical: 8 }}>
      {Orders && Orders.length > 0 && (
        <FlatList
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
const noOrder = `<svg width="145" height="144" viewBox="0 0 145 144" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_4053_28692" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="145" height="144">
<path d="M144.436 0H0.563477V144H144.436V0Z" fill="white"/>
</mask>
<g mask="url(#mask0_4053_28692)">
<path d="M64.12 0H81C87.479 0.171958 93.936 0.814988 100.32 1.924C105.576 2.8182 110.722 4.26731 115.672 6.247C120.439 8.30644 124.828 11.149 128.656 14.657C131.164 16.8645 133.355 19.4067 135.168 22.212C137.434 25.8379 139.204 29.7506 140.431 33.846C141.725 37.5432 142.644 41.3605 143.176 45.241C143.933 50.613 144.197 56.034 144.433 61.448V82.314C144.284 88.5131 143.745 94.6967 142.818 100.828C142.092 104.576 141.079 108.262 139.786 111.854C137.955 117.593 134.86 122.847 130.729 127.232C126.906 131.157 122.442 134.403 117.529 136.832C112.918 138.958 108.064 140.511 103.074 141.456C96.318 142.858 89.45 143.664 82.552 143.864C78.152 144.089 73.737 143.926 69.329 143.996C61.904 144.052 54.484 143.53 47.139 142.435C38.982 141.006 30.678 139.107 23.579 134.643C17.785 130.953 12.479 126.213 9.03698 120.199C6.35098 115.606 4.74498 110.499 3.28248 105.412C2.44018 102.109 1.85838 98.7457 1.54248 95.352C0.76048 87.7 0.586477 79.988 0.563477 72.3C0.571477 65.527 0.701474 58.748 1.23547 51.994C1.52587 47.0716 2.33028 42.1931 3.63548 37.438C4.68498 33.5698 6.07098 29.8005 7.77498 26.173C9.63198 22.3519 12.141 18.8842 15.19 15.926C18.966 12.22 23.327 9.16257 28.098 6.877C32.818 4.77897 37.774 3.25766 42.857 2.346C49.864 0.949326 56.978 0.164371 64.12 0ZM68.741 30.418C64.38 31.2267 60.388 33.399 57.34 36.622C54.292 39.8449 52.346 43.9522 51.782 48.352C51.612 50.2295 51.556 52.1156 51.613 54C47.481 54.02 43.346 53.972 39.213 54.025C37.718 54.1293 36.315 54.7912 35.284 55.8799C34.253 56.9686 33.668 58.4046 33.644 59.904C33.639 73.504 33.642 87.106 33.652 100.71C33.788 104.156 35.218 107.425 37.657 109.864C40.096 112.302 43.364 113.732 46.81 113.868C63.98 113.885 81.15 113.885 98.321 113.868C101.052 113.81 103.701 112.927 105.92 111.335C108.139 109.743 109.824 107.517 110.754 104.949C111.71 102.415 111.468 99.672 111.497 97.022C111.492 84.64 111.489 72.257 111.489 59.873C111.443 58.3326 110.81 56.868 109.721 55.7777C108.632 54.6874 107.168 54.0534 105.627 54.005C101.593 53.988 97.56 54.005 93.527 53.997C93.621 51.7524 93.507 49.5039 93.189 47.28C92.699 44.5642 91.676 41.9723 90.18 39.6532C88.684 37.334 86.744 35.3335 84.472 33.7665C82.2 32.1995 79.641 31.097 76.942 30.5223C74.243 29.9477 71.457 29.9122 68.743 30.418H68.741Z" fill="#4ADE80"/>
<path d="M65.712 37.731C67.705 36.7015 69.905 36.1339 72.148 36.0704C74.391 36.0069 76.619 36.449 78.668 37.3641C80.717 38.2791 82.533 39.6436 83.983 41.3564C85.432 43.0691 86.478 45.0862 87.042 47.258C87.505 49.4735 87.67 51.7408 87.534 54C77.556 54.0053 67.58 54.0053 57.606 54C57.486 51.8479 57.624 49.6893 58.017 47.57C58.516 45.4729 59.462 43.5083 60.79 41.8103C62.118 40.1122 63.797 38.7208 65.712 37.731Z" fill="#4ADE80"/>
<path d="M53.698 63.182C54.104 63.0563 54.532 63.0187 54.953 63.0717C55.374 63.1246 55.779 63.2669 56.141 63.489C56.503 63.7111 56.813 64.0078 57.051 64.3595C57.289 64.7111 57.449 65.1095 57.52 65.528C57.658 67.028 57.5 68.541 57.62 70.043C57.87 73.5999 59.382 76.9507 61.884 79.491C64.386 82.0313 67.714 83.594 71.267 83.8971C74.819 84.2002 78.363 83.2239 81.26 81.1442C84.156 79.0645 86.214 76.0183 87.062 72.555C87.65 70.355 87.45 68.071 87.52 65.824C87.575 65.0508 87.93 64.3296 88.509 63.8142C89.088 63.2987 89.845 63.0297 90.62 63.0645C91.394 63.0994 92.124 63.4352 92.654 64.0006C93.185 64.5659 93.473 65.316 93.458 66.091C93.535 67.9358 93.5 69.7836 93.351 71.624C92.748 76.37 90.54 80.7669 87.093 84.0843C83.646 87.4017 79.167 89.44 74.402 89.8605C69.636 90.281 64.87 89.0584 60.895 86.3959C56.92 83.7333 53.976 79.7911 52.551 75.224C51.699 72.1556 51.388 68.9622 51.631 65.787C51.675 65.1955 51.895 64.6308 52.264 64.1663C52.633 63.7017 53.132 63.3588 53.698 63.182Z" fill="#4ADE80"/>
<path d="M68.744 30.418C71.457 29.9121 74.244 29.9477 76.944 30.5227C79.643 31.0976 82.203 32.2006 84.475 33.7682C86.747 35.3358 88.686 37.3371 90.182 39.657C91.678 41.9769 92.7 44.5696 93.191 47.286C93.508 49.509 93.621 51.7564 93.528 54C97.562 54.011 101.595 53.992 105.628 54.008C107.168 54.0564 108.632 54.6904 109.721 55.7807C110.81 56.871 111.443 58.3356 111.49 59.876C111.51 72.258 111.512 84.641 111.498 97.025C111.47 99.675 111.712 102.417 110.755 104.952C109.825 107.52 108.139 109.747 105.92 111.34C103.701 112.932 101.051 113.816 98.321 113.874C81.151 113.885 63.981 113.885 46.81 113.874C43.363 113.738 40.095 112.308 37.656 109.87C35.217 107.431 33.787 104.162 33.652 100.716C33.624 87.116 33.621 73.514 33.644 59.91C33.667 58.4106 34.252 56.9746 35.283 55.8859C36.314 54.7972 37.717 54.1353 39.213 54.031C43.345 53.978 47.48 54.025 51.613 54.006C51.555 52.1206 51.611 50.2335 51.782 48.355C52.345 43.9542 54.291 39.846 57.34 36.6224C60.388 33.3988 64.381 31.2263 68.744 30.418ZM65.712 37.731C63.795 38.7206 62.115 40.1122 60.786 41.8108C59.457 43.5094 58.511 45.4749 58.012 47.573C57.621 49.6915 57.484 51.8491 57.606 54C67.583 54.0053 77.559 54.0053 87.534 54C87.67 51.7398 87.505 49.4714 87.042 47.255C86.478 45.0832 85.432 43.0661 83.983 41.3534C82.533 39.6406 80.717 38.2761 78.668 37.3611C76.619 36.446 74.391 36.0039 72.148 36.0674C69.905 36.1309 67.705 36.6985 65.712 37.728M53.699 63.182C53.134 63.3593 52.636 63.7018 52.268 64.1654C51.901 64.6289 51.681 65.192 51.637 65.782C51.393 68.9572 51.704 72.1506 52.557 75.219C53.977 79.7903 56.92 83.7375 60.896 86.4038C64.871 89.0701 69.64 90.2947 74.408 89.874C79.177 89.4532 83.657 87.4125 87.105 84.0912C90.552 80.77 92.758 76.3685 93.357 71.619C93.505 69.7786 93.54 67.9308 93.464 66.086C93.478 65.311 93.19 64.5609 92.659 63.9956C92.129 63.4302 91.399 63.0943 90.625 63.0595C89.85 63.0247 89.093 63.2937 88.514 63.8092C87.935 64.3246 87.58 65.0458 87.526 65.819C87.456 68.066 87.655 70.353 87.068 72.55C86.223 76.0168 84.166 79.0672 81.269 81.1503C78.372 83.2334 74.825 84.2119 71.27 83.9091C67.714 83.6063 64.384 82.0421 61.881 79.4991C59.378 76.956 57.867 73.6017 57.621 70.042C57.5 68.542 57.658 67.029 57.521 65.527C57.449 65.1086 57.289 64.7103 57.051 64.3588C56.813 64.0073 56.503 63.7106 56.141 63.4886C55.779 63.2666 55.374 63.1244 54.953 63.0716C54.532 63.0187 54.104 63.0563 53.699 63.182Z" fill="white"/>
</g>
</svg>
`;
