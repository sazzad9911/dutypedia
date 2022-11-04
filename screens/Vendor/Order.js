import React from "react";
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
  const scrollY = new A.Value(0);
  const diffClamp = A.diffClamp(scrollY, 0, 300);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
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
  ]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const [Loader, setLoader] = React.useState(true);
  const [Orders, setOrders] = React.useState(null);
  const [AllOrders, setAllOrders] = React.useState([]);
  const user = useSelector((state) => state.user);
  const [Active, setActive] = React.useState("STARTING");
  const vendor = useSelector((state) => state.vendor);
  const reload =
    route.params && route.params.reload ? route.params.reload : null;
  const [Search, setSearch] = React.useState();
  const [Filter, setFilter] = React.useState();
  const [Change, setChange] = React.useState(false);
  const orderSocket = useSelector((state) => state.orderSocket);
  const dispatch=useDispatch()

  

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    //dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Home" });
    wait(1000).then(() => setRefreshing(false));
  }, []);
  React.useEffect(() => {
    if (user && vendor && vendor.service) {
      //setLoader(true);
      //console.log(vendor.service.id);
      getOrders(user.token, "vendor", vendor.service.id)
        .then((res) => {
          if (res.data) {
            setLoader(false);
            dispatch({type:"SET_ORDERS",playload:res.data.orders})
            //console.log(res.data.orders);
            //console.log(res.data.orders[0].service.serviceCenterName);
            setAllOrders(res.data.orders);
            setChange((val) => !val);
            let newData = [];
            initialState.map((doc, i) => {
              let arr = res.data.orders.filter((d) => d.type == doc.type);
              newData.push({
                value: doc.value,
                title: doc.title,
                type: doc.type,
                number: arr.length,
              });
            });
            setInitialState(newData);
            
            //setOrders(res.data.orders);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response.data.msg);
        });
    }
  }, [user + Refresh + reload + vendor + orderSocket]);
  React.useEffect(() => {
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
  }, [Filter]);
  React.useEffect(() => {
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
  }, [Search]);
  React.useEffect(() => {
    socket.on("getOrder", (e) => {
      AllOrders((val) => [...val, e.order]);
    });
    setRefresh((val) => !val);
  }, [orderSocket]);

  const Screens = ({navigation,route}) => {
    const Order=useSelector(state=>state.orders);
    const [NewOrders,setNewOrders]=React.useState()
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
    const bottomSheetRef = React.useRef(null);
    
    React.useEffect(()=>{
      if(Order){
        let arr=Order.filter(d=>d.type==route.name);
        setNewOrders(arr)
      }
    },[])
    
  const snapPoints = React.useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index) => {
    //console.log("handleSheetChanges", index);
    setIndex(index);
  }, []);
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flexGrow: 1 }}
          stickyHeaderIndices={[0]}
          scrollEventThrottle={16}
          stickyHeaderHiddenOnScroll={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                //setPageChange(true);
                onRefresh();
              }}
            />
          }
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
              <OrderCart
                onPress={() => {
                  navigation.navigate("VendorOrderDetails", {
                    data: doc,
                  });
                }}
                key={i}
                data={doc}
              />
            ))}

          {NewOrders && NewOrders.length == 0 && !Loader && (
            <Text style={{ color: textColor, textAlign: "center" }}>
              No data available
            </Text>
          )}
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            zIndex: 0,
            backgroundColor: primaryColor,
            marginHorizontal: 40,
            borderRadius: 25,
            flexDirection: "row",
            justifyContent: "space-between",
            width: width - 80,
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
          <TouchableOpacity style={styles.view}>
            <SvgXml xml={plus} height="20" />
            <Text style={styles.text}>New Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.view}>
            <SvgXml xml={re} height="20" />
            <Text style={styles.text}>Dutypedia User</Text>
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
                  backgroundColor:
                    Filter == doc.title ? "#F2F2F6" : primaryColor,
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
  const Header=(props)=>{
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
    ]);
    const orders=useSelector(state=>state.orders)
    const [Active,setActive]=React.useState('STARTING')
    const [scrollRef,setScrollRef]=React.useState();
    const  [layout,setLayout]=React.useState()
    React.useEffect(()=>{
      setActive(props.state.routeNames[props.state.index])
      if (layout && scrollRef) {
        
        scrollRef.scrollTo({ x: props.state.index * 300, animated: true });
      }
    },[props.state.index])
    return(
      <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#F1EFEF",
        marginVertical: 10,
      width:"100%"
      }}
    >
      <ScrollView  ref={ref=>setScrollRef(ref)}
        style={{
          marginVertical: 0,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View style={{ width: 10 }} />
        {initialState &&
          initialState.map((doc, i) => (
            <View onLayout={e=>setLayout(e.nativeEvent.layout)}
              style={{
                alignItems: "center",
                width: 120,
              }}
              key={i}
            >
              <Button
                onPress={() => {
                  props.navigation.navigate(doc.type)
                }}
                style={{
                  color: textColor,
                  borderWidth: 0,
                  backgroundColor: primaryColor,
                  borderBottomWidth: 0,
                  borderRadius: 0,
                }}
                active={Active == doc.type ? true : false}
                title={`${doc.title} (${
                  orders ? orders.filter(d=>d.type==doc.type).length : "0"
                })`}
              />
              {Active == doc.type && (
                <View
                  style={{
                    width: "50%",
                    borderBottomColor: "#AC5DCB",
                    borderBottomWidth: 3,
                  }}
                />
              )}
            </View>
          ))}
        <View style={{ width: 0 }} />
      </ScrollView>
    </View>
    )
  }
  if(Loader){
    return(
      <ActivityLoader />
    )
  }
  return (
    <Tab.Navigator tabBar={(props)=><Header {...props}/>}>
      {
        initialState.map((doc,i)=>(
          <Tab.Screen key={i} name={doc.type} component={Screens} />
        ))
      }
    </Tab.Navigator>
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
    fontSize: 13,
    marginTop: 2,
  },
});

const OrderCart = ({ data, onPress }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const dispatch = useDispatch();
  const [Open, setOpen] = React.useState(false);
  //console.log(data.user)

  return (
    <TouchableOpacity
      onPress={() => {
        setOpen((val) => !val);
      }}
    >
      <View
        style={{
          backgroundColor: Open ? "#F2F2F6" : primaryColor,
          paddingHorizontal: 10,
          paddingVertical: 10,
          paddingTop: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
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
              {data && data.user.profilePhoto ? (
                <Image
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  source={{ uri: data.user.profilePhoto }}
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
                {data ? data.user.firstName : "Um"}{" "}
                {data ? data.user.lastName : "Um"}
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
                {data ? data.user.username : "Empty position"}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: textColor,
                  fontFamily: "Poppins-Medium",
                }}
              >
                Offer Price {data ? data.service.gigs[0].price : "0"}৳
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  color: backgroundColor,
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
        {Open && (
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
    </TouchableOpacity>
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