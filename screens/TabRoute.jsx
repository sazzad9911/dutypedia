import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Header from "../components/Header";
import Search from "./Search";
import Message from "./Message";
import Notification from "./Notification";
import Profile from "./Profile";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import ChatHeader from "../components/ChatHeader";
import BottomBar from "../components/BottomBar";
import SearchScreen from "./SearchScreen";
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import Animated, { SlideInRight, SlideInLeft } from "react-native-reanimated";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Color, primaryColor, textColor } from "../assets/colors";
import SearchFilter from "../components/SearchFilter";
import { useSelector, useDispatch } from "react-redux";
import { setBottomSheet } from "../action";
import bottomRef from "../action";
import AllReviewHeader from "../components/AllReviewHeader";
import Appointment from "./Appointment";
import OtherProfile from "./OtherProfile";
import OtherProfileHeader from "../components/OtherProfileHeader";
import BackHeader from "../components/BackHeader";
import { checkVendor, getFavoriteCategories } from "../Class/auth";
import { getJson, storeJson } from "../Class/storage";
import Home_Next from "./Home_Next";
import SubHeader from "../components/SubHeader";
import AllPackageList from "./Seller/AllPackageList";
import HomeRoute from "../HomeRoute";
import Feed from "./Feed";
import { checkUser } from "../Class/auth";
import { getService, getDashboard, getOrders } from "../Class/service";
import Dashboard from "./Seller/Dashboard";
import Order from "./Vendor/Order";
import { getSocket, socket } from "../Class/socket";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import NetInfo from "@react-native-community/netinfo";
import { ActivityIndicator } from "react-native-paper";
import CompanyCalendar from "./Seller/CompanyCalendar";
import OrderDetails from "./Seller/OrderDetails";
import ManageOrder from "./ManageOrder";
import FixedOffers from "./Seller/FixedOffers";
import OfferNow from "./Seller/OfferNow";
import CategoryList from "./CategoryList";
import { ViewCart } from "./Vendor/Notice";
import Notice from "./Notice";

const Tab = createBottomTabNavigator();

const BACKGROUND_FETCH_TASK = "order-task";

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)

const TabRoute = () => {
  const bottomSheetRef = React.useRef();
  const bottomSheet = useSelector((state) => state.bottomSheet);
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const user = useSelector((state) => state.user);
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const interestCategory = useSelector((state) => state.interestCategory);
  const vendor = useSelector((state) => state.vendor);
  const [load, setLoad] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [VendorOrders, setVendorOrders] = React.useState();
  const [UserOrders, setUserOrders] = React.useState();
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [isOffline, setOfflineStatus] = React.useState(false);
  const isDark = useSelector((state) => isDark);
  const colors = new Color(isDark);
  const backgroundColor = colors.getBackgroundColor();
  const [NewState, setNewState] = React.useState(false);
  const [Loader, setLoader] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setLoader(true);
      getFavoriteCategories(user.token)
        .then((result) => {
          if (result.data.favouriteCategories.length > 0) {
            //console.log(result.data.favouriteCategories)
            setNewState(true);
            setLoader(false);
          }
        })
        .catch((err) => {
          console.warn(err);
          setLoader(false);
        });
    }
  }, [user]);

  React.useEffect(() => {
    checkVendor().then((res) => {
      if (res) {
        dispatch({ type: "SET_VENDOR", playload: res });
      }
    });
    getJson("serviceSettings").then((data) => {
      if (data) {
        dispatch({ type: "SET_SERVICE_SETTINGS", playload: data });
      }
    });
    getJson("interestCategory").then((data) => {
      if (data) {
        dispatch({ type: "SET_INTEREST_CATEGORY", playload: data });
        //setDashboard(data);
      }
    });
  }, []);
  React.useEffect(() => {
    checkUser()
      .then((res) => {
        //console.log(res)
        if (res) {
          dispatch({ type: "SET_USER", playload: res });
          getDashboard(res.token).then((result) => {
            if (result && result.data && result.data.dashboards) {
              dispatch({
                type: "SET_VENDOR_INFO",
                playload: result.data.dashboards,
              });
              setLoad(!load);
            } else {
              dispatch({ type: "SET_VENDOR_INFO", playload: false });
              setLoad(!load);
            }
          });
        } else {
          setLoad(!load);
          dispatch({ type: "SET_USER", playload: [] });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  React.useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    //setReload((val) => !val);
    return () => removeNetInfoSubscription();
  }, []);
  React.useEffect(() => {
    if (user && !isOffline) {
      getOrders(user.token, "user")
        .then((res) => {
          dispatch({ type: "USER_ORDERS", playload: res.data.orders });
          dispatch({ type: "SET_ORDER_SOCKET", playload: res });
          setUserOrders("dfrgrg");
        })
        .catch((err) => {
          console.warn(err.response.data.msg);
          setUserOrders("dfrgrg");
        });
    } else {
      setUserOrders("dfrgrg");
    }
  }, [user + reload + socket + isOffline]);
  React.useEffect(() => {
    if (user && vendor && vendor.service && !isOffline) {
      getOrders(user.token, "vendor", vendor.service.id)
        .then((res) => {
          dispatch({ type: "VENDOR_ORDERS", playload: res.data.orders });
          dispatch({ type: "SET_ORDER_SOCKET", playload: res });
          setVendorOrders("dssedf");
        })
        .catch((err) => {
          console.warn(err.response.data.msg);
          setVendorOrders("fdfdfdfd");
        });
    } else {
      setVendorOrders("fdfdfdfd");
    }
  }, [user + vendor + reload + socket + isOffline]);

  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    socket.on("connect", () => {
      getSocket(user.user.id);
    });
    socket.on("getOrder", (e) => {
      setReload((val) => !val);
    });
    socket.on("updateOrder", (e) => {
      setReload((val) => !val);
    });
    setInterval(() => setReload((val) => !val), [2000]);
    // Be sure to return the successful result type!
    return BackgroundFetch.BackgroundFetchResult.NewData;
  });
  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 15, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }
  React.useEffect(() => {
    checkStatusAsync();
    if (!isRegistered) {
      registerBackgroundFetchAsync();
    }
  }, [isRegistered]);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  React.useEffect(() => {
    socket.on("getOrder", (e) => {
      setReload((val) => !val);
    });
    socket.on("updateOrder", (e) => {
      setReload((val) => !val);
    });
  }, []);
  if (!user || !load || !UserOrders || !VendorOrders || Loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" color={backgroundColor} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => {
          if (
            bottomSheetRef &&
            bottomSheetRef.current &&
            props.state.index != 5
          ) {
            bottomSheetRef.current.close();
          }
          return <BottomBar {...props} />;
        }}
      >
        {!vendor &&
          (!Array.isArray(user) && user && load ? (
            !NewState ? (
              <Tab.Screen
                name="Home"
                options={{
                  headerShown: false,
                }}
                component={Home}
              />
            ) : (
              <Tab.Screen
                name="Home"
                options={{
                  headerShown: false,
                }}
                component={Home_Next}
              />
            )
            // <Tab.Screen
            //   options={{ headerShown: false }}
            //   name="Feed"
            //   component={HomeRoute}
            // />
          ) : (
            <Tab.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Feed}
            />
          ))}
        {vendor && (
          <Tab.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Dashboard}
          />
        )}
        {vendor ? (
          <Tab.Screen
            options={{ lazy: false, headerShown: false }}
            name="Search"
            component={Order}
          />
        ) : (
          <Tab.Screen
            options={{ lazy: false, headerShown: false }}
            name="Search"
            component={SearchScreen}
          />
        )}
        <Tab.Screen
          options={{
            lazy: false,
            header: (props) => <ChatHeader {...props} />,
          }}
          name="Message"
          component={Message}
        />
        <Tab.Screen
          options={{ header: (props) => <Header {...props} /> }}
          name="Notification"
          component={Notification}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="SearchScreen"
          component={SearchScreen}
        />
        <Tab.Screen
          options={{
            header: (props) => (
              <AllReviewHeader title="Appointment" {...props} />
            ),
          }}
          name="Appointment"
          component={Appointment}
        />
        <Tab.Screen
          name="AllPackageList"
          options={{
            header: (props) => <SubHeader title="Fixed Price" {...props} />,
          }}
          component={AllPackageList}
        />

        <Tab.Screen
          options={{ headerShown: false }}
          name="Notice"
          component={Notice}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="ViewCart"
          component={ViewCart}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="CategoryList"
          component={CategoryList}
        />
        <Tab.Screen
          options={{
            header: (props) => <SubHeader title="Offer Price" {...props} />,
          }}
          name="OfferNow"
          component={OfferNow}
        />
        <Tab.Screen
          options={{
            header: (props) => <SubHeader title="Confirm Order" {...props} />,
          }}
          name="FixedOffers"
          component={FixedOffers}
        />
        <Tab.Screen
          name="ManageOrder"
          options={{
            headerShown: false,
          }}
          component={ManageOrder}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="OrderDetails"
          component={OrderDetails}
        />
        <Tab.Screen
          name="Company Calender"
          options={{
            headerShown: false,
          }}
          component={CompanyCalendar}
        />
      </Tab.Navigator>
      <Bottom bottomSheetRef={bottomSheetRef} />
    </View>
  );
};

export default TabRoute;
const Bottom = (props) => {
  const [disabled, setDisabled] = React.useState(true);
  const bottomSheet = useSelector((state) => state.bottomSheet);
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();

  const snapPoints = React.useMemo(() => ["10%", "60%"], []);
  const handleSheetChanges = React.useCallback((index) => {
    console.log("handleSheetChanges", index);
    dispatch(setBottomSheet(index));
  }, []);
  const handleClosePress = () => props.bottomSheetRef.current.close();
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [Online, setOnline] = React.useState(false);
  const [V, setV] = React.useState();
  const [O, setO] = React.useState();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const toggleSwitch2 = () => {
    setOnline((previousState) => !previousState);
  };
  React.useEffect(() => {
    if (!isEnabled && !Online) {
      setDisabled(true);
      return;
    }
    if (V != isEnabled || O != Online) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isEnabled + Online]);
  return (
    <BottomSheet
      ref={props.bottomSheetRef}
      index={bottomSheet}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: primaryColor,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 30,
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        {visible ? (
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
            style={{
              position: "absolute",
              left: 10,
            }}
          >
            <Ionicons name="chevron-back-outline" size={24} color={textColor} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              handleClosePress();
            }}
            style={{
              position: "absolute",
              left: 10,
            }}
          >
            <AntDesign name="close" size={24} color={textColor} />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Poppins-Medium",
            justifySelf: "center",
            textAlign: "center",
          }}
        >
          Filter
        </Text>
      </View>
      <BottomSheetScrollView>
        <SearchFilter
          toggleSwitch={toggleSwitch}
          toggleSwitch2={toggleSwitch2}
          visible={visible}
          setVisible={setVisible}
          disabled={setDisabled}
        />
      </BottomSheetScrollView>
      {visible ? (
        <></>
      ) : (
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.button,
            {
              backgroundColor: disabled ? "#707070" : "green",
              opacity: disabled ? 0.8 : 1,
            },
          ]}
          onPress={() => {
            setDisabled(true);
            handleClosePress();
            setO(isEnabled);
            setV(Online);
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      )}
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  button: {
    width: "90%",
    height: 40,
    backgroundColor: "green",
    alignSelf: "center",
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
const New = () => {
  return <View style={{ flex: 1, backgroundColor: "red" }} />;
};
