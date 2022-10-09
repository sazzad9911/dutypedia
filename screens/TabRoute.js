import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Header from "./../components/Header";
import Search from "./Search";
import Message from "./Message";
import Notification from "./Notification";
import Profile from "./Profile";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import ChatHeader from "./../components/ChatHeader";
import BottomBar from "./../components/BottomBar";
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
import { primaryColor, textColor } from "./../assets/colors";
import SearchFilter from "./../components/SearchFilter";
import { useSelector, useDispatch } from "react-redux";
import { setBottomSheet } from "./../action";
import bottomRef from "../action";
import AllReviewHeader from "./../components/AllReviewHeader";
import Appointment from "./Appointment";
import OtherProfile from "./OtherProfile";
import OtherProfileHeader from "../components/OtherProfileHeader";
import BackHeader from "./../components/BackHeader";
import { checkVendor } from "../Class/auth";
import { getJson, storeJson } from "../Class/storage";
import Home_Next from "./Home_Next";
import SubHeader from "./../components/SubHeader";
import AllPackageList from "./Seller/AllPackageList";
import HomeRoute from "./../HomeRoute";
import Feed from "./Feed";
import {checkUser} from '../Class/auth'
import {getService,getDashboard} from '../Class/service'

const Tab = createBottomTabNavigator();

const TabRoute = () => {
  const bottomSheetRef = React.useRef();
  const bottomSheet = useSelector((state) => state.bottomSheet);
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const user = useSelector((state) => state.user);
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const interestCategory = useSelector((state) => state.interestCategory);
  const [load, setLoad] = React.useState(false);
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
  if (!user && !load) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading.....</Text>
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
        {!Array.isArray(user)&& user && load ? (
          <Tab.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeRoute}
          />
        ) : (
          <Tab.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Feed}
          />
        )}

        <Tab.Screen
          options={{ lazy: false, header: (props) => <Header {...props} /> }}
          name="Search"
          component={Search}
        />
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
  const handleSheetChanges = React.useCallback((index: number) => {
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
